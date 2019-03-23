
// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';
loadEnvConfig();
const env: string = process.env.NODE_ENV || 'local';
const configs:any = {
  base: {
    env,
    name: process.env.APP_NAME || 'practicewebscraper',
    host: process.env.APP_HOST || '0.0.0.0',
    httpPort: process.env.APP_HTTP_PORT || 3000,
  },
  production: {
  },
  staging: {
  },
  development: {},
  local:{},
};

export const appConfig = Object.assign(configs.base, configs[env]);
