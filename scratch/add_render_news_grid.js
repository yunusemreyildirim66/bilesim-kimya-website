const fs = require('fs');

let mainJs = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', 'utf8');

if (!mainJs.includes('renderNewsGrid')) {
    mainJs += `

// --- Haberler Page Dynamic Rendering ---
function renderNewsGrid(lang) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    if (typeof newsData === 'undefined') return;
    
    let html = '';
    
    newsData.forEach(news => {
        const data = news[lang] || news['tr'];
        const btnText = (translations[lang] && translations[lang]['news_btn']) ? translations[lang]['news_btn'] : translations['tr']['news_btn'];
        
        // Use RTL arrow if language is Arabic
        const arrowClass = (lang === 'ar') ? 'ph-arrow-left' : 'ph-arrow-right';
        
        html += \`
        <div class="news-card">
            <div class="news-img" style="background-image: url('\${news.image}');"></div>
            <div class="news-content">
                <span class="news-cat">\${data.category}</span>
                <h3>\${data.title}</h3>
                <p>\${data.desc}</p>
                <a href="haber-detay.html#id=\${news.id}" class="news-link">\${btnText} <i class="ph \${arrowClass}"></i></a>
            </div>
        </div>
        \`;
    });
    
    grid.innerHTML = html;
}

window.addEventListener('languageChanged', (e) => {
    renderNewsGrid(e.detail.lang);
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof currentLanguage !== 'undefined') {
        renderNewsGrid(currentLanguage);
    } else {
        const savedLang = localStorage.getItem('bilesim_lang') || 'tr';
        renderNewsGrid(savedLang);
    }
});
`;
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', mainJs, 'utf8');
    console.log('Added renderNewsGrid to main.js');
}
