const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/yunus/Desktop/Bileşim Kimya';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(filename => {
    const file = path.join(dir, filename);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Hakkımızda, Üretim, vs inside footer-links
    content = content.replace(/<li><a href="kurumsal\.html">.*?<\/a><\/li>/g, '<li><a href="kurumsal.html" data-i18n="nav_about">Hakkımızda</a></li>');
    content = content.replace(/<li><a href="uretim\.html">.*?<\/a><\/li>/g, '<li><a href="uretim.html" data-i18n="nav_production">Üretim</a></li>');
    content = content.replace(/<li><a href="arge\.html">.*?<\/a><\/li>/g, '<li><a href="arge.html" data-i18n="nav_rnd">Ar-Ge</a></li>');
    content = content.replace(/<li><a href="kalite\.html">.*?<\/a><\/li>/g, '<li><a href="kalite.html" data-i18n="nav_quality">Kalite Belgeleri</a></li>');
    
    // Add data-i18n to Contact header
    content = content.replace(/<h4 style="margin-bottom: 1\.5rem; color: #ffffff; font-family: var\(--font-primary\); font-size: 1\.25rem; font-weight: 700;">.*?<\/h4>/g, '<h4 style="margin-bottom: 1.5rem; color: #ffffff; font-family: var(--font-primary); font-size: 1.25rem; font-weight: 700;" data-i18n="footer_contact">İletişim</h4>');
    
    // Add data-i18n to Privacy Policy and KVKK
    content = content.replace(/<a href="#">Gizlilik Politikası<\/a>/g, '<a href="#" data-i18n="footer_privacy">Gizlilik Politikası</a>');
    content = content.replace(/<a href="#">KVKK<\/a>/g, '<a href="#" data-i18n="footer_kvkk">KVKK</a>');
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('HTML files updated with i18n attributes in footer.');
