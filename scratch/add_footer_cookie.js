const fs = require('fs');

let content = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

// TR
content = content.replace(/"footer_privacy": "Gizlilik Politikası",/, '"footer_privacy": "Gizlilik Politikası",\n        "footer_cookie": "Çerez Politikası",');

// EN
content = content.replace(/"footer_privacy": "Privacy Policy",/, '"footer_privacy": "Privacy Policy",\n        "footer_cookie": "Cookie Policy",');

// AR
content = content.replace(/"footer_privacy": "سياسة الخصوصية",/, '"footer_privacy": "سياسة الخصوصية",\n        "footer_cookie": "سياسة ملفات تعريف الارتباط",');

// RU
content = content.replace(/"footer_privacy": "Политика конфиденциальности",/, '"footer_privacy": "Политика конфиденциальности",\n        "footer_cookie": "Политика использования файлов cookie",');

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', content, 'utf8');
console.log('Added footer_cookie to i18n.js');
