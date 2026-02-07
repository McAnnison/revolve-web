document.addEventListener('DOMContentLoaded', function() {

  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Function to toggle sidebar
  function toggleSidebar() {
      hamburger.classList.toggle('active');
      sidebar.classList.toggle('active');
      
      // Toggle body overflow to prevent scrolling when sidebar is open
      if (sidebar.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
  }
  
  // Hamburger click event
  hamburger.addEventListener('click', toggleSidebar);
  
  // Close sidebar when a link is clicked (for mobile)
  sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth <= 800) {
              toggleSidebar();
          }
      });
  });
  
  // Smooth scrolling for all navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              });
          }
      });
  });
  
 
  document.addEventListener('click', (e) => {
      if (window.innerWidth <= 800 && 
          sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && 
          !hamburger.contains(e.target)) {
          toggleSidebar();
      }
  });
  
  
  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      navLinks.forEach(link => {
          const sectionId = link.getAttribute('href');
          if (sectionId === '#') return;
          
          const section = document.querySelector(sectionId);
          if (section) {
              const sectionTop = section.offsetTop - 150;
              const sectionBottom = sectionTop + section.offsetHeight;
              
              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                  link.classList.add('active');
              } else {
                  link.classList.remove('active');
              }
          }
      });
  });
  
  
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.product, .statistic, .contact-form');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.style.animation = 'fadeIn 1s ease-in-out forwards';
          }
      });
  };

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCountUp(numberEl, targetValue, durationMs) {
      if (!numberEl || !Number.isFinite(targetValue)) return;
      if (prefersReducedMotion) {
          numberEl.textContent = String(targetValue);
          return;
      }

      const startValue = 0;
      const startTime = performance.now();
      const duration = Math.max(200, durationMs || 1200);

      function tick(now) {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          const currentValue = Math.round(startValue + (targetValue - startValue) * eased);
          numberEl.textContent = String(currentValue);
          if (t < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
  }

  function initPromoCounters() {
      const counters = document.querySelectorAll('.count-up[data-target]');
      if (!counters.length) return;

      const run = () => {
          counters.forEach(counter => {
              if (counter.dataset.animated === 'true') return;
              const target = Number.parseInt(counter.dataset.target || '0', 10);
              counter.dataset.animated = 'true';
              animateCountUp(counter, Number.isFinite(target) ? target : 0, 1500);
          });
      };

      // Prefer IntersectionObserver for smoother + cheaper scroll triggers.
      if ('IntersectionObserver' in window) {
          const section = document.querySelector('.statistics-section') || counters[0].closest('.statistics-section');
          const observer = new IntersectionObserver((entries) => {
              const entry = entries[0];
              if (entry && entry.isIntersecting) {
                  run();
                  observer.disconnect();
              }
          }, { threshold: 0.35 });

          if (section) observer.observe(section);
          else run();
      } else {
          // Fallback: trigger on first scroll/paint.
          let hasRun = false;
          const onScroll = () => {
              if (hasRun) return;
              const first = counters[0];
              if (!first) return;
              const rect = first.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.8) {
                  hasRun = true;
                  run();
                  window.removeEventListener('scroll', onScroll);
              }
          };
          window.addEventListener('scroll', onScroll);
          onScroll();
      }
  }
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); 

    initPromoCounters();
});