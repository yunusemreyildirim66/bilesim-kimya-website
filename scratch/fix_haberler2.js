const fs = require('fs');

let html = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haberler.html', 'utf8');

const gridStartStr = '<div class="news-grid animate-up">';
const gridStart = html.indexOf(gridStartStr);

const gridEndStr = '            </div>\n        </div>\n    </section>';
const gridEnd = html.indexOf(gridEndStr, gridStart);

if (gridStart !== -1 && gridEnd !== -1) {
    const newGrid = `<div class="news-grid animate-up" id="newsGrid">
                <!-- Haberler JS tarafından dinamik yüklenecek -->
`;
    
    html = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);
    
    // Add news-data.js script before main.js
    if (!html.includes('news-data.js')) {
        html = html.replace('<script defer src="js/main.js"></script>', '<script defer src="js/news-data.js"></script>\n    <script defer src="js/main.js"></script>');
    }
    
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haberler.html', html, 'utf8');
    console.log('haberler.html successfully updated to use dynamic grid.');
} else {
    console.log('Could not find news-grid bounds in haberler.html');
}

// Also let's update news-data.js to change the image of card 7 from 'rakamlarla-bilesim-70-ulke.jpg' to 'stat_export.jpg'
let newsDataStr = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/news-data.js', 'utf8');
if (newsDataStr.includes("'rakamlarla-bilesim-70-ulke.jpg'")) {
    newsDataStr = newsDataStr.replace("'rakamlarla-bilesim-70-ulke.jpg'", "'stat_export.jpg'");
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/news-data.js', newsDataStr, 'utf8');
    console.log('news-data.js image 7 updated.');
}
