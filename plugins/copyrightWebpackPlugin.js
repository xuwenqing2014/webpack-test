class CopyrightWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 带有async的多一个cd参数
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        compilation.assets[this.options.filename || "copyright.txt"] = {
          source: () => {
            return "hello world";
          },
          size: () => {
            return 30;
          }
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
