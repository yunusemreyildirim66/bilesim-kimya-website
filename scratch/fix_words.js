const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const fixes = {
    'oretim': 'Üretim',
    'oRETİM': 'ÜRETİM',
    'zǬmler': 'Çözümler',
    'Ǭretim': 'üretim',
    'Ǭlkeye': 'ülkeye',
    'gǬven': 'güven',
    'ncǬ': 'öncü',
    'ǬzǬm': 'çözüm',
    'ihra': 'ihraç',
    'alYanlar': 'çalışanlar',
    'iY ': 'iş ',
    'TǬrkiye': 'Türkiye',
    'GǬcǬ': 'Gücü',
    '': 'ı' // Replace remaining replacement characters with 'ı' where it makes sense? No, too risky.
};

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;
    
    for (const [bad, good] of Object.entries(fixes)) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Fixed specific corrupted words in ${file}`);
    }
}
