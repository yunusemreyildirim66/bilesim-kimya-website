const fs = require('fs');

let content = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

content = content.replace(/"footer_cert_title": "Sertifikalar",/, '"footer_cert_title": "Sertifikalar",\n        "nav_about": "Hakkımızda",\n        "footer_contact": "İletişim",');

content = content.replace(/"footer_cert_title": "Certificates",/, '"footer_cert_title": "Certificates",\n        "nav_about": "About Us",\n        "footer_contact": "Contact",');

content = content.replace(/"footer_cert_title": "الشهادات",/, '"footer_cert_title": "الشهادات",\n        "nav_about": "معلومات عنا",\n        "footer_contact": "اتصال",');

content = content.replace(/"footer_cert_title": "Сертификаты",/, '"footer_cert_title": "Сертификаты",\n        "nav_about": "О нас",\n        "footer_contact": "Контакт",');

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', content, 'utf8');
console.log('Done!');
