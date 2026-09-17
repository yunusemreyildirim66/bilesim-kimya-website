const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

const linkTag = '    <!-- Flag Icons -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"/>\n</head>';

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        
        if(!content.includes('flag-icons.min.css')) {
            content = content.replace('</head>', linkTag);
        }
        
        content = content.replace(/🇹🇷/g, '<span class="fi fi-tr"></span>');
        content = content.replace(/🇬🇧/g, '<span class="fi fi-gb"></span>');
        content = content.replace(/🇸🇦/g, '<span class="fi fi-sa"></span>');
        content = content.replace(/🇷🇺/g, '<span class="fi fi-ru"></span>');
        
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated ' + file);
    }
});
