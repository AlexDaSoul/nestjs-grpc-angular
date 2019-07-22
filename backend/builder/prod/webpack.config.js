const webpack = require('webpack');
const { join } = require('path');
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const dotenv = require('dotenv');

dotenv.config({ path: 'docker/env/common.env' });
dotenv.config({ path: 'docker/env/user.env' });
dotenv.config({ path: 'docker/env/todo.env' });

const Dotenv = require('dotenv-webpack');

module.exports = {
    /*    entry: {
            dev: 'webpack/hot/poll?100',
            user: './src/packages/user/main.ts',
            todo: './src/packages/todo/main.ts',
        },*/
    entry: [
        'webpack/hot/poll?100',
        join(process.cwd(), 'src/packages/user/main.ts'),
        join(process.cwd(), 'src/packages/todo/main.ts'),
    ],
    watch: true,
    target: 'node',
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@grpc': join(process.cwd(), 'src/grpc-proto'),
            '@lib': join(process.cwd(), 'src/lib'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            path: join(process.cwd(), 'docker/env/common.env'),
            systemvars: true
        }),
        //ignore the drivers you don't want. This is the complete list of all drivers
        // -- remove the suppressions for drivers you want to use.
        new FilterWarningsPlugin({
            exclude: [/pg/, /pg-native/, /pg-query-stream/]
        }),
    ],
    output: {
        path: join(process.cwd(), 'dist'),
        filename: 'server.js',
    },
};
