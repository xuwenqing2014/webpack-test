const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const path = require("path");

function analysis(entry) {
  const content = fs.readFileSync(entry, "utf-8");
  const Ast = parser.parse(content, {
    sourceType: "module"
  });
  let modules = {};
  traverse(Ast, {
    ImportDeclaration({ node }) {
      const newFile = "./" + path.join(path.dirname(entry), node.source.value);
      modules[node.source.value] = newFile;
    }
  });
  const { code } = babel.transformFromAst(Ast, null, {
    presets: ["@babel/preset-env"]
  });
  return {
    entry,
    modules,
    code
  };
}
function analysisAll(entry) {
  const all = analysis(entry);
  const allArr = [all];
  if (all.modules) {
    Object.keys(all.modules).forEach(key => {
      allArr.push(analysis(all.modules[key]));
    });
  }
  let obj = {};
  allArr.forEach(item => {
    obj[item.entry] = { modules: item.modules, code: item.code };
  });
  return obj;
}

function generateCode(entry) {
  const graph = JSON.stringify(analysisAll(entry));
  return `(function(graph){
	  function require(path) {
		function localRequire(relativePath) {
			return require(graph[path].modules[relativePath]);
		}
		let exports = {};
		(function(require, exports, code){
			eval(code);
		})(localRequire, exports, graph[path].code);
		return exports;
	  }
	  require('${entry}')
  })(${graph})`;
}
console.log(generateCode("./src/index.js"));
