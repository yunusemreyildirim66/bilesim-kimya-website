const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it actually contains double-encoded characters like Ä° or Ã¼
    if (content.includes('Ä°') || content.includes('Ã¼') || content.includes('ÅŸ') || content.includes('Ä±') || content.includes('Ã§')) {
        // Reverse the double UTF-8 encoding
        // The corrupted string was interpreted as Windows-1252/latin1.
        // We convert the string to a latin1 buffer (getting back the original UTF-8 bytes)
        // and then decode those bytes as utf8.
        try {
            const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
            fs.writeFileSync(file, fixedContent);
            console.log('Fixed encoding in ' + file);
        } catch (e) {
            console.error('Failed to fix ' + file + ':', e);
        }
    } else {
        console.log('No encoding issues found in ' + file);
    }
}
