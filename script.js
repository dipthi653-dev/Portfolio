// Typing effect for the Hero Section
const roles = ["Machine Learning Developer", "Frontend Developer", "Data Science"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
const typingTextElement = document.getElementById("typing-text");

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // faster deletion
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100; // normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // pause before typing next word
    }

    setTimeout(type, typingDelay);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(type, 1000);
});

// Implementation of Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger circular skill animations when visible
            if (entry.target.classList.contains('skills-grid') || entry.target.closest('.skills')) {
                animateProgressRings();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .slide-in-right, .auto-fade').forEach(el => {
    observer.observe(el);
});

// Function to animate the SVG progress rings
function animateProgressRings() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        // Calculate stroke-dashoffset: 314 is approx 2 * pi * r (where r=50)
        const circumference = 314;
        const offset = circumference - (percentage / 100) * circumference;

        // Timeout ensures the CSS transition applies
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 300);
    });
}

// Project Timeline interaction - Expand/Collapse
function toggleProject(element) {
    // Optional: close other open projects
    const allProjects = document.querySelectorAll('.timeline-content');
    allProjects.forEach(proj => {
        if (proj !== element) {
            proj.classList.remove('expanded');
        }
    });

    // Toggle current
    element.classList.toggle('expanded');
}

// Contact form simulation
function simulateMail(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Animate button
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        event.target.reset(); // clear form

        // Show success message
        const successMsg = document.getElementById('mail-success');
        successMsg.classList.remove('hidden');

        // Hide success message after 4s
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 4000);
    }, 1500);
}

// Update Footer Year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect & Active Link Highlighting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    // Navbar shrink effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
