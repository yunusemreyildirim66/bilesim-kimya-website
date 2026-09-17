const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

const searchStr = '<div style="border-radius: 12px; overflow: hidden; height: 130px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">';
const replacement = '<div class="footer-map-wrapper">';

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        
        if (content.includes(searchStr)) {
            let newContent = content.split(searchStr).join(replacement);
            fs.writeFileSync(p, newContent, 'utf8');
            console.log('Updated ' + file);
        } else {
            // Try with regex ignoring exact spacing
            let regex = /<div\s+style="border-radius:\s*12px;\s*overflow:\s*hidden;\s*height:\s*130px;\s*box-shadow:\s*0\s+4px\s+15px\s+rgba\(0,0,0,0\.4\);">/g;
            if (regex.test(content)) {
                let newContent = content.replace(regex, replacement);
                fs.writeFileSync(p, newContent, 'utf8');
                console.log('Updated ' + file + ' (regex)');
            } else {
                console.log('No match found in ' + file);
            }
        }
    }
});
