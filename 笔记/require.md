require 模块化代码（面向对象思想）
    requre 的目标是将代码模块化，它使用了不同与传统的 script 标签来异步加载脚本
    javascript 在浏览器端是没有模块概念的, 为什么 require 中有呢？因为 require 中的模块是使用 define 来摸你的, define 是一个全局函数。


模块化代码 用 define 定义模块
define([],function(){
  console.log("模块化代码");
  return {
   "getlist":function(){
      console.log("动态加载模块");
    }
  }
})
将模块加载到页面（需要先将引入一个require.js文件）
<script type="text/javascript" src="./js/require.js"></script>
<script type="text/javascript" src="./js/config.js"></script>
<script type="text/javascript">
  require(["dest/js/muddols1"], function(muddols1){
    muddols1.getList();
  });
</script>

jquery无法直接引入，需要配置（在一个config文件中配置，config 文件需要在 html 文档中引入）
require.config({
  // 指定静态文件跟目录
  "baseUrl":"dest/js/",
  // 别名
  // 给一个模块定义别名
  "paths":{
    // 会在 baseUrl 下面去查找
    "jquery":"jquery-1.11.3"
  },
  // 兼容 把非模块化的 js 文件模块化
  // 把不是以 define 格式的 js 做兼容处理
  "shim":{
    "jquery":{
      deps:[], // 循环依赖，
      // 返回 jquery 暴露的全局对象
      exports:"window.jQuery"
    }
  }
})
下面是带有引入了 jquery 的定义的模块
// 第一个参数是 依赖模块（依赖文件在依赖模块中引入）
define(["jquery"],function($){
  console.log("模块化代码");
  return {
   "getlist":function(){
      console.log("动态加载模块");
      // 这里的地址是以 html 文档为参考
      $.get("data/music.json",{}, function(){},"json");
    }
  }
})
PS：一个 js 文件中只能有一个 define 模块


这是一个完整的例子
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title> require.js </title>
  <link rel="stylesheet" type="text/css" href="css/music.css">
  <script type="text/javascript" src="./js/require.js"></script>
  <script type="text/javascript" src="./js/config.js"></script>
</head>
<body>
  <div class="main">
    <div class="left">
      <div class="record">
        <div class="pole">
          <img class="active" src="images/needle-plus.png" alt="">
        </div>
        <span class="plate">
          <img src="images/singlecover.png" alt=""><span></span>
        </span>
      </div>
      <div class="btn-fours">
        <span><i class="iconfont">&#xe601;</i>喜欢</span>
        <span><i class="iconfont">&#xe603;</i>收藏</span>
        <span><i class="iconfont">&#xe600;</i>已下载</span>
        <span><i class="iconfont">&#xe602;</i>分享</span>
      </div>
    </div>
    <div class="right">
      <div class="lrc-head">
        <h3>长安忆<span>本地</span></h3>
        <p class="label">
          <span>专辑: <strong>长安忆</strong></span>
          <span>歌手: <strong>双笙</strong></span>
          <span>来源: <strong>笙</strong></span>
        </p>
      </div>
      <div class="lrc-wrap">
        <div class="lrc-main">
          <p>只愿君从此记</p>
          <p class="active">只愿君从此记</p>
        </div>
      </div>
    </div>
  </div>
  <div class="audio">
    <audio src="data/双笙 - 长安忆.mp3" data-lrc="data/长安忆.lrc" controls></audio>
    <div class="btn-three">
      <span><i class="iconfont"></i></span>
      <span><i class="iconfont"></i></span>
      <span><i class="iconfont"></i></span>
    </div>
    <div class="progress-bar">
      <input type="range">
      <input type="range">
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</body>
<script type="text/javascript">
  require(["muddols1","jquery"], function(muddols1,$){
    muddols1.getList(function(res){
      var html= '';
      $.each(res,function(key, value){
        html += '<li data-src="'+res[key]['src']+'" data-lrc="'+res[key]['lrc']+'">'+res[key]['name']+'</li>';
      })
      $('ul',$('.audio')).html(html);
    });
  });

</script>
</html>

require.config({
  //
  baseUrl : "dest/js/",
  paths : {
    jquery : "../../libs/jquery-1.11.3"
  },
  shim : {
    jquery :{
      deps : [],
      exports : "window.jQuery"
    }
  }
})

define(["jquery"],function($){
  console.log("模块化");
  return {
    getList:function(callback){
      console.log("动态加载模块");
      $.get('data/music.json', {/* 向服务器传入的参数 */}, function(res){
        console.log(res);
        callback(res);
      }, "json");
    }
  }
})



require 文件配置文件的一些说明
require.config({
    //指定静态文件跟目录
    baseUrl : "src/js/",
    //别名
    //给一个模块定义别名
    paths : {
        jquery : "jquery.min"
    },
    //兼容   把非模块化的js文件模块化
    //把不是以 define 格式的 js 做兼容处理
    shim:{
        jquery:{
             deps:[],
             //返回 jquery 暴露的全局对象
             exports:"window.jQuery"
        }
    }
});

define(["jquery"],function($){
    var audio = $("#audio").get(0);
    return {
        "play" : function(){
             audio.play();
        },
        "pause" : function(){
             audio.pause();
        },
        "checkout" : function(src){
             audio.src = src;
             audio.currentTime = 0;
             audio.play();
        }
    }
});


我们要遵循一个模块对应一个 js 文件, 后期可以使用工具将多个模块合并为一个文件, 不用担心加载过多的模块而相应加载了很多 js 文件
    喜欢 CommonJS 的可以使用依赖注入的形式把 require, exports, module 三个模块构造出来, 在内部使用 require 形式加载, 如果需要依赖多个模块得前置加载
define(["require","exports","module","模块 ID"],function(require, exports, module) {
  var app = require("模块 ID");
  exports.foo = function () {
    return app;
  };
});
/*
  require 加载模块
  exports 返回模块接口
  module 该模块的详细信息, exports 仅仅是 module.exports 的一个引用, 可以单独对 修改 module.exports 对象, 也能实现操作 exports 一样的效果。
*/


PS：window.onroad 方法本意是：当页面加载完毕后去执行其它函数（用onroad方法去调用其他方法），保证页面代码结构清晰，只有一个入口文件
window.onroad = function(){}
// 等页面资源开始加载后才触发
// 例如 图片 音频 视频

require.js 语法规范：AMD 依赖前置
 CMD 依赖就近
