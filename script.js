// Smooth scroll to sections
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe game cards and feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card, .feature, .metric, .roadmap-item');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add click handlers for nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            scrollTo(href.substring(1));
        });
    });

    // Parallax effect on hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });

    // Counter animation for metrics
    const counterElements = document.querySelectorAll('.metric-number');
    const startCounting = () => {
        counterElements.forEach(element => {
            if (element.dataset.animated) return;

            const finalValue = parseInt(element.textContent);
            const increment = Math.ceil(finalValue / 50);
            let currentValue = 0;

            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    element.textContent = finalValue;
                    element.dataset.animated = 'true';
                    clearInterval(timer);
                } else {
                    element.textContent = currentValue + (currentValue < 100 ? '' : '+');
                }
            }, 30);
        });
    };

    // Start counter when metrics section is visible
    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    metricsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metricsObserver.observe(metricsSection);
    }

    // Add hover effects to nav
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Dynamic theme switcher (optional)
function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.style.getPropertyValue('--dark-bg') === '#0f172a';
    
    if (isDark) {
        root.style.setProperty('--dark-bg', '#f8fafc');
        root.style.setProperty('--card-bg', '#e2e8f0');
        root.style.setProperty('--text-primary', '#0f172a');
        root.style.setProperty('--text-secondary', '#475569');
    } else {
        root.style.setProperty('--dark-bg', '#0f172a');
        root.style.setProperty('--card-bg', '#1e293b');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#cbd5e1');
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Add any modal close handlers here
    }
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
