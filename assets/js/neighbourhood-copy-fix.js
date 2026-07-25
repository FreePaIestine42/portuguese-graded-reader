(function () {
  const description = 'All fictional stories on Portuguese Stories take place in Bairro da Ladeira, a fictional neighbourhood in Lisbon. It has older apartment buildings, local shops, a school, a café, a bakery, a park, a square, a pharmacy and a neighbourhood association.';

  function updateNeighbourhoodDescription() {
    if (!/^#\/characters\/(A2|B1|B2)\/?$/i.test(window.location.hash)) return;

    const firstParagraph = document.querySelector('.story-universe-copy p');
    if (firstParagraph) firstParagraph.textContent = description;
  }

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(updateNeighbourhoodDescription);
  });

  window.requestAnimationFrame(updateNeighbourhoodDescription);
})();
