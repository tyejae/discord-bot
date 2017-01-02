import defaultAxios, { AxiosInstance } from 'axios';

export default (youtubeApiKey: string, axios: any = defaultAxios) => (message: string): Promise<string> => {
  const triggerRegex = /youtube me (.*)/;

  if (!triggerRegex.test(message)) return;

  const searchQuery: string = triggerRegex.exec(message)[1];
  return getRandomYoutubeVideoUrl(searchQuery, youtubeApiKey, axios);
};

function getRandomYoutubeVideoUrl(searchQuery: string, youtubeApiKey: string, axios: AxiosInstance): Promise<string> {
  const params = {
    q: searchQuery,
    order: 'relevance',
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    key: youtubeApiKey
  };

  return Promise.resolve()
    .then(() => axios.get('https://www.googleapis.com/youtube/v3/search', { params }))
    .then(({ data: { items } }) => items.map(({ id: { videoId } }) => videoId))
    .then(videoIds => videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`))
    .then(results => results.length > 0 ? results[ Math.floor(Math.random() * results.length) ] : Promise.reject(''))
    .catch(() => 'Could not find results for your request.');
}
