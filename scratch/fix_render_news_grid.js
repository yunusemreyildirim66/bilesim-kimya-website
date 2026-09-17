const fs = require('fs');

let mainJs = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', 'utf8');

// The original buggy block:
// newsData.forEach(news => {
//     const data = news[lang] || news['tr'];
//     const btnText = ...
//     
//     const arrowClass = ...
//     
//     html += `
//     <div class="news-card">
//         <div class="news-img" style="background-image: url('${news.image}');"></div>
//         <div class="news-content">
//             <span class="news-cat">${data.category}</span>
//             <h3>${data.title}</h3>
//             <p>${data.desc}</p>
//             <a href="haber-detay.html#id=${news.id}" class="news-link">${btnText} <i class="ph ${arrowClass}"></i></a>
//         </div>
//     </div>
//     `;
// });

// Fix it:
mainJs = mainJs.replace(/newsData\.forEach\(news => \{([\s\S]*?)<\/\div>\n        `;\n    \}\);/, `Object.entries(newsData).forEach(([id, news]) => {
        const data = news[lang] || news['tr'];
        const btnText = (translations[lang] && translations[lang]['news_btn']) ? translations[lang]['news_btn'] : translations['tr']['news_btn'];
        
        // Use RTL arrow if language is Arabic
        const arrowClass = (lang === 'ar') ? 'ph-arrow-left' : 'ph-arrow-right';
        
        // Extract a clean description from content if desc is undefined
        let description = data.desc;
        if (!description && data.content) {
            description = data.content.replace(/<[^>]*>?/gm, ''); // strip HTML
            if (description.length > 95) {
                description = description.substring(0, 95) + '...';
            }
        }
        
        html += \`
        <div class="news-card">
            <div class="news-img" style="background-image: url('\${news.image}');"></div>
            <div class="news-content">
                <span class="news-cat">\${data.category}</span>
                <h3>\${data.title}</h3>
                <p>\${description}</p>
                <a href="haber-detay.html#id=\${id}" class="news-link">\${btnText} <i class="ph \${arrowClass}"></i></a>
            </div>
        </div>
        \`;
    });`);

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', mainJs, 'utf8');
console.log('Fixed renderNewsGrid in main.js');
