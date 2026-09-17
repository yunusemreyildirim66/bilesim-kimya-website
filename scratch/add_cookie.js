const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldLegalLinks = `<div class="legal-links">
                    <a href="#" onclick="openModal('privacyModal'); return false;" data-i18n="footer_privacy">Gizlilik Politikası</a>
                    <a href="#" onclick="openModal('kvkkModal'); return false;" data-i18n="footer_kvkk">KVKK</a>
                </div>`;
const newLegalLinks = `<div class="legal-links">
                    <a href="#" onclick="openModal('privacyModal'); return false;" data-i18n="footer_privacy"><i class="ph ph-shield-check"></i> Gizlilik Politikası</a>
                    <a href="#" onclick="openModal('cookieModal'); return false;" data-i18n="footer_cookie"><i class="ph ph-cookie"></i> Çerez Politikası</a>
                    <a href="#" onclick="openModal('kvkkModal'); return false;" data-i18n="footer_kvkk"><i class="ph ph-file-text"></i> KVKK</a>
                </div>`;

const cookieModalHTML = `
    <div class="custom-modal" id="cookieModal">
        <div class="modal-overlay" onclick="closeModal('cookieModal')"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal('cookieModal')"><i class="ph ph-x"></i></button>
            <h3 data-i18n="footer_cookie">Çerez Politikası</h3>
            <div class="modal-body">
                <p>Bileşim Kimya web sitesi, kullanıcı deneyimini geliştirmek ve site ziyaretçilerine daha iyi hizmet sunmak amacıyla çerezler (cookies) kullanmaktadır.</p>
                <p>Zorunlu çerezler sitenin temel işlevleri için gereklidir. Performans ve analiz çerezleri ise sitemizi nasıl kullandığınızı anlayarak geliştirmemize yardımcı olur.</p>
                <p>Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman yönetebilir veya devre dışı bırakabilirsiniz.</p>
            </div>
        </div>
    </div>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the legal links
    if (content.includes(oldLegalLinks)) {
        content = content.replace(oldLegalLinks, newLegalLinks);
    } else if (content.includes('footer_privacy') && !content.includes('cookieModal')) {
        // Fallback replacement if exact spacing doesn't match
        content = content.replace(
            /<div class="legal-links">[\s\S]*?<\/div>/,
            newLegalLinks
        );
    }

    // Add cookie modal after privacy modal
    if (!content.includes('id="cookieModal"')) {
        content = content.replace(
            /<div class="custom-modal" id="privacyModal">[\s\S]*?<\/div>\s*<\/div>/,
            match => cookieModalHTML + '\n' + match
        );
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated cookies in ' + file);
}
