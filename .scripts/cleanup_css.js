const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css') && !f.includes('pages.css.backup') && f !== 'components.css' && f !== 'animations.css');

// Function to safely extract CSS blocks by counting braces
function extractAndRemoveBlock(content, keyword) {
  let blocks = [];
  let currentIndex = 0;
  
  while (true) {
    // Find the keyword (ensure it's not part of another word)
    let index = content.indexOf(keyword, currentIndex);
    if (index === -1) break;
    
    // Check if it's followed by a valid character (space, colon, comma, brace)
    const nextChar = content[index + keyword.length];
    if (nextChar && ![' ', ':', ',', '{', '\n', '\r'].includes(nextChar)) {
        currentIndex = index + keyword.length;
        continue;
    }

    // Find the first '{' after keyword
    let openBrace = content.indexOf('{', index);
    if (openBrace === -1) break;
    
    // Ensure there is no other selector closing brace between keyword and open brace
    // If there is, this keyword might be inside a comment or invalid
    let possibleClose = content.indexOf('}', index);
    if (possibleClose !== -1 && possibleClose < openBrace) {
       currentIndex = index + keyword.length;
       continue;
    }

    // Count braces
    let braceCount = 1;
    let closeBrace = openBrace + 1;
    while (braceCount > 0 && closeBrace < content.length) {
      if (content[closeBrace] === '{') braceCount++;
      if (content[closeBrace] === '}') braceCount--;
      closeBrace++;
    }
    
    let block = content.substring(index, closeBrace).trim();
    blocks.push(block);
    
    // Remove the block from content
    content = content.substring(0, index) + content.substring(closeBrace);
    currentIndex = index; // Next search starts from here
  }
  
  return { content, blocks };
}

const componentTargets = ['.sa-uemail', '.mujahid-hero-btn', '.mujahid-habit-option'];
const animationTargets = ['@keyframes fluidGradient', '@keyframes glossyText'];

let uniqueComponents = new Set();
let uniqueAnimations = new Set();
let filesModified = 0;

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Extract Components
  for (const target of componentTargets) {
    const result = extractAndRemoveBlock(content, target);
    if (result.blocks.length > 0) {
      content = result.content;
      result.blocks.forEach(b => uniqueComponents.add(b));
      modified = true;
      console.log(`Extracted '${target}' from ${file}`);
    }
  }

  // Extract Animations
  for (const target of animationTargets) {
    const result = extractAndRemoveBlock(content, target);
    if (result.blocks.length > 0) {
      content = result.content;
      result.blocks.forEach(b => uniqueAnimations.add(b));
      modified = true;
      console.log(`Extracted '${target}' from ${file}`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
  }
}

// Append to components.css
if (uniqueComponents.size > 0) {
  const compPath = path.join(cssDir, 'components.css');
  let compContent = fs.readFileSync(compPath, 'utf8');
  compContent += '\n\n/* --- DE-DUPLICATED COMPONENTS --- */\n' + Array.from(uniqueComponents).join('\n\n') + '\n';
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log(`\nAdded ${uniqueComponents.size} blocks to components.css`);
}

// Append to animations.css
if (uniqueAnimations.size > 0) {
  const animPath = path.join(cssDir, 'animations.css');
  let animContent = fs.readFileSync(animPath, 'utf8');
  animContent += '\n\n/* --- DE-DUPLICATED ANIMATIONS --- */\n' + Array.from(uniqueAnimations).join('\n\n') + '\n';
  fs.writeFileSync(animPath, animContent, 'utf8');
  console.log(`Added ${uniqueAnimations.size} blocks to animations.css`);
}

console.log(`\nCleanup complete! Modified ${filesModified} files.`);
