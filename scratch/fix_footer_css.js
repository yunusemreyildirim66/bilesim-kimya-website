const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// The echo commands from earlier appended some messy utf16 strings again.
css = css.replace(/@ m e d i a[\s\S]*/, '');

const cleanAppends = `
@media (max-width: 768px) {
    .footer-brand {
        padding-left: 15px !important;
    }
}
`;

fs.writeFileSync('css/style.css', css.trim() + '\n' + cleanAppends);
console.log('Cleaned up and appended mobile CSS for footer brand');
