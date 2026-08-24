



//---------------------------0            Inhalt            0---------------------------


//-Beim Neuladen der Seite startet man immer ganz oben-

//-Fade-In Schrift & Linien-

//-Navigation Burgermenü & Fade-In Schrift-

//-Scroll Animation Bilder (So hoch wie der Viewport)-
//-Scroll Animation Bilder (Höher als der Viewport)-

//-Startseite Gehirn Effekt-
//-Startseite Projekte Thumbnails Hover Effekt-

//-PVision Seite Personas Bildwechsel-

//-Lachswanderung Seite große Infografik Scrolleffekt-




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

//---------------------------Startseite Gehirn Effekt---------------------------

const einschaltenLink = document.getElementById("einschaltenLink");
const gehirnBild = document.getElementById("gehirnBild");

if (einschaltenLink && gehirnBild) {

  // Bildpfade
  const bildFarbe = "img/index/index_header/gehirn_schwarz.webp";
  const bildGrau = "img/index/index_header/gehirn_gedanke.webp";

  // Zustand
  let istEingeschaltet = false;

  einschaltenLink.addEventListener("click", function (e) {
    e.preventDefault();

    if (istEingeschaltet) {
      gehirnBild.src = bildFarbe;
    } else {
      gehirnBild.src = bildGrau;
    }

    istEingeschaltet = !istEingeschaltet;
  });

}

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

//---------------------------PVision Seite Personas Bildwechsel---------------------------

const personaZurueck = document.getElementById("persona_zurueck");
const personaVorwaerts = document.getElementById("persona_vorwaerts");
const personaBild = document.getElementById("img_persona");

if (personaZurueck && personaVorwaerts && personaBild) {

  // Bildpfade
  const persona1 = "img/pvision/pvision_personas/pvision_persona_1.webp";
  const persona2 = "img/pvision/pvision_personas/pvision_persona_2.webp";
  const persona3 = "img/pvision/pvision_personas/pvision_persona_3.webp";

  // Zustand
  let aktuellePersona = 1;

  // Vorwärts
  personaVorwaerts.addEventListener("click", function (e) {

    e.preventDefault();

    if (aktuellePersona === 1) {
      personaBild.src = persona2;
      aktuellePersona = 2;
    } 
    else if (aktuellePersona === 2) {
      personaBild.src = persona3;
      aktuellePersona = 3;
    } 
    else {
      personaBild.src = persona1;
      aktuellePersona = 1;
    }

  });

  // Rückwärts
  personaZurueck.addEventListener("click", function (e) {

    e.preventDefault();

    if (aktuellePersona === 3) {
      personaBild.src = persona2;
      aktuellePersona = 2;
    } 
    else if (aktuellePersona === 2) {
      personaBild.src = persona1;
      aktuellePersona = 1;
    } 
    else {
      personaBild.src = persona3;
      aktuellePersona = 3;
    }

  });

}

//---------------------------Lachswanderung Seite große Infografik Scrolleffekt---------------------------

const img = document.querySelector('.infografik_scroll');
const wrapper = document.querySelector('.infografik_wrapper');

const desiredVisibleRadius = 15;
let minScale = 1;

function calculateMinScale() {
  const targetHeight = window.innerHeight * 0.8; // 80vh
  const currentHeight = img.offsetHeight || 1;
  minScale = Math.min(1, targetHeight / currentHeight);

  // WICHTIG gegen das Flackern: Der Wrapper behält die Originalhöhe als Platzhalter!
  wrapper.style.height = `${currentHeight}px`;
}

function applyScale(scale) {
  const radius = desiredVisibleRadius / scale;
  
  gsap.to(img, {
    scale: scale,
    borderRadius: `${radius}px`,
    duration: 0.5,
    ease: "power2.out",
    overwrite: "auto"
  });
}

function onScroll() {
  // Wir messen jetzt den Wrapper, weil dieser seine Position im Dokument NIE verändert
  const wrapperRect = wrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const targetOffset = windowHeight * 0.1; // 10vh Versatz

  // Wie weit ist die Unterkante des Wrappers vom unteren Bildschirmrand entfernt?
  const distanceScrolled = windowHeight - wrapperRect.bottom;

  if (distanceScrolled < 0) {
    // Phase 1: Unterkante hat den Boden noch nicht erreicht
    img.classList.remove('is-fixed');
    applyScale(1);

  } else if (distanceScrolled >= 0 && distanceScrolled < targetOffset) {
    // Phase 2: Unterkante am Boden -> Verkleinern läuft über 0.5s
    img.classList.remove('is-fixed');
    applyScale(minScale);

  } else {
    // Phase 3: 10vh überschritten -> Dasselbe Bild wird auf fixed gesetzt
    applyScale(minScale);
    img.classList.add('is-fixed');
  }
}

// Events
window.addEventListener('scroll', onScroll, { passive: true });

window.addEventListener('load', () => {
  calculateMinScale();
  onScroll();
});

img.onload = () => {
  calculateMinScale();
  onScroll();
};

window.addEventListener('resize', () => {
  calculateMinScale();
  onScroll();
});