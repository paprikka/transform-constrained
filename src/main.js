$(function(){
  var $form = $('.test-form');

  $form.on('submit', function(e){
    e.preventDefault();

    var $el         = $('.test');
    var el          = $el[0]; 
    var requestedTransform = {
      scale       : +$('input.scale').val(),
      translateX  : +$('input.translateX').val(),
      translateY  : +$('input.translateY').val(),
      originX     : +$('input.originX').val(),
      originY     : +$('input.originY').val()
    };

    var transforms  = transformConstrained(el, requestedTransform);
    console.log(transforms);
    $el.css(transforms.css);

    var $markerTL = $('.marker--tl');
    var $markerTR = $('.marker--tr');
    var $markerBR = $('.marker--br');
    var $markerBL = $('.marker--bl');

    $('.marker').attr('style', '');

    $markerTL.css({
      left: transforms.rect.left + 'px',
      top:  transforms.rect.top + 'px'
    });

    $markerTR.css({
      right: transforms.rect.right + 'px',
      top:   transforms.rect.top + 'px'
    });

    $markerBR.css({
      right:  transforms.rect.right + 'px',
      bottom: transforms.rect.bottom + 'px'
    });

    $markerBL.css({
      left:   transforms.rect.left + 'px',
      bottom: transforms.rect.bottom + 'px'
    });
  }).submit();
});