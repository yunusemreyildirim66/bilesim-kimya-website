const fs = require('fs');

function fix(filePath) {
    let text = fs.readFileSync(filePath, 'utf-8');

    // These regexes will fix the remaining broken Turkish characters.
    text = text.replace(/BileYim/g, 'Bileşim');
    text = text.replace(/BileYim/g, 'Bileşim');
    text = text.replace(/Y/g, 'ş');
    text = text.replace(/Y/g, 'ş'); // Generic fallback for Y that are actually ş in this file
    
    // Fix specific words first before generic fallbacks
    text = text.replace(/Uluslararas/g, 'Uluslararası');
    text = text.replace(/oretim/g, 'Üretim');
    text = text.replace(/oretim/g, 'Üretim');
    text = text.replace(/novasyon/g, 'İnovasyon');
    text = text.replace(/orǬn/g, 'Ürün');
    text = text.replace(/orǬn/g, 'Ürün');
    text = text.replace(/TǬrke/g, 'Türkçe');
    text = text.replace(/zǬmler/g, 'Çözümler');
    text = text.replace(/zǬmler/g, 'Çözümler');
    text = text.replace(/GǬcǬ/g, 'Gücü');
    
    // Fix remaining Ǭ
    text = text.replace(/Ǭ/g, 'ü');
    
    // Fix remaining \uFFFD (which is likely ı)
    text = text.replace(/\uFFFD/g, 'ı');

    // Manually fix known specific cases to avoid false positives
    text = text.replace(/şıllık/g, 'Yıllık');
    text = text.replace(/şatırım/g, 'Yatırım');
    text = text.replace(/şeni/g, 'Yeni');
    
    // Fix Russian/Arabic
    text = text.replace(/العربية \(AR\)/g, 'العربية (AR)'); // Just in case
    text = text.replace(/Русский \(RU\)/g, 'Русский (RU)'); // Just in case
    
    // Write back
    fs.writeFileSync(filePath, text, 'utf-8');
}

fix('../index.html');
fix('../uretim.html');
console.log('Final fixes applied.');
