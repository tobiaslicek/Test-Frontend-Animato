(function () {
  var ACCORDION_CLOSE_ALPINE = 'accordion-close-alpine';
  var ACCORDION_CLOSE_VANILLA = 'accordion-close-vanilla';

  function closeAllInSection(faqSection, exceptTrigger) {
    faqSection.querySelectorAll('.faq__trigger').forEach(function (t) {
      if (t.closest('[data-accordion-item="alpine"]')) return;
      var targetId = t.getAttribute('aria-controls');
      var target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        t.setAttribute('aria-expanded', 'false');
        target.classList.remove('faq__answer--open');
        target.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function initAccordions() {
    document.querySelectorAll('.faq[data-accordion="vanilla"]').forEach(function (faqSection) {
      faqSection.querySelectorAll('.faq__trigger').forEach(function (trigger) {
        if (trigger.closest('[data-accordion-item="alpine"]')) return;
        if (trigger.hasAttribute('data-accordion-initialized')) return;

        trigger.setAttribute('data-accordion-initialized', 'true');

        trigger.addEventListener('click', function () {
          var expanded = this.getAttribute('aria-expanded') === 'true';
          var targetId = this.getAttribute('aria-controls');
          var target = targetId ? document.getElementById(targetId) : null;

          if (expanded) {
            this.setAttribute('aria-expanded', 'false');
            if (target) {
              target.classList.remove('faq__answer--open');
              target.setAttribute('aria-hidden', 'true');
            }
          } else {
            closeAllInSection(faqSection, this);
            window.dispatchEvent(new CustomEvent(ACCORDION_CLOSE_ALPINE));
            this.setAttribute('aria-expanded', 'true');
            if (target) {
              target.classList.add('faq__answer--open');
              target.removeAttribute('aria-hidden');
            }
          }
        });
      });

      faqSection.querySelectorAll('.faq__answer[id]').forEach(function (answer) {
        var isOpen = answer.classList.contains('faq__answer--open');
        answer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });
    });

    document.addEventListener(ACCORDION_CLOSE_VANILLA, function () {
      document.querySelectorAll('.faq[data-accordion="vanilla"]').forEach(function (faqSection) {
        closeAllInSection(faqSection);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
})();
