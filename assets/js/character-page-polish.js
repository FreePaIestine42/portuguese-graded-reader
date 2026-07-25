(function () {
  const PLACE_DESCRIPTIONS = {
    'Praça da Ladeira': 'A small central square with benches, trees, a kiosk, a children’s play area and a nearby bus stop.',
    'Café O Degrau': 'A simple neighbourhood café serving coffee, pastries, toast, sandwiches, soup and inexpensive daily meals.',
    'Jardim do Alto': 'A modest uphill park with a playground, football area, exercise equipment, shaded benches and walking paths.',
    'Padaria Flor da Ladeira': 'A small neighbourhood bakery that is busiest before work, around lunchtime and late in the afternoon.',
    'Papelaria Horizonte': 'A stationery, photocopy, printing and parcel shop located near the school.',
    'Escola Básica da Ladeira': 'The local public school attended by Leonor and Tiago.'
  };

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

  function removeMapReferences() {
    const bannerText = document.querySelector('.page-characters .character-page-banner p');
    if (!bannerText) return;

    bannerText.textContent = bannerText.textContent
      .replace(/\s*The map below shows[^.]*\./g, '')
      .trim();
  }

  function enhancePlaceLabels() {
    document.querySelectorAll('.story-universe-places > div > span').forEach(place => {
      const description = PLACE_DESCRIPTIONS[place.textContent.trim()];
      if (!description || place.dataset.placeTooltipReady === 'true') return;

      place.dataset.placeTooltipReady = 'true';
      place.dataset.placeDescription = description;
      place.classList.add('place-info-trigger');
      place.tabIndex = 0;
      place.setAttribute('aria-label', `${place.textContent.trim()}: ${description}`);

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
    if (!/^#\/characters\/(A2|B1|B2)\/?$/i.test(window.location.hash)) {
      hideTooltip();
      return;
    }

    removeMapReferences();
    enhancePlaceLabels();
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