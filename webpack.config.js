const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');


const PAGES_DIR  = `${__dirname}/app/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName)=> fileName.endsWith('.pug'));

const createAutoImport = async (path, isFirst, pathAutoImportFile) => {
    const importsFiles = [];

    await (async function autoImport (path, isFirst) {
        const allFilesCurDir = await fs.opendirSync(path);
        for await ( let el of allFilesCurDir){
            if(el.isDirectory()){
                await autoImport(`${path}/${el.name}`);
            }else{
                isFirst ? null : importsFiles.push(`${path}/${el.name}`);
            }
        }
    })(path, isFirst);

    const text = importsFiles.map((pathFile) => `import '${pathFile.replace(path, '.')}' ; \n`).join(``);
    await fs.writeFileSync(pathAutoImportFile, text);
};

module.exports = async () =>{
    const pathDirDev = `${__dirname}/public/dev`;
    await createAutoImport(pathDirDev, true, `${pathDirDev}/autoimport.js`);

    return {
        mode: 'development',
        entry: './public/dev/main.js',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|svg)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    exclude: '/node-modules'
                },
                {
                    test: /\.styl$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {loader: 'stylus-loader'}
                    ]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`
            })),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new OptimizeCssAssetsPlugin()
        ],
        devServer: {
            stats: 'errors-only',
            contentBase: path.join(__dirname, 'dist')
        }
    }
};







