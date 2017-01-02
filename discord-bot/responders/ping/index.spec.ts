import { equal as assertEqual } from 'assert';
import PingResponder from 'discord-bot/responders/ping';

describe('discord-bot/responders/ping/index.spec.ts', () => {

  const responder = PingResponder();

  it('responds PONG to PING', () => {
    return Promise.resolve()
      .then(() => responder('ping'))
      .then(response => assertEqual(response, 'PONG'))
      .then(() => responder('PING'))
      .then(response => assertEqual(response, 'PONG'));
  });

});
