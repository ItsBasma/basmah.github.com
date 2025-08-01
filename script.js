// Modern Portfolio JavaScript

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
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
    const increment = target / 60; // Smoother animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 33); // ~60fps
}

// Initialize progress rings
function initProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring-circle.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const circumference = 2 * Math.PI * 52; // radius = 52
                const percentage = 80; // 80% progress for experience
                const offset = circumference - (percentage / 100) * circumference;
                
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 500);
                
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.3 });
    
    progressRings.forEach(ring => observer.observe(ring));
}

// Initialize bar charts
function initBarCharts() {
    const bars = document.querySelectorAll('.bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const delay = parseInt(bar.getAttribute('data-delay')) || 1000;
                
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, delay);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    bars.forEach(bar => {
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        observer.observe(bar);
    });
}

// Initialize donut chart
function initDonutChart() {
    const donutProgress = document.querySelector('.donut-progress');
    
    if (donutProgress) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        donutProgress.style.strokeDashoffset = '50.24'; // 80% of circumference
                    }, 800);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(donutProgress);
    }
}

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width;
                }, Math.random() * 500 + 200); // Random delay for staggered effect
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize infographics animations
function initInfographics() {
    // Gauge chart animation
    const gaugeProgress = document.querySelector('.gauge-progress');
    const gaugeNeedle = document.querySelector('.gauge-needle');
    
    if (gaugeProgress && gaugeNeedle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        gaugeProgress.style.strokeDashoffset = '75.36'; // 70% progress
                        gaugeNeedle.style.transform = 'rotate(126deg)'; // Rotate to 70%
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(gaugeProgress);
    }
    
    // Funnel chart animation
    const funnelStages = document.querySelectorAll('.funnel-stage');
    funnelStages.forEach((stage, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        stage.style.transform = 'translateX(0)';
                        stage.style.opacity = '1';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        stage.style.transform = 'translateX(-50px)';
        stage.style.opacity = '0';
        stage.style.transition = 'all 0.6s ease-out';
        observer.observe(stage);
    });
    
    // Radar chart animation
    const radarData = document.querySelector('.radar-data');
    if (radarData) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        radarData.style.opacity = '1';
                        radarData.style.transform = 'scale(1)';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        radarData.style.opacity = '0';
        radarData.style.transform = 'scale(0.5)';
        radarData.style.transition = 'all 1s ease-out';
        observer.observe(radarData);
    }
    
    // ROI metrics counter animation
    const roiValues = document.querySelectorAll('.roi-value');
    roiValues.forEach(value => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const originalText = value.textContent;
                    const isIncrease = originalText.includes('+');
                    const isDecrease = originalText.includes('-');
                    const number = parseInt(originalText.match(/\d+/)[0]);
                    
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            value.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            const prefix = isIncrease ? '+' : isDecrease ? '-' : '';
                            value.textContent = prefix + Math.ceil(current) + '%';
                        }
                    }, 50);
                    
                    observer.unobserve(value);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(value);
    });
}

// Timeline data and initialization
function initTimeline() {
    const timelineData = [
        {
            id: 1,
            title: "Senior Customer Journey Specialist",
            company: "Communications, Space & Technology Commission (CST)",
            period: "May 2025 - Present",
            description: "Designed and optimized end-to-end customer journeys across CST services and digital platforms such as 'Mutaseel,' ensuring accessibility, transparency, and efficiency. Gathered and analyzed qualitative and quantitative customer data to drive strategic improvements aligned with National Vision goals.",
            icon: "fas fa-crown",
            color: "#d97706",
            side: "left"
        },
        {
            id: 2,
            title: "Business Experience Specialist",
            company: "Communications, Space & Technology Commission (CST)",
            period: "January 2023 - June 2025",
            description: "Led cross-sector workshops and conducted comprehensive requirements analysis to support commission goals. Collaborated with policy, regulatory, and technical teams to implement digital transformation initiatives.",
            icon: "fas fa-chart-line",
            color: "#2563eb",
            side: "right"
        },
        {
            id: 3,
            title: "CX Analyst",
            company: "Huawei (STC Project)",
            period: "November 2021 - December 2022",
            description: "Collected and analyzed Arabic Twitter data using Python (Tweepy, snscrape). Developed sentiment classification models using Naive Bayes, Decision Trees, and SVM algorithms. Created interactive Tableau dashboards delivering data-driven CX recommendations.",
            icon: "fas fa-brain",
            color: "#be123c",
            side: "left"
        },
        {
            id: 4,
            title: "MSc Computing (Data Analytics)",
            company: "Princess Nourah Bint Abdulrahman University",
            period: "2021 | GPA 4.72/5",
            description: "Specialized in data analytics with master's dissertation in Facial Expression Recognition using CNN. Graduated with honors with exceptional academic performance.",
            icon: "fas fa-graduation-cap",
            color: "#059669",
            side: "right"
        },
        {
            id: 5,
            title: "R&D Intern",
            company: "Omnifia | MISK Virtual Internships",
            period: "September 2021 - December 2021",
            description: "Completed 360-hour virtual internship developing TypeScript integrations and analyzing Elasticsearch data. Enhanced professional development through CareerBridge curriculum covering NACE Career Readiness competencies.",
            icon: "fas fa-code",
            color: "#06b6d4",
            side: "left"
        }
    ];
    
    const container = document.getElementById('timeline-items');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', 'fade-up');
        timelineItem.setAttribute('data-aos-delay', index * 150);
        
        if (item.side === 'left') {
            timelineItem.innerHTML = `
                <div class="timeline-content" style="margin-right: auto;">
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; line-height: 1.3;">${item.title}</h3>
                    <p style="color: var(--secondary); margin-bottom: 12px; font-weight: 600; font-size: 1.1rem;">${item.company}</p>
                    <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 16px; background: var(--gray-100); padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 500;">${item.period}</p>
                    <p style="color: var(--gray-600); line-height: 1.6;">${item.description}</p>
                </div>
                <div class="timeline-icon" style="background-color: ${item.color};">
                    <i class="${item.icon}"></i>
                </div>
                <div style="width: calc(50% - 40px);"></div>
            `;
        } else {
            timelineItem.innerHTML = `
                <div style="width: calc(50% - 40px);"></div>
                <div class="timeline-icon" style="background-color: ${item.color};">
                    <i class="${item.icon}"></i>
                </div>
                <div class="timeline-content" style="margin-left: auto;">
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; line-height: 1.3;">${item.title}</h3>
                    <p style="color: var(--secondary); margin-bottom: 12px; font-weight: 600; font-size: 1.1rem;">${item.company}</p>
                    <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 16px; background: var(--gray-100); padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 500;">${item.period}</p>
                    <p style="color: var(--gray-600); line-height: 1.6;">${item.description}</p>
                </div>
            `;
        }
        
        container.appendChild(timelineItem);
    });
}

