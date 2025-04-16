document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = function() {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        
        const nav = document.querySelector('nav ul');
        const headerContent = document.querySelector('.header-content');
        
        // Create and insert the mobile menu button
        headerContent.insertBefore(menuBtn, nav.parentNode);
        
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 800) {
                    nav.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                }
            });
        });
    };
    
    // Check screen width and initialize mobile menu if needed
    if (window.innerWidth <= 800) {
        mobileMenuToggle();
    }
    
    // Re-check on window resize
    window.addEventListener('resize', function() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 800 && !menuBtn) {
            mobileMenuToggle();
        } else if (window.innerWidth > 800 && menuBtn) {
            const nav = document.querySelector('nav ul');
            nav.classList.remove('active');
            menuBtn.remove();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adjust hero position on mobile
    const adjustHeroPosition = function() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        if (window.innerWidth <= 800) {
            hero.style.left = '50%';
            hero.style.transform = 'translate(-50%, -50%)';
            hero.style.width = '90%';
        } else {
            hero.style.left = '60%';
            hero.style.transform = 'translate(-50%, -50%)';
            hero.style.width = '';
        }
    };
    
    adjustHeroPosition();
    window.addEventListener('resize', adjustHeroPosition);
    
    // Handle product row layout on mobile
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
    
    handleProductLayout();
    window.addEventListener('resize', handleProductLayout);
    
    // Adjust statistics section on mobile
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
    
    adjustStatistics();
    window.addEventListener('resize', adjustStatistics);
    
    // Adjust oriental taste section on mobile
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
    
    adjustOrientalTaste();
    window.addEventListener('resize', adjustOrientalTaste);
    
    // Adjust chicken grill section on mobile
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
    
    adjustChickenGrill();
    window.addEventListener('resize', adjustChickenGrill);
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product, .oriental-taste, .statistics-section, .chicken-grill, .about-content, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };
    
    animateOnScroll();
});