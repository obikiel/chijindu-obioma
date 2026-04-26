// ============================================
// Chijindu Ezekiel Obioma — Portfolio Scripts
// ============================================

// --- Typewriter Effect ---
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'terraform apply -auto-approve',
    'docker build -t production .',
    'kubectl rollout status deployment/app',
    'az pipeline run --name deploy-prod',
    'aws ecs update-service --force-new',
    'ansible-playbook site.yml',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewrite() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
    }

    setTimeout(typewrite, delay);
}

typewrite();

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// --- Scroll Animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline__item, .contact__form, .about__text, .about__terminal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// --- Stat Counter Animation ---
function animateCounters() {
    const stats = document.querySelectorAll('.stat__number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

heroObserver.observe(document.querySelector('.hero__stats'));

// --- Nav Background on Scroll ---
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 14, 23, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 14, 23, 0.85)';
    }
});

// --- Active Nav Link ---
const sections = document.querySelectorAll('.section, .hero');
const navAnchors = document.querySelectorAll('.nav__links a:not(.nav__cta)');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#00E5FF';
        }
    });
});

// --- Contact Form (powered by Web3Forms) ---
// Form submits directly via POST action — no JS handler needed.

// --- Smooth reveal for sections ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
