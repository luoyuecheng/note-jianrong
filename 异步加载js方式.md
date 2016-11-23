## 异步加载js方式

  默认情况下，javascript的加载是阻塞的，后面的元素要等待javascript加载完毕后才能进行再加载。

##### defer，只支持IE

  defer属性规定是否对脚本执行进行延迟，知道页面加载为止。

  如果确定脚本不会改变文档的内容，可将defer属性加入到<script>标签中，以便加快处理文档的速度。浏览器将推迟对脚本的解释，知道文档已经显示给用户为止。

```
<script type="text/javascript" defer="defer">
  
</script>
```
