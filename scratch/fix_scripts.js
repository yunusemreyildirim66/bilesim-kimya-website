const fs = require('fs');
const glob = fs.readdirSync('.', {recursive: true}).filter(f => f.endsWith('.html') && !f.includes('node_modules') && !f.includes('scratch'));

let count = 0;
for(const file of glob) {
    let c = fs.readFileSync(file, 'utf-8');
    
    // Remove the broken script tags and any previous proper tags
    c = c.replace(/<script src=" js\/i18n.js><\/script>/g, '');
    c = c.replace(/<script src="js\/translations.js"><\/script>\s*/g, '');
    c = c.replace(/<script src="js\/i18n.js"><\/script>\s*/g, '');
    
    // Re-add them just before </body>
    c = c.replace(/<\/body>/g, '<script src="js/translations.js"></script>\n<script src="js/i18n.js"></script>\n</body>');
    
    fs.writeFileSync(file, c, 'utf-8');
    count++;
}
console.log('Updated scripts in ' + count + ' files.');
