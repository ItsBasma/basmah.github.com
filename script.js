// Modern Interactive Portfolio JavaScript - Complete Professional Edition

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic'
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Typing Animation for Hero Name
    const typingElement = document.getElementById('typing-name');
    if (typingElement) {
        const text = 'Alnasair';
        typingElement.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 50);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 50);
    }

    // Intersection Observer for Stats Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Skill Bar Animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Ripple Effect for Buttons
    function createRipple(event) {
        const button = event.currentTarget;
        
        // Remove existing ripples
        const existingRipples = button.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        button.appendChild(circle);
        
        // Remove ripple after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // Add ripple effect to all ripple buttons
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Parallax Effect for Floating Shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const rate = scrolled * -0.3 * (index + 1);
            shape.style.transform = `translateY(${rate}px)`;
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Add click to dismiss
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animations
    document.querySelectorAll('.stat-card, .project-card, .interest-card, .timeline-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        animationObserver.observe(el);
    });

    // Loading Animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Performance optimization: Debounced scroll handler
    let ticking = false;
    
    function updateOnScroll() {
        // Parallax effects and other scroll-based animations
        const scrolled = window.pageYOffset;
        
        // Update floating shapes
        document.querySelectorAll('.floating-shape').forEach((shape, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            shape.style.transform = `translateY(${rate}px)`;
        });
        
        // Update progress indicator if exists
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Theme toggle functionality (if theme switcher is added)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // Print functionality
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Share functionality
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Basmah Alnasair - Portfolio',
                        text: 'Check out this amazing portfolio!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                showNotification('Portfolio link copied to clipboard!', 'success');
            }
        });
    }

    // Easter Egg: Professional Analytics Showcase
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activateAnalyticsShowcase();
            konamiCode = [];
        }
    });

    function activateAnalyticsShowcase() {
        // Add analytics showcase animation
        document.body.style.animation = 'dataFlow 3s ease-in-out';
        showNotification('🚀 Analytics Mode Activated! Welcome to data-driven excellence!', 'success');
        
        // Show additional analytics metrics
        const statsCards = document.querySelectorAll('.stat-card');
        statsCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    card.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
            }, index * 200);
        });
        
        // Remove effect after animation
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }

    // Add analytics showcase keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dataFlow {
            0% { filter: hue-rotate(0deg) brightness(1); }
            25% { filter: hue-rotate(90deg) brightness(1.2); }
            50% { filter: hue-rotate(180deg) brightness(1.1); }
            75% { filter: hue-rotate(270deg) brightness(1.2); }
            100% { filter: hue-rotate(360deg) brightness(1); }
        }
        
        .analytics-mode {
            background: linear-gradient(45deg, #2563eb, #7c3aed, #06b6d4, #10b981);
            background-size: 400% 400%;
            animation: gradientShift 2s ease infinite;
        }
    `;
    document.head.appendChild(style);

    // Professional Development Tracker
    function trackEngagement() {
        const sections = ['home', 'experience', 'skills', 'projects', 'interests', 'contact'];
        const visited = new Set();
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sections.includes(sectionId) && !visited.has(sectionId)) {
                        visited.add(sectionId);
                        
                        // Track professional engagement
                        if (visited.size === sections.length) {
                            showNotification('🎯 Complete portfolio review! Ready for meaningful collaboration.', 'success');
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                sectionObserver.observe(section);
            }
        });
    }

    // Initialize engagement tracking
    trackEngagement();

    // Resume Download Functionality
    const resumeBtn = document.querySelector('.btn-primary');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Simulate resume download
            showNotification('Resume download initiated. Thank you for your interest!', 'success');
            
            // You can replace this with actual resume download logic
            // window.open('path/to/resume.pdf', '_blank');
        });
    }

    // Professional Contact Enhancement
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.contact-details p');
            if (details) {
                navigator.clipboard.writeText(details.textContent);
                showNotification('Contact information copied to clipboard!', 'success');
            }
        });
    });

    // Advanced Analytics Simulation
    function simulateAnalytics() {
        const metrics = {
            pageViews: Math.floor(Math.random() * 1000) + 500,
            engagementRate: (Math.random() * 20 + 80).toFixed(1),
            conversionScore: (Math.random() * 30 + 70).toFixed(1)
        };

        console.log('📊 Portfolio Analytics:', metrics);
        return metrics;
    }

    // Initialize analytics simulation
    setTimeout(simulateAnalytics, 2000);
});
