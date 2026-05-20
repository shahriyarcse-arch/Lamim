const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const pagesCssPath = path.join(cssDir, 'pages.css');
const indexHtmlPath = path.join(__dirname, 'index.html');

if (!fs.existsSync(pagesCssPath)) {
  console.error("pages.css not found!");
  process.exit(1);
}

const content = fs.readFileSync(pagesCssPath, 'utf8');
const lines = content.split('\n');

const modules = {};
let currentModule = 'general'; // Default for the top header part

// Regex to match "/* === MODULE NAME === */" or "/* ===== MODULE NAME ===== */"
const headerRegex = /^\/\*\s*={3,}\s*(.+?)\s*={3,}\s*\*\//;

for (let line of lines) {
  const match = line.match(headerRegex);
  if (match) {
    let rawName = match[1].toLowerCase();
    // Clean up the name (e.g. "salah (farz only...)" -> "salah")
    rawName = rawName.split('(')[0].trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    
    if (rawName.includes('splash')) currentModule = 'splash';
    else if (rawName.includes('auth')) currentModule = 'auth';
    else if (rawName.includes('home')) currentModule = 'home';
    else if (rawName.includes('salah')) currentModule = 'salah';
    else if (rawName.includes('dhikr')) currentModule = 'dhikr';
    else if (rawName.includes('nafl')) currentModule = 'nafl';
    else if (rawName.includes('analysis')) currentModule = 'analysis';
    else if (rawName.includes('mujahid')) currentModule = 'mujahid';
    else if (rawName.includes('finance')) currentModule = 'finance';
    else if (rawName.includes('profile')) currentModule = 'profile';
    else if (rawName.includes('leaderboard') || rawName.includes('vanguard')) currentModule = 'leaderboard';
    else if (rawName.includes('admin')) currentModule = 'admin';
    else currentModule = rawName;
  }

  if (!modules[currentModule]) {
    modules[currentModule] = [];
  }
  modules[currentModule].push(line);
}

const generatedFiles = [];

console.log("Splitting pages.css into modules...");
for (const [modName, modLines] of Object.entries(modules)) {
  if (modLines.length < 5) continue; // Skip empty ones
  
  // Exclude 'general' if it just contains the header
  if (modName === 'general' && modLines.filter(l => l.trim()).length < 5) continue;

  const fileName = `${modName}.css`;
  const filePath = path.join(cssDir, fileName);
  fs.writeFileSync(filePath, modLines.join('\n'), 'utf8');
  generatedFiles.push(fileName);
  console.log(`Created: css/${fileName} (${modLines.length} lines)`);
}

// Rename the original file so it's not loaded and kept as backup
const backupPath = path.join(cssDir, 'pages.css.backup');
fs.renameSync(pagesCssPath, backupPath);
console.log("\nOriginal pages.css renamed to pages.css.backup");

// Now update index.html
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const linkTags = generatedFiles.map(file => `  <link rel="stylesheet" href="css/${file}">`).join('\n');

if (htmlContent.includes('<link rel="stylesheet" href="css/pages.css">')) {
  htmlContent = htmlContent.replace(
    '<link rel="stylesheet" href="css/pages.css">', 
    `<!-- Modularized Page CSS -->\n${linkTags}`
  );
  fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
  console.log("\nUpdated index.html to include new modular CSS files.");
} else {
  console.log("\nWarning: Could not find <link rel=\"stylesheet\" href=\"css/pages.css\"> in index.html to replace automatically. You will need to add the links manually.");
}

console.log("\nSuccess! CSS Modularization is complete.");
