import minify from 'rollup-plugin-minify-es';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

const appDir = 'app';

function buildPlugins({dir=appDir, min=false}) {
  let result = [];
  result.push(resolve());

  if (min) {
    result.push(minify({
      output: {
        wrap_iife: true
      }
    }));
  }
  result.push(filesize());
  return result;
}

function buildApp({dir=appDir, filename='index', min=false, format='umd'}) {
  let minifyToken = (min) ? '.min': '';
  let result = {
    input: `${dir}/${filename}.js`,
    plugins: buildPlugins({dir, min}),
    external: [
      'lit-element',
      'wgnhs-common',
      'wgnhs-styles',
      'wgnhs-layout',
      'wgnhs-pdf',
      'wgnhs-router',
      '@uirouter/visualizer',
    ],
    output: {
      file: `dist/${dir}/${filename}${minifyToken}.js`,
      format: format,
      name: dir,
      sourcemap: min,
      globals: {
        'lit-element': 'wgnhs-common',
        'wgnhs-common': 'wgnhs-common',
        'wgnhs-styles': 'wgnhs-common',
        'wgnhs-layout': 'wgnhs-layout',
        'wgnhs-pdf': 'wgnhs-pdf',
        'wgnhs-router': 'wgnhs-router',
        '@uirouter/visualizer' : 'ui-router-visualizer',
      }
    }
  }
  return result;
}

export default [
  buildApp({}),
  buildApp({min: true})
];
