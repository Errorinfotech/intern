
import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const indexHtmlPath = path.join(currentDir, 'index.html');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Extract the CSS block
const styleMatch = indexContent.match(/<style>\s+\/\* Contact Card Modern Styles \*\/[\s\S]*?<\/style>/);
if (!styleMatch) {
    console.error('Could not find modern contact styles in index.html');
    process.exit(1);
}
const modernStyles = styleMatch[0];

// 2. Extract the Contact Section HTML
const sectionMatch = indexContent.match(/<!-- Contact Section -->[\s\S]*?<\/section>/);
if (!sectionMatch) {
    console.error('Could not find contact section in index.html');
    process.exit(1);
}
const modernSection = sectionMatch[0];

// 3. Get all relevant HTML files
const filesToPatch = [
    'ai-ml internship.html',
    'bde-operations.html',
    'content-creator.html',
    'digital bussiness management.html',
    'graphic-designer-operations.html',
    'product photography-videography.html',
    'backend-dev.html',
    'data-analysis.html',
    'frontend-dev.html',
    'qa-testing.html',
    'ui-ux-design.html'
];

filesToPatch.forEach(file => {
    const filePath = path.join(currentDir, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found: ${file}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 4. Inject styles into head (if not already there)
    if (!content.includes('/* Contact Card Modern Styles */')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${modernStyles}\n</head>`);
        }
    }

    // 5. Replace ANY contact section (id="contact" or id="apply")
    const sectionRegex = /<section[^>]*id=["'](contact|apply)["'][^>]*>[\s\S]*?<\/section>/g;
    
    if (sectionRegex.test(content)) {
        content = content.replace(sectionRegex, modernSection);
        console.log(`✅ Patched form in ${file}`);
    } else {
        console.warn(`⚠️ Could not find contact/apply section in ${file}`);
    }

    fs.writeFileSync(filePath, content);
});

console.log('🚀 All pages updated successfully!');
