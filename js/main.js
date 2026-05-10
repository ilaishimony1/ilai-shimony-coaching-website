// Dev viewport switcher (localhost only)
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.createElement('div');
    bar.id = 'dev-bar';
    bar.innerHTML = `
      <button id="dev-desktop" title="Desktop view" class="dev-active">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </button>
      <button id="dev-mobile" title="Mobile view">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
      </button>
    `;
    document.body.appendChild(bar);

    const style = document.createElement('style');
    style.textContent = `
      #dev-bar {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99999;
        display: flex;
        gap: 4px;
        background: rgba(10,22,40,0.95);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 10px;
        padding: 6px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      }
      #dev-bar button {
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 7px;
        background: transparent;
        color: rgba(255,255,255,0.45);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
      }
      #dev-bar button:hover { background: rgba(255,255,255,0.08); color: #fff; }
      #dev-bar button.dev-active { background: #2e86de; color: #fff; }
      #dev-viewport-wrap {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background: #060f1c;
        overflow: auto;
        z-index: 99998;
        padding: 70px 0 20px;
      }
      #dev-viewport-frame {
        width: 375px;
        min-height: 100%;
        background: #0a1628;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.6);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
      }
      body.dev-mobile-mode { overflow: hidden; }
    `;
    document.head.appendChild(style);

    let mobileWrap = null;

    document.getElementById('dev-desktop').addEventListener('click', () => {
      document.getElementById('dev-desktop').classList.add('dev-active');
      document.getElementById('dev-mobile').classList.remove('dev-active');
      if (mobileWrap) {
        document.body.removeChild(mobileWrap);
        mobileWrap = null;
        document.body.classList.remove('dev-mobile-mode');
      }
    });

    document.getElementById('dev-mobile').addEventListener('click', () => {
      document.getElementById('dev-mobile').classList.add('dev-active');
      document.getElementById('dev-desktop').classList.remove('dev-active');
      if (!mobileWrap) {
        mobileWrap = document.createElement('div');
        mobileWrap.id = 'dev-viewport-wrap';
        const frame = document.createElement('iframe');
        frame.id = 'dev-viewport-frame';
        frame.src = location.href;
        frame.style.cssText = 'width:375px;height:812px;border:none;border-radius:12px;box-shadow:0 0 0 1px rgba(255,255,255,0.1),0 20px 60px rgba(0,0,0,0.6);display:block;';
        mobileWrap.appendChild(frame);
        document.body.appendChild(mobileWrap);
        document.body.classList.add('dev-mobile-mode');
      }
    });
  });
}

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
  const isOpen = m.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('nav-mobile').classList.remove('open');
      document.body.style.overflow = '';
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
