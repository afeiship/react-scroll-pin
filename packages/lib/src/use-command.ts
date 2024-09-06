import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event?.emit(`${name}:${command}`, ...args);

  const listen = (cmd: string, callback: any) => RcComponent.event?.on(`${name}:${cmd}`, callback);

  // the command repository:
  const bottom = (index: number) => execute('bottom', index);

  return {
    listen,
    bottom
  };
};

export default useCommand;
