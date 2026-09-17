const fs = require('fs');

let text = fs.readFileSync('index.html', 'utf-8');

const replacements = {
    "olkeye": "Ülkeye",
    "20+ şILLIK ENDoSTRİşEL oRETİM GoCo": "20+ YILLIK ENDÜSTRİYEL ÜRETİM GÜCÜ",
    "KİMşANIN GoCo, GELECEĞİN oRETİM STANDARTLARI": "KİMYANIN GÜCÜ, GELECEĞİN ÜRETİM STANDARTLARI",
    "GoCo": "Gücü",
    "oRETİM": "ÜRETİM",
    "şILLIK": "YILLIK",
    "ENDoSTRİşEL": "ENDÜSTRİYEL",
    "KİMşANIN": "KİMYANIN"
};

for (const [bad, good] of Object.entries(replacements)) {
    text = text.split(bad).join(good);
}

fs.writeFileSync('index.html', text, 'utf-8');
console.log('Fixed hero section!');
