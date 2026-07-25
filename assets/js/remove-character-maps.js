(function () {
  function removeCharacterMap() {
    if (!/^#\/characters\/(A2|B1|B2)\/?$/i.test(window.location.hash)) return;

    document.querySelectorAll('.relationship-map-section').forEach(section => {
      section.remove();
    });
  }

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(removeCharacterMap);
  });

  window.requestAnimationFrame(removeCharacterMap);
})();
