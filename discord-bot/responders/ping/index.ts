export default () => (message: string): Promise<string> => {
  if (!/ping/i.test(message)) return;

  return Promise.resolve('PONG');
};
