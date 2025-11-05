// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const body = document.body;

function updateHeaderSize() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajuste do ponto de transição para nova altura (50vh -> 25vh)
    if (scrollTop > 100) {
        header.classList.add('scrolled');
        body.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}

// Update on scroll with throttling
let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeaderSize();
            ticking = false;
        });
        ticking = true;
    }
}

// Initial setup
updateHeaderSize();

// Listen for scroll events
window.addEventListener('scroll', onScroll, { passive: true });

// Also update on load in case page starts scrolled
window.addEventListener('load', updateHeaderSize);