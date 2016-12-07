export default () => (message: string): Promise<string> => {
  if (message !== 'ping') return;

  return Promise.resolve('PONG');
};
