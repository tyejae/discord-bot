import { equal as assertEqual, notEqual as assertNotEqual } from 'assert';
import PingResponder from 'discord-bot/responders/ping';

describe('discord-bot/responders/ping/index.spec.ts', () => {

  const responder = PingResponder();

  it('only responds to PING', () => {
    return Promise.resolve()
      .then(() => responder('foo'))
      .then(response => assertEqual(response, null))
      .then(() => responder('ping'))
      .then(response => assertNotEqual(response, null));
  });

  it('responds PONG to PING', () => {
    return Promise.resolve()
      .then(() => responder('ping'))
      .then(response => assertEqual(response, 'PONG'))
      .then(() => responder('PING'))
      .then(response => assertEqual(response, 'PONG'));
  });

});
