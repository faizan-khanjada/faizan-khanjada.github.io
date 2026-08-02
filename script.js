document.addEventListener('DOMContentLoaded', () => {

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();


    // Staggered card entrance animations
    // Cards slide in after the parent section has revealed
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.skill-card, .project-card');
                // Wait for section reveal transition (0.8s) before staggering cards
                setTimeout(() => {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('card-visible');
                        }, index * 120);
                    });
                }, 500);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
        cardObserver.observe(grid);
    });


    // Section reveal
    const sectionObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-hidden').forEach(el => sectionObserver.observe(el));


    // Cursor spotlight
    // Smooth radial glow that follows the mouse
    const spotlight = document.getElementById('cursor-spotlight');

    // Use requestAnimationFrame for buttery-smooth tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hide spotlight when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
    });

    function animateSpotlight() {
        // Lerp (linear interpolation) for smooth lag effect
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        spotlight.style.left = `${currentX}px`;
        spotlight.style.top  = `${currentY}px`;
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();


    // Scroll progress indicator
    // Thin indigo line at top that fills as you scroll
    const progressBar = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const scrollTop    = window.scrollY;
        const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrolled}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Set on load


    // Active nav link on scroll
    // Highlights the nav link matching the visible section
    const sections    = document.querySelectorAll('section[id]');
    const navAnchors  = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        let currentSection = '';
        const scrollMid = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionH   = section.offsetHeight;
            if (scrollMid >= sectionTop && scrollMid < sectionTop + sectionH) {
                currentSection = section.getAttribute('id');
            }
        });

        navAnchors.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('nav-active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav(); // Set on load


    // Navbar scroll shrink
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding    = '15px 0';
            navbar.style.boxShadow  = '0 4px 30px rgba(0, 0, 0, 0.15)';
            navbar.style.background = 'rgba(2, 6, 23, 0.97)';
        } else {
            navbar.style.padding    = '20px 0';
            navbar.style.boxShadow  = 'none';
            navbar.style.background = 'rgba(2, 6, 23, 0.8)';
        }
    }, { passive: true });


    // Mobile menu toggle
    const mobileBtn  = document.querySelector('.mobile-menu-btn');
    const navLinks   = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            if (isOpen) {
                navLinks.style.cssText = '';
            } else {
                Object.assign(navLinks.style, {
                    display:       'flex',
                    flexDirection: 'column',
                    position:      'absolute',
                    top:           '100%',
                    left:          '0',
                    width:         '100%',
                    background:    'rgba(2, 6, 23, 0.97)',
                    padding:       '20px',
                    borderBottom:  '1px solid rgba(255,255,255,0.05)',
                    gap:           '20px'
                });
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.cssText = '';
            });
        });
    }

});
