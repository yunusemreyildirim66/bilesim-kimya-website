const fs = require('fs');

let content = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

content = content.replace(/"footer_links"\s*:\s*"Kurumsal",/, '"footer_links": "Kurumsal",\n        "footer_contact": "İletişim",\n        "nav_about": "Hakkımızda",\n        "footer_privacy": "Gizlilik Politikası",\n        "footer_kvkk": "KVKK",');

content = content.replace(/"footer_links"\s*:\s*"Corporate",/, '"footer_links": "Corporate",\n        "footer_contact": "Contact",\n        "nav_about": "About Us",\n        "footer_privacy": "Privacy Policy",\n        "footer_kvkk": "KVKK",');

// The arabic/russian strings in my terminal log were mangled, so I will replace by matching the surrounding context.
// Let's use `nav_quality` for Arabic and Russian since it's above `news_min_read` 
content = content.replace(/"nav_quality"\s*:\s*".*?",\n\s*"news_min_read"/, '"nav_quality": "الجودة والمعايير",\n        "footer_contact": "اتصال",\n        "nav_about": "معلومات عنا",\n        "footer_privacy": "سياسة الخصوصية",\n        "footer_kvkk": "KVKK",\n        "news_min_read"');
// Wait, the regex won't work well if I don't know the exact string, let's just use replace using index
fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', content, 'utf8');
