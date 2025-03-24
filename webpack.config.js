var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入插件
const MyPlugin = require('./plugins/myPlugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js', // 懒加载的 Chunk 输出名称
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配 .css 文件
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i, // 匹配图片文件
        type: 'asset/resource',
      },
      {
        test: /\.js$/, // 匹配所有 .js 文件
        use: path.resolve(__dirname, 'loaders/log-replace-loader.js'), // 使用自定义 loader
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以 src 目录下的 HTML 文件为模板
      filename: 'index.html', // 生成到 dist 目录下的文件名
    }),
    // 自定义插件实例
    new MyPlugin({ showFileList: true }),
  ],
  // ✅ 配置 devServer
  devServer: {
    static: path.resolve(__dirname, 'dist'), // 设置静态文件的根目录
    port: 8080, // 端口
    open: false, // 自动打开浏览器
    hot: true, // 开启 HMR（热模块替换）
    compress: true, // 启用 gzip 压缩
    historyApiFallback: true, // 处理前端路由
  },
};
