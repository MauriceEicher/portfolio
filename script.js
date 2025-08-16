//---------------------------Beim Neuladen der Seite startet man immer ganz oben---------------------------

window.history.scrollRestoration = 'manual'; // verhindert automatisches Zurückscrollen
  window.onload = () => window.scrollTo(0, 0);

//---------------------------Fade-In Schrift & Linien---------------------------

// Hilfsfunktion: Prüft, ob ein Element im Viewport ist
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Hauptfunktion: Scroll-Animationen prüfen
const checkFadeInOnScroll = () => {
  // Typo-Elemente (Fade-in von unten)
  document.querySelectorAll('.fade_typo').forEach(element => {
    const isInNav = element.closest('#navigation');
    if (!isInNav) {
      element.classList.toggle('visible', isInViewport(element));
    }
  });

  // Linien-Elemente (z. B. expand_on_scroll)
  document.querySelectorAll('.expand_on_scroll').forEach(line => {
    line.classList.toggle('visible', isInViewport(line));
  });

  // Große Typo von links (.bigtype_h1 & .bigtype_serif_h1)
  document.querySelectorAll('.bigtype_h1, .bigtype_serif_h1').forEach(element => {
    element.classList.toggle('visible', isInViewport(element));
  });
};

// Event-Listener
window.addEventListener('scroll', checkFadeInOnScroll);
window.addEventListener('resize', checkFadeInOnScroll);
window.addEventListener('load', checkFadeInOnScroll);

// Direkt initial prüfen
checkFadeInOnScroll();

//---------------------------Navigation Burgermenü & Fade-In Schrift---------------------------

const burger = document.getElementById('burger');
const navigation = document.getElementById('navigation');
const fadeElementsInNav = navigation.querySelectorAll('.fade_nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navigation.classList.toggle('active');

  if (navigation.classList.contains('active')) {
    // Verzögerung hinzufügen, um die "blinkende" Animation zu vermeiden
    fadeElementsInNav.forEach((el, index) => {
      el.classList.remove('fade-in'); // Entfernen von vorherigen Animationen
      el.style.animationDelay = '0s'; // Zurücksetzen der Verzögerung

      // Verzögertes Hinzufügen der fade-in Klasse mit mehr Abstand (gestaffelt)
      setTimeout(() => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`; // Verzögerung je nach Index
      }, 10); // Verzögerung von 10ms für das Hinzufügen der Klasse
    });
  } else {
    // Zurücksetzen, wenn die Navigation geschlossen wird
    fadeElementsInNav.forEach(el => {
      el.classList.remove('fade-in');
      el.style.animationDelay = '0s';
    });
  }
});

//---------------------------Scroll Animation Bilder (So hoch wie der Viewport)---------------------------

window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.header, .img_fullscreen');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const center = window.innerHeight / 2;
    const dist = Math.abs((rect.top + rect.height / 2) - center);
    const deadZone = 100;
    const maxDist = 300;

    const viewportWidth = window.innerWidth;

    let reductionPerSide;

    if (viewportWidth >= 1080) {
      reductionPerSide = 60;
    } else if (viewportWidth >= 720) {
      reductionPerSide = 32;
    } else {
      reductionPerSide = 16;
    }

    const maxReduction = reductionPerSide * 2; // Gesamtreduktion (links + rechts)

    let widthPx = viewportWidth;

    if (dist > deadZone) {
      const f = Math.min((dist - deadZone) / maxDist, 1);
      const reduce = maxReduction * f;
      widthPx = viewportWidth - reduce;
    }

    el.style.width = `${widthPx}px`;
  });
});

//---------------------------Scroll Animation Bilder (Höher als der Viewport)---------------------------

window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.img_fullscreen_oversized');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const center = window.innerHeight / 2;

    // Mittelpunkt des Elements
    const elementCenter = rect.top + rect.height / 2;

    // Abstand des Elements vom Viewport-Zentrum
    const dist = Math.abs(elementCenter - center);

    // Bildschirmbreite
    const viewportWidth = window.innerWidth;

    // Reduktionswert je nach Bildschirmbreite
    let reductionPerSide;
    if (viewportWidth >= 1080) {
      reductionPerSide = 60;
    } else if (viewportWidth >= 720) {
      reductionPerSide = 32;
    } else {
      reductionPerSide = 16;
    }

    const maxReduction = reductionPerSide * 2;

    // Dynamische deadZone, abhängig von Elementhöhe (max. 300px)
    const deadZone = Math.min(rect.height / 2, 800);
    const maxDist = 600;

    // Reduktionsfaktor berechnen
    let f = 0;
    if (dist > deadZone) {
      f = Math.min((dist - deadZone) / maxDist, 1);
    }

    const reduce = maxReduction * f;
    const widthPx = viewportWidth - reduce;

    // Setze neue Breite
    el.style.width = `${widthPx}px`;
  });
});

//---------------------------Startseite Projekte Thumbnails Hover Effekt---------------------------

const projektLinks = document.querySelectorAll('.projekt_link');
const hoverImage = document.getElementById('projekt_link_hover_image');

projektLinks.forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    const imgSrc = link.getAttribute('data-image');
    hoverImage.src = imgSrc;

    // Direkt sichtbar machen
    hoverImage.classList.add('visible');
  });

  link.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;

    // Y-Position des Links im Viewport
    const linkRect = link.getBoundingClientRect();
    const linkY = linkRect.top + linkRect.height / 2.2 - hoverImage.offsetHeight / 2.2;

    // Setze Position des Thumbnails
    hoverImage.style.left = (mouseX + 20) + 'px';
    hoverImage.style.top = linkY + 'px';
  });

  link.addEventListener('mouseleave', () => {
    hoverImage.classList.remove('visible');

    // Leere das Bild nach kurzer Zeit (für sanfteres Ausblenden)
    setTimeout(() => {
      if (!hoverImage.classList.contains('visible')) {
        hoverImage.src = '';
      }
    }, 300);
  });
});

//---------------------------Youthnited Seite "Gehirn einschalten" Effekt---------------------------

const einschaltenLink = document.getElementById("einschaltenLink");
  const gehirnBild = document.getElementById("gehirnBild");

  // Bildpfade
  const bildFarbe = "img/youthnited/youthnited_gehirn/youthnited_gehirn_weis.webp";
  const bildGrau = "img/youthnited/youthnited_gehirn/youthnited_gehirn_farbe.webp";

  // Zustand: Bild ist aktiv (eingeschaltet) oder nicht
  let istEingeschaltet = false;

  einschaltenLink.addEventListener("click", function (e) {
    e.preventDefault();

    if (istEingeschaltet) {
      gehirnBild.src = bildFarbe;
    } else {
      gehirnBild.src = bildGrau;
    }

    istEingeschaltet = !istEingeschaltet; // Zustand umkehren
  });