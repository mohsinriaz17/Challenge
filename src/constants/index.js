import { Platform, Dimensions } from 'react-native';
export const VERSION = 'Version 0.0.1';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
export const PLATFORM_IOS = (Platform.OS === 'ios') ? true : false;

export const SERVER_BASE = 'http://localhost:3000/';
export const API_BASE = `${SERVER_BASE}api/products?`;

export const AXIOS_CONFIG = {}

export const FONT_SIZE = 14

