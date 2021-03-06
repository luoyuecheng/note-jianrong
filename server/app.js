﻿//web 项目框架
var express = require('express');
//导入 request 模块 http 请求模块插件
var request = require('request');
// 实例化 express 模块
var app = express();
// 术语  ： 路由


// req : request 浏览器发送给服务器的对象
// res : response 服务器发送给浏览器的对象
// app.route('/api').get(function(req, res){
// 	var query = req.query;
// 	var url = query.url;
// 	delete query.url;
// 	request.post({
// 		url : url,
// 		formData : query
// 		/**
// 		 * error : 判断结果是否错误
// 		 * response : 请求的头文件信息
// 		 * data ： 返回的结果数据
// 		 */
// 	},function(error,response,data){
// 		res.send(data);
// 	});
// });

app.route('/api').post(function(req, res) {
	console.log(route.stack, "....")
	var query = req.query;
	var url = query.url;
	delete query.url;
	url = url + str(query);
	request.get({url: url, formData: query}, function(error, response, data) {
		console.log(data);
		res.send(data);
	});
});

// express 开启静态服务器，把指定的目录做跟目录
app.use(express.static("./"));

//创建一个 http 服务
var server  = require('http').createServer(app);
//监听端口和 ip 地址
//0.0.0.0 本机网卡
server.listen(9010, "0.0.0.0", function() {
	console.log('http://127.0.0.1:9010');
});

function str(query) {
	var str = "?";
	for(var key in query) {
		str += key + "=" + query[key] + "&";
	}
	console.log(str);
	return str;
}
