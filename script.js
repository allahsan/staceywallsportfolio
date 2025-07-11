// Progress Bar
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effects
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe reveal text elements
document.querySelectorAll('.reveal-text').forEach(el => {
    observer.observe(el);
});

// Observe section titles and subtitles
document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    observer.observe(el);
});

// Card tilt effect
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const floatingElements = document.querySelectorAll('.float-element');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Parallax for floating elements
    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Enhanced hover effects for company cards
const companyCards = document.querySelectorAll('.company-card');

companyCards.forEach(card => {
    const metrics = card.querySelectorAll('.metric');
    
    card.addEventListener('mouseenter', () => {
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.transform = 'scale(1.05) translateY(-5px)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        metrics.forEach(metric => {
            metric.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// Animated counter for metrics
const animateCounters = () => {
    const counters = document.querySelectorAll('.metric[data-number]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.number);
        const numberElement = counter.querySelector('.metric-number');
        const originalText = numberElement.textContent;
        
        // Only animate if it's a pure number AND doesn't contain special characters
        if (!isNaN(target) && !originalText.includes('>') && !originalText.includes('st') && !originalText.includes('/') && !originalText.includes('+')) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current);
            }, 30);
        }
        // For non-numeric values, keep the original text
    });
};

// Trigger counter animation when results section is visible
const resultsSection = document.getElementById('results');
const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            resultsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.5 });

if (resultsSection) {
    resultsObserver.observe(resultsSection);
}

// Enhanced video interaction
const videoContainer = document.querySelector('.video-container');

if (videoContainer) {
    console.log('Video container found and ready');
}

// Dynamic text animations
const dynamicTexts = document.querySelectorAll('.hero-title .word');

dynamicTexts.forEach((word, index) => {
    word.style.animationDelay = `${index * 0.2}s`;
});

// Interactive navigation indicator
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], .full-width-section');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id') || section.className.split(' ')[0];
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current || (current.includes(href) && href !== '')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Advanced micro-interactions
const interactiveCards = document.querySelectorAll('.interactive-card');

interactiveCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: var(--accent-gold);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Smooth reveal for elements
const revealElements = document.querySelectorAll('.kaizen-item, .vision-card, .experience-card, .company-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Enhanced button interactions
const ctaButton = document.querySelector('.hero-cta');

if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization - Intersection Observer for expensive animations
const expensiveAnimations = document.querySelectorAll('.hero-bg, .floating-elements');

const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
});

expensiveAnimations.forEach(el => {
    performanceObserver.observe(el);
});

// Mobile-specific enhancements
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    // Disable complex animations on mobile for better performance
    document.body.classList.add('mobile-device');
    
    // Simplify interactions for touch devices
    interactiveCards.forEach(card => {
        card.style.transform = 'none';
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Scroll-triggered animations for better UX
const scrollTriggers = [
    {
        element: '.kaizen-container',
        class: 'animate-stagger',
        offset: 100
    },
    {
        element: '.company-grid',
        class: 'animate-fade-up',
        offset: 150
    }
];

function handleScrollTriggers() {
    scrollTriggers.forEach(trigger => {
        const element = document.querySelector(trigger.element);
        if (element) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - trigger.offset;
            
            if (isVisible && !element.classList.contains(trigger.class)) {
                element.classList.add(trigger.class);
            }
        }
    });
}

window.addEventListener('scroll', handleScrollTriggers);

// Add stagger animation styles
const staggerStyle = document.createElement('style');
staggerStyle.textContent = `
    .animate-stagger .kaizen-item {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animate-stagger .kaizen-item:nth-child(1) { animation-delay: 0.1s; }
    .animate-stagger .kaizen-item:nth-child(2) { animation-delay: 0.2s; }
    .animate-stagger .kaizen-item:nth-child(3) { animation-delay: 0.3s; }
    
    .animate-fade-up .company-card {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animate-fade-up .company-card:nth-child(1) { animation-delay: 0.1s; }
    .animate-fade-up .company-card:nth-child(2) { animation-delay: 0.2s; }
    .animate-fade-up .company-card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-device .cursor,
    .mobile-device .cursor-follower {
        display: none !important;
    }
    
    .mobile-device .interactive-card[data-tilt] {
        transform: none !important;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-gold) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(staggerStyle);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    updateProgressBar();
    updateActiveNavLink();
    
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-title .word');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform';
    });
    
    // Clean up will-change after animations
    setTimeout(() => {
        criticalElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 2000);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateProgressBar();
        
        // Recalculate positions for mobile/desktop switch
        if (window.innerWidth > 768 && document.body.classList.contains('mobile-device')) {
            document.body.classList.remove('mobile-device');
            location.reload(); // Reload to restore full interactions
        } else if (window.innerWidth <= 768 && !document.body.classList.contains('mobile-device')) {
            document.body.classList.add('mobile-device');
        }
    }, 250);
});

// Enhanced loading experience
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-subtitle, .hero-description, .hero-cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Error handling for video
const iframe = document.querySelector('.video-container iframe');
if (iframe) {
    iframe.addEventListener('error', () => {
        console.log('Video failed to load, showing fallback');
        const fallback = document.createElement('div');
        fallback.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--secondary-dark); color: var(--text-muted);">
                <p>Video temporarily unavailable</p>
            </div>
        `;
        iframe.parentNode.replaceChild(fallback, iframe);
    });
}
