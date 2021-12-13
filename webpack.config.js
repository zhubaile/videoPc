const  path = require('path');

const config = {
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            utils: path.join(__dirname, 'src/utils'),
            public: path.join(__dirname, 'src/public'),
            components: path.join(__dirname, 'src/components'),
        },
    },
};

module.exports = config;