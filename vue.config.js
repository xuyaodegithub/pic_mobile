const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//打包时，显示进度条插件
const Timestamp = new Date().getTime();//时间戳，解决缓存问题
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? 'http://47.111.168.199:8080' : 'http://47.111.168.199:8080',
    publicPath:'./',
    outputDir:'dist',//打包生出的目录
    productionSourceMap: false,
    // filenameHashing: false,    // 去掉文件名中的 hash
    lintOnSave: false,   // 取消 eslint 验证
    // assetsDir:'',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // indexPath:'',//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // productionSourceMap:'',//如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // filenameHashing:'',//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
    css: {//有的时候你想要向 webpack 的预处理器 loader 传递选项。你可以使用 vue.config.js 中的 css.loaderOptions 选项。比如你可以这样向所有 Sass 样式传入共享的全局变量：
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/style/initscss.scss";`
            }
        }
    },

    devServer: {//代理
        port: process.env.PORT ? process.env.PORT : 8888,//端口号
        host: '0.0.0.0',
        // https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://47.111.168.199:8080/image2',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: 'http://47.111.168.199:8080/image2'
            }
        }
    },
    pages:{
        index: {
            entry: 'src/views/index/index.js',
            template: 'public/index.html',
            filename: 'index.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '一键抠图神器',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        }, currency: {
            entry: 'src/views/h_currency/index.js',
            template: 'public/currency.html',
            filename: 'currency.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '通用抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },people: {
            entry: 'src/views/h_people/index.js',
            template: 'public/people.html',
            filename: 'people.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '人像抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        }, object: {
            entry: 'src/views/h_object/index.js',
            template: 'public/object.html',
            filename: 'object.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '物体抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },header: {
            entry: 'src/views/h_header/index.js',
            template: 'public/headCutout.html',
            filename: 'headCutout.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '头像抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },beautify: {
            entry: 'src/views/h_beautify/index.js',
            template: 'public/beautify.html',
            filename: 'beautify.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '一键美化',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },repairImg: {
            entry: 'src/views/h_repairImg/index.js',
            template: 'public/repairImg.html',
            filename: 'repairImg.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '图片修复',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },guoqing: {
            entry: 'src/views/h_guo/index.js',
            template: 'public/guo.html',
            filename: 'guo.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '国庆同框',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },travle: {
            entry: 'src/views/h_travle/index.js',
            template: 'public/travle.html',
            filename: 'travle.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '一键旅拍',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },apis: {
            entry: 'src/views/apis/index.js',
            template: 'public/apis.html',
            filename: 'apis.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'apis',
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            }),
            new ProgressBarPlugin()
        ],
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${Timestamp}.js`,
            chunkFilename: `js/[name].${Timestamp}.js`
        },
    },
    // configureWebpack: config => {//如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //     } else {
    //         // 为开发环境修改配置...
    //     }
    // }
}
