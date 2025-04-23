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
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); 
});