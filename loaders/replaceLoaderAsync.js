const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("hello", loaderUtils.getOptions(this).name);
    callback(null, result);
  }, 1000);
};
