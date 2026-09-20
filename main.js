document.addEventListener('DOMContentLoaded', function () {

  // --- A/B тест заголовка hero-блока ---
  // Варианты для теста. Меняйте текст здесь, если хотите протестировать другие формулировки.
  var HERO_VARIANTS = {
    A: 'Как посчитать точный маршрут к пассивному доходу 100 000 ₽/мес',
    B: 'Как выйти на 100 000 ₽/мес пассивного дохода к пенсии — без зависимости от государства, детей и удачи на бирже'
  };

  var STORAGE_KEY = 'nnp_ab_variant';
  var variant = null;
  try { variant = localStorage.getItem(STORAGE_KEY); } catch (e) { /* localStorage недоступен — тест просто не запомнит выбор между визитами */ }

  if (!variant || !HERO_VARIANTS[variant]) {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    try { localStorage.setItem(STORAGE_KEY, variant); } catch (e) {}
  }

  var headline = document.getElementById('hero-headline');
  if (headline) { headline.textContent = HERO_VARIANTS[variant]; }

  // Помечаем письмо с заявкой номером показанного варианта —
  // так вы увидите в теме письма, какой заголовок привёл клиента
  var cta = document.getElementById('offer-cta');
  if (cta) {
    var url = new URL(cta.href);
    var subject = url.searchParams.get('subject') || 'Записаться на встречу';
    url.searchParams.set('subject', subject + ' [Вариант ' + variant + ']');
    cta.href = url.toString();
  }

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
