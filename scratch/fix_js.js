const fs = require('fs');
const glob = fs.readdirSync('.', {recursive: true}).filter(f => (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) && !f.includes('node_modules') && !f.includes('scratch'));

let count = 0;
for(const file of glob) {
    let c = fs.readFileSync(file, 'utf-8');
    c = c.replace(/o/g, 'o');
    c = c.replace(/-/g, 'O');
    c = c.replace(/Y/g, 'Y');
    c = c.replace(/Ǭ/g, 'ü');
    
    // Un-do my ArOGe mistake if it happened
    c = c.replace(/ArOGe/g, 'Ar-Ge');
    
    fs.writeFileSync(file, c, 'utf-8');
    count++;
}
console.log('Fixed encoding in ' + count + ' files');
