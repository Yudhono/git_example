/* ============================================
   Portfolio — Main JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  initTypingEffect();
  initScrollAnimations();
  initNavbar();
  initMobileMenu();
  initCounterAnimation();
  initSmoothScroll();
  initContactForm();
  initThemeSelector();
});

/* ============================================
   Typing Effect
   ============================================ */
function initTypingEffect() {
  var roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Problem Solver",
    "Open Source Enthusiast",
  ];

  var typedTextEl = document.getElementById("typedText");
  if (!typedTextEl) return;

  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 80;

  function type() {
    var currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* ============================================
   Scroll Animations (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
  var observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  var elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Active nav link highlighting
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", function () {
    toggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  navLinks.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      toggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounterAnimation() {
  var counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  var observerOptions = {
    threshold: 0.5,
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var counter = entry.target;
        var target = parseInt(counter.getAttribute("data-target"), 10);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function animateCounter(element, target) {
  var duration = 1500;
  var startTime = performance.now();

  function update(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(eased * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        var navEl = document.getElementById("navbar");
        var navHeight = navEl ? navEl.offsetHeight : 80;
        var targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ============================================
   Contact Form
   ============================================ */
function initContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalHTML = btn.innerHTML;

    // Show sending state
    btn.disabled = true;
    btn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...';
    btn.style.opacity = "0.7";

    // Simulate form submission
    setTimeout(function () {
      btn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
      btn.style.background =
        "linear-gradient(135deg, #00d4aa 0%, #00b894 100%)";
      btn.style.opacity = "1";

      form.reset();

      setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.background = "";
      }, 3000);
    }, 1500);
  });
}

/* ============================================
   Theme Selector
   ============================================ */
function initThemeSelector() {
  var themeSelector = document.getElementById("themeSelector");
  if (!themeSelector) return;

  // Get saved theme or default to 'light'
  var savedTheme = localStorage.getItem("theme") || "light";

  // Apply the saved theme
  applyTheme(savedTheme);

  // Add click event listeners to theme buttons
  var themeButtons = themeSelector.querySelectorAll(".theme-btn");
  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var theme = this.getAttribute("data-theme");
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    });
  });

  // Listen for system theme changes when in system mode
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    function (e) {
      var currentTheme = localStorage.getItem("theme");
      if (currentTheme === "system") {
        applyTheme("system");
      }
    }
  );
}

function applyTheme(theme) {
  var themeSelector = document.getElementById("themeSelector");
  if (!themeSelector) return;

  // Remove all theme attributes
  document.documentElement.removeAttribute("data-theme");

  // Apply the selected theme
  if (theme === "system") {
    // Let CSS media queries handle system theme
    document.documentElement.setAttribute("data-theme", "system");
  } else if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    // Light mode (default, no attribute needed)
  }

  // Update active state of theme buttons
  var themeButtons = themeSelector.querySelectorAll(".theme-btn");
  themeButtons.forEach(function (btn) {
    var btnTheme = btn.getAttribute("data-theme");
    if (btnTheme === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
