const fs = require('fs');
const path = require('path');

const extractTexts = (html) => {
    const texts = [];
    const regex = />([^<]+)</g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const text = match[1].trim();
        if (text && text.length > 1 && !text.includes('{') && !text.includes('}')) {
            texts.push(text);
        }
    }
    return texts;
};

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
const uretimHtml = fs.readFileSync(path.join(__dirname, '../uretim.html'), 'utf-8');

const indexTexts = extractTexts(indexHtml);
const uretimTexts = extractTexts(uretimHtml);

// Remove duplicates
const uniqueTexts = [...new Set([...indexTexts, ...uretimTexts])];

fs.writeFileSync(path.join(__dirname, 'texts.json'), JSON.stringify(uniqueTexts, null, 2));
console.log('Extracted ' + uniqueTexts.length + ' texts and saved to texts.json');
