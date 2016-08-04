import { resolve, join } from 'path';

const APP_DIR = '../app';
const BUILD_DIR = '../dist';
const ASSETS_DIR = '../assets';
const NODE_MODULES = '../node_modules';
const CONFIG_DIR = '../config';
const GULP_DIR = '../gulp';
const IMAGES_DIR = `${ASSETS_DIR}/images`;
const STYLESHEETS_DIR = `${ASSETS_DIR}/stylesheets`;

const getNodeModule = (pathname) => resolve(__dirname, NODE_MODULES, pathname);
const appDir = (pathname) => join(__dirname, APP_DIR, pathname);

const dir = {
  root: resolve(__dirname, '../'),
  app: {
    root: appDir('/'),
    actions: appDir('/actions'),
    components: appDir('/components'),
    constants: appDir('/constants'),
    layouts: appDir('/layouts'),
    views: appDir('/views'),
    reducers: appDir('/reducers'),
    utils: appDir('/utils')
  },
  gulp: resolve(__dirname, GULP_DIR),
  config: resolve(__dirname, CONFIG_DIR),
  build: resolve(__dirname, BUILD_DIR),
  assets: resolve(__dirname, ASSETS_DIR),
  images: resolve(__dirname, IMAGES_DIR),
  stylesheets: resolve(__dirname, STYLESHEETS_DIR),
  nodeModules: resolve(__dirname, NODE_MODULES)
};

const files = {
  html: `${dir.assets}/*.html`,
  less: `${dir.stylesheets}/**/*.less`,
  images: `${dir.images}/**/*`,
  js: [
    `${dir.app.root}/**/*.js`,
    `${dir.gulp}/**/*.js`,
    `${dir.webpack}/**/*.js`,
    `${dir.config}/**/*.js`
  ]
};

export { dir, files, getNodeModule };
