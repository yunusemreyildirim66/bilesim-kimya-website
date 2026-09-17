const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/index.html', 'utf8');

indexHtml = indexHtml.replace('<span class="fn-cat">Fuar & Etkinlik</span>', '<span class="fn-cat" data-i18n="news_cat_1">Fuar & Etkinlik</span>');
indexHtml = indexHtml.replace('<h3>Uluslararası Private Label Zirvesi\'nde Yeni İş Birlikleri</h3>', '<h3 data-i18n="news_t1">Uluslararası Private Label Zirvesi\'nde Yeni İş Birlikleri</h3>');
indexHtml = indexHtml.replace('<p>Global perakendecilerle yapılan görüşmelerde yeni fason üretim anlaşmaları imzalandı.</p>', '<p data-i18n="news_d1">Global perakendecilerle yapılan görüşmelerde yeni fason üretim anlaşmaları imzalandı.</p>');
indexHtml = indexHtml.replace(/<span class="fn-read-more">Devamını Oku <i class="ph ph-arrow-right"><\/i><\/span>/g, '<span class="fn-read-more" data-i18n="news_btn">Devamını Oku <i class="ph ph-arrow-right"></i></span>');

indexHtml = indexHtml.replace('<span class="fn-cat">Üretim & Yatırım</span>', '<span class="fn-cat" data-i18n="news_cat_2">Üretim & Yatırım</span>');
indexHtml = indexHtml.replace('<h3>Yıllık 120.000 Ton Kapasiteye Ulaşan Tesis Modernizasyonu</h3>', '<h3 data-i18n="news_t2">Yıllık 120.000 Ton Kapasiteye Ulaşan Tesis Modernizasyonu</h3>');
indexHtml = indexHtml.replace('<p>Yeni nesil dolum hatlarımızla üretim hızımızı ve kapasitemizi rekor seviyeye taşıdık.</p>', '<p data-i18n="news_d2">Yeni nesil dolum hatlarımızla üretim hızımızı ve kapasitemizi rekor seviyeye taşıdık.</p>');

indexHtml = indexHtml.replace('<span class="fn-cat">İnovasyon & Ürün</span>', '<span class="fn-cat" data-i18n="news_cat_3">İnovasyon & Ürün</span>');
indexHtml = indexHtml.replace('<h3>Vione ve Biotol Markalarımızda Eko-Dostu Ambalaj Dönemi</h3>', '<h3 data-i18n="news_t3">Vione ve Biotol Markalarımızda Eko-Dostu Ambalaj Dönemi</h3>');
indexHtml = indexHtml.replace('<p>%100 geri dönüştürülebilir ambalajlara geçiş sürecimizi hızlandırdık.</p>', '<p data-i18n="news_d3">%100 geri dönüştürülebilir ambalajlara geçiş sürecimizi hızlandırdık.</p>');

indexHtml = indexHtml.replace('<span class="fn-cat">Kurumsal</span>', '<span class="fn-cat" data-i18n="news_cat_4">Kurumsal</span>');
indexHtml = indexHtml.replace('<h3>Bileşim Kimya 20. Yılını Gururla Kutluyor</h3>', '<h3 data-i18n="news_t4">Bileşim Kimya 20. Yılını Gururla Kutluyor</h3>');
indexHtml = indexHtml.replace('<p>Sektördeki 20 yıllık deneyimimizi çalışanlarımız ve iş ortaklarımızla kutladık.</p>', '<p data-i18n="news_d4">Sektördeki 20 yıllık deneyimimizi çalışanlarımız ve iş ortaklarımızla kutladık.</p>');

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/index.html', indexHtml, 'utf8');

// 2. Update i18n.js
let i18nJs = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

const trReplace = '"news_d3": "%100 geri dönüştürülebilir ambalajlara geçiş sürecimizi hızlandırdık.",\n        "news_cat_4": "Kurumsal",\n        "news_t4": "Bileşim Kimya 20. Yılını Gururla Kutluyor",\n        "news_d4": "Sektördeki 20 yıllık deneyimimizi çalışanlarımız ve iş ortaklarımızla kutladık.",';
const enReplace = '"news_d3": "We have accelerated our transition process to 100% recyclable packaging.",\n        "news_cat_4": "Corporate",\n        "news_t4": "Bileşim Kimya Proudly Celebrates Its 20th Anniversary",\n        "news_d4": "We celebrated our 20 years of experience in the sector with our employees and business partners.",';
const arReplace = '"news_d3": "لقد قمنا بتسريع عملية الانتقال إلى التغليف القابل لإعادة التدوير بنسبة 100٪.",\n        "news_cat_4": "مؤسسي",\n        "news_t4": "شركة بيليشيم كيميا تحتفل بفخر بالذكرى العشرين لتأسيسها",\n        "news_d4": "احتفلنا بخبرتنا التي تمتد إلى 20 عامًا في هذا القطاع مع موظفينا وشركائنا في العمل.",';
const ruReplace = '"news_d3": "Мы ускорили процесс перехода на 100% перерабатываемую упаковку.",\n        "news_cat_4": "Корпоративный",\n        "news_t4": "Bileşim Kimya с гордостью отмечает свое 20-летие",\n        "news_d4": "Мы отпраздновали наш 20-летний опыт работы в секторе с нашими сотрудниками и деловыми партнерами.",';

i18nJs = i18nJs.replace(/"news_d3": "%100 geri dönüştürülebilir ambalajlara geçiş sürecimizi hızlandırdık.",/g, trReplace);
i18nJs = i18nJs.replace(/"news_d3": "We have accelerated our transition process to 100% recyclable packaging.",/g, enReplace);
i18nJs = i18nJs.replace(/"news_d3": "لقد قمنا بتسريع عملية الانتقال إلى التغليف القابل لإعادة التدوير بنسبة 100٪.",/g, arReplace);
i18nJs = i18nJs.replace(/"news_d3": "Мы ускорили процесс перехода на 100% перерабатываемую упаковку.",/g, ruReplace);

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', i18nJs, 'utf8');

console.log('index.html and i18n.js updated successfully.');
