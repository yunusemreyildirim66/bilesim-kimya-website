const fs = require('fs');

// 1. Update i18n.js
let i18nContent = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', 'utf8');

// Insert TR
i18nContent = i18nContent.replace('"footer_kvkk": "KVKK"', '"footer_kvkk": "KVKK",\n        "news_similar": "Benzer Haberler",\n        "news_min_read": "Dk Okuma"');

// Insert EN
i18nContent = i18nContent.replace('"footer_kvkk": "KVKK (Personal Data Protection)"', '"footer_kvkk": "KVKK (Personal Data Protection)",\n        "news_similar": "Similar News",\n        "news_min_read": "Min Read"');

// Insert AR (using regex to find the last key before closing brace)
i18nContent = i18nContent.replace(/("footer_kvkk": "[^"]+")(\s*)\}/g, '$1,\n        "news_similar": "أخبار مماثلة",\n        "news_min_read": "دقيقة قراءة"$2}');

// Insert RU
i18nContent = i18nContent.replace(/("footer_kvkk": "[^"]+")(\s*)\}/g, '$1,\n        "news_similar": "Похожие новости",\n        "news_min_read": "Мин чтения"$2}');

// Dispatch event in translatePage
if (!i18nContent.includes('languageChanged')) {
    i18nContent = i18nContent.replace(
        "const btn = document.getElementById('langBtn');",
        "window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));\n\n    const btn = document.getElementById('langBtn');"
    );
}

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/i18n.js', i18nContent);
console.log('Updated js/i18n.js');

// 2. Update haber-detay.html
let htmlContent = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haber-detay.html', 'utf8');

// Add news-data script tag
if (!htmlContent.includes('news-data.js')) {
    htmlContent = htmlContent.replace('<script defer src="js/i18n.js"></script>', '<script src="js/news-data.js"></script>\n    <script defer src="js/i18n.js"></script>');
}

// Add data-i18n attributes
htmlContent = htmlContent.replace('Dk Okuma 3', '<span data-i18n="news_min_read">Dk Okuma</span> 3');
htmlContent = htmlContent.replace('Benzer Haberler</h4>', 'Benzer Haberler</h4>'.replace('Benzer Haberler', '<span data-i18n="news_similar">Benzer Haberler</span>'));

// Replace the inline script
const scriptRegex = /<script>\s*document\.addEventListener\("DOMContentLoaded", function\(\) \{\s*const newsData = \{[\s\S]*?\}\s*\);\s*<\/script>/m;

const newScript = `<script>
        function renderNews(lang) {
            let id = "1";
            if (window.location.hash && window.location.hash.includes('id=')) {
                id = window.location.hash.split('id=')[1].split('&')[0];
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('id')) id = urlParams.get('id');
            }
            const data = newsData[id];
        
            if(data) {
                const localized = data[lang] || data['tr'];
                document.getElementById("detail-cat").textContent = localized.category;
                document.getElementById("detail-title").textContent = localized.title;
                document.getElementById("detail-date").innerHTML = '<i class="ph ph-calendar-blank" style="font-size: 1.2rem; color: var(--color-brand-red);"></i> ' + localized.date;
                document.getElementById("detail-img").src = data.image;
                document.getElementById("detail-content").innerHTML = localized.content;
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            const currentLang = localStorage.getItem('bilesim_lang') || 'tr';
            renderNews(currentLang);
        });

        window.addEventListener('languageChanged', function(e) {
            renderNews(e.detail.lang);
        });
    </script>`;

if (scriptRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(scriptRegex, newScript);
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haber-detay.html', htmlContent);
    console.log('Updated haber-detay.html');
} else {
    console.log('Could not find the inline script to replace in haber-detay.html');
}
