const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const fixes = {
    'DOCTşPE': 'DOCTYPE',
    'şouTube': 'YouTube',
    'şetkinliklerini': 'Yetkinliklerini',
    'şıl': 'Yıl',
    'Şıl': 'Yıl',
    'şılını': 'Yılını',
    'şönetim': 'Yönetim',
    'MEDşA': 'MEDYA',
    'şalnızca': 'Yalnızca',
    'Ozelleştir': 'Özelleştir',
    'ozelleştir': 'Özelleştir'
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
        console.log(`Fixed corrupted Y/ş words in ${file}`);
    }
}
