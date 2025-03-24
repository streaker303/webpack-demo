class MyPlugin {
  // 接收插件的配置选项
  constructor(options) {
    this.options = options || {};
  }
  
  // apply 方法是插件的入口
  apply(compiler) {
    // 监听 emit 阶段
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      console.log('📦 MyPlugin: emit 阶段开始...');
      
      // 获取打包文件信息
      const fileNames = Object.keys(compilation.assets);
      let fileList = '打包生成的文件列表：\n';
      
      fileNames.forEach((filename) => {
        fileList += `- ${filename}\n`;
      });
      
      // 将文件列表添加到打包文件中
      compilation.assets['fileList.txt'] = {
        source: () => fileList,
        size: () => fileList.length,
      };
      
      callback();
    });
    
    // 监听 done 阶段
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      console.log(`✅ MyPlugin: 构建完成！`);
      console.log(`⏰ 构建时间：${stats.endTime - stats.startTime}ms`);
    });
  }
}

module.exports = MyPlugin;
