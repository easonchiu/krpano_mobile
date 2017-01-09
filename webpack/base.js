var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname, '../');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var MAIN_FILE = path.resolve(SRC_PATH, 'krpano.js');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = function makeWebpackConfig(){

	var config = {};

	// 页面入口文件
	config.entry = {};

	// 输出文件
	config.output = {
		path: DIST_PATH,
	};

	// 插件项
	config.plugins = [];
	
	

	// 加载器
	config.module = {
		
	}


	return config;
}();