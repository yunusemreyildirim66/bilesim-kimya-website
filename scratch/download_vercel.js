const fs = require('fs');
const path = require('path');
const https = require('https');

const baseUrl = 'https://bilesim-kimya-website.vercel.app';
const outputDir = path.join(__dirname, '..', 'Vercel_Yedek');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// List of standard files based on earlier directory listing
const filesToDownload = [
    '/',
    '/index.html',
    '/hakkimizda.html',
    '/iletisim.html',
    '/kurumsal.html',
    '/haberler.html',
    '/haber-detay.html',
    '/markalar.html',
    '/kalite.html',
    '/privatelabel.html',
    '/uretim.html',
    '/cozumler.html',
    '/css/style.css',
    '/js/main.js'
];

async function downloadFile(route) {
    return new Promise((resolve, reject) => {
        const url = route === '/' ? baseUrl : baseUrl + route;
        let filename = route === '/' ? 'index.html' : route.startsWith('/') ? route.substring(1) : route;
        
        const filePath = path.join(outputDir, filename);
        const dir = path.dirname(filePath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.log(`Failed to download ${route}: ${res.statusCode}`);
                resolve(false);
                return;
            }
            
            const file = fs.createWriteStream(filePath);
            res.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve(true);
            });
        }).on('error', (err) => {
            console.error(`Error downloading ${route}: ${err.message}`);
            resolve(false);
        });
    });
}

async function run() {
    console.log("Vercel'den canli site indiriliyor...");
    for (const file of filesToDownload) {
        await downloadFile(file);
    }
    console.log("Islem tamamlandi! Dosyalar Vercel_Yedek klasorunde.");
}

run();
