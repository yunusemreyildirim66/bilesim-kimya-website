const fs = require('fs');
const files = fs.readdirSync('c:/Users/yunus/Desktop/Bileşim Kimya').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const path = `c:/Users/yunus/Desktop/Bileşim Kimya/${file}`;
    let content = fs.readFileSync(path, 'utf8');
    
    // Replace the phone number occurrences with an LTR wrapper
    content = content.replace(/>\+90 212 886 64 64<\/a>/g, '><span dir="ltr">+90 212 886 64 64</span></a>');
    content = content.replace(/<\/i> \+90 212 886 64 64<\/a>/g, '</i> <span dir="ltr">+90 212 886 64 64</span></a>');
    content = content.replace(/<p>\+90 212 886 64 64<\/p>/g, '<p dir="ltr" style="text-align: inherit;">+90 212 886 64 64</p>');
    
    fs.writeFileSync(path, content, 'utf8');
});
console.log('Phone numbers wrapped in LTR');
