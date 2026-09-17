const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Remove icons from legal-links
    if (content.includes('<i class="ph ph-shield-check"></i> ')) {
        content = content.replace(/<i class="ph ph-shield-check"><\/i> /g, '');
        changed = true;
    }
    if (content.includes('<i class="ph ph-cookie"></i> ')) {
        // Only replace it inside the footer link. The floating button also has ph-cookie!
        // We need to be careful not to remove the floating button's icon.
        // Wait, the floating button has `<i class="ph ph-cookie"></i> <span...`
        // Let's explicitly replace the one before the text in the legal-links.
        
        // Actually, we can just replace the exact strings in the footer
        content = content.replace(/<i class="ph ph-shield-check"><\/i>\s*Gizlilik/g, 'Gizlilik');
        content = content.replace(/<i class="ph ph-cookie"><\/i>\s*Çerez/g, 'Çerez');
        content = content.replace(/<i class="ph ph-cookie"><\/i>\s*erez/g, 'erez'); // Handle encoding issues
        content = content.replace(/<i class="ph ph-file-text"><\/i>\s*KVKK/g, 'KVKK');
        
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Removed footer icons in ' + file);
    }
}
