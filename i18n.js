// i18n.js - Dil değiştirme mantığı

// Tarayıcı dilini kontrol et
function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('tr') ? 'tr' : 'en';
}

// Kayıtlı dili al veya tarayıcı dilini kullan
function getCurrentLanguage() {
  return localStorage.getItem('language') || getBrowserLanguage();
}

// Sayfadaki tüm çevirileri güncelle
function updateContent(lang) {
  // Tüm data-i18n attribute'larını bul ve çevir
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Eğer innerHTML içinde başka elementler varsa (span vs), innerHTML kullan
      if (element.querySelector('span')) {
        element.innerHTML = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Placeholder'ları çevir
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Dil butonlarını güncelle (aktif olan butonu işaretle)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // HTML lang attribute'unu güncelle
  document.documentElement.lang = lang;
}

// Dil değiştir
function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  updateContent(lang);
}

// Sayfa yüklendiğinde dili uygula
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  updateContent(currentLang);

  // Dil değiştirme butonlarına event listener ekle
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
});

// Global fonksiyon olarak export et (butonlardan çağrılabilsin)
window.changeLanguage = changeLanguage;
