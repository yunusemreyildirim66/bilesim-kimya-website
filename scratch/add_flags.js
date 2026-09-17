const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\yunus\\Desktop\\Bileşim Kimya';

const searchRegex = /<ul class="lang-dropdown" id="langDropdown">\s*<li data-lang="tr">Türkçe \(TR\)<\/li>\s*<li data-lang="en">English \(EN\)<\/li>\s*<li data-lang="ar">العربية \(AR\)<\/li>\s*<li data-lang="ru">Русский \(RU\)<\/li>\s*<\/ul>/g;

const replacement = `<ul class="lang-dropdown" id="langDropdown">
                        <li data-lang="tr">🇹🇷 Türkçe (TR)</li>
                        <li data-lang="en">🇬🇧 English (EN)</li>
                        <li data-lang="ar">🇸🇦 العربية (AR)</li>
                        <li data-lang="ru">🇷🇺 Русский (RU)</li>
                    </ul>`;

fs.readdirSync(dir).forEach(file => {
    if(file.endsWith('.html')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        let newContent = content.replace(searchRegex, replacement);
        
        if(content !== newContent) {
            fs.writeFileSync(p, newContent, 'utf8');
            console.log('Updated ' + file);
        } else {
            console.log('No match found in ' + file);
        }
    }
});
