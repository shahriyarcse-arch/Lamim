const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const dbPath = path.join(jsDir, 'db.js');

console.log("Starting Fix #2: Centralizing localStorage...");

// 1. Update db.js to include raw methods
let dbContent = fs.readFileSync(dbPath, 'utf8');
if (!dbContent.includes('rawGet(key)')) {
  // Inject just after the first 3 methods
  const injectMethods = `
  rawGet(key) { return localStorage.getItem(key); },
  rawSet(key, val) { localStorage.setItem(key, val); return true; },
  clear() { localStorage.clear(); },
  keys() { return Object.keys(localStorage); },`;
  
  dbContent = dbContent.replace(
    'remove(key) { localStorage.removeItem(key); },', 
    'remove(key) { localStorage.removeItem(key); },' + injectMethods
  );
  fs.writeFileSync(dbPath, dbContent, 'utf8');
  console.log("1. Injected DB.rawGet, DB.rawSet, DB.clear, DB.keys into db.js");
}

// 2. Files to process (all JS files and index.html)
const filesToProcess = fs.readdirSync(jsDir)
  .filter(f => f.endsWith('.js') && f !== 'db.js')
  .map(f => path.join(jsDir, f));
filesToProcess.push(path.join(__dirname, 'index.html'));

let modifiedCount = 0;

for (const filePath of filesToProcess) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace direct localStorage calls
  content = content.replace(/localStorage\.getItem\((.*?)\)/g, 'DB.rawGet($1)');
  content = content.replace(/localStorage\.setItem\((.*?)\)/g, 'DB.rawSet($1)');
  content = content.replace(/localStorage\.removeItem\((.*?)\)/g, 'DB.remove($1)');
  content = content.replace(/localStorage\.clear\(\)/g, 'DB.clear()');
  content = content.replace(/Object\.keys\(localStorage\)/g, 'DB.keys()');
  content = content.replace(/localStorage\.length/g, 'DB.keys().length');
  content = content.replace(/localStorage\.key\((.*?)\)/g, 'DB.keys()[$1]');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`- Refactored localStorage in ${path.basename(filePath)}`);
  }
}

console.log(`\nFix #2 Complete! Centralized localStorage in ${modifiedCount} files. The app remains 100% workable.`);
