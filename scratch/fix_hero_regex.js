const fs = require('fs');

let text = fs.readFileSync('index.html', 'utf-8');

const regex = /<h2 class="hero-pretitle[^>]*>.*?<\/p>/s;
const cleanContent = `<h2 class="hero-pretitle animate-up" style="animation-delay: 0.3s;" data-i18n="hero_pretitle">20+ YILLIK ENDÜSTRİYEL ÜRETİM GÜCÜ</h2>
            <h1 class="hero-title animate-up" style="animation-delay: 0.5s;" data-i18n="hero_title">KİMYANIN GÜCÜ, GELECEĞİN ÜRETİM STANDARTLARI</h1>
            
            <p class="hero-subtitle animate-up" style="animation-delay: 0.7s;" data-i18n="hero_subtitle">
                Temizlik kimyasalları ve kişisel bakım ürünlerinde uluslararası standartlarda ileri teknoloji üretim. 70'i aşkın ülkeye güven, kalite ve yenilikçi çözümler ihraç ediyoruz.
            </p>`;

text = text.replace(regex, cleanContent);
fs.writeFileSync('index.html', text, 'utf-8');
console.log('Fixed hero content with clean UTF-8 text.');
