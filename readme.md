## 功能

- 可选择是否显示播放箭头
- 控制器圆点是可以点击的，可通过改变css的`text-indext`控制是否显示圆点中的数字

## 使用
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" type="text/css" href="./css/style.css">
  <script type="text/javascript" src="./js/slider.js"></script>
</head>

<body>
  <div class="w-slider" id="w_slider">
    <div class="slider" id="slider">
      <div class="slider-main" id="slider_main">
        <!-- 使用background而不是img标签，是为了在缩小屏幕时能正常显示图片 -->
        <div class="slider-main-img" style="width: 100%;height: 390px;background: url('./images/1.jpg') no-repeat center center;background-size: 1920px 390px"><a href="#"></a></div>
        <div class="slider-main-img" style="width: 100%;height:390px;background: url('./images/2.jpg') no-repeat center center;background-size: 1920px 390px"><a href="#"></a></div>
        <div class="slider-main-img" style="width: 100%;height: 390px;background: url('./images/3.jpg') no-repeat center center;background-size: 1920px 390px"><a href="#"></a></div>
      </div>
    </div>

    <!-- 控制按钮，可选项 -->
    <div class="slider-arrow" id="slider_arrow">
      <span class="slider-ctrl-prev" id="slider_ctrl_prev"></span>
      <span class="slider-ctrl-next" id="slider_ctrl_next"></span>
    </div>
    
    <!-- 小圆点 -->
    <div class="slider-ctrl" id="slider_ctrl"></div>
  </div>
  <script>
  // 调用swiper,duration表示时间间隔，可选
  swiper({ duration: 3000 })
  </script>
</body>

</html>
```