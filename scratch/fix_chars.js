const fs = require('fs'); 
const glob = fs.readdirSync('.', {recursive: true}).filter(f => f.endsWith('.html') && !f.includes('node_modules')); 

let count = 0; 
for(const file of glob) { 
    let content = fs.readFileSync(file, 'utf-8'); 
    
    // Fix full words first
    content = content.replace(/BileYim/g, 'Bileşim'); 
    content = content.replace(/zǬmler/g, 'çözümler'); 
    content = content.replace(/TǬrke/g, 'Türkçe'); 
    content = content.replace(/oretim/g, 'Üretim'); 
    content = content.replace(/GǬcǬ/g, 'Gücü'); 
    content = content.replace(/Uluslararas/g, 'Uluslararası'); 
    content = content.replace(/Uluslararas(?![ıı])/g, 'Uluslararası'); 
    content = content.replace(/kiYisel/g, 'kişisel'); 
    content = content.replace(/bakm/g, 'bakım'); 
    content = content.replace(/ǬrǬnlerinde/g, 'ürünlerinde'); 
    content = content.replace(/yllk/g, 'yıllık'); 
    content = content.replace(/gǬcǬ/g, 'gücü'); 
    content = content.replace(/aYkn/g, 'aşkın'); 
    content = content.replace(/Ǭlkeye/g, 'ülkeye'); 
    content = content.replace(/-ne Ŏkan/g, 'Öne Çıkan'); 
    content = content.replace(/alYanlarmz/g, 'Çalışanlarımız'); 
    
    // Character fallbacks
    content = content.replace(/Y/g, 'ş'); 
    content = content.replace(/Ǭ/g, 'ü'); 
    content = content.replace(/\uFFFD/g, 'ı'); 

    fs.writeFileSync(file, content, 'utf-8'); 
    count++; 
} 
console.log('Fixed words in ' + count + ' files');
