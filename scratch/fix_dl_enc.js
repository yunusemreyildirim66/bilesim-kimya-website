const fs = require('fs');
function fixDoubleEncoding(str) {
    return str
        .replace(/Ä°/g, 'İ')
        .replace(/ÅŸ/g, 'ş')
        .replace(/Ã¼/g, 'ü')
        .replace(/Ä±/g, 'ı')
        .replace(/Ã§/g, 'ç')
        .replace(/Ã¶/g, 'ö')
        .replace(/ÄŸ/g, 'ğ')
        .replace(/Ã‡/g, 'Ç')
        .replace(/Åž/g, 'Ş')
        .replace(/Äž/g, 'Ğ')
        .replace(/Ã–/g, 'Ö')
        .replace(/Ãœ/g, 'Ü')
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€ /g, '"')
        .replace(/â€“/g, '-');
}
['iletisim.html', 'arge.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = fixDoubleEncoding(content);
    fs.writeFileSync(file, content);
});
