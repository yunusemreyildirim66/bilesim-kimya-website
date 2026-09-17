const fs = require('fs');
let content = fs.readFileSync('css/style.css', 'utf8');
content += `\n.news-sidebar {\n    flex: 0 0 320px;\n}\n@media (max-width: 1024px) {\n    .news-sidebar {\n        flex: 1 1 100%;\n        max-width: 100%;\n    }\n}\n`;
fs.writeFileSync('css/style.css', content);
console.log('Appended successfully');
