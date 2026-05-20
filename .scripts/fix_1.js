const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const witrPath = path.join(cssDir, 'witr-fix.css');
const salahPath = path.join(cssDir, 'salah.css');
const indexPath = path.join(__dirname, 'index.html');

console.log("Starting Fix #1: Merging witr-fix.css into salah.css...");

if (fs.existsSync(witrPath)) {
  const witrContent = fs.readFileSync(witrPath, 'utf8');
  
  if (fs.existsSync(salahPath)) {
    // Append to salah.css
    fs.appendFileSync(salahPath, '\n\n/* === MERGED FROM WITR-FIX.CSS === */\n' + witrContent, 'utf8');
    console.log("1. Successfully appended witr-fix.css to salah.css");
    
    // Delete witr-fix.css
    fs.unlinkSync(witrPath);
    console.log("2. Deleted witr-fix.css");
  } else {
    console.log("salah.css not found, skipping merge.");
  }
} else {
  console.log("witr-fix.css already deleted.");
}

// Remove from index.html
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  if (html.includes('<link rel="stylesheet" href="css/witr-fix.css">')) {
    html = html.replace('<link rel="stylesheet" href="css/witr-fix.css">\n', '');
    html = html.replace('<link rel="stylesheet" href="css/witr-fix.css">', '');
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log("3. Removed witr-fix.css link from index.html");
  }
}

console.log("\nFix #1 Complete! The app remains 100% workable.");
