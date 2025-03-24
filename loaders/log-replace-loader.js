// loaders/log-replace-loader.js

module.exports = function (source) {
  // 将文件内容中的所有 console.log 替换成 console.warn
  const result = source.replace(/console\.log/g, 'console.warn');
  
  // 返回转换后的代码
  return result;
};
