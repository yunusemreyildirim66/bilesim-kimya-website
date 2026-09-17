const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    // Remove it if it's already there to avoid duplicates
    content = content.replace(/<script src="js\/translations\.js"><\/script>\n?/g, '');
    content = content.replace(/<script defer src="js\/translations\.js"><\/script>\n?/g, '');
    
    // Inject it right before </body>
    content = content.replace('</body>', '<script defer src="js/translations.js"></script>\n</body>');
    
    // Also let's fix the broken i18n script tag if it exists!
    content = content.replace('<script src=" js/i18n.js></script>', '<script defer src="js/i18n.js"></script>');
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Injected translations.js into ${file}`);
}
