import fs from 'fs';
import path from 'path';

const files = [
  'ai-ml internship.html',
  'backend-dev.html',
  'bde-operations.html',
  'content-creator.html',
  'data-analysis.html',
  'digital bussiness management.html',
  'graphic-designer-operations.html',
  'product photography-videography.html',
  'qa-testing.html'
];

const arrowHTML = `<span onclick="toggleRegFee(this)" title="View registration fee details" style="cursor:pointer; color:#bb734b; font-size:0.85rem; margin-left:6px; display:inline-flex; align-items:center; transition:transform 0.3s ease; user-select:none;">&#9660;</span>`;

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) { console.log(`NOT FOUND: ${file}`); continue; }
  
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('&#9660;')) {
    console.log(`Already has arrow: ${file}`);
    continue;
  }

  // Replace strictly "I agree to the terms and conditions *" with itself + arrow
  // making sure not to duplicate
  if (content.includes('I agree to the terms and conditions *')) {
      content = content.replace(
          'I agree to the terms and conditions *',
          `I agree to the terms and conditions *\n                                ${arrowHTML}`
      );
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Arrow added: ${file}`);
  } else {
      console.log(`Could not find 'I agree' text in: ${file}`);
  }
}
console.log('Done!');
