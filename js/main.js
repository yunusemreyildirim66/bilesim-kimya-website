document.addEventListener('DOMContentLoaded', () => {

    /* --- PAGE TRANSITIONS --- */
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');
            
            // Allow default behavior for external links, anchors, modales etc.
            if (href && href.endsWith('.html') && target !== '_blank' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                document.body.classList.add('page-fade-out');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
        });
    });


    /* --- STICKY HEADER --- */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // we can keep it transparent at top, but for better UX let's toggle
            if (window.scrollY <= 10) {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // trigger once on load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    /* --- MOBILE MENU --- */
    const mobileToggle = document.getElementById('mobileToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    if (mobileToggle && closeMenu && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    /* --- COUNTER ANIMATION --- */
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Lower inc to slow and higher to speed up
                    const inc = target / speed;

                    // Check if target is reached
                    if (count < target) {
                        // Add inc to count and output in counter
                        counter.innerText = Math.ceil(count + inc);
                        // Call function every ms
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target.toLocaleString('tr-TR');
                    }
                };

                updateCount();
                observer.unobserve(counter); // Animate only once
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
        root: null,
        threshold: 0.5,
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* --- SMOOTH SCROLLING FOR ANCHOR LINKS --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- FORM SUBMISSION (MOCK) --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic visual feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Gönderiliyor...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerText = "Talebiniz Alındı!";
                submitBtn.style.backgroundColor = "#10b981"; // green success
                submitBtn.style.opacity = "1";
                
                // reset form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ""; // revert to CSS original
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

/* --- GLOBAL MODAL FUNCTIONS --- */
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --- SCROLL TO TOP BUTTON + PROGRESS RING --- */
;(function() {
    // Create button HTML dynamically so it works on every page
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', 'Yukarı çık');
    btn.innerHTML = `
        <svg class="scroll-progress-ring" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
            <circle class="scroll-ring-bg" cx="28" cy="28" r="24"/>
            <circle class="scroll-ring-fill" cx="28" cy="28" r="24"/>
        </svg>
        <i class="ph ph-arrow-up"></i>
    `;
    document.body.appendChild(btn);

    const ring = btn.querySelector('.scroll-ring-fill');
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        const offset = circumference - (progress * circumference);
        ring.style.strokeDashoffset = offset;

        if (scrollTop > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();




// Cookie Consent Logic
const banner = document.getElementById('cookieConsentBanner');
const overlay = document.getElementById('cookieConsentOverlay');
const settingsModal = document.getElementById('cookieSettingsModal');
const floatingBtn = document.getElementById('floatingCookieBtn');

function setBodyScroll(allow) {
    if (allow) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

function checkCookieConsent() {
    const preferences = localStorage.getItem('cookiePreferences');
    if (!preferences) {
        // No consent given yet. Show overlay and banner. Block scroll.
        if (overlay) overlay.classList.add('show');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 300);
        }
        setBodyScroll(false);
        if (floatingBtn) floatingBtn.style.display = 'flex';
    } else {
        // Consent exists. Apply logic (e.g. disable chatbot if needed).
        if (floatingBtn) floatingBtn.style.display = 'flex';
        applyCookieLogic(JSON.parse(preferences));
    }
}

function openCookieSettings() {
    if (banner) banner.classList.remove('show');
    if (overlay) overlay.classList.add('show');
    if (settingsModal) settingsModal.classList.add('show');
    
    // Load current preferences into toggles
    const preferencesStr = localStorage.getItem('cookiePreferences');
    if (preferencesStr) {
        const prefs = JSON.parse(preferencesStr);
        document.getElementById('toggleAnalytics').checked = prefs.analytics;
        document.getElementById('toggleMarketing').checked = prefs.marketing;
        document.getElementById('toggleSupport').checked = prefs.support;
    }
}

function closeCookieSettings() {
    if (settingsModal) settingsModal.classList.remove('show');
    
    const preferences = localStorage.getItem('cookiePreferences');
    if (!preferences) {
        // If closed without saving initially, show banner again
        if (banner) banner.classList.add('show');
    } else {
        if (overlay) overlay.classList.remove('show');
    }
}

function saveCookies(type) {
    const prefs = {
        essential: true,
        analytics: type === 'all',
        marketing: type === 'all',
        support: type === 'all'
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    closeConsentUI();
    applyCookieLogic(prefs);
}

function saveCustomCookies() {
    const prefs = {
        essential: true,
        analytics: document.getElementById('toggleAnalytics').checked,
        marketing: document.getElementById('toggleMarketing').checked,
        support: document.getElementById('toggleSupport').checked
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    if (settingsModal) settingsModal.classList.remove('show');
    closeConsentUI();
    applyCookieLogic(prefs);
}

function closeConsentUI() {
    if (banner) banner.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    setBodyScroll(true);
    if (floatingBtn) floatingBtn.style.display = 'flex';
}

function applyCookieLogic(prefs) {
    // Example logic: if Support is false, hide the Chatbot toggle
    const chatbotToggle = document.getElementById('bk-chat-toggle');
    if (chatbotToggle) {
        if (prefs.support) {
            chatbotToggle.style.display = 'flex';
        } else {
            chatbotToggle.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', checkCookieConsent);


// --- Haberler Page Dynamic Rendering ---
function renderNewsGrid(lang) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    if (typeof newsData === 'undefined') return;
    
    let html = '';
    
    Object.entries(newsData).forEach(([id, news]) => {
        const data = news[lang] || news['tr'];
        const btnText = (translations[lang] && translations[lang]['news_btn']) ? translations[lang]['news_btn'] : translations['tr']['news_btn'];
        
        // Use RTL arrow if language is Arabic
        const arrowClass = (lang === 'ar') ? 'ph-arrow-left' : 'ph-arrow-right';
        
        let description = data.desc;
        if (!description && data.content) {
            description = data.content.replace(/<[^>]*>?/gm, ''); // strip HTML
            if (description.length > 95) {
                description = description.substring(0, 95) + '...';
            }
        }
        
        html += `
        <div class="news-card">
            <div class="news-img" style="background-image: url('${news.image}');"></div>
            <div class="news-content">
                <span class="news-cat">${data.category}</span>
                <h3>${data.title}</h3>
                <p>${description}</p>
                <a href="haber-detay.html#id=${id}" class="news-link">${btnText} <i class="ph ${arrowClass}"></i></a>
            </div>
        </div>
        `;
    });
    
    grid.innerHTML = html;
}

window.addEventListener('languageChanged', (e) => {
    renderNewsGrid(e.detail.lang);
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof currentLanguage !== 'undefined') {
        renderNewsGrid(currentLanguage);
    } else {
        const savedLang = localStorage.getItem('bilesim_lang') || 'tr';
        renderNewsGrid(savedLang);
    }
});
