var transformConstrained = function(el, requestedTransform, options){

  var defaultOptions = {
    lock:{
      top: true,
      left: true,
      bottom: false,
      right: false
    },
    offsetParent: document.body
  };

  options = _.extend(defaultOptions, options);
   
  var width, height, 
      computedWidth, computedHeight,
      originX, originY, 
      absoluteoriginX, absoluteoriginY,
      left, top, right, bottom, 
      screenLeft, screenTop,
      screenRight, screenBottom,
      translateX, translateY,
      scale, 
      $offsetParent, offsetParent, 
      parentWidth, parentHeight,
      $el, computedStyle, offsetParentComputedStyle;

  $el = $(el);
  $el.css('-webkit-transform-origin', '');
  $el.css('-webkit-transform', '');

  offsetParent    = options.offsetParent;
  $offsetParent   = $(offsetParent);

  scale       = requestedTransform.scale || 1;

  translateX  = requestedTransform.translateX || 0;
  translateY  = requestedTransform.translateY || 0;

  originX     = requestedTransform.originX || 0;
  originY     = requestedTransform.originY || 0;

  computedStyle               = window.getComputedStyle(el);
  offsetParentComputedStyle   = window.getComputedStyle(offsetParent);

  function getWidthPrecise(computedStyle){
    return +computedStyle.width.replace('px', '')
  }
  
  function getHeightPrecise(computedStyle){
    return +computedStyle.height.replace('px', '')
  }

  width  = getWidthPrecise(computedStyle);
  height = getHeightPrecise(computedStyle);

  computedWidth  = width * scale;
  computedHeight = height * scale;

  left = $el.position().left;
  top  = $el.position().top; 

  absoluteoriginX = left + originX;
  absoluteoriginY = top + originY;

  screenLeft   = absoluteoriginX - (originX - translateX) * scale;
  screenTop    = absoluteoriginY - (originY - translateY) * scale;


  var parentHeight  = getHeightPrecise(offsetParentComputedStyle);
  var parentWidth   = getWidthPrecise(offsetParentComputedStyle);

  screenRight  = parentWidth - (screenLeft + computedWidth) 
  screenBottom = parentHeight - (screenTop + computedHeight) 

  if(screenLeft > 0){
     translateX = translateX - screenLeft / scale;
  }

  if(screenTop > 0){
     translateY = translateY - screenTop / scale;
  }

  if(screenBottom > 0 && options.lock.bottom){
     translateY = translateY + screenBottom / scale;
  }

  if(screenRight > 0 && options.lock.right){
     translateX = translateX + screenRight/ scale;
  }



  return {
    rect: {
        left:   screenLeft,
        top:    screenTop,
        right:  screenRight,
        bottom: screenBottom
    },
    css : {
      '-webkit-transform' : 'scale(' + scale + ') translate(' + translateX + 'px, ' + translateY + 'px)',
      '-webkit-transform-origin': originX + 'px ' + originY + 'px'
    }
  }

}