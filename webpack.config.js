var webpack = require('webpack');


var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig(){

	var config = {};

	// 页面入口文件
	config.entry = isTest ? {} : {};


	// 输出文件
	config.output = isTest ? {} : {};



	// 插件项
	config.plugins = [];

	

	// 加载器
	config.module = {
		loaders: []
	}


	return config;
}();