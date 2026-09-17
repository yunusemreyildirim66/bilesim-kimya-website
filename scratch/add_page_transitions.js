const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const transitionCSS = `
/* --- PAGE TRANSITIONS --- */
body {
    animation: fadeInPage 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    opacity: 0;
}
@keyframes fadeInPage {
    0% { opacity: 0; transform: translateY(15px); }
    100% { opacity: 1; transform: translateY(0); }
}
body.page-fade-out {
    opacity: 0 !important;
    transform: translateY(-10px);
    transition: all 0.35s cubic-bezier(0.4, 0, 1, 1);
}
`;

if (!css.includes('fadeInPage')) {
    fs.writeFileSync('css/style.css', transitionCSS + '\n' + css);
    console.log('Appended transition CSS to style.css');
}

let js = fs.readFileSync('js/main.js', 'utf8');

const transitionJS = `
    /* --- PAGE TRANSITIONS --- */
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');
            
            // Allow default behavior for external links, anchors, modales etc.
            if (href && href.endsWith('.html') && target !== '_blank' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                document.body.classList.add('page-fade-out');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
        });
    });
`;

// Insert the transitionJS inside the DOMContentLoaded listener.
if (!js.includes('page-fade-out')) {
    js = js.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + transitionJS);
    fs.writeFileSync('js/main.js', js);
    console.log('Appended transition JS to main.js');
}
