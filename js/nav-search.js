(function () {
  function init() {
    var input = document.getElementById('nav-search-input');
    var results = document.getElementById('nav-search-results');
    if (!input || !results) return;

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { close(); return; }

      var matches = SEARCH_INDEX.filter(function (item) {
        var haystack = (item.title + ' ' + item.desc + ' ' + item.keywords).toLowerCase();
        return haystack.indexOf(q) !== -1;
      }).slice(0, 7);

      if (matches.length === 0) {
        results.innerHTML = '<div class="nav-search-empty">No results for "' + input.value + '"</div>';
      } else {
        results.innerHTML = matches.map(function (item) {
          return '<a href="' + item.url + '" class="nav-search-result">' +
            '<span class="nav-search-result-type">' + item.type + '</span>' +
            '<span class="nav-search-result-title">' + item.title + '</span>' +
            '<span class="nav-search-result-desc">' + item.desc + '</span>' +
            '</a>';
        }).join('');
      }
      results.classList.add('open');
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); input.blur(); }
      if (e.key === 'Enter') {
        var first = results.querySelector('.nav-search-result');
        if (first) window.location.href = first.href;
      }
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) close();
    });

    function close() { results.classList.remove('open'); results.innerHTML = ''; }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
