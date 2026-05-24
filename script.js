document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DYNAMIC FOOTER YEAR
       ========================================================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       LIGHT & DARK THEME TOGGLE (RECOMMENDATION 3)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            const isLightActive = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLightActive ? 'light' : 'dark');
            
            if (themeIcon) {
                themeIcon.className = isLightActive ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Interactive micro-bounce animation on toggle click
            themeToggleBtn.style.transform = 'scale(0.85)';
            setTimeout(() => {
                themeToggleBtn.style.transform = 'none';
            }, 150);
        });
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

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFormMessage('Please fill in all details before sending.', 'error');
                return;
            }

            if (!isValidEmail(emailInput.value)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            setSendingState(true);

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

    /* ==========================================================================
       AI PORTFOLIO CHATBOT WIDGET (RECOMMENDATION 1)
       ========================================================================== */
    const aiToggle = document.getElementById('ai-toggle');
    const aiClose = document.getElementById('ai-close');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatForm = document.getElementById('ai-chat-form');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Toggle Chat Window Open/Closed
    if (aiToggle && aiChatWindow) {
        aiToggle.addEventListener('click', () => {
            aiChatWindow.classList.toggle('open');
            // Hide notification red pulse once opened
            const pulseDot = aiToggle.querySelector('.pulse-dot');
            if (pulseDot) pulseDot.style.display = 'none';

            // Focus on input if opened
            if (aiChatWindow.classList.contains('open')) {
                setTimeout(() => aiChatInput.focus(), 300);
            }
        });
    }

    if (aiClose && aiChatWindow) {
        aiClose.addEventListener('click', () => {
            aiChatWindow.classList.remove('open');
        });
    }

    // Handle Suggestions Clicks
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (question) {
                handleUserQuestion(question);
            }
        });
    });

    // Handle Form Submit (User Type Question)
    if (aiChatForm) {
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const question = aiChatInput.value.trim();
            if (question) {
                handleUserQuestion(question);
                aiChatInput.value = '';
            }
        });
    }

    // Process User Question and generate dynamic response
    const handleUserQuestion = (text) => {
        // 1. Render User Message
        appendMessage(text, 'user');

        // Scroll messages list to bottom
        scrollToBottom();

        // 2. Trigger bot typing response simulation
        setTimeout(() => {
            const responseText = getNLPResponse(text);
            appendMessage(responseText, 'bot');
            scrollToBottom();
        }, 600);
    };

    const appendMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-msg ${sender}`;
        
        // Render rich HTML bullets and anchors correctly
        messageDiv.innerHTML = text.replace(/\n/g, '<br>');
        aiChatMessages.appendChild(messageDiv);
    };

    const scrollToBottom = () => {
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    };

    // Client-side NLP Intent Matcher
    const getNLPResponse = (query) => {
        const text = query.toLowerCase();

        // Intent 1: Technical Skills & Technologies
        if (matchKeywords(text, ['skill', 'programming', 'language', 'technologies', 'framework', 'libraries', 'stack'])) {
            return `Mohit's technical stack is highly geared towards **AI/ML** and **Full-Stack Engineering**:\n\n` +
                   `• **Programming**: Python, Java, C\n` +
                   `• **AI & NLP**: LangChain, Ollama, ChromaDB, HuggingFace embeddings, TF-IDF, RAG pipelines, MLOps\n` +
                   `• **Frameworks**: FastAPI, Spring Boot, React (Vite), Angular, H2, SQLite\n` +
                   `• **DevOps & Cloud**: AWS (EC2, S3, CloudFront), Git, GitHub, REST APIs`;
        }

        // Intent 2: Internship Experience at Quadrant Technologies
        if (matchKeywords(text, ['quadrant', 'experience', 'work', 'intern', 'job', 'hyderabad'])) {
            return `Mohit served as a **Software Engineer Intern** at **Quadrant Technologies, Hyderabad** (Dec 2025 – May 2026):\n\n` +
                   `• Engineered an automated resume parsing & screening tool in Python, **reducing manual shortlisting efforts by 40%**.\n` +
                   `• Implemented TF-IDF text alignment similarity across 500+ candidates.\n` +
                   `• Designed SQL candidate status database queries for highly efficient, scalable candidate tracking.`;
        }

        // Intent 3: RAG learning Companion Project
        if (matchKeywords(text, ['rag', 'learning companion', 'study assistant', 'ollama', 'chromadb', 'langchain'])) {
            return `The **AI Learning Companion** is a local LLM study assistant built using **Python, LangChain, Ollama, and ChromaDB**:\n\n` +
                   `• Ingests PDF, DOCX, and images automatically, encoding them using HuggingFace embeddings inside ChromaDB.\n` +
                   `• Generates contextual answers, automated study guides, quizzes, and summaries based entirely on study notes, completely preventing hallucinations!`;
        }

        // Intent 4: Interview Bot Project
        if (matchKeywords(text, ['interview', 'proctoring', 'fastapi', 'scoring', 'cv', 'webcam', 'react'])) {
            return `The **AI Interview & Proctoring System** is a full-stack platform built with **FastAPI and React (Vite)**:\n\n` +
                   `• Incorporates an automated NLP scoring engine (TF-IDF keyword similarity) that **cut grading evaluation times by 50%**.\n` +
                   `• Integrates webcam face gaze-tracking computer vision scripts to log multiple faces or gaze deviation for HR security auditing.`;
        }

        // Intent 5: Movie Ticket System
        if (matchKeywords(text, ['movie', 'booking', 'ticket', 'spring boot', 'java'])) {
            return `The **Movie Ticket Booking System** is an enterprise full-stack project built in **Spring Boot, Java, and AngularJS**:\n\n` +
                   `• Employs Hibernate transactional locks to prevent double-booking seats during active show bookings.\n` +
                   `• Features automated seeder scripts for active movie schedules and a responsive Angular UI.`;
        }

        // Intent 6: Contact details
        if (matchKeywords(text, ['contact', 'email', 'phone', 'hire', 'phone number', 'reach', 'socials', 'linkedin', 'github'])) {
            return `Here is how you can get in touch with Mohit directly:\n\n` +
                   `• 📧 **Email**: mohitcheedala@gmail.com\n` +
                   `• 📞 **Phone**: +91 75692 21183\n` +
                   `• 💼 **LinkedIn**: <a href="https://linkedin.com/in/mohit-cheedella" target="_blank" class="glow-link-footer">linkedin.com/in/mohit-cheedella</a>\n` +
                   `• 🐙 **GitHub**: <a href="https://github.com/mohit-756" target="_blank" class="glow-link-footer">github.com/mohit-756</a>`;
        }

        // Intent 7: Education & College
        if (matchKeywords(text, ['education', 'college', 'degree', 'study', 'btech', 'rvr', 'guntur', 'cgpa'])) {
            return `Mohit is a final-year **B.Tech Computer Science Engineering (AI & ML)** student at **RVR & JC College of Engineering, Guntur** (graduating class of 2026).\n\n` +
                   `His specialization focuses heavily on Natural Language Processing, Machine Learning models, and Database Management Systems.`;
        }

        // Intent 8: Volunteering / MAD Fellowship
        if (matchKeywords(text, ['volunteer', 'make a difference', 'mad', 'fellow', 'vice captain'])) {
            return `Mohit is a **Volunteer Vice Captain & MAD Fellow** at MakeADifference (MAD):\n\n` +
                   `• Leads a team of **15+ volunteers** teaching academic and life skills to underprivileged children.\n` +
                   `• Manages onboarding documentation, feedback mechanisms, and impact data collection pipelines.`;
        }

        // Intent 9: Greetings
        if (matchKeywords(text, ['hi', 'hello', 'hey', 'greetings', 'introduce', 'who are you'])) {
            return `Hello there! I'm Mohit's custom portfolio AI assistant.\n\n` +
                   `I can guide you through his FastAPI/React projects, his Python work history, or his contact information. What details are you looking for?`;
        }

        // Intent 10: Deploy / Host / Portfolio
        if (matchKeywords(text, ['deploy', 'host', 'website', 'pages', 'huggingface'])) {
            return `This portfolio is hosted 100% free using **GitHub Pages**!\n\n` +
                   `For his AI/ML projects, Mohit utilizes **HuggingFace Spaces** (which hosts LLM/FastAPI backends for free) and **Render** to deploy scalable server-side systems.`;
        }

        // Default intent fallback
        return `I'm not fully sure about that question, but I'm trained to assist you with Mohit's professional history! \n\n` +
               `Feel free to click one of the quick suggestions below, or ask me about: \n` +
               `• His **technical skills** \n` +
               `• His **RAG study companion** \n` +
               `• His **work history at Quadrant** \n` +
               `• How to **hire/contact** him`;
    };

    const matchKeywords = (text, keywords) => {
        return keywords.some(keyword => text.includes(keyword));
    };
});
