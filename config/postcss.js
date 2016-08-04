import { dir } from './app';

export default function(bundler) {
  return [
    require('precss'),
    require('postcss-easy-import')({
      addDependencyTo: bundler,
      path: [dir.nodeModules, dir.stylesheets],
      glob: true
    }),
    require('postcss-font-magician'),
    require('postcss-utilities'),
    require('postcss-cssnext')
  ];
}
