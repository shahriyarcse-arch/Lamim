const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css') && !f.includes('pages.css.backup'));

const selectorMap = {};
const keyframeMap = {};

// Very simple regex to grab CSS selectors and keyframe names
// It handles blocks like: .class-name { ... } or @keyframes name { ... }
const blockRegex = /(@keyframes\s+[\w-]+|[^{]+)\s*\{/g;

console.log("Analyzing CSS files for duplicates...\n");

for (const file of files) {
  const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
  
  // Remove comments
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
  
  let match;
  while ((match = blockRegex.exec(cleanContent)) !== null) {
    let selector = match[1].trim();
    
    // Ignore media queries, font-face, etc. for this basic check
    if (selector.startsWith('@media') || selector.startsWith('@font-face') || selector.startsWith('@supports')) {
      continue;
    }
    
    // Check if it's a keyframe
    if (selector.startsWith('@keyframes')) {
      const name = selector.replace('@keyframes', '').trim();
      if (!keyframeMap[name]) keyframeMap[name] = new Set();
      keyframeMap[name].add(file);
    } else {
      // It's a standard selector, might have multiple separated by comma
      const subSelectors = selector.split(',').map(s => s.trim()).filter(s => s);
      for (const sub of subSelectors) {
        if (!selectorMap[sub]) selectorMap[sub] = new Set();
        selectorMap[sub].add(file);
      }
    }
  }
}

let foundDups = false;

console.log("=== DUPLICATE @KEYFRAMES ===");
for (const [name, filesSet] of Object.entries(keyframeMap)) {
  if (filesSet.size > 1) {
    foundDups = true;
    console.log(`- @keyframes ${name} is duplicated in: ${Array.from(filesSet).join(', ')}`);
  }
}

console.log("\n=== DUPLICATE CSS SELECTORS ACROSS DIFFERENT FILES ===");
// We only care if the exact same selector is used in MULTIPLE different files
for (const [sel, filesSet] of Object.entries(selectorMap)) {
  if (filesSet.size > 1) {
    // Ignore some common tag selectors that might just be styled differently in different scopes
    if (sel.match(/^[a-z]+$/) || sel === '*' || sel === ':root') continue;
    
    foundDups = true;
    console.log(`- '${sel}' is defined in: ${Array.from(filesSet).join(', ')}`);
  }
}

if (!foundDups) {
  console.log("No cross-file duplicates found! Your CSS is perfectly isolated.");
} else {
  console.log("\nTIP: You can move these duplicated animations or classes into 'css/components.css' or 'css/animations.css' so you only have to define them once!");
}
