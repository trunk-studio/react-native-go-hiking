import prodConfig from './config.prod';
import devConfig from './config.dev';
import config from '../config';

let loadedStore = null;

if (config.envMode === 'production') {
  loadedStore = prodConfig;
} else {
  loadedStore = devConfig;
}

export const configureStore = loadedStore;
