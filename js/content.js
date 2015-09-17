var CONTENT = {
  tiles: [],
  tilesForDrawing: null,

  // tile object
  tile: function(id, title, subtitle, img, txt, extraImgs, tags) {
    return {
      id: id,
      title: title,
      subtitle: subtitle,
      img: img,
      txt: txt,
      extraImgs: extraImgs,
      tags: tags
    };
  },

  // handles tiles
  makeTiles: function() {
    if (window.location.protocol === 'http:') {
      // make folder num ids
      var lastTileNum = 17;
      var nums = [];
      for (var i = 0; i <= lastTileNum; i++) {
        var str = i + '';
        nums.push(str.length === 1 ? '0' + str : str);
      }

      // draw the tiles
      CONTENT.buildTiles(nums);

    } else { // for local testing
      // make the tiles
      var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis ultricies nibh a volutpat. Cras aliquet, turpis id viverra fringilla, felis arcu placerat lectus, vitae venenatis tellus nunc eget elit. Vestibulum vitae leo bibendum, euismod ligula a, pellentesque mi. Quisque in elit lectus. Sed pellentesque elementum nunc, non cursus tellus venenatis vel. Nullam ac faucibus arcu. Sed enim tellus, iaculis a nunc non, sodales fringilla elit. Morbi interdum lobortis ultrices. Nam fermentum lorem enim, a tincidunt est pellentesque at. Ut in interdum velit, vel malesuada est.';
      var link = '<a href="http://www.google.com" target="_blank">test</a>';
      var ipsum = text + '<br><br>' + 'This is a ' + link + ' link';
      var tile0 = CONTENT.tile(0, 'Sample project 0', 'Subtitle', 'tiles/sunrise.png', ipsum, ['tiles/portrait.png', 'tiles/sunrise.png'], ['design', 'software']);
      var tile1 = CONTENT.tile(1, 'Sample project 1', 'Subtitle', 'tiles/portrait.png', ipsum, ['tiles/portrait.png', 'tiles/portrait.png'], ['design']);
      var tile2 = CONTENT.tile(2, 'Sample project 2', 'Subtitle', 'tiles/sunrise.png', ipsum, [], ['design', 'music']);
      var tile3 = CONTENT.tile(3, 'Sample project 3', 'Subtitle', 'tiles/portrait.png', ipsum, ['tiles/portrait.png', 'tiles/sunrise.png', 'tiles/portrait.png']);
      var tile4 = CONTENT.tile(4, 'Sample project 4', 'Subtitle', 'tiles/portrait.png', ipsum, []);
      var tile5 = CONTENT.tile(5, 'Sample project 5', 'Subtitle', 'tiles/sunrise.png', ipsum, []);
      var tile6 = CONTENT.tile(6, 'Sample project 6', 'Subtitle', 'tiles/sunrise.png', ipsum, []);
      var tile7 = CONTENT.tile(7, 'Sample project 7', 'Subtitle', 'tiles/sunrise.png', ipsum, []);
      var tile8 = CONTENT.tile(8, 'Sample project 8', 'Subtitle', 'tiles/portrait.png', ipsum, []);
      var tile9 = CONTENT.tile(9, 'Sample project 9', 'Subtitle', 'tiles/sunrise.png', ipsum, []);
      var tile10 = CONTENT.tile(10, 'Sample project 10', 'Subtitle', 'tiles/portrait.png', ipsum, []);
      var tile11 = CONTENT.tile(11, 'Sample project 11', 'Subtitle', 'tiles/sunrise.png', ipsum, []);

      CONTENT.tiles = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11];
      CONTENT.drawTiles();
    }
  },

  // renders tile objects
  drawTiles: function(tiles) {
    if (!CONTENT.tilesForDrawing) {
      CONTENT.tilesForDrawing = tiles ? tiles : CONTENT.tiles.slice(0); // copy so original CONTENT.tiles stays untouched

      // clear columns & heights
      UTILS.colIds.map(function(colId) {
        $(colId).html('');
      });
      UTILS.colHeights = UTILS.colIds.map(function() { return 0; });
    }

    // Create the tile
    var tile = CONTENT.tilesForDrawing.shift();
    var tRender = $('#tileTemplate').render(tile);

    // Figure out where to put it
    var shortestColIndex = UTILS.colHeights.indexOf(Math.min.apply(null, UTILS.colHeights));
    $(UTILS.colIds[shortestColIndex]).append(tRender);

    // Wait for it to load
    CONTENT.waitForLoad(tile, shortestColIndex);
  },

  waitForLoad: function(tile, colIndex) {
    $('#tile-' + tile.id + ' img').load(function() {
      var newTileHeight = $('#tile-' + tile.id).height();
      UTILS.colHeights[colIndex] += newTileHeight;

      if (CONTENT.tilesForDrawing.length) {
        CONTENT.drawTiles();
      } else {
        CONTENT.tilesForDrawing = null;
        UTILS.dialog.initialize(); // once done rendering tiles, get dialog ready
      }
    });
  },

  // makes tile objects from file
  buildTiles: function(nums) {
    var num = nums[0];
    $.get('tiles/' + num + '/text.txt', function(data) {
      // unpack data
      var a = data.split('\n***\n');
      var title = a[0];
      var subtitle = a[1];
      var text = a[2];
      var imgs = a[3].split('\n').map(function(img) {
        return 'tiles/' + num + '/' + img;
      });
      var tags = a[4].split('\n');

      // make tile & add to list
      var tile = CONTENT.tile(num, title, subtitle, imgs[0], text, imgs.slice(1,imgs.length), tags);
      CONTENT.tiles.push(tile);

      // update nums and recursively call back if it isn't empty
      nums = nums.slice(1, nums.length);
      if (nums.length > 0) {
        CONTENT.buildTiles(nums);
      } else {
        CONTENT.drawTiles();
      }
    });
  },

  // only shows selected tiles (left nav)
  filterTiles: function() {
    var selected = $('#tags li span.selected');
    var tags = [];
    for (var i = 0; i < selected.length; i++) {
      tags.push(selected[i].id);
    }

    var toShow = [];
    CONTENT.tiles.map(function(tile) {
      var added = false;
      tags.map(function(tag) {
        if (!added && tile.tags && tile.tags.indexOf(tag) > -1) {
          toShow.push(tile);
          added = true;
        }
      });
    });

    if (toShow.length !== 0) {
      CONTENT.drawTiles(toShow);
    } else {
      CONTENT.drawTiles(CONTENT.tiles);
    }
  }
};
