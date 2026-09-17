const fs = require('fs');

let mainJs = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', 'utf8');
if (!mainJs.includes('IntersectionObserver')) {
    mainJs += `

// Footer Observer for Floating Buttons
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.main-footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('footer-visible');
                } else {
                    document.body.classList.remove('footer-visible');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(footer);
    }
});
`;
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/js/main.js', mainJs, 'utf8');
}

let styleCss = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/css/style.css', 'utf8');
if (!styleCss.includes('.footer-visible')) {
    styleCss += `

/* Push floating buttons up when footer is visible */
body.footer-visible #scrollTopBtn,
body.footer-visible .floating-cookie-btn,
body.footer-visible #bk-chat-toggle {
    transform: translateY(-80px) !important;
}
`;
    fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/css/style.css', styleCss, 'utf8');
}
console.log('Added footer observer and CSS.');
