// Hamburger menu functionality
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Toggle Burger Animation
        burger.classList.toggle('toggle');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (nav.classList.contains('nav-active')) { // If menu is opening
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else { // If menu is closing
                link.style.animation = ''; // Clear animation to reset state
            }
        });
    });

    // Close nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Clear animation styles for links after menu closes to reset state
                navLinks.forEach((linkItem) => {
                    linkItem.style.animation = '';
                });
            }
        });
    });

    // Handle window resize to reset mobile menu if it's open on desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { // Assuming 768px is the breakpoint for mobile menu
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = ''; // Clear any active animations
                });
            }
        }
    });
};

// Intersection Observer for scroll animations
const initScrollAnimations = () => {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('is-visible');
                observer.unobserve(target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(
        'h2.animated-h2, .project-card, .skill-item, .contact-intro, .contact-info p, .social-links a, footer'
    );

    // Apply transition-delay for staggered effects and observe
    elementsToAnimate.forEach((el, index) => {
        // Default delay, overridden for specific groups below
        if (!el.style.transitionDelay) {
            el.style.transitionDelay = `${0}s`; // No initial delay for general items
        }
        observer.observe(el);
    });

    // Specific staggering for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Specific staggering for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Stagger for contact info and social links
    const contactElements = document.querySelectorAll('.contact-intro, .contact-info p, .social-links a');
    contactElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Footer (optional, could be general too)
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.style.transitionDelay = `0.2s`; // Small delay for footer
        observer.observe(footerElement);
    }
};


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile nav if open
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelectorAll('.nav-links li');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((linkItem) => {
                linkItem.style.animation = '';
            });
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Run functions on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    initScrollAnimations();
});
