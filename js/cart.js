var Cart = (function () {
  var KEY = 'ilai_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    refreshBadge();
  }

  function add(product) {
    var items = load();
    var existing = items.find(function (i) { return i.id === product.id; });
    if (existing) { existing.qty += 1; } else { items.push({ id: product.id, name: product.name, price: product.price, img: product.img || '', qty: 1 }); }
    save(items);
    showAddedToast(product.name);
  }

  function remove(id) { save(load().filter(function (i) { return i.id !== id; })); }

  function setQty(id, qty) {
    if (qty < 1) { remove(id); return; }
    var items = load();
    var item = items.find(function (i) { return i.id === id; });
    if (item) { item.qty = qty; save(items); }
  }

  function total() { return load().reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function count() { return load().reduce(function (s, i) { return s + i.qty; }, 0); }
  function clear() { save([]); }

  function refreshBadge() {
    var n = count();
    document.querySelectorAll('.cart-badge').forEach(function (el) {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function showAddedToast(name) {
    var t = document.getElementById('cart-toast');
    if (!t) return;
    t.textContent = '✓ ' + name + ' added to cart';
    t.classList.add('visible');
    setTimeout(function () { t.classList.remove('visible'); }, 2500);
  }

  document.addEventListener('DOMContentLoaded', refreshBadge);

  return { add: add, remove: remove, setQty: setQty, total: total, count: count, clear: clear, load: load, refreshBadge: refreshBadge };
})();
