/**
 * @format
 */

import {AppRegistry} from 'react-native';
// Ao importar de uma pasta, sem definir o arquivo, por padrão o React importará do index.js
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
