const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const bannerHTML = `
    <!-- Cookie Consent Banner -->
    <div id="cookieConsentBanner" class="cookie-consent-banner">
        <div class="cookie-consent-inner container">
            <div class="cookie-consent-content">
                <i class="ph-fill ph-cookie cookie-icon"></i>
                <p>Sitemizin işlevselliği için çerezler kullanılmaktadır. Teknik olarak tutulması gerekmeyen ancak size daha iyi kullanıcı tecrübesi ve kişiye özel teklif sunmamıza, internet trafiğimizi analiz etmemize ve sosyal medya özellikleri sağlamamıza izin veren çerezler bulunmaktadır ve bunlar ancak onay vermeniz halinde kullanılacaktır.</p>
            </div>
            <div class="cookie-consent-buttons">
                <button class="btn-cookie-outline" onclick="acceptCookies()"><i class="ph ph-sliders-horizontal"></i> Tercihleri Özelleştir</button>
                <button class="btn-cookie-outline" onclick="acceptCookies()"><i class="ph ph-shield-check"></i> Yalnızca Zorunlu</button>
                <button class="btn-cookie-primary" onclick="acceptCookies()"><i class="ph ph-check"></i> Hepsini Kabul Et</button>
            </div>
        </div>
    </div>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('cookie-consent-banner')) {
        content = content.replace('</body>', bannerHTML + '\n</body>');
        fs.writeFileSync(file, content);
        console.log('Added cookie banner to ' + file);
    }
}

let css = fs.readFileSync('css/style.css', 'utf8');
const newCSS = `
/* --- COOKIE CONSENT BANNER --- */
.cookie-consent-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #1a1f2e; /* Dark corporate shade */
    color: #e2e8f0;
    z-index: 10000;
    padding: 1.5rem 0;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
    transform: translateY(100%);
    transition: transform 0.4s ease-in-out;
}
.cookie-consent-banner.show {
    transform: translateY(0);
}
.cookie-consent-inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
.cookie-consent-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 0.9rem;
    line-height: 1.5;
}
.cookie-icon {
    font-size: 1.5rem;
    color: var(--color-brand-red);
    flex-shrink: 0;
    margin-top: 0.2rem;
}
.cookie-consent-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.btn-cookie-outline, .btn-cookie-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}
.btn-cookie-outline {
    background-color: transparent;
    color: #e2e8f0;
    border: 1px solid #475569;
}
.btn-cookie-outline:hover {
    background-color: #334155;
    border-color: #64748b;
}
.btn-cookie-primary {
    background-color: var(--color-brand-red);
    color: var(--color-white);
    border: 1px solid var(--color-brand-red);
}
.btn-cookie-primary:hover {
    background-color: #b91c1c; /* darker red */
    border-color: #b91c1c;
}

@media (min-width: 1024px) {
    .cookie-consent-banner {
        padding: 1.5rem 2rem;
    }
}
@media (max-width: 768px) {
    .cookie-consent-buttons {
        flex-direction: column;
    }
    .btn-cookie-outline, .btn-cookie-primary {
        width: 100%;
        justify-content: center;
    }
}
`;

if (!css.includes('.cookie-consent-banner')) {
    fs.writeFileSync('css/style.css', css + newCSS);
    console.log('Appended CSS to style.css');
}

let js = fs.readFileSync('js/main.js', 'utf8');
const jsCode = `
// Cookie Consent Logic
function acceptCookies() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.classList.remove('show');
        localStorage.setItem('cookieConsentAccepted', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner && !localStorage.getItem('cookieConsentAccepted')) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
});
`;

if (!js.includes('acceptCookies()')) {
    fs.writeFileSync('js/main.js', js + '\n' + jsCode);
    console.log('Appended JS to main.js');
}
