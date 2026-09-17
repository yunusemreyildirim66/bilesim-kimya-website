const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const floatingCookieHTML = `
    <!-- Floating Cookie Button -->
    <button class="floating-cookie-btn" onclick="openModal('cookieModal')" aria-label="Çerez Politikası">
        <i class="ph ph-cookie"></i> <span data-i18n="footer_cookie">Çerez Politikası</span>
    </button>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('floating-cookie-btn')) {
        content = content.replace('</body>', floatingCookieHTML + '\n</body>');
        fs.writeFileSync(file, content);
        console.log('Added floating cookie to ' + file);
    }
}

let css = fs.readFileSync('css/style.css', 'utf8');
const newCSS = `
/* --- FLOATING COOKIE BUTTON --- */
.floating-cookie-btn {
    position: fixed;
    bottom: 6rem;
    left: 2rem;
    z-index: 9998;
    background: none;
    border: none;
    color: var(--color-brand-blue-dark);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-base);
    font-family: inherit;
}
.floating-cookie-btn i {
    font-size: 1.25rem;
}
.floating-cookie-btn:hover {
    color: var(--color-brand-red);
    transform: scale(1.05);
}
@media (max-width: 768px) {
    .floating-cookie-btn {
        bottom: 2rem;
        left: 1rem;
        font-size: 0.85rem;
    }
    .floating-cookie-btn i {
        font-size: 1.1rem;
    }
}
`;

if (!css.includes('.floating-cookie-btn')) {
    fs.writeFileSync('css/style.css', css + newCSS);
    console.log('Appended CSS to style.css');
}
