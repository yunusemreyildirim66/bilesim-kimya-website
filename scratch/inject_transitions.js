const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

const scriptTag = '    <!-- Page Transitions -->\n    <script src="js/page-transition.js"></script>\n</body>';

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        
        if(!content.includes('page-transition.js')) {
            content = content.replace('</body>', scriptTag);
            fs.writeFileSync(p, content, 'utf8');
            console.log('Injected into ' + file);
        }
    }
});
