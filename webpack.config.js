/*
    此文件是webpack的配置文件,用于指定webpack去执行那些任务
 */


const HtmlWebpackPlugin = require('html-webpack-plugin')


const path = require('path')
//由于webpack是基于node运行的,所以必须使用commonjs来暴露对象(对象内容为webpack的配置)
module.exports = {
    entry: ['./src/js/index.js','./src/index.html'],      //入口
    output: {
        //也就是说: 第一个属性创建文件夹,第二个属性创建文件
        path: path.resolve(__dirname + '/dist'),       //输出路径(由于必需是绝对路径,所以要这样写)
        filename: "./js/index.js"      //输出的文件名
    },
    mode: 'development',           //配置模式(分为生产模式(production)和开发模式(development),生产为压缩编译后的代码,开发则不压缩,就编译)
    //所有的loader都要在module对象中的rules属性中,rules是一个数组,数组中的每一个元素都是一个loader
    //loader的特点:  下载后无需引入,只需申明
    module: {
        rules: [
            //解析less(不完美)
            {
                test: /\.less$/,                 //匹配所有less文件
                use: [
                    'style-loader',     //用于在html文档中创建一个style标签,将样式塞进去
                    'css-loader',       //将less编译后的css转换为commonJS的一个模块
                    'less-loader',       //编译less为css,但不生成单独的css文件,(编译之后在内存中)
                ],
            },
            //js语法检查
            {
                test: /\.js$/,
                exclude: /node_modules/,            //排除node_modules文件夹中的js
                use: {loader: "eslint-loader"},
                enforce: "pre",                     //提前加载使用

            },
            //js语法转换
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',       //按需引入需要使用polyfill
                                    corejs: {version: 3},       //解决不能够找到corejs的问题
                                    targets: {                  //指定兼容性处理那些浏览器
                                        "chrome": "58",
                                        "ie": "9"
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true,                     //开启babel缓存(解析快一些)
                    }
                }
            },
            //使用url-loader处理样式文件中的图片
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,                         //小于8kb的图片会自动转换为base64处理
                            outputPath: 'images',               //决定文件本地输出路径(以dist为根路径)
                            publicPath: 'images/',                //决定图片的url路径(寻找图片的默认路径)
                            name: '[hash:5].[ext]',             //修改文件名称[hash:5] hash值取前8位  [ext]   文件拓展名
                        }
                    },
                ],
            },
            //使用html-loader处理html中的标签资源
            {
                test: /\.(html)$/,
                use: {
                    loader: "html-loader"
                }
            },
            //使用file-loader处理其他资源
            {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,        //处理其他资源
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[hash:5].[ext]'          //取hash值的前5位并且保留后缀
                }
            }
        ]
    },

    //插件
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'            //以当前文件为模板创建新的html(1. 结构和原来一样   2. 会自动引入打包的资源)
    })],

    //配置自动化编译
    devServer: {
        open: true,         //自动打开浏览器
        // compress: true,     //
        port: 3000,          //端口号
        hot:true            //开启热模替换
    },

    devtool: "cheap-module-eval-source-map"
}

