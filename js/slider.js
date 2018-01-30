function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var flag = true;
    for (var attr in json) {
      var current = 0;
      if (attr == "opacity") {
        current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0;
      } else {
        current = parseInt(getStyle(obj, attr));
      }
      var step = (json[attr] - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (attr == "opacity") {
        if ("opacity" in obj.style) {
          obj.style.opacity = (current + step) / 100;
        } else {
          obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";

        }
      } else if (attr == "zIndex") {
        obj.style.zIndex = json[attr];
      } else {
        obj.style[attr] = current + step + "px";
      }

      if (current != json[attr]) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 10)
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, null)[attr];
  }
}

/**
 * slider插件函数
 * @param  {Number}  duration   运动间隔时长
 * @return {[type]}             [description]
 */
var swiper = (function(params) {
  var duration = 3000;
  function $(id) { return document.getElementById(id); }
  var w_slider = $("w_slider"); // 大盒子
  var slider = $("slider"); // 图片组父亲
  var slider_main = $("slider_main"); // 图片组
  var imgs = slider_main.children; // 所有滚动图片
  var slider_ctrl = $("slider_ctrl"); // 所有控制按钮
  var prev,next,duration;
  if(params && params.duration) {
  	duration = params.duration
  }
  if($('slider_arrow')) {
  	prev = $('slider_ctrl_prev')
  	next = $('slider_ctrl_next')
  }

  // 操作元素
  for (var i = 0; i < imgs.length; i++) {
    var span = document.createElement("span");
    span.innerHTML = i + 1;
    span.className = "slider-ctrl-con";
    slider_ctrl.appendChild(span)
  }

  var spans = slider_ctrl.children;
  spans[0].className = "slider-ctrl-con current"; // 高亮第一个控制按钮
  var scrollWidth = w_slider.clientWidth; // 获得大盒子宽度
  for (var i = 1; i < imgs.length; i++) {
    imgs[i].style.left = scrollWidth + "px"; // 除了第一张图片，其他的都定位到右边准备运动
  }

  // 遍历所有控制器
  var key = 0; // 控制播放第几张
  for (var k in spans) {
    spans[k].onclick = function() {
      var that = this.innerHTML - 1; // 获取控制器的索引号
      if (that > key) {
        animate(imgs[key], { left: -scrollWidth });
        imgs[that].style.left = scrollWidth + "px";
      } else if (that < key) {
        animate(imgs[key], { left: scrollWidth });
        imgs[that].style.left = -scrollWidth + "px";
      }
      key = that;
      animate(imgs[key], { left: 0 });
      setSpan();
    }
  }
  if(next) {
	  next.onclick = function() {
	    animate(imgs[key], { left: -scrollWidth });
	    key++;
	    key > imgs.length - 1 ? key = 0 : key;
	    imgs[key].style.left = scrollWidth + "px";
	    animate(imgs[key], { left: 0 });
	    setSpan();
	  }
  }
  if(prev) {
	  prev.onclick = function() {
	    animate(imgs[key], { left: scrollWidth });
	    key--;
	    key < 0 ? key = imgs.length - 1 : key;
	    imgs[key].style.left = -scrollWidth + "px";
	    animate(imgs[key], { left: 0 });

	    setSpan();
	  }
  }

  // 高亮控制器按钮
  function setSpan() {
    for (var i = 0; i < spans.length; i++) {
      spans[i].className = "slider-ctrl-con";
    }
    spans[key].className = "slider-ctrl-con current";
  }

  // 定时器设置，循环执行向右
  var timer = null;
  timer = setInterval(autoPlay, duration);

  function autoPlay() {
    animate(imgs[key], { left: -scrollWidth });
    key++;
    key > imgs.length - 1 ? key = 0 : key;
    imgs[key].style.left = scrollWidth + "px";
    animate(imgs[key], { left: 0 });

    setSpan();
  }

  // 清除定时器
  w_slider.onmouseenter = function() {
  	if($('slider_arrow')){
  	  $('slider_arrow').style.display = 'block'
  	}
    clearInterval(timer);
  }
  w_slider.onmouseleave = function() {
  	if($('slider_arrow')){
  	  $('slider_arrow').style.display = 'none'
  	}
    clearInterval(timer); // 开启定时器先清除定时器
    timer = setInterval(autoPlay, duration);
  }
})