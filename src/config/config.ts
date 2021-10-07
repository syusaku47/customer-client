type ProcessEnv = globalThis.NodeJS.ProcessEnv & Partial<{
  REACT_APP_MODE: 'dev' | 'prod' | '';
  REACT_APP_END_POINT: string;
}>;

const ENV: ProcessEnv = process.env;

export class Config {
  static mode: 'dev' | 'prod' | '' = ENV.REACT_APP_MODE || 'dev';

  static host = ENV.REACT_APP_END_POINT || 'https://ship-customer.marietta.co.jp';
}
