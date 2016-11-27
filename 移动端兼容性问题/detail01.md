### IOS移动端click事件300ms的延迟响应

  移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。
  这是由于区分单击事件和双击屏幕缩放的历史原因造成的。双击缩放是指用手指在屏幕上快速点
  击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。

  原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链
  接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链
  接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，
  如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用
  户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么
  这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果
  用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页
  面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的
  处理。

> 解决方案

```
* fastclick可以解决在手机上点击事件的300ms延迟
* zepto的touch模块，tap事件也是为了解决在click的延迟问题
* 触摸事件的响应顺序为 touchstart --> touchmove --> touchend --> click,也可以通过
绑定ontouchstart事件，加快对事件的响应，解决300ms延迟问题
```
  PS : zepto的touch模块运用的是 tap 事件，处理机制比 fastclick差。

### 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发

> 解决方案

```
css增加cursor:pointer就搞定了。
```

### 三星手机遮罩层下的input、select、a等元素可以被点击和focus(点击穿透)

  问题发现于三星手机，这个在特定需求下才会有，因此如果没有类似问题的可以不看。首先需求是浮层操作，在三星上被遮罩的元素依然可以获取focus、click、change)

```
  1. 是通过层显示以后加入对应的class名控制，截断显示层下方可获取焦点元素的事件获取
  2. 是通过将可获取焦点元素加入的disabled属性，也可以利用属性加dom锁定的方式（disabled的一种变换方式）
```

### h5底部输入框被键盘遮挡的问题

  当输入框在底部，点击软键盘后输入框会被遮挡。
  移动端中，当软键盘弹出时，会触发页面的一个resize事件，意思就是说，html高度会发生改变。高度会变成原先高度与软键盘高度的差值。造成这个的原因一般是绝对定位(absolute)或固定定位(fixed)脱离文档流了。

> 解决方案

```
* 先是背景框内嵌套内层弹框，背景使用fixed或者absolute，但是left，top，right，bottom都为0，让其占满整屏；然后内层弹框相对定位，放置在背景框中一个合适的位置，例如上下左右居中。注意，内层框左右宽度固定，上下高度则用百分比布局设置一个最大高度，例如65%，然后让y轴的overflow为auto。
```

### android设备查看背景图有些设备会模糊的问题

  用同等比例的图片，在PC上很清晰，但是在有些手机上却很模糊。这是因为手机分辨率太小，如果按照分辨率来显示网页，字会非常小，所以苹果将iPhone4的960*640分辨率在网页中只显示480*320，这样devicePixelRatio=2。而对于这一参数，android比较乱，有1.5的也有2的3的。

> 解决方案

```
用2x的背景图来代替img标签，再background-size:contain。
  background: url('../images/1.jpg') no-repeat center center; -webkit-background-size:50px 50px; background-size: 50px 50px;display:inline-block; width:100%; height:50px;  
```

### css动画页面闪白，动画卡顿

> 解决方案

```
1. 尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位
2. 开启硬件加速

  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
```

### fixed定位缺陷

* ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
* android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
* ios4下不支持position:fixed

> 解决方案

```
可以使用iScroll插件解决这个问题，或者使用absolute定位方式
```

### input的placeholder会出现文本位置偏上

  PC端设置line-height等于height能够对齐，而移动端仍然是偏上

> 解决方式

```
line-height: normal;
```

### 往返缓存

  点击浏览器的返回，有时不会执行js，特别是在mobilesafari中

> 解决方案

```
window.onunload = function(){};
```  
