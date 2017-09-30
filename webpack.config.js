
var webpack = require('webpack');
var path = require('path')

module.exports={
    entry:__dirname+'/app/main.js',
    output:{
    path:__dirname+"/build",
    filename:"bundle.js"
    },
    
    module: {
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

    devServer: { 
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html 
        hot:true,
        inline: true,//设置为true，当源文件改变时会自动刷新页面 
        port: 8080,//设置默认监听端口，如果省略，默认为"8080"  
    }, 
    plugins: [ //
        new webpack.HotModuleReplacementPlugin()//热模块替换插件
    ]

}


