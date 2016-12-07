import axios from 'axios';

export default (config: { googleCseId: string, googleCseKey: string }) => (message: string): Promise<string> => {

  const { googleCseId, googleCseKey } = config;
  const triggerRegex = /(?:image|animate) me (.*)/;
  const isNsfwRegex = /#nsfw/i;
  const isGifRegex = /animate me (.*)/;

  if (!triggerRegex.test(message)) return;

  const searchQuery: string = triggerRegex.exec(message)[1].replace(isNsfwRegex, '');
  const isNsfw: boolean = isNsfwRegex.test(message);
  const isGifQuery: boolean = isGifRegex.test(message);

  return getRandomImageUrl({ searchQuery, isGifQuery, googleCseId, googleCseKey })
    .then(imageUrl => isNsfw ? `#nsfw <${imageUrl}>` : imageUrl);

};

function getRandomImageUrl(options: { searchQuery: string, isGifQuery: boolean, googleCseId: string, googleCseKey: string }): Promise<string> {
  const { searchQuery, isGifQuery, googleCseId, googleCseKey } = options;

  const params = {
    q: searchQuery,
    searchType: 'image',
    fields: 'items(link)',
    cx: googleCseId,
    key: googleCseKey
  };

  if (isGifQuery) {
    Object.assign(params, {
      fileType: 'gif',
      hq: 'animated',
      tbs: 'itp:animated'
    });
  }

  return Promise.resolve()
    .then(() => axios.get('https://www.googleapis.com/customsearch/v1', { params }))
    .then(({ data: { items } }) => items)
    .then(searchResults => searchResults[ Math.floor(Math.random() * searchResults.length) ])
    .catch(() => ({ link: 'Could not find results for your request.' }))
    .then(({ link }) => link);
}
