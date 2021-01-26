const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
  // 自己项目使用的第三方库
    vendor: ['hotkeys-js','lodash', 'axios', 'vue-router', 'view-design']
  },
  output: {
    // 打包后输入路径，可以自行修改
    path: path.join(__dirname, './public/js'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // Tips: DllPlugin的name属性需要和libary保持一致
      name: '[name]_[hash]',
      //指定当前目录
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      // context需要和webpack.config.js保持一致
      context: __dirname
    })
  ]
}