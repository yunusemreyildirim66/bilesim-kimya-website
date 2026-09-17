const fs = require('fs');
const https = require('https');

const auth = JSON.parse(fs.readFileSync('C:\\Users\\yunus\\AppData\\Roaming\\com.vercel.cli\\Data\\auth.json', 'utf8'));
const token = auth.token;

const deploymentId = 'dpl_Hx2XSP7AUPsrfxz4kYfE27bUe7yg';

function fetchWithToken(url, callback) {
    https.get(url, { headers: { Authorization: 'Bearer ' + token } }, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => callback(JSON.parse(data)));
    }).on('error', (e) => {
        console.error('Error fetching ' + url, e);
    });
}

function fetchFile(fileId, dest) {
    const url = `https://api.vercel.com/v7/deployments/${deploymentId}/files/${fileId}`;
    https.get(url, { headers: { Authorization: 'Bearer ' + token } }, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            // Fix double encoding
            data = data
                .replace(/Ä°/g, 'İ').replace(/ÅŸ/g, 'ş').replace(/Ã¼/g, 'ü').replace(/Ä±/g, 'ı')
                .replace(/Ã§/g, 'ç').replace(/Ã¶/g, 'ö').replace(/ÄŸ/g, 'ğ').replace(/Ã‡/g, 'Ç')
                .replace(/Åž/g, 'Ş').replace(/Äž/g, 'Ğ').replace(/Ã–/g, 'Ö').replace(/Ãœ/g, 'Ü')
                .replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€ /g, '"').replace(/â€“/g, '-');
            fs.writeFileSync(dest, data);
            console.log('Restored ' + dest);
        });
    });
}

fetchWithToken(`https://api.vercel.com/v6/deployments/${deploymentId}/files`, (data) => {
    if (!data || !data.forEach) {
        console.error('Failed to get files list', data);
        return;
    }
    data.forEach(f => {
        if (f.file === 'iletisim.html' || f.file === 'arge.html') {
            console.log('Downloading ' + f.file + ' (ID: ' + f.uid + ')');
            fetchFile(f.uid, f.file);
        }
    });
});
