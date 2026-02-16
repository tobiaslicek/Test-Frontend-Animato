(function () {
  var TRIGGER_ID = 'resources-trigger';
  var SUBMENU_ID = 'resources-submenu';
  var OPEN_CLASS = 'is-open';
  var MAIN_SELECTOR = '.main';

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
      requestAnimationFrame(function () {
        if (main) main.style.paddingTop = submenu.offsetHeight + 'px';
      });
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderSubmenu);
  } else {
    initHeaderSubmenu();
  }
})();
