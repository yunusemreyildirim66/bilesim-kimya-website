const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const topbarHTML = `
    <div class="top-bar-contact">
        <div class="container">
            <div class="top-bar-right">
                <a href="tel:+902128866464"><i class="ph ph-phone"></i> +90 212 886 64 64</a>
                <a href="mailto:info@bilesimkimya.com"><i class="ph ph-envelope"></i> info@bilesimkimya.com</a>
            </div>
        </div>
    </div>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if not already added
    if (!content.includes('top-bar-contact')) {
        // Insert right after <header class="main-header" id="header">
        content = content.replace('<header class="main-header" id="header">', '<header class="main-header" id="header">\n' + topbarHTML);
        fs.writeFileSync(file, content);
        console.log('Added topbar to ' + file);
    }
}
