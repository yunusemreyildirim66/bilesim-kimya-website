const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newHTML = `
    <!-- Cookie Overlay (Blocks interaction) -->
    <div id="cookieConsentOverlay" class="cookie-overlay"></div>

    <!-- Cookie Consent Banner -->
    <div id="cookieConsentBanner" class="cookie-consent-banner">
        <div class="cookie-consent-inner container">
            <div class="cookie-consent-content">
                <i class="ph-fill ph-cookie cookie-icon"></i>
                <p>Sitemizin işlevselliği için çerezler kullanılmaktadır. Teknik olarak tutulması gerekmeyen ancak size daha iyi kullanıcı tecrübesi ve kişiye özel teklif sunmamıza, internet trafiğimizi analiz etmemize ve sosyal medya özellikleri sağlamamıza izin veren çerezler bulunmaktadır ve bunlar ancak onay vermeniz halinde kullanılacaktır.</p>
            </div>
            <div class="cookie-consent-buttons">
                <button class="btn-cookie-outline" onclick="openCookieSettings()"><i class="ph ph-sliders-horizontal"></i> Tercihleri Özelleştir</button>
                <button class="btn-cookie-outline" onclick="saveCookies('essential')"><i class="ph ph-shield-check"></i> Yalnızca Zorunlu</button>
                <button class="btn-cookie-primary" onclick="saveCookies('all')"><i class="ph ph-check"></i> Hepsini Kabul Et</button>
            </div>
        </div>
    </div>

    <!-- Floating Cookie Button -->
    <button id="floatingCookieBtn" class="floating-cookie-btn" onclick="openCookieSettings()" aria-label="Çerez Politikası">
        <i class="ph ph-cookie"></i>
    </button>

    <!-- Cookie Settings Modal -->
    <div id="cookieSettingsModal" class="cookie-settings-modal">
        <div class="cookie-settings-content">
            <div class="cookie-settings-header">
                <h3><i class="ph-fill ph-cookie"></i> Çerez Tercihleri</h3>
                <button class="cookie-settings-close" onclick="closeCookieSettings()"><i class="ph ph-x"></i></button>
            </div>
            <div class="cookie-settings-body">
                <div class="cookie-toggle-row">
                    <div class="cookie-toggle-info">
                        <h4><i class="ph ph-shield-check" style="color: var(--color-brand-red);"></i> Zorunlu Çerezler <span class="badge-essential">Her zaman aktif</span></h4>
                        <p>Oturum yönetimi, güvenlik ve temel işlevler. Devre dışı bırakılamaz.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked disabled>
                        <span class="slider round disabled"></span>
                    </label>
                </div>
                
                <div class="cookie-toggle-row">
                    <div class="cookie-toggle-info">
                        <h4><i class="ph ph-chart-line" style="color: var(--color-brand-red);"></i> Analitik Çerezler</h4>
                        <p>Sayfa görüntülemeleri, ziyaretçi kaynakları ve kullanıcı davranışı ölçümü.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="toggleAnalytics">
                        <span class="slider round"></span>
                    </label>
                </div>
                
                <div class="cookie-toggle-row">
                    <div class="cookie-toggle-info">
                        <h4><i class="ph ph-megaphone" style="color: var(--color-brand-red);"></i> Pazarlama & Reklam Çerezleri</h4>
                        <p>Reklam performansı ve yeniden hedefleme.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="toggleMarketing">
                        <span class="slider round"></span>
                    </label>
                </div>
                
                <div class="cookie-toggle-row">
                    <div class="cookie-toggle-info">
                        <h4><i class="ph ph-headset" style="color: var(--color-brand-red);"></i> Destek Araçları</h4>
                        <p>Canlı müşteri destek sohbet aracı widget'ı.</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="toggleSupport">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="cookie-settings-footer">
                <button class="btn-cookie-primary w-100" style="width: 100%; justify-content: center;" onclick="saveCustomCookies()">Seçimi Kaydet</button>
            </div>
        </div>
    </div>
</body>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Using Regex to remove old cookie elements
    content = content.replace(/<!-- Floating Cookie Button -->[\s\S]*?<\/body>/, newHTML);
    
    fs.writeFileSync(file, content);
    console.log('Updated HTML logic in ' + file);
}

