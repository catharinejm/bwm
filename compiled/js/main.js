(function() {

  $(function() {
    var $desktop, $window_handles, beginDrag, drawWindow, endDrag, executeDrag, moveToFront, setActive;
    $desktop = $('#desktop');
    $window_handles = $('#window-handles');
    drawWindow = function(top, left, width, height) {
      var $div, $handle, div_id;
      $div = $('<div>');
      $div.css({
        top: top,
        left: left,
        width: width,
        height: height
      });
      $div.addClass("bwm-window");
      div_id = 'bwm-window-' + $('.bwm-window').length;
      $div.attr('id', div_id);
      $div.text(div_id);
      $desktop.append($div);
      $handle = $('<li>');
      $handle.text(div_id);
      $handle.attr('rel', div_id);
      $window_handles.append($handle);
      $handle.click(function(e) {
        var $related_window;
        $related_window = $('#' + $(this).attr('rel'));
        return setActive($related_window);
      });
      return $div;
    };
    beginDrag = function(e) {
      var $bwm_window;
      if ($(e.target).is('.bwm-window')) {
        $bwm_window = $(e.target);
        setActive($bwm_window);
        return $desktop.data({
          mousedownTarget: $bwm_window,
          mousedownX: e.screenX,
          mousedownY: e.screenY
        });
      }
    };
    endDrag = function(e) {
      return $desktop.removeData('mousedown-target', 'mousedown-x', 'mousedown-y');
    };
    executeDrag = function(e) {
      var $bwm_window, deltaX, deltaY;
      $bwm_window = $desktop.data('mousedown-target');
      if ($bwm_window) {
        deltaX = e.screenX - $desktop.data('mousedown-x');
        deltaY = e.screenY - $desktop.data('mousedown-y');
        $bwm_window.css({
          top: parseInt($bwm_window.css('top')) + deltaY,
          left: parseInt($bwm_window.css('left')) + deltaX
        });
        return $desktop.data({
          mousedownX: $desktop.data('mousedown-x') + deltaX,
          mousedownY: $desktop.data('mousedown-y') + deltaY
        });
      }
    };
    setActive = function($bwm_window) {
      if (!$bwm_window.is('.active')) {
        $('.bwm-window.active').removeClass('active');
        $bwm_window.addClass('active');
        moveToFront($bwm_window);
        $window_handles.find('li.active').removeClass('active');
        return $window_handles.find('[rel=' + $bwm_window.attr('id') + ']').addClass('active');
      }
    };
    moveToFront = function($active_window) {
      var $bwm_windows, current_z_index;
      current_z_index = parseInt($active_window.css('z-index'));
      $bwm_windows = $('.bwm-window');
      $bwm_windows.each(function() {
        var $win, win_z_index;
        $win = $(this);
        if ($win.is($active_window)) {
          return;
        }
        win_z_index = parseInt($(this).css('z-index'));
        if (win_z_index > current_z_index) {
          return $(this).css({
            zIndex: win_z_index - 1
          });
        }
      });
      return $active_window.css({
        zIndex: $bwm_windows.length
      });
    };
    $desktop.mousedown(beginDrag);
    $desktop.mouseup(endDrag);
    $desktop.mousemove(executeDrag);
    drawWindow(100, 100, 300, 300);
    drawWindow(200, 200, 200, 200);
    drawWindow(300, 500, 300, 400);
    $('.bwm-window').each(function(idx) {
      return $(this).css({
        zIndex: idx + 1
      });
    });
    return setActive($('#bwm-window-1'));
  });

}).call(this);
