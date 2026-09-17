const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const newCSS = `
/* --- TOP BAR --- */
.top-bar-contact {
    background-color: var(--color-brand-blue-dark);
    color: var(--color-white);
    padding: 0.4rem 0;
    font-size: 0.85rem;
}
.top-bar-contact .container {
    display: flex;
    justify-content: flex-end;
}
.top-bar-right {
    display: flex;
    gap: 1.5rem;
}
.top-bar-right a {
    color: var(--color-white);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: var(--transition-base);
}
.top-bar-right a:hover {
    color: var(--color-brand-red);
}
.main-header {
    padding: 0; /* Removing padding from header since top-bar adds height */
}
.header-container {
    padding: 0.75rem 0;
}
.main-header.scrolled .header-container {
    padding: 0.5rem 0;
}
.main-header.scrolled .top-bar-contact {
    display: none; /* Hide on scroll for cleaner look */
}
@media (max-width: 768px) {
    .top-bar-contact {
        display: none; /* Usually hide on mobile to save space, or center it */
    }
}
`;

if (!css.includes('.top-bar-contact')) {
    fs.writeFileSync('css/style.css', css + newCSS);
    console.log('Appended CSS to style.css');
}
