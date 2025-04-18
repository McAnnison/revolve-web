document.addEventListener('DOMContentLoaded', function() {
    // Debounce function to limit how often a function can fire
    const debounce = (func, delay) => {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    };

// Mobile menu functionality
const initMobileMenu = () => {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    
    const nav = document.querySelector('nav ul');
    const headerContent = document.querySelector('.header-content');
    
    // Insert mobile menu button
    headerContent.insertBefore(menuBtn, nav.parentNode);
    
    // Toggle menu function
    const toggleMenu = () => {
        const isOpen = nav.classList.toggle('active');
        menuBtn.innerHTML = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    
    // Event listeners
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 800) {
                nav.classList.remove('active');
                menuBtn.innerHTML = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
}; 

// Initialize mobile menu only on mobile
if (window.innerWidth <= 800) {
    initMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (window.innerWidth <= 800 && !menuBtn) {
        initMobileMenu();
    } else if (window.innerWidth > 800 && menuBtn) {
        nav.classList.remove('active');
        menuBtn.remove();
        document.body.style.overflow = '';
    }
});

    // Responsive initialization with throttling
    const initResponsiveFeatures = debounce(function() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 800) {
            if (!menuBtn) mobileMenuToggle();
        } else {
            if (menuBtn) {
                const nav = document.querySelector('nav ul');
                nav.classList.remove('active');
                menuBtn.remove();
                document.body.style.overflow = '';
            }
        }
        
        // Call all responsive adjustment functions
        adjustHeroPosition();
        handleProductLayout();
        adjustStatistics();
        adjustOrientalTaste();
        adjustChickenGrill();
    }, 100);

    // Initialize responsive features on load
    initResponsiveFeatures();
    
    // Re-check on window resize with debounce
    window.addEventListener('resize', initResponsiveFeatures);
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Responsive adjustment functions
    const adjustHeroPosition = function() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        if (window.innerWidth <= 800) {
            hero.style.left = '50%';
            hero.style.transform = 'translate(-50%, -50%)';
            hero.style.width = '90%';
            hero.style.textAlign = 'center';
        } else {
            hero.style.left = '60%';
            hero.style.transform = 'translate(-50%, -50%)';
            hero.style.width = '';
            hero.style.textAlign = '';
        }
    };
    
    const handleProductLayout = function() {
        const productRow = document.querySelector('.product-row');
        if (!productRow) return;
        
        if (window.innerWidth <= 800) {
            productRow.style.flexDirection = 'column';
            productRow.style.alignItems = 'center';
            productRow.style.gap = '30px';
        } else {
            productRow.style.flexDirection = '';
            productRow.style.alignItems = '';
            productRow.style.gap = '';
        }
    };
    
    const adjustStatistics = function() {
        const statsSection = document.querySelector('.statistics-section');
        if (!statsSection) return;
        
        if (window.innerWidth <= 768) {
            statsSection.style.width = '90%';
            statsSection.style.margin = '20px auto';
            
            const statsContainer = document.querySelector('.statistics-container');
            if (statsContainer) {
                statsContainer.style.flexDirection = 'column';
                statsContainer.style.alignItems = 'center';
                statsContainer.style.gap = '20px';
            }
            
            const statsTitle = statsSection.querySelector('h2');
            if (statsTitle) {
                statsTitle.style.marginLeft = '0';
                statsTitle.style.textAlign = 'center';
            }
        } else {
            statsSection.style.width = '900px';
            statsSection.style.marginLeft = '40px';
            
            const statsContainer = document.querySelector('.statistics-container');
            if (statsContainer) {
                statsContainer.style.flexDirection = '';
                statsContainer.style.alignItems = '';
                statsContainer.style.gap = '';
            }
            
            const statsTitle = statsSection.querySelector('h2');
            if (statsTitle) {
                statsTitle.style.marginLeft = '300px';
                statsTitle.style.textAlign = '';
            }
        }
    };
    
    const adjustOrientalTaste = function() {
        const orientalSection = document.querySelector('.oriental-taste');
        if (!orientalSection) return;
        
        if (window.innerWidth <= 768) {
            const orientalTitle = orientalSection.querySelector('h2');
            const orientalButton = orientalSection.querySelector('.button');
            const orientalText = orientalSection.querySelector('p');
            
            if (orientalTitle) {
                orientalTitle.style.marginLeft = '0';
                orientalTitle.style.textAlign = 'center';
            }
            
            if (orientalButton) {
                orientalButton.style.marginLeft = 'auto';
                orientalButton.style.marginRight = 'auto';
                orientalButton.style.display = 'block';
            }
            
            if (orientalText) {
                orientalText.style.textAlign = 'center';
            }
        } else {
            const orientalTitle = orientalSection.querySelector('h2');
            const orientalButton = orientalSection.querySelector('.button');
            const orientalText = orientalSection.querySelector('p');
            
            if (orientalTitle) {
                orientalTitle.style.marginLeft = '800px';
                orientalTitle.style.textAlign = '';
            }
            
            if (orientalButton) {
                orientalButton.style.marginLeft = '800px';
                orientalButton.style.display = '';
            }
            
            if (orientalText) {
                orientalText.style.textAlign = 'right';
            }
        }
    };
    
    const adjustChickenGrill = function() {
        const chickenGrill = document.querySelector('.chicken-grill');
        if (!chickenGrill) return;
        
        if (window.innerWidth <= 768) {
            const chickenTitle = chickenGrill.querySelector('h2');
            const chickenButton = chickenGrill.querySelector('.button2');
            const chickenText = chickenGrill.querySelector('p');
            
            if (chickenTitle) {
                chickenTitle.style.marginRight = '0';
                chickenTitle.style.textAlign = 'center';
            }
            
            if (chickenButton) {
                chickenButton.style.marginLeft = 'auto';
                chickenButton.style.marginRight = 'auto';
                chickenButton.style.display = 'block';
            }
            
            if (chickenText) {
                chickenText.style.textAlign = 'center';
            }
        } else {
            const chickenTitle = chickenGrill.querySelector('h2');
            const chickenButton = chickenGrill.querySelector('.button2');
            const chickenText = chickenGrill.querySelector('p');
            
            if (chickenTitle) {
                chickenTitle.style.marginRight = '800px';
                chickenTitle.style.textAlign = '';
            }
            
            if (chickenButton) {
                chickenButton.style.marginLeft = '10px';
                chickenButton.style.display = '';
            }
            
            if (chickenText) {
                chickenText.style.textAlign = 'left';
            }
        }
    };
    
    // Enhanced intersection observer for animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.product, .oriental-taste, .statistics-section, ' +
            '.chicken-grill, .about-content, .contact-form'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger when 50px from bottom of viewport
        });
        
        elements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Add touch detection for hover effects
    document.body.addEventListener('touchstart', function() {}, false);
});