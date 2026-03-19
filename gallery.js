// ===== BALANCED MASONRY =====
// Replaces CSS column masonry with JS-based balancing to avoid uneven columns
(function () {
  var grid = document.querySelector('.masonry-grid');
  if (!grid) return;

  function balanceColumns() {
    var items = Array.from(grid.querySelectorAll('.gallery-item'));
    var visibleItems = items.filter(function (item) {
      return item.style.display !== 'none' && item.querySelector('img').naturalWidth > 0;
    });

    if (visibleItems.length === 0) return;

    // Determine column count from CSS
    var style = getComputedStyle(grid);
    var colCount = parseInt(style.columnCount) || 3;

    // Reset any previous ordering
    items.forEach(function (item) { item.style.order = ''; });

    // Measure each visible item's height
    // Temporarily switch to flexbox to measure
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    grid.style.columnCount = 'auto';

    // Create column containers
    var columns = [];
    var columnHeights = [];
    for (var c = 0; c < colCount; c++) {
      columns.push([]);
      columnHeights.push(0);
    }

    // Assign each item to the shortest column
    visibleItems.forEach(function (item) {
      var img = item.querySelector('img');
      var aspectRatio = img.naturalHeight / img.naturalWidth;
      var estimatedHeight = aspectRatio * 100; // relative height

      // Find shortest column
      var shortest = 0;
      for (var c = 1; c < colCount; c++) {
        if (columnHeights[c] < columnHeights[shortest]) shortest = c;
      }

      columns[shortest].push(item);
      columnHeights[shortest] += estimatedHeight + 8; // 8px gap
    });

    // Revert to column layout and reorder items
    grid.style.display = '';
    grid.style.flexWrap = '';
    grid.style.columnCount = '';

    // Clear and re-append in balanced order
    // Column-count fills top-to-bottom per column, so we interleave
    var maxLen = Math.max.apply(null, columns.map(function (col) { return col.length; }));
    var fragment = document.createDocumentFragment();

    // For CSS columns, items flow top-to-bottom in column 1, then column 2, etc.
    // So we append all column 1 items, then column 2, then column 3
    for (var c = 0; c < colCount; c++) {
      for (var r = 0; r < columns[c].length; r++) {
        fragment.appendChild(columns[c][r]);
      }
    }

    // Also re-append hidden items at the end
    items.forEach(function (item) {
      if (item.style.display === 'none' || item.querySelector('img').naturalWidth === 0) {
        fragment.appendChild(item);
      }
    });

    grid.appendChild(fragment);
  }

  window.addEventListener('load', function () {
    // Small delay to ensure all images are fully rendered
    setTimeout(balanceColumns, 100);
  });
})();

// ===== LIGHTBOX =====
(function () {
  let currentIndex = 0;
  let images = [];

  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;

  const img = overlay.querySelector('img');
  const counter = overlay.querySelector('.lightbox-counter');
  const prevBtn = overlay.querySelector('.lightbox-arrow.prev');
  const nextBtn = overlay.querySelector('.lightbox-arrow.next');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function open(index) {
    currentIndex = index;
    update();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function update() {
    img.src = images[currentIndex].src;
    counter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    update();
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    update();
  }

  // Collect visible gallery images
  document.querySelectorAll('.gallery-item img').forEach(function (el, i) {
    if (el.naturalWidth > 0 || el.complete) {
      images.push(el);
    } else {
      el.addEventListener('load', function () {
        // Rebuild array to maintain order
        images = [];
        document.querySelectorAll('.gallery-item img').forEach(function (img) {
          if (img.offsetParent !== null) images.push(img);
        });
      });
    }
  });

  // Rebuild images array after all images have had a chance to load/fail
  window.addEventListener('load', function () {
    images = [];
    document.querySelectorAll('.gallery-item img').forEach(function (el) {
      if (el.offsetParent !== null) images.push(el);
    });
  });

  // Click handlers on gallery items
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var imgEl = item.querySelector('img');
      var idx = images.indexOf(imgEl);
      if (idx >= 0) open(idx);
    });
  });

  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });
  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
