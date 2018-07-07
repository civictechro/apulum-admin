/* config-overrides.js */
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader, injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');

module.exports = {
  webpack: function override(config, env) {
    const tsLoader = getLoader(
      config.module.rules,
      rule =>
        rule.loader &&
        typeof rule.loader === 'string' &&
        rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          libraryDirectory: 'es',
          libraryName: 'antd',
          style: true,
        }) ]
      })
    };


  /*   tsLoader.options = {
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          camel2DashComponentName: false,
          libraryDirectory: 'lib',
          libraryName: 'ant-design-pro',
          style: true,
        }) ]
      })
    }; */

    config = rewireLess.withLoaderOptions({
      javascriptEnabled: true,
    })(config, env);

    return config;
  }
}
