const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const result = source.replace("你好", "哈哈哈");
  this.callback(null, result);
};
