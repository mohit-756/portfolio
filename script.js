document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DYNAMIC FOOTER YEAR
       ========================================================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       STICKY HEADER & NAVIGATION ACTIVE LINKS
       ========================================================================== */
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header class toggling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link highlighting on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial execution

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    /* ==========================================================================
       INTERSECTION OBSERVER - SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => element.classList.add('revealed'));
    }

    /* ==========================================================================
       MAGNETIC HOVER EFFECT (PREMIUM MICRO-INTERACTION)
       ========================================================================== */
    const magneticBtns = document.querySelectorAll('.btn-magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button slightly towards the cursor
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Reset to original position smoothly
            btn.style.transform = 'translate(0, 0)';
        });
    });

    /* ==========================================================================
       RADIAL GLOW EFFECT ON EXPERIENCE CARDS
       ========================================================================== */
    const expCards = document.querySelectorAll('.exp-card');

    expCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* ==========================================================================
       DYNAMIC PORTFOLIO WORK GRID FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectGrid = document.getElementById('project-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Quick grid fade-out simulation
            if (projectGrid) {
                projectGrid.style.opacity = '0.3';
                projectGrid.style.transform = 'translateY(10px)';
                projectGrid.style.transition = 'all 0.25s ease';
            }

            setTimeout(() => {
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });

                // Fade back in
                if (projectGrid) {
                    projectGrid.style.opacity = '1';
                    projectGrid.style.transform = 'translateY(0)';
                }
            }, 250);
        });
    });

    /* ==========================================================================
       PREMIUM INTERACTIVE CONTACT FORM & VALIDATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formMessage && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Input Validation check
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFormMessage('Please fill in all details before sending.', 'error');
                return;
            }

            if (!isValidEmail(emailInput.value)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Enter interactive sending state
            setSendingState(true);

            // Simulate form submission delay
            setTimeout(() => {
                setSendingState(false);
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            }, 1800);
        });
    }

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const showFormMessage = (text, type) => {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        
        // Auto dismiss errors after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    };

    const setSendingState = (isLoading) => {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon i');

        if (isLoading) {
            submitBtn.disabled = true;
            btnText.textContent = 'Sending Message...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            submitBtn.style.opacity = '0.8';
        } else {
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
            submitBtn.style.opacity = '1';
        }
    };

    /* ==========================================================================
       BACK TO TOP INTERACTION
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
