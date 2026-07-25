(function () {
  function moveB1BannerToTop() {
    if (!/^#\/characters\/B1\/?$/i.test(window.location.hash)) return;

    const page = document.querySelector('.page-characters');
    const banner = page && page.querySelector('.character-page-banner');
    const universe = page && page.querySelector('.story-universe-section');

    if (page && banner && universe && page.firstElementChild !== banner) {
      page.insertBefore(banner, universe);
    }
  }

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(moveB1BannerToTop);
  });

  window.requestAnimationFrame(moveB1BannerToTop);
})();
