var CONTENT = {
	tiles: null,

	tile: function(id, title, img, txt, extraImgs, tags) {
  		return {
  			id: id,
  			title: title,
  			img: img,
  			txt: txt,
  			extraImgs: extraImgs,
  			tags: tags
  		}
	},

	makeTiles: function() {
		/*$.ajax({
            url : "tiles/01/text.txt",
            dataType: "text",
            success : function (data) {
               	console.log(data);
            }
        });*/

		var title;
		var text;
		$.get('tiles/01/text.txt', function(data) {
			var a = data.split('\n***\n');
			title = a[0]
			text = a[1]
			imgs = a[2].split('\n');
		});

		console.log(title)
		console.log(text)
		console.log(imgs)

		if (CONTENT.tiles == null) {
			var ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis ultricies nibh a volutpat. Cras aliquet, turpis id viverra fringilla, felis arcu placerat lectus, vitae venenatis tellus nunc eget elit. Vestibulum vitae leo bibendum, euismod ligula a, pellentesque mi. Quisque in elit lectus. Sed pellentesque elementum nunc, non cursus tellus venenatis vel. Nullam ac faucibus arcu. Sed enim tellus, iaculis a nunc non, sodales fringilla elit. Morbi interdum lobortis ultrices. Nam fermentum lorem enim, a tincidunt est pellentesque at. Ut in interdum velit, vel malesuada est.';
			var ipsum = ipsum+'<br><br>'+ipsum;
			var tile0 = CONTENT.tile(0, 'Sample project 0', 'tiles/sunrise.png', ipsum, ['tiles/portrait.png', 'tiles/sunrise.png'], ['design', 'software']);
			var tile1 = CONTENT.tile(1, 'Sample project 1', 'tiles/portrait.png', ipsum, ['tiles/portrait.png', 'tiles/portrait.png'], ['design']);
			var tile2 = CONTENT.tile(2, 'Sample project 2', 'tiles/sunrise.png', ipsum, [], ['design', 'music']);
			var tile3 = CONTENT.tile(3, 'Sample project 3', 'tiles/portrait.png', ipsum, ['tiles/portrait.png', 'tiles/sunrise.png', 'tiles/portrait.png']);
			var tile4 = CONTENT.tile(4, 'Sample project 4', 'tiles/portrait.png', ipsum, []);
			var tile5 = CONTENT.tile(5, 'Sample project 5', 'tiles/sunrise.png', ipsum, []);
			var tile6 = CONTENT.tile(6, 'Sample project 6', 'tiles/sunrise.png', ipsum, []);
			var tile7 = CONTENT.tile(7, 'Sample project 7', 'tiles/sunrise.png', ipsum, []);
			var tile8 = CONTENT.tile(8, 'Sample project 8', 'tiles/portrait.png', ipsum, []);
			var tile9 = CONTENT.tile(9, 'Sample project 9', 'tiles/sunrise.png', ipsum, []);
			var tile10 = CONTENT.tile(10, 'Sample project 10', 'tiles/portrait.png', ipsum, []);
			var tile11 = CONTENT.tile(11, 'Sample project 11', 'tiles/sunrise.png', ipsum, []);
			CONTENT.tiles = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11];
		}

		var colHeights = UTILS.colIds.map(function(colId) { return 0; });

		CONTENT.tiles.map(function(t) {
			var tRender = $('#tileTemplate').render(t);
			var shortestColIndex = colHeights.indexOf(Math.min.apply(null, colHeights));
			$(UTILS.colIds[shortestColIndex]).append(tRender);
			colHeights[shortestColIndex] += $('#tile-'+t.id).height();
		});
	},

	filterTiles: function() {
		console.log($('#tags li p.selected'));
	}
}