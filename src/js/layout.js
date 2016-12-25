var LAYOUT = (function() {
	function onload() {
		var windowWidth = $("body").width();
		var mainWidth = $('#main').width();
		var leftWidth, rightWidth;

		// compute widths based on page & main widths
		// breakpoint at 1100 (photo on left vs. photo above)
		if (windowWidth > 1100) {
			leftWidth = 0.275 * mainWidth;
			rightWidth = mainWidth - leftWidth;
		} else {
			leftWidth = 0.3 * windowWidth;
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
