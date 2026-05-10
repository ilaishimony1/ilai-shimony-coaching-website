/*
  DISCOUNT CODES — edit this file to add, remove, or change codes.

  Format:
    'CODE': { percent: 10, products: ['product-id-1', 'product-id-2'] }
    'CODE': { percent: 25, products: 'all' }   ← applies to everything

  Product IDs:
    'video-analysis'
    'coaching-call'
    'video-sessions-x1'
    'video-sessions-x3'
    'video-sessions-x5'
*/

var DISCOUNT_CODES = {
  'EXAMPLE10': { percent: 10, products: ['video-analysis'] },
  'WELCOME20': { percent: 20, products: 'all' },
  '311USASIMS9154!': { percent: 30, products: 'all' }
};

var ActiveDiscount = (function () {
  var KEY = 'ilai_discount';

  function get() {
    try { return JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function set(code, rule) {
    sessionStorage.setItem(KEY, JSON.stringify({ code: code, percent: rule.percent, products: rule.products }));
  }

  function clear() { sessionStorage.removeItem(KEY); }

  function apply(code) {
    var rule = DISCOUNT_CODES[code.toUpperCase()];
    if (!rule) return { ok: false, msg: 'Invalid code.' };
    set(code.toUpperCase(), rule);
    return { ok: true, percent: rule.percent, products: rule.products };
  }

  function discountedPrice(item) {
    var d = get();
    if (!d) return item.price;
    var applies = d.products === 'all' || (Array.isArray(d.products) && d.products.indexOf(item.id) !== -1);
    if (!applies) return item.price;
    return Math.round(item.price * (1 - d.percent / 100) * 100) / 100;
  }

  function discountedTotal(items) {
    return items.reduce(function (sum, i) { return sum + discountedPrice(i) * i.qty; }, 0);
  }

  function savings(items) {
    return items.reduce(function (sum, i) {
      return sum + (i.price - discountedPrice(i)) * i.qty;
    }, 0);
  }

  return { get: get, apply: apply, clear: clear, discountedPrice: discountedPrice, discountedTotal: discountedTotal, savings: savings };
})();
