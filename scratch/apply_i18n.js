const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const processHtml = (htmlPath, translationDict, keyPrefix) => {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(html, { decodeEntities: false });
    let keyCounter = 1;

    $('*').each((i, el) => {
        // We only want elements that directly contain text (not just children elements)
        // Check if there's any text node directly inside
        const childNodes = $(el).contents();
        let hasTextContent = false;
        let textContent = '';
        
        childNodes.each((j, child) => {
            if (child.type === 'text') {
                const text = $(child).text().trim();
                // skip if it's script, style or empty
                if (text && el.tagName !== 'script' && el.tagName !== 'style' && el.tagName !== 'noscript') {
                    hasTextContent = true;
                    textContent += text + ' ';
                }
            }
        });

        textContent = textContent.trim();
        // also check if the element has data-i18n already
        if (hasTextContent && textContent.length > 1 && !$(el).attr('data-i18n') && !textContent.includes('{')) {
            // we have text to translate
            const key = `${keyPrefix}_${keyCounter++}`;
            $(el).attr('data-i18n', key);
            translationDict[key] = textContent;
        }
    });

    // Handle specific attributes like placeholders (optional, skipping for now)

    return {
        modifiedHtml: $.html(),
        translations: translationDict
    };
};

const run = () => {
    const translations = {};
    const basePath = path.join(__dirname, '..');
    
    console.log('Processing index.html...');
    const indexResult = processHtml(path.join(basePath, 'index.html'), translations, 'home');
    fs.writeFileSync(path.join(basePath, 'index.html'), indexResult.modifiedHtml);

    console.log('Processing uretim.html...');
    const uretimResult = processHtml(path.join(basePath, 'uretim.html'), indexResult.translations, 'prod');
    fs.writeFileSync(path.join(basePath, 'uretim.html'), uretimResult.modifiedHtml);

    fs.writeFileSync(path.join(__dirname, 'base_translations.json'), JSON.stringify(uretimResult.translations, null, 2));
    console.log(`Saved ${Object.keys(uretimResult.translations).length} translation keys.`);
};

run();
