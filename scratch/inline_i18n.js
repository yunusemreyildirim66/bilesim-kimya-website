const fs = require('fs');
const path = require('path');
const base = require('./base_translations.json');

const translations = {
  tr: { ...base },
  en: { ...base },
  ar: { ...base },
  ru: { ...base }
};

translations.en['home_1'] = 'Bilesim Kimya | International Production Power';
translations.en['home_12'] = 'Featured News';
translations.en['home_13'] = 'See All News';
translations.en['home_21'] = 'Bilesim Kimya website uses cookies to improve user experience.';
translations.en['prod_9'] = 'OUR PRODUCTION POWER';
translations.en['prod_10'] = 'Integrated Production at International Standards';
translations.en['prod_11'] = 'With over 20 years of experience and high-tech fully automated production lines, we produce at world standards in cleaning chemicals and personal care products.';
translations.en['prod_12'] = 'OUR PRODUCTION INFRASTRUCTURE';
translations.en['prod_13'] = 'Our Competencies and Infrastructure';
translations.en['prod_22'] = '120K+';
translations.en['prod_23'] = 'Tons Annual Capacity';
translations.en['prod_28'] = 'QUALITY & TECHNOLOGY';

translations.ar['home_1'] = 'بليشيم كيميا | قوة الإنتاج الدولي';
translations.ar['home_12'] = 'أخبار مميزة';
translations.ar['home_13'] = 'عرض كل الأخبار';
translations.ar['prod_9'] = 'قوة الإنتاج لدينا';
translations.ar['prod_10'] = 'إنتاج متكامل بمعايير دولية';

translations.ru['home_1'] = 'Bilesim Kimya | Международная производственная мощность';
translations.ru['home_12'] = 'Рекомендуемые новости';
translations.ru['home_13'] = 'Посмотреть все новости';
translations.ru['prod_9'] = 'НАША ПРОИЗВОДСТВЕННАЯ МОЩНОСТЬ';
translations.ru['prod_10'] = 'Интегрированное производство по международным стандартам';

for (const key in base) {
    if (translations.en[key] === base[key]) translations.en[key] = '[EN] ' + base[key];
    if (translations.ar[key] === base[key]) translations.ar[key] = '[AR] ' + base[key];
    if (translations.ru[key] === base[key]) translations.ru[key] = '[RU] ' + base[key];
}

const jsContent = `const translations = ${JSON.stringify(translations, null, 2)};

function changeLanguage(lang) {
    if (!translations[lang]) return;

    localStorage.setItem('selected_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl-mode');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check local storage or default to tr
    const savedLang = localStorage.getItem('selected_lang') || 'tr';
    changeLanguage(savedLang);

    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.getElementById('langBtn');
    
    if (langBtn && langSwitcher) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langSwitcher.classList.toggle('active');
        });
    }

    // Click outside closes dropdown
    document.addEventListener('click', () => {
        if (langSwitcher) langSwitcher.classList.remove('active');
    });

    document.querySelectorAll('.lang-dropdown li[data-lang]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = item.getAttribute('data-lang');
            if (lang) {
                changeLanguage(lang);
            }
            if (langSwitcher) langSwitcher.classList.remove('active');
            
            // Update langBtn text to reflect current selection
            if (langBtn) {
               langBtn.innerHTML = lang.toUpperCase() + ' <i class="ph ph-caret-down"></i>';
            }
        });
    });
});
`;

fs.writeFileSync('../js/i18n.js', jsContent);
console.log('Done!');
