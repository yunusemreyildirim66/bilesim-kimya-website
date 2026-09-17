const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if translations.js is already there
    if (!content.includes('js/translations.js')) {
        content = content.replace('<script defer src="js/i18n.js"></script>', '<script defer src="js/translations.js"></script>\n    <script defer src="js/i18n.js"></script>');
        
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Injected translations.js into ${file}`);
    }
}
