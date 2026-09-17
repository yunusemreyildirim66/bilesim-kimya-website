const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'admin.html'); // Skip admin if exists
const pattern = /(<li><a href="iletisim\.html" class="mobile-cta" data-i18n="nav_b2b_cta">B2B Teklif Al<\/a><\/li>\s*<\/ul>)/;

const replacement = `$1
        <div class="mobile-socials">
            <a href="https://www.facebook.com/bilesim.kimya.52" target="_blank" aria-label="Facebook" class="social-fb"><i class="ph-fill ph-facebook-logo" style="color: #1877F2;"></i></a>
            <a href="https://www.instagram.com/bilesim_kimya/?hl=tr" target="_blank" aria-label="Instagram" class="social-ig"><i class="ph-fill ph-instagram-logo" style="color: #E4405F;"></i></a>
            <a href="https://www.youtube.com/channel/UCOIuuULRxFuS6cFB8bP_mrQ" target="_blank" aria-label="YouTube" class="social-yt"><i class="ph-fill ph-youtube-logo" style="color: #FF0000;"></i></a>
            <a href="https://www.linkedin.com/company/bile%C5%9Fim-kimya-temizlik-%C3%BCr%C3%BCnleri-sanayi-ticaret-limited-%C5%9Firketi/" target="_blank" aria-label="LinkedIn" class="social-li"><i class="ph-fill ph-linkedin-logo" style="color: #0A66C2;"></i></a>
        </div>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
}
