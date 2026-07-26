(function () {
  const story = window.STORY_CONTENT?.stories?.['b2-o-que-ficou-por-dizer'];
  if (!story?.metadata) return;

  const hasBaltazar = story.metadata.characters?.some(character => character.id === 'baltazar');
  if (!hasBaltazar) {
    story.metadata.characters = [
      ...(story.metadata.characters || []),
      { id: 'baltazar', name: 'Baltazar', type: 'temporary-animal' }
    ];
  }

  if (!story.metadata.characterTags?.includes('Baltazar')) {
    story.metadata.characterTags = [...(story.metadata.characterTags || []), 'Baltazar'];
  }
})();
