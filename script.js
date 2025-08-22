// Theme: initialize on load based on system or stored preference
(function initializeTheme() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    var root = document.documentElement;
    root.classList.toggle('dark', isDark);
    document.body && (document.body.dataset.bsTheme = isDark ? 'dark' : 'light');
  } catch (e) {
    // ignore storage errors
  }
})();

// Theme toggle
var themeButton = document.getElementById('themeToggle');
if (themeButton) {
  // Sync icons initially
  document.addEventListener('DOMContentLoaded', function () {
    var isDark = document.documentElement.classList.contains('dark');
    themeButton.setAttribute('aria-pressed', String(isDark));
    var sun = themeButton.querySelector('.icon-sun');
    var moon = themeButton.querySelector('.icon-moon');
    if (sun && moon) {
      if (isDark) {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
      } else {
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
      }
    }
  });

  themeButton.addEventListener('click', function () {
    var root = document.documentElement;
    var isDark = root.classList.toggle('dark');
    themeButton.setAttribute('aria-pressed', String(isDark));
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
    if (document.body) {
      document.body.dataset.bsTheme = isDark ? 'dark' : 'light';
    }
    var sun = themeButton.querySelector('.icon-sun');
    var moon = themeButton.querySelector('.icon-moon');
    if (sun && moon) {
      if (isDark) {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
      } else {
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
      }
    }
  });
}

// Parallax engine
(function parallaxEngine() {
  var layers = Array.prototype.slice.call(document.querySelectorAll('.parallax-layer'));
  if (layers.length === 0) return;
  var ticking = false;
  var lastY = window.scrollY || window.pageYOffset;

  function onScroll() {
    lastY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var speed = parseFloat(layer.getAttribute('data-speed') || '0.3');
      var translateY = lastY * speed;
      // Subtle scale for depth on faster layers
      var scale = 1 + speed * 0.05;
      layer.style.transform = 'translate3d(0,' + (-translateY) + 'px,0) scale(' + scale + ')';
    }
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

// Reveal on scroll
(function revealOnScroll() {
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (items.length === 0) return;

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });

  for (var j = 0; j < items.length; j++) {
    observer.observe(items[j]);
  }
})();

// Back to top button
(function backToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  function toggle() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggle();
})();

// Footer year
(function footerYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
})();
