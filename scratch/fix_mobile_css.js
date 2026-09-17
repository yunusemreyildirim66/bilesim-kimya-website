const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// The echo commands from earlier appended some messy utf16 strings.
// Let's clean them up and append proper CSS.

css = css.replace(/@ m e d i a[\s\S]*/, '');
css = css.replace(/@media \(max-width: 768px\) \{ \.header-container \{ padding-left: 10px !important; padding-right: 10px !important; \} \}/g, '');
css = css.replace(/@media \(max-width: 768px\) \{ \.floating-cookie-btn \{ bottom: 1.5rem !important; left: 1rem !important; \} #scrollTopBtn \{ display: none !important; \} \}/g, '');

const cleanAppends = `
@media (max-width: 768px) {
    .header-container {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .logo-link {
        margin-left: 5px !important;
    }
    .floating-cookie-btn {
        bottom: 1.5rem !important;
        left: 1rem !important;
    }
    #scrollTopBtn {
        display: none !important;
    }
}
`;

fs.writeFileSync('css/style.css', css.trim() + '\n' + cleanAppends);
console.log('Cleaned up and appended mobile CSS');
