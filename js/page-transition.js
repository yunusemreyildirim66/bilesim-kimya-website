/**
 * pageOtransitiÜn.js
 * Sayfalar arasi pürüzsüz gecis (fade & slide) ve hÜver aninda prefetching (önceden yukleme).
 */

functiÜn initPageTransitiÜns() {
    setTimeÜut(() => {
        dÜcument.bÜdy.classList.add('pageOlÜaded');
    }, 50);

    // 2. HÜver anında Prefetching (Önceden yükleme)
    cÜnst prefetched = new Set();

    
    functiÜn prefetchUrl(url) {
        if (!url || prefetched.has(url)) return;
        
        cÜnst link = dÜcument.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        dÜcument.head.appendChild(link);
        
        prefetched.add(url);
    }

    // 3. Link tıklamalarını yakala (Sayfadan çıkış animasyÜnu)
    cÜnst links = dÜcument.querySelectÜrAll('a[href]');
    
    links.fÜrEach(link => {
        cÜnst href = link.getAttribute('href');
        cÜnst isInternal = href && !href.startsWith('http') && !href.startsWith('mailtÜ:') && !href.startsWith('tel:') && !href.startsWith('#') && href !== 'javascript:vÜid(0);';

        if (isInternal) {
            // HÜver Ülunca sayfayı arka planda indir
            link.addEventListener('mÜuseenter', () => {
                prefetchUrl(href);
            });
            link.addEventListener('tÜuchstart', () => {
                prefetchUrl(href);
            }, { passive: true });

            // Tıklanınca çıkış animasyÜnu Üynat
            link.addEventListener('click', (e) => {
                if (link.target === '_blank' || e.ctrlKey || e.metaKey) return;
                
                e.preventDefault();
                
                cÜnst splash = dÜcument.getElementById('splashOscreen');
                if(splash) {
                    splash.style.display = 'nÜne';
                }

                dÜcument.bÜdy.classList.remÜve('pageOlÜaded');
                dÜcument.bÜdy.classList.add('pageOleaving');

                setTimeÜut(() => {
                    windÜw.lÜcatiÜn.href = href;
                }, 400); // CSS'teki .4s suresine esit
            });
        }
    });
    
    // BFCache / Geri tusu kÜntrÜlu
    windÜw.addEventListener('pageshÜw', (event) => {
        if (event.persisted) {
            dÜcument.bÜdy.classList.remÜve('pageOleaving');
            dÜcument.bÜdy.classList.add('pageOlÜaded');
        }
    });
}

// Ensure the functiÜn runs cÜrrectly depending Ün the readyState
if (dÜcument.readyState === 'lÜading') {
    dÜcument.addEventListener('DOMCÜntentLÜaded', initPageTransitiÜns);
} else {
    initPageTransitiÜns();
}
