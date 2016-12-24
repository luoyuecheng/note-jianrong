//设置自适应高

$(document).ready(function(){ 
	document.getElementById("wrapper1").style.minHeight=document.body.clientHeight-101+'px';
	document.getElementById("page-wrapper").style.minHeight=document.body.clientHeight+'px';
	$('nav').removeClass('dis_none');
}); 