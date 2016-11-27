### 不让android手机识别邮箱

> 解决方案

```
<meta name="format-detection" content="email=no">
```

### 禁止ios识别长串数字为电话

> 解决方案

```
<meta name="format-detection" content="telephone=no">
```

### 禁止ios弹出各种操作窗口

> 解决方案

```
-webkit-touch-callout:none;
```

### 消除transition闪屏

> 解决方案

```
-webkit-transform-style:preserve-3d; /*设置内嵌的元素在3D空间的显示方式：保留3D*/
-webkit-backface-visibility:hidden; /*设置进行转换的元素的背面在面对用户时是否可见：隐藏*/
```

### iOS系统中文输入法输入英文时，字母之间可能会出现一个六分之一空格

> 解决方案

```
// 用正则去除
this.value = this.value.replace(/\u2006/g, "");
```

### 进制android和ios用户选中中文字

> 解决方案

```
-webkit-user-select: none;
```

### 在android和ios中，audio和video元素无法自动播放

> 解决方案

```
// 触屏播放
$("html").on("touchstart", function(){
  audio.play();
})
```

### ios下取消input在输入时英文首字母自动大写

> 解决方案

```
<input type="text" autocapitalize="off" autocorrect="off" />
```

### android下取消输入语音按钮

> 解决方案

```
input::-webkit-input-speech-button{ display: none;}
```

### 阻止旋转屏幕时自动调整字体大小

> 解决方案

```
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 {-webkit-text-size-adjust: none;}
```

### 圆角bug

  某些android手机圆角失效

> 解决方案

```
background-clip: padding-box;
```

### 设置缓存

  手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是重新向服务器发送请求。

> 解决方案

```
<!-- 如果不希望使用缓存 -->
<meta http-equiv="Cache-Control" content="no-cache">
```
