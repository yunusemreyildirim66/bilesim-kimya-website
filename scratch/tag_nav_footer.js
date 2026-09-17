const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const replacements = [
    // Navbar replacements
    ['>Kurumsal</a>', ' data-i18n="nav.corporate">Kurumsal</a>'],
    ['>Üretim</a>', ' data-i18n="nav.production">Üretim</a>'],
    ['>Markalar</a>', ' data-i18n="nav.brands">Markalar</a>'],
    ['>Çözümler</a>', ' data-i18n="nav.solutions">Çözümler</a>'],
    ['>Ar-Ge</a>', ' data-i18n="nav.rd">Ar-Ge</a>'],
    ['>Kalite & Standartlar</a>', ' data-i18n="nav.quality">Kalite & Standartlar</a>'],
    ['>Haberler</a>', ' data-i18n="nav.news">Haberler</a>'],
    ['>B2B Teklif Al</a>', ' data-i18n="nav.get_quote">B2B Teklif Al</a>'],
    
    // Footer replacements
    ['>Hakkımızda</a>', ' data-i18n="footer.about_us">Hakkımızda</a>'],
    ['>Kalite Belgeleri</a>', ' data-i18n="footer.quality_certs">Kalite Belgeleri</a>'],
    ['>Haritalar\'da aç ', ' data-i18n="footer.address_open">Haritalar\'da aç '],
    ['Türkiye\'nin öncü kimya ve kozmetik üretim', '<span data-i18n="footer.desc">Türkiye\'nin öncü kimya ve kozmetik üretim tesislerinden biri olarak, 70\'ten fazla ülkeye güven ve kalite ihraç ediyoruz.</span>'],
    ['tesislerinden biri olarak, 70\'ten fazla ülkeye güven ve', ''],
    ['kalite ihraç ediyoruz.', ''],
];

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            // Careful replacement, only first occurrence for some, global for others
            // Navbar is usually one block, Footer is another block.
            content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Tagged nav/footer in ${file}`);
    }
}
