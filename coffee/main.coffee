$ ->
  $desktop = $('#desktop')
  $window_handles = $('#window-handles')

  drawWindow = (top, left, width, height) ->
    $div = $('<div>')
    $div.css
      top: top
      left: left
      width: width
      height: height

    $div.addClass("bwm-window")
    div_id = 'bwm-window-' + $('.bwm-window').length
    $div.attr('id', div_id)
    $div.text(div_id)

    $desktop.append $div

    $handle = $('<li>')
    $handle.text(div_id)
    $handle.attr('rel', div_id)

    $window_handles.append $handle
    $handle.click (e) ->
      $related_window = $('#'+$(this).attr('rel'))
      setActive $related_window

    $div

  beginDrag = (e) ->
    if $(e.target).is('.bwm-window')
      $bwm_window = $(e.target)

      setActive $bwm_window

      $desktop.data
        mousedownTarget: $bwm_window
        mousedownX: e.screenX
        mousedownY: e.screenY

  endDrag = (e) ->
    $desktop.removeData('mousedown-target', 'mousedown-x', 'mousedown-y')

  executeDrag = (e) ->
    $bwm_window = $desktop.data('mousedown-target')
    if $bwm_window
      deltaX = e.screenX - $desktop.data('mousedown-x')
      deltaY = e.screenY - $desktop.data('mousedown-y')

      $bwm_window.css
        top: parseInt($bwm_window.css('top')) + deltaY
        left: parseInt($bwm_window.css('left')) + deltaX

      $desktop.data
        mousedownX: $desktop.data('mousedown-x') + deltaX
        mousedownY: $desktop.data('mousedown-y') + deltaY

  setActive = ($bwm_window) ->
    unless $bwm_window.is('.active')
      $('.bwm-window.active').removeClass('active')
      $bwm_window.addClass('active')

      moveToFront $bwm_window
      $window_handles.find('li.active').removeClass('active')
      $window_handles.find('[rel='+$bwm_window.attr('id')+']').addClass('active')

  moveToFront = ($active_window) ->
    current_z_index = parseInt $active_window.css('z-index')
    $bwm_windows = $('.bwm-window')
    $bwm_windows.each ->
      $win = $(this)
      return if $win.is($active_window)

      win_z_index = parseInt $(this).css('z-index')
      $(this).css(zIndex: win_z_index-1) if win_z_index > current_z_index

    $active_window.css(zIndex: $bwm_windows.length)

  $desktop.mousedown(beginDrag)
  $desktop.mouseup(endDrag)
  $desktop.mousemove(executeDrag)

  drawWindow(100, 100, 300, 300)
  drawWindow(200, 200, 200, 200)
  drawWindow(300, 500, 300, 400)
  $('.bwm-window').each (idx) ->
    $(this).css(zIndex: idx+1)

  setActive $('#bwm-window-1')
