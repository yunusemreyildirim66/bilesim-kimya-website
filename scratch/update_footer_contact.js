const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const iframeCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.648109031853!2d28.626088999999997!3d41.032954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f4de3abffeb%3A0xf0a99316ff70ee8f!2zQmlsZcWfaW0gS2lteWEgQS7Fni4!5e0!3m2!1str!2str!4v1789566746828!5m2!1str!2str" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

const newFooterMap = `                <div class="footer-map" style="width: 100%;">
                    <h4 style="margin-bottom: 1.5rem; color: #ffffff; font-family: var(--font-primary); font-size: 1.25rem; font-weight: 700;">İletişim</h4>
                    <ul style="list-style: none; padding: 0; margin: 0 0 1rem 0; font-size: 0.95rem;">
                        <li style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.7);"><i class="ph ph-phone" style="color: var(--color-brand-red); font-size: 1.2rem;"></i> <a href="tel:+902128866464" style="color: inherit; text-decoration: none; transition: color 0.3s;">+90 212 886 64 64</a></li>
                        <li style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.7);"><i class="ph ph-envelope" style="color: var(--color-brand-red); font-size: 1.2rem;"></i> <a href="mailto:info@bilesimkimya.com" style="color: inherit; text-decoration: none; transition: color 0.3s;">info@bilesimkimya.com</a></li>
                    </ul>
                    <div style="border-radius: 12px; overflow: hidden; height: 130px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                        ${iframeCode}
                    </div>
                </div>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the footer-map div.
    // We can use a regex to match from <div class="footer-map" to the closing </div> of that section.
    // A safer way is to split on '<div class="footer-map"' and replace until the next '</div>' that closes it.
    // Since we know the exact structure, we can do a regex replace.
    
    const regex = /<div class="footer-map"[\s\S]*?<\/iframe>\s*<\/div>\s*<\/div>/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, newFooterMap);
        fs.writeFileSync(file, content);
        console.log('Updated footer contact info in ' + file);
    } else {
        console.log('footer-map not found or regex failed in ' + file);
    }
}
