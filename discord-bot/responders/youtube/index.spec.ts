import { notEqual as assertNotEqual, equal as assertEqual } from 'assert';
import { createAxiosMock } from 'discord-bot/utils/test';
import YoutubeResponder from 'discord-bot/responders/youtube';

describe('discord-bot/responders/youtube/index.ts', () => {

  it('only reacts to `youtube me` command prefix', () => {
    const responder = YoutubeResponder('', createAxiosMock({}));

    return Promise.resolve()
      .then(() => responder('foo'))
      .then(response => assertEqual(response, null))
      .then(() => responder('youtube me foo'))
      .then(response => assertNotEqual(response, null));
  });

  it('returns a random video from the youtube search API', () => {
    const items = [
      { id: { videoId: 'abc123' } },
      { id: { videoId: 'abc456' } },
      { id: { videoId: 'zyx123' } }
    ];
    const axios = createAxiosMock({
      'GET https://www.googleapis.com/youtube/v3/search': {
        status: 200,
        response: {
          items
        }
      }
    });
    const responder = YoutubeResponder('', axios);

    return Promise.resolve()
      .then(() => responder('youtube me foo'))
      .then(videoUrl => assertNotEqual(items.map(({ id: { videoId } }) => `https://www.youtube.com/watch?v=${videoId}`).indexOf(videoUrl), -1));
  });

  it('can tell if no results were found', () => {
    const responder = YoutubeResponder('', createAxiosMock({
      'GET https://www.googleapis.com/youtube/v3/search': {
        status: 200,
        response: { items: [] }
      }
    }));

    return Promise.resolve()
      .then(() => responder('youtube me foo'))
      .then(response => assertEqual(response, 'Could not find results for your request.'));
  });

  it('gracefully fails on API request error', () => {
    const responder = YoutubeResponder('', createAxiosMock({
      'GET https://www.googleapis.com/youtube/v3/search': {
        status: 500,
        response: {}
      }
    }));

    return Promise.resolve()
      .then(() => responder('youtube me foo'))
      .then(response => assertEqual(response, 'Could not find results for your request.'));
  });

});
