	//获取浏览器页面可见高度和宽度
	var _PageHeight = document.documentElement.clientHeight,
	    _PageWidth = document.documentElement.clientWidth;
	//在页面未加载完毕之前显示的loading Html自定义内容
//	var _LoadingHtml = '<div id="loadingDiv" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:rgba(0,0,0,0.3);opacity:1;filter:alpha(opacity=80);z-index:99999999;"><div  class="ball-clip-rotate" style="position: absolute;  left: 45%; top:45%; "><div></div></div></div>';
	var _LoadingHtml = '<div id="loadingDiv" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:rgba(0,0,0,0.3);opacity:1;filter:alpha(opacity=80);z-index:99999999;"><div  class="bgloading" style="position: absolute;  left: 45%; top:45%; "></div></div>';
//	禁止滑动事件
	document.addEventListener('touchmove',touch, false); 
	function touch(event){
		 event.preventDefault();
	};
	//监听加载状态改变
	document.onreadystatechange = completeLoading;
	//加载状态为complete时移除loading效果
	function completeLoading() {
	    if (document.readyState == "complete") {
	    	var time = setTimeout(function(){	
		        var loadingMask = document.getElementById('loadingDiv');
		        loadingMask.parentNode.removeChild(loadingMask);
		        document.removeEventListener('touchmove',touch, false); 
		        clearTimeout(time); 
			},1000)
	    }
	}
	function loading(){
		document.write(_LoadingHtml);
	};
	loading();
