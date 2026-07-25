(function () {
  const BASE_PLACE_DESCRIPTIONS = {
    'Praça da Ladeira': 'A small central square with benches, trees, a kiosk, a children’s play area and a nearby bus stop.',
    'Café O Degrau': 'A simple neighbourhood café serving coffee, pastries, toast, sandwiches, soup and inexpensive daily meals.',
    'Jardim do Alto': 'A modest uphill park with a playground, football area, exercise equipment, shaded benches and walking paths.',
    'Padaria Flor da Ladeira': 'A small neighbourhood bakery that is busiest before work, around lunchtime and late in the afternoon.',
    'Papelaria Horizonte': 'A stationery, photocopy, printing and parcel shop located near the school.',
    'Escola Básica da Ladeira': 'The local public school.'
  };

  const LEVEL_PLACE_DESCRIPTIONS = {
    A2: {
      'Padaria Flor da Ladeira': 'A small neighbourhood bakery that is busiest before work, around lunchtime and late in the afternoon. Paula works the morning shift here.',
      'Escola Básica da Ladeira': 'The local public school attended by Leonor and Tiago.'
    },
    B1: {
      'Papelaria Horizonte': 'A stationery, photocopy, printing and parcel shop located near the school. Teresa owns it, and Inês works here.'
    },
    B2: {}
  };

  const CHARACTER_INTROS = {
    A2: 'Meet eight recurring characters of different ages, with varied personalities, responsibilities and everyday routines. Their friendships, family ties and working lives provide the cast for the A2 stories.',
    B1: 'Meet eight recurring adults with different jobs, responsibilities and personalities. Their friendships, family ties and working lives provide the cast for the B1 stories.',
    B2: 'Meet eight recurring adults whose personal, family and professional lives create the cast for the B2 stories. Their profiles introduce the more layered situations and relationships that may develop across this level.'
  };

  const UNIVERSE_PARAGRAPHS = [
    'All fictional stories on Portuguese Stories take place in Bairro da Ladeira, an imagined neighbourhood in Lisbon. It has older apartment buildings, local shops, a school, a café, a bakery, a park, a square, a pharmacy and a neighbourhood association.',
    'The neighbourhood provides familiar settings for everyday life, work, family routines and local events. Recurring places help the stories feel connected while allowing each reading to stand on its own.'
  ];

  let tooltip = null;
  let activePlace = null;

  function ensureTooltip() {
    if (tooltip) return tooltip;

    tooltip = document.createElement('div');
    tooltip.className = 'place-info-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function positionTooltip(place) {
    const info = ensureTooltip();
    const rect = place.getBoundingClientRect();
    const margin = 12;

    info.style.left = '0px';
    info.style.top = '0px';
    info.hidden = false;

    const tooltipRect = info.getBoundingClientRect();
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

    let top = rect.top - tooltipRect.height - 10;
    if (top < margin) top = rect.bottom + 10;

    info.style.left = `${Math.round(left)}px`;
    info.style.top = `${Math.round(top)}px`;
  }

  function showTooltip(place) {
    const description = place.dataset.placeDescription;
    if (!description) return;

    activePlace = place;
    const info = ensureTooltip();
    info.textContent = description;
    info.hidden = false;
    place.setAttribute('aria-describedby', 'place-info-tooltip');
    info.id = 'place-info-tooltip';
    positionTooltip(place);
  }

  function hideTooltip(place) {
    if (place && activePlace && place !== activePlace) return;
    if (activePlace) activePlace.removeAttribute('aria-describedby');
    activePlace = null;
    if (tooltip) tooltip.hidden = true;
  }

  function updateSectionCopy(levelId) {
    const bannerText = document.querySelector('.page-characters .character-page-banner p');
    if (bannerText && CHARACTER_INTROS[levelId]) {
      bannerText.textContent = CHARACTER_INTROS[levelId];
    }

    const universeParagraphs = document.querySelectorAll('.story-universe-copy p');
    UNIVERSE_PARAGRAPHS.forEach((paragraph, index) => {
      if (universeParagraphs[index]) universeParagraphs[index].textContent = paragraph;
    });
  }

  function getPlaceDescription(levelId, placeName) {
    const levelDescriptions = LEVEL_PLACE_DESCRIPTIONS[levelId] || {};
    return levelDescriptions[placeName] || BASE_PLACE_DESCRIPTIONS[placeName];
  }

  function enhancePlaceLabels(levelId) {
    document.querySelectorAll('.story-universe-places > div > span').forEach(place => {
      const placeName = place.textContent.trim();
      const description = getPlaceDescription(levelId, placeName);
      if (!description) return;

      place.dataset.placeDescription = description;
      place.classList.add('place-info-trigger');
      place.tabIndex = 0;
      place.setAttribute('aria-label', `${placeName}: ${description}`);

      if (place.dataset.placeTooltipReady === 'true') return;
      place.dataset.placeTooltipReady = 'true';

      place.addEventListener('mouseenter', () => showTooltip(place));
      place.addEventListener('mouseleave', () => hideTooltip(place));
      place.addEventListener('focus', () => showTooltip(place));
      place.addEventListener('blur', () => hideTooltip(place));
      place.addEventListener('click', () => {
        if (activePlace === place) hideTooltip(place);
        else showTooltip(place);
      });
      place.addEventListener('keydown', event => {
        if (event.key === 'Escape') hideTooltip(place);
      });
    });
  }

  function applyCharacterPagePolish() {
    const match = window.location.hash.match(/^#\/characters\/(A2|B1|B2)\/?$/i);
    if (!match) {
      hideTooltip();
      return;
    }

    const levelId = match[1].toUpperCase();
    updateSectionCopy(levelId);
    enhancePlaceLabels(levelId);
  }

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(applyCharacterPagePolish);
  });
  window.addEventListener('resize', () => {
    if (activePlace) positionTooltip(activePlace);
  });
  window.addEventListener('scroll', () => {
    if (activePlace) positionTooltip(activePlace);
  }, true);

  window.requestAnimationFrame(applyCharacterPagePolish);
})();