// Projects data and initialization
function initProjects() {
    const projects = [
        {
            id: 1,
            title: "Supermarket Sales Analysis",
            description: "Comprehensive analysis of retail sales data to identify patterns, trends, and optimization opportunities using advanced statistical methods and machine learning algorithms.",
            tags: ["Data Analysis", "Retail Analytics", "Business Intelligence", "Python"],
            category: "Business Analytics",
            gradient: "linear-gradient(135deg, #2563eb, #06b6d4)"
        },
        {
            id: 2,
            title: "Employee Attrition Prediction",
            description: "Predictive analytics project to identify factors contributing to employee turnover and develop retention strategies using machine learning models.",
            tags: ["Predictive Analytics", "HR Analytics", "Data Mining", "Tableau"],
            category: "Human Resources",
            gradient: "linear-gradient(135deg, #be123c, #d97706)"
        },
        {
            id: 3,
            title: "Employee Promotion Prediction",
            description: "Advanced data mining techniques to predict employee promotion eligibility and career advancement patterns with 94% accuracy.",
            tags: ["Data Mining", "Career Analytics", "Predictive Modeling", "SQL"],
            category: "Human Resources",
            gradient: "linear-gradient(135deg, #059669, #06b6d4)"
        },
        {
            id: 4,
            title: "Heart Disease Prediction System",
            description: "Machine learning model for predicting heart disease risk using patient data and medical indicators with ensemble methods.",
            tags: ["Healthcare ML", "Risk Prediction", "Medical Data", "Deep Learning"],
            category: "Healthcare Analytics",
            gradient: "linear-gradient(135deg, #1a1a1a, #be123c)"
        },
        {
            id: 5,
            title: "Twitter Data Extraction Pipeline",
            description: "Robust data pipeline for extracting and processing Twitter data for sentiment analysis using cloud-based architecture.",
            tags: ["Data Pipeline", "API Integration", "NLP", "Cloud Computing"],
            category: "Social Media Analytics",
            gradient: "linear-gradient(135deg, #374151, #1f2937)"
        },
        {
            id: 6,
            title: "Facial Expression Recognition CNN",
            description: "Deep learning model using Convolutional Neural Networks for real-time facial expression recognition with 92% accuracy.",
            tags: ["Deep Learning", "Computer Vision", "CNN", "TensorFlow"],
            category: "Computer Vision",
            gradient: "linear-gradient(135deg, #9333ea, #c084fc)"
        }
    ];
    
    const container = document.getElementById('projects-container');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', index * 100);
        
        projectCard.innerHTML = `
            <div class="project-header" style="background: ${project.gradient};">
                <div style="text-align: center; color: white;">
                    <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.9;"></i>
                    <h4 style="font-size: 1.2rem; font-weight: 600; opacity: 0.95;">${project.category}</h4>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name') || form.querySelector('input[placeholder="Your Name"]').value;
            const email = formData.get('email') || form.querySelector('input[placeholder="Your Email"]').value;
            const subject = formData.get('subject') || form.querySelector('input[placeholder="Subject"]').value;
            const message = formData.get('message') || form.querySelector('textarea').value;
            
            // Create mailto link
            const mailtoLink = `mailto:BasmaOkla@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const button = form.querySelector('.form-button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            button.style.background = 'linear-gradient(135deg, var(--success), var(--accent))';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(135deg, var(--burgundy), var(--warning))';
                form.reset();
            }, 3000);
        });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.nav-bar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'linear-gradient(135deg, var(--burgundy) 0%, #8b1538 25%, #6b1029 50%, #4a0b1c 75%, #2a0610 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 21, 56, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--burgundy) 0%, #8b1538 25%, #6b1029 50%, #4a0b1c 75%, #2a0610 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(139, 21, 56, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Parallax effect for background circles
    const circles = document.querySelectorAll('.bg-circle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.2;
            circle.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Utility function for random number generation
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.log('Portfolio Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Portfolio Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
