var UTILS = {
	colIds: [],

	// handles popup box
	dialog: {
		tile: null,
		imgsHeight: null,
		imgsWidth: null,
		fullWidth: null,
		fullHeight: null,
		outerScrollY: null,
		shown: false,

		// draw popup & register handlers
		initialize: function() {
			if (UTILS.dialog.tile != null) {
				UTILS.dialog.sizeFrame();
				UTILS.dialog.addImgs();
			}

			$('.tile').on('click', function(event) {
				UTILS.dialog.outerScrollY = window.scrollY;
				$('#background').show();

				// get tile upon which click occurred
				var tileId = $(event.target).closest('.tile')[0].id;
				var split = tileId.indexOf('-')+1;
				var tileIndex = tileId.substr(split, tileId.length-split);
				UTILS.dialog.tile = CONTENT.tiles[parseInt(tileIndex)];
				var tRender = $('#popupTemplate').render(UTILS.dialog.tile);
 				// send to Google Analytics
 				ga('send', 'event', 'dialog', 'click', UTILS.dialog.tile.title);

				// make popup template
				$('#popup').html(tRender);
				UTILS.dialog.sizeFrame(); // adds images as well
				UTILS.dialog.addImgs();
			});

			$('.tile').on('mouseenter', function(event) {
				// get tile upon which mouseover occurred
				var tileId = $(event.target).closest('.tile')[0].id;
				var split = tileId.indexOf('-')+1;
				var tileIndex = tileId.substr(split, tileId.length-split);

				// get tile, send to Google Analytics, then clear
				UTILS.dialog.tile = CONTENT.tiles[parseInt(tileIndex)];
 				ga('send', 'event', 'dialog', 'mouseenter', UTILS.dialog.tile.title);
 				UTILS.dialog.tile = null;
			});
		},

		// make popup appropriate size
		sizeFrame: function() {
			// height
			UTILS.dialog.fullHeight = $(window).height()-100;
			$('#popup').height(UTILS.dialog.fullHeight);
			UTILS.dialog.imgsHeight = 0.5*UTILS.dialog.fullHeight;
			$('#popup .imgs').height(UTILS.dialog.imgsHeight);

			// width
			$('#popup').width('95%');
			UTILS.dialog.fullWidth = $('#popup').width();
			var popupMargin = (UTILS.sizing.totalWidth - UTILS.dialog.fullWidth)/2;
			$('#popup').css({'margin-left':popupMargin, 'margin-right':popupMargin});
		},

		// prepare to add images & trigger recursive adding
		addImgs: function() {
			if (UTILS.dialog.tile != null) {
				$('#popup .imgs').html('');
				var allImgs = [UTILS.dialog.tile.img].concat(UTILS.dialog.tile.extraImgs);
				UTILS.dialog.imgsHeight = 0.5*UTILS.dialog.fullHeight;
				UTILS.dialog.imgsWidth = 0.9*UTILS.dialog.fullWidth;
				UTILS.dialog.newImg(allImgs, 0);
			}
		},

		// add images recursively
		newImg: function(imgs, fill) {
			img = imgs[0];
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
					UTILS.dialog.newImg(imgs, fill);
				} else { // done w/ recursion
					UTILS.dialog.marginImages(fill);
				}
			}

			addImg.src = img;
		},

		// lay images out in frame
		marginImages: function(fill) {
			// compute
			var imgs = $('#popup .imgs img');
			var insideMargin = 10;
			var gapSpace = (imgs.length-1)*insideMargin

			for (var i=0; i<imgs.length; i++) {
				$(imgs[i]).css({'margin-left':insideMargin})
			}

			// apply
			var margin = (UTILS.dialog.imgsWidth - fill - gapSpace) / 2;
			$(imgs[0]).css({'margin-left':margin});

			// display popup
			$('#popup').show("fade", { complete: UTILS.dialog.sizeText }, 50);
		
			// now that it exists, register handlers to close the window
			$('#popup .exit').on('click', function() {
				UTILS.dialog.hideDialog();
			});

			$('#background').on('click', function() {
				UTILS.dialog.hideDialog();
			});

			$(document).keyup(function(e) {
				if (e.keyCode==27 || e.keyCode==88) {
					UTILS.dialog.hideDialog();
				}
			});
		},

		// position text wrt images
		sizeText: function() {
			UTILS.dialog.shown = true;

			window.scrollTo(0,0);
			var contentsHeight = $('#popup .title').outerHeight(true) +  // trues include margin in height
								 $('#popup .imgs').outerHeight(true) +
								 $('#popup .txt').outerHeight(true);
			if (contentsHeight > UTILS.dialog.fullHeight) {
				UTILS.dialog.fullHeight = contentsHeight;
				$('#popup').height(UTILS.dialog.fullHeight);
				$('#container').css({'height':UTILS.dialog.fullHeight+50, 'overflow':'hidden'});
			}
			
		},

		// scroll popup
		scroll: function(y) {
			if ($(window).height() - UTILS.dialog.fullHeight < 100) {
				$('#popup').css({'margin-top':-y});
			}
		},

		hideDialog: function() {
			if (UTILS.dialog.shown == true) {
				UTILS.dialog.shown = false;
				$('#popup').hide("fade", 
								{ complete: function() {
									$('#background').hide()
									$('#popup .imgs').html('');
									UTILS.dialog.tile = null;
									$('#container').css({'height':'auto', 'overflow':'visible'});
									window.scrollTo(0,UTILS.dialog.outerScrollY);
								}}, 
								200);
			}
		}
	},

	// handles page layout
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

		// size whole frame
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
			UTILS.sizing.linksHeight = 20;
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

		// size things in columns
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