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
  'qa-testing.html',
  'frontend-dev.html',
  'index.html'
];

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) { console.log(`NOT FOUND: ${file}`); continue; }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the entire checkbox-group and reg-fee-box block
  // from `<div class="form-group checkbox-group"` up to `</div>` before the submit button
  const regex = /<div class="form-group checkbox-group"[\s\S]*?<div class="reg-fee-box"[\s\S]*?<\/div>\s*(?=<button type="submit")/g;

  const newBlock = `<div class="form-group checkbox-group" style="margin-top: 1rem;">
                            <label class="checkbox-label" for="terms" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                I agree to the terms and conditions *
                                <span onclick="toggleRegFee(this)" title="View registration fee details" style="cursor:pointer; color:#bb734b; font-size:0.85rem; margin-left:6px; display:inline-flex; align-items:center; transition:transform 0.3s ease; user-select:none;">&#9660;</span>
                            </label>
                        </div>
                        <div class="reg-fee-box" style="background: rgba(187, 115, 75, 0.08); border: 1px solid rgba(187, 115, 75, 0.35); border-radius: 8px; padding: 0.75rem 1rem; margin-top: 0.75rem; display: none; flex-direction: column; gap: 0.6rem;">
                            <div style="display: flex; align-items: center; gap: 0.6rem;">
                                <i class="fas fa-info-circle" style="color: #bb734b; font-size: 1rem; flex-shrink: 0;"></i>
                                <span style="font-size: 0.82rem; color: rgba(255,255,255,0.75); line-height: 1.4;">
                                    <strong style="color: #bb734b;">Registration Fee: &#8377;1500</strong> &nbsp;|&nbsp;
                                    <em style="color: rgba(255,255,255,0.55);">This fee is non-refundable incase of any circumstances.</em>
                                </span>
                            </div>
                            <ul style="font-size: 0.82rem; color: rgba(255,255,255,0.75); line-height: 1.6; margin-left: 2rem; margin-top: 0.2rem; padding-left: 0; margin-bottom: 0;">
                                <li style="list-style-type: disc;">Resume (Xerox)</li>
                                <li style="list-style-type: disc;">Aadhaar Card (Xerox)</li>
                                <li style="list-style-type: disc;">Last Academic Result (Xerox)</li>
                            </ul>
                        </div>
                        `;

  if (regex.test(content)) {
      content = content.replace(regex, newBlock);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${file}`);
  } else {
      console.log(`Could not match regex in: ${file}`);
  }
}
console.log('Done!');
