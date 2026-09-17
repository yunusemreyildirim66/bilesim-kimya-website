const fs = require('fs');
const https = require('https');

const baseUrl = 'https://bilesim-kimya-website-jlx8mr1ty-yunus9.vercel.app/';
const filesToRestore = ['iletisim.html', 'arge.html'];

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
        .replace(/â€/g, '"')
        .replace(/â€“/g, '-');
}

filesToRestore.forEach(file => {
    https.get(baseUrl + file, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            // Fix double encoding safely with string replacement
            const fixedData = fixDoubleEncoding(data);
            fs.writeFileSync(file, fixedData);
            console.log('Restored and fixed ' + file);
        });
    }).on('error', (e) => {
        console.error('Error fetching ' + file, e);
    });
});
