const fs = require('fs');
const https = require('https');

const token = fs.readFileSync('scratch/token.txt', 'utf8').trim();
const deploymentId = 'dpl_Hx2XSP7AUPsrfxz4kYfE27bUe7yg';

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { Authorization: 'Bearer ' + token } }, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    try {
        console.log('Fetching files list...');
        const listStr = await fetchUrl(`https://api.vercel.com/v6/deployments/${deploymentId}/files`);
        const list = JSON.parse(listStr);
        
        const filesToDownload = list.filter(f => f.file === 'index.html' || f.file === 'uretim.html');
        
        for (const f of filesToDownload) {
            console.log(`Downloading ${f.file} (${f.uid})...`);
            let content = await fetchUrl(`https://api.vercel.com/v7/deployments/${deploymentId}/files/${f.uid}`);
            
            // Fix encoding
            content = content
                .replace(/Ä°/g, 'İ').replace(/ÅŸ/g, 'ş').replace(/Ã¼/g, 'ü').replace(/Ä±/g, 'ı')
                .replace(/Ã§/g, 'ç').replace(/Ã¶/g, 'ö').replace(/ÄŸ/g, 'ğ').replace(/Ã‡/g, 'Ç')
                .replace(/Åž/g, 'Ş').replace(/Äž/g, 'Ğ').replace(/Ã–/g, 'Ö').replace(/Ãœ/g, 'Ü')
                .replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€ /g, '"').replace(/â€“/g, '-');
                
            fs.writeFileSync(f.file, content);
            console.log(`Restored ${f.file}`);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}
run();
