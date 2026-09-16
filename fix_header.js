const fs = require('fs');

// 1. Update HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if not already wrapped
    if (!content.includes('<div class="header-left">')) {
        // We need to wrap logo-link and desktop-nav in header-left
        // The structure is:
        //             <!-- Logo -->
        //             <a href="index.html" class="logo-link">...</a>
        //
        //             <!-- Navigation -->
        //             <nav class="desktop-nav">...</nav>
        
        const logoRegex = /<!-- Logo -->\s*<a href="index\.html" class="logo-link">[\s\S]*?<\/a>/;
        const navRegex = /<!-- Navigation -->\s*<nav class="desktop-nav">[\s\S]*?<\/nav>/;
        
        const logoMatch = content.match(logoRegex);
        const navMatch = content.match(navRegex);
        
        if (logoMatch && navMatch) {
            const combined = `<!-- Left: Logo & Nav -->\n            <div class="header-left">\n                ${logoMatch[0]}\n\n                ${navMatch[0]}\n            </div>`;
            
            // Remove old nav
            content = content.replace(navMatch[0], '');
            // Replace old logo with combined
            content = content.replace(logoMatch[0], combined);
            
            fs.writeFileSync(file, content);
        }
    }
});

console.log('HTML headers updated.');
