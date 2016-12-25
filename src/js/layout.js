var LAYOUT = (function() {
	function onload() {
		var windowWidth = $("body").width();
		var mainWidth = $('#main').width();
		var leftWidth, rightWidth;

		// compute widths based on page & main widths
		// breakpoint at 1100 (photo on left vs. photo above)
		if (windowWidth > 1100) {
			// widescreen -- photo on left
			leftWidth = 0.275 * mainWidth;
			rightWidth = mainWidth - leftWidth;
		} else if (windowWidth > 500) {
			// halfscreen -- photo above
			leftWidth = 0.3 * windowWidth;
			rightWidth = windowWidth;
		} else {
			// mobile screen -- photo larger
			leftWidth = 0.4 * windowWidth
			rightWidth = windowWidth;
		}

		// set widths
		$("#me").width(leftWidth);
		$("#left").width(leftWidth);
		$("#right").width(rightWidth);

		// after all layout is done, show the page.
		$("body").show();
	}

	return {
		onload: onload
	};
})();
