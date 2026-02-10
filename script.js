document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
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

    // Simple scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    });

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .step, .hero-content, .carousel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Carousel Logic
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (carousel && items.length > 0) {
        let currentIndex = 0;
        const totalItems = items.length;
        let autoSlideInterval;

        const showSlide = (index) => {
            if (index < 0) index = totalItems - 1;
            if (index >= totalItems) index = 0;
            
            currentIndex = index;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((ind, i) => {
                if (i === currentIndex) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        };

        const nextSlide = () => showSlide(currentIndex + 1);
        const prevSlide = () => showSlide(currentIndex - 1);

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => {
                showSlide(i);
                resetAutoSlide();
            });
        });

        // Auto Slide
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Start
        startAutoSlide();
    }

    // Add class for animation via JS to keep CSS clean
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Modal Logic
    const modal = document.getElementById('install-modal');
    const btn = document.getElementById('install-btn');
    const closeBtn = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');

    if (modal && btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });

        const closeModal = () => {
            modal.classList.remove('show');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalBtn) modalBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    console.log('Momory website loaded successfully.');
});
