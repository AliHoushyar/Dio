$(document).ready(function() {
    const $items = $('.item'),
          $controls = $('.control'),
          $headerItems = $('.item-header'),
          $descriptionItems = $('.item-description'),
          activeDelay = 0.76,
          interval = 5000;
  
    let current = 0;
    let intervalF;
  
    const slider = {
      init: function() {
        $controls.on('click', function() {
          slider.clickedControl($(this));
        });
        $controls.eq(current).addClass('active');
        $items.eq(current).addClass('active');
        intervalF = setInterval(slider.nextSlide, interval);
      },
      nextSlide: function() {
        slider.reset();
        if (current === $items.length - 1) current = -1;
        current++;
        $controls.eq(current).addClass('active');
        $items.eq(current).addClass('active');
        slider.transitionDelay($headerItems);
        slider.transitionDelay($descriptionItems);
      },
      clickedControl: function($control) {
        slider.reset();
        clearInterval(intervalF);
  
        const dataIndex = $control.data('index');
  
        $control.addClass('active');
        $items.each(function(index) {
          if (index === dataIndex) {
            $(this).addClass('active');
          }
        });
        current = dataIndex;
        slider.transitionDelay($headerItems);
        slider.transitionDelay($descriptionItems);
        intervalF = setInterval(slider.nextSlide, interval);
      },
      reset: function() {
        $items.removeClass('active');
        $controls.removeClass('active');
      },
      transitionDelay: function($elements) {
        let seconds;
  
        $elements.each(function() {
          const $children = $(this).children();
          let count = 1,
              delay;
  
          $(this).hasClass('item-header') ? seconds = 0.015 : seconds = 0.007;
  
          $children.each(function() {
            if ($(this).hasClass('vertical-part')) {
              $(this).parent().hasClass('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
              $(this).children('b').css('transition-delay', `${delay}s`);
              count++;
            }
          });
        });
      }
    };
  
    slider.init();
  });
  