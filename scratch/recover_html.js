const fs = require('fs');

function recoverFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. REVERSE the catastrophic damage from restore2.js
    content = content.replace(/Ü/g, 'o');
    content = content.replace(/Ö/g, 'O');
    content = content.replace(/ş/g, 'Y');
    
    // 2. We now have valid HTML tags, but corrupted text.
    // Let's do PRECISE whole-word or specific substring replacements for the text!
    
    const dict = {
        // News Section
        "MEDYA MERKEZ\uFFFD": "MEDYA MERKEZİ",
        "-ne \uFFFDkan Haberler": "Öne Çıkan Haberler",
        "TǬm Haberleri GOr": "Tüm Haberleri Gör",
        
        "Fuar & Etkinlik": "Fuar & Etkinlik",
        "Uluslararas\uFFFD Private Label": "Uluslararası Private Label",
        "Zirvesi'nde Yeni \u0130Y Birlikleri": "Zirvesi'nde Yeni İş Birlikleri",
        "Zirvesi'nde Yeni IY Birlikleri": "Zirvesi'nde Yeni İş Birlikleri",
        "Zirvesi'nde Yeni Y Birlikleri": "Zirvesi'nde Yeni İş Birlikleri",
        "Global perakendecilerle yap\uFFFDlan gOrǬYmelerde yeni fason Ǭretim anlaYmalar\uFFFD imzaland\uFFFD": "Global perakendecilerle yapılan görüşmelerde yeni fason üretim anlaşmaları imzalandı",
        "Devam\uFFFDn\uFFFD Oku": "Devamını Oku",

        "\uFFFDoretim & Yat\uFFFDr\uFFFDm": "Üretim & Yatırım",
        "Y\uFFFDll\uFFFDk 120.000 Ton Kapasiteye UlaYan Tesis Modernizasyonu": "Yıllık 120.000 Ton Kapasiteye Ulaşan Tesis Modernizasyonu",
        "Yeni nesil dolum hatlar\uFFFDm\uFFFDzla Ǭretim h\uFFFDz\uFFFDm\uFFFDz\uFFFD ve kapasitemizi rekor seviyeye taY\uFFFDd\uFFFDk": "Yeni nesil dolum hatlarımızla üretim hızımızı ve kapasitemizi rekor seviyeye taşıdık",

        "\uFFFDnovasyon & \uFFFDorǬn": "İnovasyon & Ürün",
        "Vione ve Biotol Markalar\uFFFDm\uFFFDzda Eko-Dostu Ambalaj DOnemi": "Vione ve Biotol Markalarımızda Eko-Dostu Ambalaj Dönemi",
        "%100 geri dOnǬYtǬrǬlebilir ambalajlara ge\uFFFDY sǬrecimizi h\uFFFDzland\uFFFDrd\uFFFDk": "%100 geri dönüştürülebilir ambalajlara geçiş sürecimizi hızlandırdık",

        "Kurumsal": "Kurumsal",
        "BileYim Kimya 20. Y\uFFFDl\uFFFDn\uFFFD Gururla Kutluyor": "Bileşim Kimya 20. Yılını Gururla Kutluyor",
        "SektOrdeki 20 y\uFFFDll\uFFFDk deneyimimizi \uFFFDal\uFFFDYanlar\uFFFDm\uFFFDz ve iY ortaklar\uFFFDm\uFFFDzla kutlad\uFFFDk": "Sektördeki 20 yıllık deneyimimizi çalışanlarımız ve iş ortaklarımızla kutladık",

        // Other common corruptions
        "BileYim": "Bileşim",
        "TǬrke": "Türkçe",
        "TǬrk\uFFFDe": "Türkçe",
        "zǬmler": "Çözümler",
        "\uFFFDzǬmler": "Çözümler",
        "\uFFFDoretim": "Üretim",
        "GǬcǬ": "Gücü",
        "Uluslararas\uFFFD": "Uluslararası",
        
        "KEND\uFFFD MARKALARIMIZ": "KENDİ MARKALARIMIZ",
        "Markalar\uFFFDm\uFFFDz": "Markalarımız"
    };

    for (const [corrupt, pristine] of Object.entries(dict)) {
        // Global replace for each corrupted string
        content = content.split(corrupt).join(pristine);
    }

    // Additional generic safe replacements
    content = content.replace(/Ǭ/g, 'ü');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Recovered ${filePath}`);
}

recoverFile('../index.html');
recoverFile('../uretim.html');
