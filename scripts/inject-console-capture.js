const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  console.log('No out directory found, skipping console capture injection.');
  process.exit(0);
}

const scriptTag = '<script src="/dashboard-console-capture.js" defer></script>';

function injectIntoFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('dashboard-console-capture.js')) return;
  content = content.replace('</head>', scriptTag + '</head>');
  fs.writeFileSync(filePath, content);
  console.log('Injected into:', filePath);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html')) {
      injectIntoFile(fullPath);
    }
  });
}

walkDir(outDir);
console.log('Console capture injection complete.');