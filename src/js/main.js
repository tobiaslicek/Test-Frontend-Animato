(function () {
  var TRIGGER_ID = 'resources-trigger';
  var SUBMENU_ID = 'resources-submenu';
  var OPEN_CLASS = 'is-open';
  var MAIN_SELECTOR = '.main';
  var MENU_OPEN_CLASS = 'is-menu-open';
  var main = document.querySelector(MAIN_SELECTOR);

  function isMobileMenu() {
    var header = document.querySelector('.page-header');
    return header && header.classList.contains(MENU_OPEN_CLASS);
  }

  function initHeaderSubmenu() {
    var trigger = document.getElementById(TRIGGER_ID);
    var submenu = document.getElementById(SUBMENU_ID);
    if (!trigger || !submenu) return;

    var dropdown = trigger.closest('.page-header__nav-item--has-dropdown');

    function isOpen() {
      return dropdown && dropdown.classList.contains(OPEN_CLASS);
    }

    function open() {
      if (!dropdown) return;
      dropdown.classList.add(OPEN_CLASS);
      trigger.setAttribute('aria-expanded', 'true');
      submenu.setAttribute('aria-hidden', 'false');
      if (!isMobileMenu() && main) {
        requestAnimationFrame(function () {
          main.style.paddingTop = submenu.offsetHeight + 'px';
        });
      }
    }

    function close() {
      if (!dropdown) return;
      dropdown.classList.remove(OPEN_CLASS);
      trigger.setAttribute('aria-expanded', 'false');
      submenu.setAttribute('aria-hidden', 'true');
      if (main) main.style.paddingTop = '';
    }

    function toggle() {
      if (isOpen()) {
        close();
      } else {
        open();
      }
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      toggle();
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (dropdown.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!isOpen()) return;
      close();
      trigger.focus();
    });
  }

  function initMobileMenu() {
    var toggle = document.getElementById('header-menu-toggle');
    var header = document.querySelector('.page-header');
    if (!toggle || !header) return;

    toggle.addEventListener('click', function () {
      var open = header.classList.toggle(MENU_OPEN_CLASS);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!header.classList.contains(MENU_OPEN_CLASS)) return;
      header.classList.remove(MENU_OPEN_CLASS);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.focus();
    });
  }

  function init() {
    initHeaderSubmenu();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
