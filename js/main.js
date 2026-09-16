document.addEventListener('DOMContentLoaded', () => {

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
(function() {
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
