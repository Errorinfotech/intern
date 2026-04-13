const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const replacements = [
    // Previous frontend colors
    { from: /#304c64/gi, to: '#3d2c22' },
    { from: /#26788e/gi, to: '#bb734b' },
    { from: /#223647/gi, to: '#2b1f18' },
    { from: /#5a6e7f/gi, to: '#665042' },
    { from: /48,\s*76,\s*100/g, to: '61, 44, 34' },
    { from: /38,\s*120,\s*142/g, to: '187, 115, 75' },
    { from: /34,\s*54,\s*71/g, to: '43, 31, 24' },

    // Root styles.css colors (Deep Professional Blue theme)
    { from: /#1e40af/gi, to: '#3d2c22' },
    { from: /#3b82f6/gi, to: '#bb734b' },
    { from: /#1e3a8a/gi, to: '#2b1f18' },
    { from: /#0f766e/gi, to: '#bb734b' },
    { from: /#ea580c/gi, to: '#bb734b' },
    { from: /#fb923c/gi, to: '#3d2c22' }, // Maybe highlight just to primary or secondary
    { from: /#4f46e5/gi, to: '#665042' },
    
    // Root RGB values
    { from: /30,\s*64,\s*175/g, to: '61, 44, 34' },     // #1e40af
    { from: /15,\s*118,\s*110/g, to: '187, 115, 75' },  // #0f766e
    { from: /234,\s*88,\s*12/g, to: '187, 115, 75' },   // #ea580c
    { from: /79,\s*70,\s*229/g, to: '187, 115, 75' },   // #4f46e5
    // And some other hardcoded RGB ones from the styles hero before radial gradients
    { from: /255,\s*151,\s*60/g, to: '187, 115, 75' }   // an orange variant
];

function processPath(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory() && !currentPath.includes('node_modules') && !currentPath.includes('.git') && !currentPath.includes('.vscode')) {
        const children = fs.readdirSync(currentPath);
        for (const child of children) {
            processPath(path.join(currentPath, child));
        }
    } else if (stats.isFile() && (currentPath.endsWith('.css') || currentPath.endsWith('.html') || currentPath.endsWith('.js') || currentPath.endsWith('.ejs'))) {
        if (currentPath === __filename) return; // skip this file
        
        let content = fs.readFileSync(currentPath, 'utf8');
        let newContent = content;
        for (const r of replacements) {
            newContent = newContent.replace(r.from, r.to);
        }
        if (newContent !== content) {
            fs.writeFileSync(currentPath, newContent, 'utf8');
            console.log('Updated', currentPath);
        }
    }
}

processPath(dir);
console.log('Theme applied successfully to entirely all pages and root folders!');
