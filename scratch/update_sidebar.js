const fs = require('fs');

let htmlContent = fs.readFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haber-detay.html', 'utf8');

// Update sidebar HTML to add IDs
htmlContent = htmlContent.replace(
    /<h5 style="font-size: 0\.95rem;[^>]*class="hover-red">Yıllık 120\.000 Ton Kapasiteye Ulaşan Tesis\.\.\.<\/h5>\s*<span style="font-size: 0\.8rem;[^>]*><i class="ph ph-calendar-blank"><\/i> 05 Eyl 2026<\/span>/g,
    '<h5 id="sidebar-title-2" style="font-size: 0.95rem; font-weight: 600; color: var(--color-brand-blue-dark); line-height: 1.4; margin-bottom: 0.5rem; transition: color 0.3s ease;" class="hover-red"></h5><span id="sidebar-date-2" style="font-size: 0.8rem; color: var(--color-gray-500);"></span>'
);

htmlContent = htmlContent.replace(
    /<h5 style="font-size: 0\.95rem;[^>]*class="hover-red">Vione ve Biotol Markalarımızda Eko-Dostu\.\.\.<\/h5>\s*<span style="font-size: 0\.8rem;[^>]*><i class="ph ph-calendar-blank"><\/i> 22 Ağu 2026<\/span>/g,
    '<h5 id="sidebar-title-3" style="font-size: 0.95rem; font-weight: 600; color: var(--color-brand-blue-dark); line-height: 1.4; margin-bottom: 0.5rem; transition: color 0.3s ease;" class="hover-red"></h5><span id="sidebar-date-3" style="font-size: 0.8rem; color: var(--color-gray-500);"></span>'
);

htmlContent = htmlContent.replace(
    /<h5 style="font-size: 0\.95rem;[^>]*class="hover-red">ISO 22716 GMP Sertifikamızı Başarıyla\.\.\.<\/h5>\s*<span style="font-size: 0\.8rem;[^>]*><i class="ph ph-calendar-blank"><\/i> 10 Tem 2026<\/span>/g,
    '<h5 id="sidebar-title-6" style="font-size: 0.95rem; font-weight: 600; color: var(--color-brand-blue-dark); line-height: 1.4; margin-bottom: 0.5rem; transition: color 0.3s ease;" class="hover-red"></h5><span id="sidebar-date-6" style="font-size: 0.8rem; color: var(--color-gray-500);"></span>'
);


// Update renderNews to populate sidebar
const renderNewsRegex = /if\(data\) \{\s*const localized = data\[lang\] \|\| data\['tr'\];[\s\S]*?document\.getElementById\("detail-content"\)\.innerHTML = localized\.content;\s*\}/;

const newRenderNewsBody = `if(data) {
                const localized = data[lang] || data['tr'];
                document.getElementById("detail-cat").textContent = localized.category;
                document.getElementById("detail-title").textContent = localized.title;
                document.getElementById("detail-date").innerHTML = '<i class="ph ph-calendar-blank" style="font-size: 1.2rem; color: var(--color-brand-red);"></i> ' + localized.date;
                document.getElementById("detail-img").src = data.image;
                document.getElementById("detail-content").innerHTML = localized.content;
            }

            // Update sidebar
            ['2', '3', '6'].forEach(sid => {
                const sData = newsData[sid];
                if(sData && document.getElementById('sidebar-title-'+sid)) {
                    const sLoc = sData[lang] || sData['tr'];
                    document.getElementById('sidebar-title-'+sid).textContent = sLoc.title.substring(0, 45) + '...';
                    document.getElementById('sidebar-date-'+sid).innerHTML = '<i class="ph ph-calendar-blank"></i> ' + sLoc.date;
                }
            });`;

htmlContent = htmlContent.replace(renderNewsRegex, newRenderNewsBody);

fs.writeFileSync('c:/Users/yunus/Desktop/Bileşim Kimya/haber-detay.html', htmlContent);
console.log('Updated sidebar in haber-detay.html');
