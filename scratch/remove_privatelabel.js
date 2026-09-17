const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        let newContent = content.replace(/[ \t]*<li><a href="privatelabel\.html"[^>]*>Private Label<\/a><\/li>\r?\n?/g, '');
        if(content !== newContent) {
            fs.writeFileSync(p, newContent, 'utf8');
            console.log('Updated ' + file);
        }
    }
});
