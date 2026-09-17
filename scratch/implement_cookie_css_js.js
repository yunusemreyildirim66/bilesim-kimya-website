const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const newCSS = `
/* --- COOKIE SETTINGS MODAL & OVERLAY --- */
.cookie-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(5px);
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}
.cookie-overlay.show {
    opacity: 1;
    visibility: visible;
}

.cookie-settings-modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -45%) scale(0.95);
    background: #1a1f2e; /* Dark Blue from brand */
    color: #e2e8f0;
    width: 90%;
    max-width: 500px;
    border-radius: 12px;
    z-index: 10001;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}
.cookie-settings-modal.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
}

.cookie-settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.cookie-settings-header h3 {
    margin: 0;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-white);
}
.cookie-settings-header h3 i {
    color: var(--color-brand-red);
}
.cookie-settings-close {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;
}
.cookie-settings-close:hover {
    color: var(--color-white);
}

.cookie-settings-body {
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cookie-toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed rgba(255,255,255,0.1);
}
.cookie-toggle-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.cookie-toggle-info h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-white);
}
.cookie-toggle-info p {
    margin: 0;
    font-size: 0.85rem;
    color: #94a3b8;
    line-height: 1.4;
}
.badge-essential {
    font-size: 0.7rem;
    background: rgba(220,38,38,0.2);
    color: var(--color-brand-red);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-weight: 600;
}

/* TOGGLE SWITCH CSS */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
}
.toggle-switch input { 
    opacity: 0;
    width: 0;
    height: 0;
}
.slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #475569;
    transition: .4s;
}
.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
}
input:checked + .slider {
    background-color: var(--color-brand-red);
}
input:checked + .slider:before {
    transform: translateX(20px);
}
.slider.round {
    border-radius: 24px;
}
.slider.round:before {
    border-radius: 50%;
}
.slider.disabled {
    cursor: not-allowed;
    background-color: rgba(220,38,38,0.5) !important;
}

.cookie-settings-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.2);
}
`;

if (!css.includes('.cookie-settings-modal')) {
    fs.writeFileSync('css/style.css', css + newCSS);
    console.log('Appended modal CSS to style.css');
}

let js = fs.readFileSync('js/main.js', 'utf8');

// I will replace the previous "Cookie Consent Logic" entirely.
// Find the index of "// Cookie Consent Logic"
const jsParts = js.split('// Cookie Consent Logic');
let cleanJs = jsParts[0];

const newJs = `
// Cookie Consent Logic
const banner = document.getElementById('cookieConsentBanner');
const overlay = document.getElementById('cookieConsentOverlay');
const settingsModal = document.getElementById('cookieSettingsModal');
const floatingBtn = document.getElementById('floatingCookieBtn');

function setBodyScroll(allow) {
    if (allow) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

function checkCookieConsent() {
    const preferences = localStorage.getItem('cookiePreferences');
    if (!preferences) {
        // No consent given yet. Show overlay and banner. Block scroll.
        if (overlay) overlay.classList.add('show');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 300);
        }
        setBodyScroll(false);
        if (floatingBtn) floatingBtn.style.display = 'none';
    } else {
        // Consent exists. Apply logic (e.g. disable chatbot if needed).
        if (floatingBtn) floatingBtn.style.display = 'flex';
        applyCookieLogic(JSON.parse(preferences));
    }
}

function openCookieSettings() {
    if (banner) banner.classList.remove('show');
    if (overlay) overlay.classList.add('show');
    if (settingsModal) settingsModal.classList.add('show');
    
    // Load current preferences into toggles
    const preferencesStr = localStorage.getItem('cookiePreferences');
    if (preferencesStr) {
        const prefs = JSON.parse(preferencesStr);
        document.getElementById('toggleAnalytics').checked = prefs.analytics;
        document.getElementById('toggleMarketing').checked = prefs.marketing;
        document.getElementById('toggleSupport').checked = prefs.support;
    }
}

function closeCookieSettings() {
    if (settingsModal) settingsModal.classList.remove('show');
    
    const preferences = localStorage.getItem('cookiePreferences');
    if (!preferences) {
        // If closed without saving initially, show banner again
        if (banner) banner.classList.add('show');
    } else {
        if (overlay) overlay.classList.remove('show');
    }
}

function saveCookies(type) {
    const prefs = {
        essential: true,
        analytics: type === 'all',
        marketing: type === 'all',
        support: type === 'all'
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    closeConsentUI();
    applyCookieLogic(prefs);
}

function saveCustomCookies() {
    const prefs = {
        essential: true,
        analytics: document.getElementById('toggleAnalytics').checked,
        marketing: document.getElementById('toggleMarketing').checked,
        support: document.getElementById('toggleSupport').checked
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    if (settingsModal) settingsModal.classList.remove('show');
    closeConsentUI();
    applyCookieLogic(prefs);
}

function closeConsentUI() {
    if (banner) banner.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    setBodyScroll(true);
    if (floatingBtn) floatingBtn.style.display = 'flex';
}

function applyCookieLogic(prefs) {
    // Example logic: if Support is false, hide the Chatbot toggle
    const chatbotToggle = document.getElementById('bk-chat-toggle');
    if (chatbotToggle) {
        if (prefs.support) {
            chatbotToggle.style.display = 'flex';
        } else {
            chatbotToggle.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', checkCookieConsent);
`;

fs.writeFileSync('js/main.js', cleanJs + '\n' + newJs);
console.log('Appended comprehensive cookie JS to main.js');
