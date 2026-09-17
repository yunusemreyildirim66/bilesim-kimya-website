const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// 1. Change links in all HTML files
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('haber-detay.html?id=')) {
        content = content.replace(/haber-detay\.html\?id=/g, 'haber-detay.html#id=');
        fs.writeFileSync(file, content);
        console.log('Updated links in ' + file);
    }
}

// 2. Update logic in haber-detay.html
const detailFile = 'haber-detay.html';
let detailContent = fs.readFileSync(detailFile, 'utf8');

const oldLogic = `const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id') || "1";`;

const newLogic = `let id = "1";
            if (window.location.hash && window.location.hash.includes('id=')) {
                id = window.location.hash.split('id=')[1].split('&')[0];
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('id')) id = urlParams.get('id');
            }`;

if (detailContent.includes(oldLogic)) {
    detailContent = detailContent.replace(oldLogic, newLogic);
    fs.writeFileSync(detailFile, detailContent);
    console.log('Updated JS logic in ' + detailFile);
} else {
    console.log('Could not find old logic in haber-detay.html to replace.');
}
