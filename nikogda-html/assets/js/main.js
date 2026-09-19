document.addEventListener('DOMContentLoaded', function () {
  // Accordion for objections
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';
      // close all
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Self-check items: visual tick state only, no persistence
  document.querySelectorAll('.check-item input[type="checkbox"]').forEach(function (box) {
    box.addEventListener('change', function () {
      box.closest('.check-item').style.background = box.checked
        ? 'rgba(169,120,46,.18)'
        : 'rgba(252,251,247,.05)';
    });
  });
});
