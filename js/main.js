$(document).ready(function() {
  UTILS.sizing.landscapeResize();
  CONTENT.makeTiles();

  // initialize handlers for tile downselectors
  var selectors = ['design', 'software', 'music'];
  selectors.map(function(name) {
    $('#' + name).on('click', function() {
      if ($('#' + name).hasClass('selected')) {
        $('#' + name).removeClass('selected');
      } else {
        $('#tags span').removeClass('selected'); // remove this for multi select
        $('#' + name).addClass('selected');
        ga('send', 'event', 'downselect', 'click', name);
      }
      CONTENT.filterTiles();
    });

    $('#' + name).on('mouseenter', function() {
      ga('send', 'event', 'downselect', 'mouseenter', name);
    });
  });

  // initialize handlers for contact buttons
  var buttons = ['github', 'linkedin', 'youtube', 'email'];
  buttons.map(function(name) {
    $('#' + name).on('click', function() {
      ga('send', 'event', 'contact', 'click', name);
    });

    $('#' + name).on('mouseenter', function() {
      ga('send', 'event', 'contact', 'mouseenter', name);
    });
  });
});

$(window).resize(function() {
  CONTENT.tilesForDrawing = null;
  UTILS.sizing.landscapeResize();
  CONTENT.filterTiles();
});

$(window).scroll(function() {
  var y = $(this).scrollTop();
  UTILS.dialog.scroll(y);
});
