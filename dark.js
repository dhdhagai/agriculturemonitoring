
$(function () {
  // Load header and footer, then initialize page-specific behavior
  $("#hm-nav").load("header.html", function () {
    // set active nav link based on `page` variable
    switch (page) {
      case "home":
        $(".nav-link").removeClass("active");
        $(".hm-home").addClass("active bulu");
        break;
      case "tips":
        $(".nav-link").removeClass("active");
        $(".hm-tips").addClass("active bulu");
        break;
      case "login":
        $(".nav-link").removeClass("active");
        $(".hm-about").addClass("active bulu");
        break;
      case "liveview":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-liveview, .hm-services").addClass("active bulu");
        break;
      case "agricultureai":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-agricultureai, .hm-services").addClass("active bulu");
        break;
      case "weatherapp":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-weatherapp, .hm-services").addClass("active bulu");
        break;
      case "hospital":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-hospital, .hm-services").addClass("active bulu");
        break;
      case "disease":
        $(".nav-link").removeClass("active");
        $(".dropdown-item").removeClass("active");
        $(".hm-disease, .hm-services").addClass("active bulu");
        break;
    }

    // Once header is present, attach dark switch handler
    const darkSwitchEl = document.getElementById('darkSwitch');
    if (darkSwitchEl) {
      darkSwitchEl.addEventListener('change', () => {
        const mode = darkSwitchEl.checked ? 'dark' : 'light';
        applyTheme(mode);
      });
    }

    // Ensure theme is applied after header loads
    const stored = localStorage.getItem('theme') || 'light';
    applyTheme(stored);
  });

  $("#hm-footer").load("footer.html");
});


//                        //
//                        //
//                        //
//                        //          
//                        //
//        DarkMode        //
//                        //
//                        //
//                        //
//                        //
//                        //
//                        //


// Centralized theme application function
function applyTheme(theme) {
  try {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      document.body && document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('darkSwitch', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      document.body && document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('darkSwitch', 'light');
    }

    // Update switch if present
    const sw = document.getElementById('darkSwitch');
    if (sw) sw.checked = (theme === 'dark');

    // Swap simple assets (github mark) when present
    document.querySelectorAll('.img-fluid').forEach(img => {
      if (img.src && img.src.indexOf('github-mark') !== -1) {
        const base = img.src.replace(/github-mark(-white)?\.svg(.*)$/i, 'github-mark');
        img.src = base + (theme === 'dark' ? '-white.svg' : '.svg');
      }
    });

    // Some Bootstrap-specific classes to improve contrast
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.toggle('dropdown-menu-dark', theme === 'dark');
    });

    document.querySelectorAll('a').forEach(a => {
      a.classList.toggle('text-white', theme === 'dark');
    });

    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) lastUpdated.classList.toggle('text-white', theme === 'dark');

  } catch (e) {
    // Fail silently — theme is non-critical
    console.error('applyTheme error', e);
  }
}

// Apply stored theme on first script run (header may not yet be loaded, but this is safe)
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('theme') || 'light';
  applyTheme(stored);
});


