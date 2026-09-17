const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        
        // Let's build a flexible regex to match the exact block
        let regex = /<div class="footer-links">\s*<h4 data-i18n="footer_solutions">[^<]*<\/h4>\s*<ul>\s*<li><a href="markalar\.html">Sio<\/a><\/li>\s*<li><a href="markalar\.html">Biotol<\/a><\/li>\s*<li><a href="markalar\.html">Vione<\/a><\/li>\s*<li><a href="markalar\.html">V-One<\/a><\/li>\s*<\/ul>\s*<\/div>/g;
        
        const replacement = `<div class="footer-links">
                    <h4 data-i18n="nav_brands">Markalar</h4>
                    <ul>
                        <li><a href="http://sio.web.tr" target="_blank">Sio</a></li>
                        <li><a href="http://biotol.com.tr" target="_blank">Biotol</a></li>
                        <li><a href="http://vione.com.tr" target="_blank">Vione</a></li>
                        <li><a href="http://v1.com.tr" target="_blank">V-One</a></li>
                    </ul>
                </div>`;
                
        let newContent = content.replace(regex, replacement);
        
        if(content !== newContent) {
            fs.writeFileSync(p, newContent, 'utf8');
            console.log('Updated ' + file);
        } else {
            console.log('No match found in ' + file);
        }
    }
});
