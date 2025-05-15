// Initialize Animate On Scroll (AOS) library
AOS.init({
    duration: 800,
    once: false, // <<< MAKE SURE THIS IS 'false'
    offset: 100, 
    delay: 50,  
    easing: 'ease-out-cubic', 
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const headerHeight = header?.offsetHeight || 80; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - headerHeight - 50) { 
            currentSectionId = section.getAttribute('id');
        }
    });

    let foundActive = false;
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
            foundActive = true;
        }
    });

    // Default to Home if no other section is active or at the top of the page
    if (!foundActive && window.pageYOffset < (sections[0]?.offsetTop || 0) - headerHeight - 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="#hero"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    } else if (!currentSectionId && sections.length > 0 && window.pageYOffset < sections[0].offsetTop - headerHeight - 20) {
         // If scrolled to the very top, before the first section
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="#hero"]');
        if (homeLink) homeLink.classList.add('active');
    }
});


// Update current year in footer
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Check if it's an internal link and not a Bootstrap dropdown toggle
        if (href && href.startsWith('#') && !this.hasAttribute('data-bs-toggle')) { 
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = header?.offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) {
                        // Bootstrap 5 uses a Bootstrap instance to control collapse
                        var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false // an instance is created, but not toggled
                        });
                        bsCollapse.hide(); // programmatically hide it
                    }
                }
            }
        }
    });
});