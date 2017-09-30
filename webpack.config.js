
var webpack = require('webpack');
var path = require('path')

module.exports={
    entry:__dirname+'/app/main.js',
    output:{
    path:__dirname+"/build",
    filename:"bundle.js"
    },
/* 
问题1、用了path.resolve报错，那么path.resolve什么时候用，和__dirname的区别是什么那？？？
问题2、路径中经常见./和/以及不加/的情况，这到底怎么确定？
*/
    module: {//问题：直接用babel报错说是现代的babel必须要用babel-loader,那么我们的项目中直接使用的babel为什么不报错？？
        loaders: [{
          test: /\.(jsx|js)$/,
          exclude:/node_modules/,
          loader: 'babel-loader'
        }, 
        {
            test: /\.(less|css)$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }
    ]
    },

    devServer: { //问题：热加载时候说是hort要设为true，为什么见好多没有设置也能实现效果那？
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html 
        hot:true,
        inline: true,//设置为true，当源文件改变时会自动刷新页面 
        port: 8080,//设置默认监听端口，如果省略，默认为"8080"  
    }, 
    plugins: [ //问题：这些webpack的plugins插件有的在文件开头引进了，有的没引，这里的HotModuleReplacementPlugin就没有引，为什么？
        new webpack.HotModuleReplacementPlugin()//热模块替换插件
    ]

}

/* 
错误点：
1、path.resolve报错
2、babel把错
3、少安装了一些模块，典型的是babelrc文件中的  "babel-plugin-react-transform"，"react-transform","react-transform-hmr"三个模块
4、写法上的错误，比如：React.Component后面是大括号React.Component{}，不是圆括号React.Component({})；entry和output后面是冒号，不是等号
*/