const fs = require('fs');

let html = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haberler.html', 'utf8');

const mainStart = html.indexOf('<main class="news-page-main">');
const mainEnd = html.indexOf('</main>') + 7;

if (mainStart !== -1 && mainEnd !== -1) {
    const newMain = `<main class="news-page-main">
        <div class="container">
            <h1 class="page-title text-center mb-5" data-i18n="nav_news">Haberler</h1>
            <div class="news-grid" id="newsGrid">
                <!-- Haberler JS tarafından dinamik yüklenecek -->
            </div>
        </div>
    </main>`;
    
    html = html.substring(0, mainStart) + newMain + html.substring(mainEnd);
    
    // Add news-data script
    if (!html.includes('news-data.js')) {
        html = html.replace('<script defer src="js/main.js"></script>', '<script defer src="js/news-data.js"></script>\n    <script defer src="js/main.js"></script>');
    }
    
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haberler.html', html, 'utf8');
    console.log('haberler.html successfully updated to use dynamic grid.');
} else {
    console.log('Could not find <main> in haberler.html');
}
