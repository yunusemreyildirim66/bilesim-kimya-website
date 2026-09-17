const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'admin.html');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (content.includes('style="color: #')) {
        content = content.replace(/style="color: #[A-F0-9]{6};"/gi, '');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Cleaned ' + file);
    }
}
