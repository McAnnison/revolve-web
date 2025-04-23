const hambuger = document.querySelector('.hamburger');
const sidebar =  document.querySelector('sidebar');
const navLinks =  document.querySelector('.navLinks');

hambuger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !sidebar.contains(e.target)) {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
  }
});

document.querySelectorAll('.sidebar-links a').forEach(link => {
  link.addEventListener('click', () => {
    hambuger.classList.remove('active');
    sidebar.classList.remove('active');
  });
});