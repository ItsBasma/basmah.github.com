// Modern Interactive Portfolio JavaScript

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic'
    });
    
    // Initialize all components
    initCounters();
    initProgressRings();
    initBarCharts();
    initDonutChart();
    initSkillBars();
    initInfographics();
    initTimeline();
    initProjects();
    initContactForm();
    initScrollEffects();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Counter animation with intersection observer
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 33);
}

// Initialize progress rings
function initProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring-circle.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const circumference = 2 * Math.PI * 52;
                const percentage = 80;
                const offset = circumference - (percentage / 100) * circumference;
                
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 500);
                
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });
    
    progressRings.forEach(ring => observer.observe(ring));
}

// Initialize bar charts
function initBarCharts() {
    const bars = document.querySelectorAll('.bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const delay = parseInt(bar.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    bar.style.height = bar.style.height;
                }, delay);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => observer.observe(bar));
}

// Initialize donut chart
function initDonutChart() {
    const donutProgress = document.querySelector('.donut-progress');
    
    if (donutProgress) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        donutProgress.style.strokeDashoffset = '50.24';
                    }, 800);
                    observer.unobserve(donutProgress);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(donutProgress);
    }
}

// Initialize skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize infographics
function initInfographics() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Timeline data and initialization
function initTimeline() {
    const timelineData = [
        {
            year: '2024-Present',
            position: 'Senior Customer Journey & Data Analytics Specialist',
            company: 'Leading Financial Institution',
            description: 'Spearheading digital transformation initiatives and optimizing customer experience through advanced analytics and strategic insights.'
        },
        {
            year: '2022-2024',
            position: 'Customer Experience Analytics Manager',
            company: 'Technology Consulting Firm',
            description: 'Led cross-functional teams in designing and implementing data-driven customer journey optimization strategies for enterprise clients.'
        },
        {
            year: '2020-2022',
            position: 'Senior Data Analyst',
            company: 'E-commerce Platform',
            description: 'Developed comprehensive analytics frameworks and predictive models to enhance customer engagement and retention strategies.'
        },
        {
            year: '2018-2020',
            position: 'Business Intelligence Analyst',
            company: 'Retail Corporation',
            description: 'Created interactive dashboards and reporting systems to support strategic decision-making across multiple business units.'
        },
        {
            year: '2017-2018',
            position: 'Junior Data Analyst',
            company: 'Marketing Agency',
            description: 'Analyzed customer behavior patterns and campaign performance metrics to optimize marketing strategies and ROI.'
        }
    ];
    
    const timelineContainer = document.getElementById('timeline-items');
    if (timelineContainer) {
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.setAttribute('data-aos', 'fade-up');
            timelineItem.setAttribute('data-aos-delay', (index * 100).toString());
            
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-position">${item.position}</div>
                    <div class="timeline-company" style="font-weight: 600; color: var(--gray-600); margin-bottom: 8px;">${item.company}</div>
                    <div class="timeline-description">${item.description}</div>
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }
}

// Projects data and initialization
function initProjects() {
    const projectsData = [
        {
            title: 'Customer Journey Analytics Platform',
            description: 'Comprehensive analytics platform providing real-time insights into customer behavior patterns and journey optimization opportunities.',
            icon: 'fas fa-route',
            color: 'var(--primary)',
            tags: ['Python', 'React', 'PostgreSQL', 'Tableau']
        },
        {
            title: 'Predictive Customer Churn Model',
            description: 'Machine learning model predicting customer churn with 94% accuracy, enabling proactive retention strategies.',
            icon: 'fas fa-brain',
            color: 'var(--secondary)',
            tags: ['Python', 'Scikit-learn', 'AWS', 'Docker']
        },
        {
            title: 'Real-time Dashboard Suite',
            description: 'Executive dashboard providing real-time KPI monitoring and automated reporting for strategic decision-making.',
            icon: 'fas fa-chart-line',
            color: 'var(--accent)',
            tags: ['Power BI', 'SQL', 'Azure', 'DAX']
        },
        {
            title: 'Voice of Customer Analytics',
            description: 'Natural language processing system analyzing customer feedback across multiple channels to extract actionable insights.',
            icon: 'fas fa-comments',
            color: 'var(--success)',
            tags: ['Python', 'NLP', 'Sentiment Analysis', 'API']
        }
    ];
    
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsData.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-delay', (index * 100).toString());
            
            const tagsHTML = project.tags.map(tag => 
                `<span class="project-tag">${tag}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-header">
                    <div class="project-icon" style="background: linear-gradient(135deg, ${project.color}, var(--gray-500));">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formButton = this.querySelector('.form-button');
            const originalText = formButton.innerHTML;
            
            formButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            formButton.disabled = true;
            
            setTimeout(() => {
                formButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                
                setTimeout(() => {
                    formButton.innerHTML = originalText;
                    formButton.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Enhanced navbar background on scroll
    const navbar = document.querySelector('.nav-bar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.15)';
            navbar.style.borderBottomColor = 'rgba(37, 99, 235, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.1)';
            navbar.style.borderBottomColor = 'rgba(37, 99, 235, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add interactive elements
    initInteractiveElements();
    
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active state animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Interactive elements initialization
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .skill-category, .project-card, .interest-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.hero-button, .form-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card-glow {
        position: relative;
        overflow: hidden;
    }
    
    .card-glow::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .card-glow:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(rippleStyle);
