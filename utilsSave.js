var UTILS = {
	colIds: [], 

	columns: {
		fill: function() {
		}
	},

	dialog: {
		tile: null,
		imgsHeight: null,
		imgsWidth: null,
		fullWidth: null,

		initialize: function() {
			if (UTILS.dialog.tile != null) {
				UTILS.dialog.resize();
			}

			$('.tile').on('click', function(event) {
				$('#background').show();

				// get tile upon which click occurred
				var tileId = $(event.target).closest('.tile')[0].id;
				var tileIndex = tileId.substr(tileId.length-1, 1);
				UTILS.dialog.tile = CONTENT.tiles[tileIndex];
				var tRender = $('#popupTemplate').render(UTILS.dialog.tile);
 
				// make popup template
				$('#popup').html(tRender);
				UTILS.dialog.resize(); // adds images as well

				$('#popup').show("scale", { direction: "both" }, 500);
			});

			$('#background').on('click', function() {
				$('#popup').hide("scale", { direction: "both" }, 500);
				UTILS.dialog.tile = null;
				$('#popup .imgs').html('');
				window.setTimeout(function() {$('#background').hide()}, 500);
			});
		},

		resize: function() {
			// height
			var popupHeight = $(window).height()-100;
			$('#popup').height(popupHeight);
			$('#popup .imgs').height(0.5*popupHeight);

			// width
			$('#popup').width('95%');
			UTILS.dialog.fullWidth = $('#popup').width();
			var popupMargin = (UTILS.sizing.totalWidth - UTILS.dialog.fullWidth)/2;
			$('#popup').css({'margin-left':popupMargin, 'margin-right':popupMargin})

			if (UTILS.dialog.tile != null) {
				$('#popup .imgs').html('');
				var allImgs = [UTILS.dialog.tile.img].concat(UTILS.dialog.tile.extraImgs);
				UTILS.dialog.imgsHeight = $('#popup .imgs').height();
				UTILS.dialog.imgsWidth = 0.9*UTILS.dialog.fullWidth;
				UTILS.dialog.addImgs(allImgs, 0);
			}
		},

		addImgs: function(imgs, fill) {
			img = imgs[0];
			console.log(img);
			imgs = imgs.slice(1, imgs.length);

			// see if there are more images
			var addImg = new Image();
			addImg.onload = function() {
				var newImgWidth = UTILS.dialog.imgsHeight * this.width/this.height;
				fill += newImgWidth
 				if (fill < 0.9*UTILS.dialog.imgsWidth) {
					$('#popup .imgs').append('<img height='+UTILS.dialog.imgsHeight+'px src="'+img+'">')
				} else {
					fill -= newImgWidth; // didn't add
				}
				if (imgs.length > 0) {
					UTILS.dialog.addImgs(imgs, fill);
				} else {
					UTILS.dialog.marginImages(fill);
				}
			}

			addImg.src = img;
		},

		marginImages: function(fill) {
			var imgs = $('#popup .imgs img');
			var insideMargin = 10;
			var gapSpace = (imgs.length-1)*insideMargin

			for (var i=0; i<imgs.length; i++) {
				$(imgs[i]).css({'margin-left':insideMargin})
			}

			var margin = (UTILS.dialog.imgsWidth - fill - gapSpace) / 2;
			$(imgs[0]).css({'margin-left':margin});

			console.log($('#popup .title').outerHeight());
			console.log($('#popup .imgs').outerHeight());
			console.log($('#popup .txt p').outerHeight());
		}
	},

	sizing: {
		// overall layout
		totalWidth: 0,
		navOuterWidth: 0,
		navHeight: 0,
		projectsWidth: 0,
		margin: 0,

		// inside nav
		photoHeight: 0,
		tagsHeight: 0,
		linksHeight: 0,

		landscapeResize: function() {
			// overall layout
			UTILS.sizing.totalWidth = $(window).width();
			if (UTILS.sizing.totalWidth < 500) {
				$(window).scroll(function(event) {
  					$("#nav").css("margin-left", 50-$(document).scrollLeft());
				});
				UTILS.sizing.totalWidth = $(document).width();
			}
			UTILS.sizing.navOuterWidth = $('#nav').outerWidth(true);
			UTILS.sizing.projectsWidth = 0.9*(UTILS.sizing.totalWidth-UTILS.sizing.navOuterWidth);
			UTILS.sizing.margin = 0.5*(UTILS.sizing.totalWidth-UTILS.sizing.projectsWidth-UTILS.sizing.navOuterWidth);

			// things inside #nav
			UTILS.sizing.navHeight = $('#nav').height(); // from css
			UTILS.sizing.photoHeight = $('#nav').width(); // from css
			UTILS.sizing.linksHeight = 0.065*UTILS.sizing.navHeight;
			UTILS.sizing.tagsHeight = UTILS.sizing.navHeight - UTILS.sizing.photoHeight - UTILS.sizing.linksHeight;

			// apply sizing
			$('#projects').width(UTILS.sizing.projectsWidth);
			$('#projects').css({'margin-left':UTILS.sizing.navOuterWidth+UTILS.sizing.margin});
			$('#photo').height(UTILS.sizing.photoHeight);
			$('#tags').height(UTILS.sizing.tagsHeight);
			$('#links').height(UTILS.sizing.linksHeight);
			$('.linkImg').height(UTILS.sizing.linksHeight);
			$('.linkImg').width(UTILS.sizing.linksHeight);

			// columns inside #projects
			UTILS.sizing.columnResize();
		},

		columnResize: function() {
			if (UTILS.sizing.projectsWidth > 1000) {
				UTILS.colIds = ['#col1', '#col2', '#col3', '#col4'];
				$('#projects').html("<div id='col1' class='col'></div> \
									 <div id='col2' class='col'></div> \
									 <div id='col3' class='col'></div> \
									 <div id='col4' class='col'></div>");
			} else if (UTILS.sizing.projectsWidth > 750) {
				UTILS.colIds = ['#col1', '#col2', '#col3']
				$('#projects').html("<div id='col1' class='col'></div> \
									 <div id='col2' class='col'></div> \
									 <div id='col3' class='col'></div>");
			} else if (UTILS.sizing.projectsWidth > 500) {
				UTILS.colIds = ['#col1', '#col2']
				$('#projects').html("<div id='col1' class='col'></div> \
									 <div id='col2' class='col'></div>");
			} else {
				UTILS.colIds = ['#col1']
				$('#projects').html("<div id='col1' class='col'></div>");
			}

			// column margins
			var colMargin = 20
			var colWidth = (UTILS.sizing.projectsWidth - (UTILS.colIds.length-1)*colMargin)/UTILS.colIds.length;
			UTILS.colIds.map(function(id) {
				$(id).width(colWidth);
			});

			for (i=0; i<UTILS.colIds.length-1; i++) {
				$(UTILS.colIds[i]).css({'margin-right':colMargin})
			}
		}
	}
}