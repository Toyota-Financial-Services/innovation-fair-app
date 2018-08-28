const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    config.resolve = {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            components: path.resolve(__dirname, 'src/components'),
            assets: path.resolve(__dirname, 'src/assets')
        }
    };

    config = injectBabelPlugin('transform-decorators-legacy', config);
    config = injectBabelPlugin(
        //['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        config
    );
    //config.proxy = 'http://localhost:5000';

    config.externals = {};

    return config;
};
/*"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test --env=jsdom"*/

