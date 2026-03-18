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
