const fs = require('fs');
const path = require('path');

// Levenshtein distance function
function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

const pristineTexts = require('./texts.json'); // the good ones
const corruptedDict = require('./base_translations.json'); // the bad ones

// Create mapping
const mapping = {};
for (const key in corruptedDict) {
    const corrupt = corruptedDict[key].trim();
    if (corrupt.length < 2) continue;
    
    // Find closest pristine text
    let bestMatch = '';
    let bestDist = Infinity;
    
    for (const pristine of pristineTexts) {
        const dist = getEditDistance(corrupt, pristine);
        if (dist < bestDist) {
            bestDist = dist;
            bestMatch = pristine;
        }
    }
    
    // If it's a reasonable match (e.g. less than 50% of length changed)
    if (bestDist < corrupt.length * 0.5 && corrupt !== bestMatch) {
        mapping[corrupt] = bestMatch;
    }
}

// Custom manual overrides for small words that might fail Levenshtein
mapping["TǬrke (TR)"] = "Türkçe (TR)";
mapping["Ar-Ge"] = "Ar-Ge";
mapping["-ne Ŏkan Haberler"] = "Öne Çıkan Haberler";
mapping["TǬm Haberleri Gr"] = "Tüm Haberleri Gör";
mapping["zǬmler"] = "Çözümler";
mapping["Kalite & Standartlar"] = "Kalite & Standartlar";
mapping["Haberler"] = "Haberler";
mapping["BileYim Kimya"] = "Bileşim Kimya";

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace all known corrupted strings
    // Sort by length descending to avoid partial replacements
    const sortedCorrupts = Object.keys(mapping).sort((a, b) => b.length - a.length);
    
    let replaceCount = 0;
    for (const corrupt of sortedCorrupts) {
        if (content.includes(corrupt)) {
            content = content.split(corrupt).join(mapping[corrupt]);
            replaceCount++;
        }
    }

    // A few manual regex fixes for attributes or fragments
    content = content.replace(/BileYim/g, 'Bileşim');
    content = content.replace(/zǬmler/g, 'Çözümler');
    content = content.replace(/TǬrke/g, 'Türkçe');
    content = content.replace(/oretim/g, 'Üretim');
    content = content.replace(/GǬcǬ/g, 'Gücü');
    content = content.replace(/Uluslararas/g, 'Uluslararası');
    content = content.replace(/Y/g, 'ş');
    content = content.replace(/\uFFFD/g, 'ı'); // fallback for generic  mostly being ı
    content = content.replace(/Ǭ/g, 'ü');
    content = content.replace(/o/g, 'Ü');
    content = content.replace(/O/g, 'Ö');
    content = content.replace(/-ne/g, 'Öne');
    content = content.replace(/Ŏkan/g, 'Çıkan');
    content = content.replace(/alYanlarmz/g, 'çalışanlarımız');
    
    // Fix Russian and Arabic
    content = content.replace(/"S \(AR\)/g, 'العربية (AR)');
    content = content.replace(/f\?\?Ц \(RU\)/g, 'Русский (RU)');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed ${replaceCount} strings in ${path.basename(filePath)}`);
}

fixFile('../index.html');
fixFile('../uretim.html');

console.log('Encoding fixed.');
