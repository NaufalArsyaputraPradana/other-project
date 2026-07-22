document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations Setup using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('in-view');
                // Unobserve once animated to prevent repeating on scroll up/down
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .zoom-in');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 2. 3D Hover Effect for Project Cards (Desktop Only)
    const cards = document.querySelectorAll('.project-card');
    
    // Check if device supports hover and has a wider screen
    if (window.matchMedia("(min-width: 768px) and (hover: hover)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation based on mouse position
                const rotateX = ((y - centerY) / centerY) * -6; // Max 6 degrees rotation
                const rotateY = ((x - centerX) / centerX) * 6;
                
                // Apply subtle 3D transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
                
                // Add a subtle glare effect based on mouse position
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                card.style.background = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%, 
                        rgba(255, 255, 255, 0.08) 0%, 
                        rgba(255, 255, 255, 0.02) 50%, 
                        var(--card-bg) 100%
                    )
                `;
            });
            
            // Reset transform on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.background = 'var(--card-bg)';
                
                // Add smooth transition for resetting
                card.style.transition = 'transform 0.5s ease, background 0.5s ease';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 500);
            });
        });
    }

    // 3. Smooth scrolling for internal links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
