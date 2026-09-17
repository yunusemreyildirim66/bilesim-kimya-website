const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/index.html', 'utf8');

html = html.replace('<h4 class="section-eyebrow animate-up">MEDYA MERKEZİ</h4>', '<h4 class="section-eyebrow animate-up" data-i18n="news_eyebrow">MEDYA MERKEZİ</h4>');
html = html.replace('<h4 class="section-eyebrow animate-up">KENDİ MARKALARIMIZ</h4>', '<h4 class="section-eyebrow animate-up" data-i18n="brands_eyebrow">KENDİ MARKALARIMIZ</h4>');
html = html.replace('<h2 class="section-title animate-up" style="color: var(--color-brand-blue-dark);">Markalarımız</h2>', '<h2 class="section-title animate-up" style="color: var(--color-brand-blue-dark);" data-i18n="brands_title">Markalarımız</h2>');

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/index.html', html, 'utf8');

// 2. Update i18n.js
let i18n = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

const trInsert = `"news_eyebrow": "MEDYA MERKEZİ",
        "brands_eyebrow": "KENDİ MARKALARIMIZ",
        "brands_title": "Markalarımız",\n        `;
const enInsert = `"news_eyebrow": "MEDIA CENTER",
        "brands_eyebrow": "OUR OWN BRANDS",
        "brands_title": "Our Brands",\n        `;
const arInsert = `"news_eyebrow": "مركز الإعلام",
        "brands_eyebrow": "علاماتنا التجارية الخاصة",
        "brands_title": "علاماتنا التجارية",\n        `;
const ruInsert = `"news_eyebrow": "МЕДИА-ЦЕНТР",
        "brands_eyebrow": "НАШИ СОБСТВЕННЫЕ БРЕНДЫ",
        "brands_title": "Наши бренды",\n        `;

i18n = i18n.replace(/"news_title": "Gelişmeler ve Haberler",/g, trInsert + '"news_title": "Gelişmeler ve Haberler",');
i18n = i18n.replace(/"news_title": "Developments & News",/g, enInsert + '"news_title": "Developments & News",');
i18n = i18n.replace(/"news_title": "التطورات والأخبار",/g, arInsert + '"news_title": "التطورات والأخبار",');
i18n = i18n.replace(/"news_title": "События и новости",/g, ruInsert + '"news_title": "События и новости",');

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', i18n, 'utf8');

console.log('Homepage section headers translations applied.');
