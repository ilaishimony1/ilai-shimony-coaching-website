// Active nav link
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Mobile menu
function toggleMenu() {
  const m = document.getElementById('nav-mobile');
  m.classList.toggle('open');
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('nav-mobile').classList.remove('open');
    });
  });
});

// FAQ accordion
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Radio options (apply form)
function selectOption(el, groupName) {
  const group = el.closest('.radio-group');
  group.querySelectorAll('.radio-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const hidden = group.querySelector('input[type=hidden]');
  if (hidden) hidden.value = el.dataset.value;
}
