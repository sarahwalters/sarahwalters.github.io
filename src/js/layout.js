var LAYOUT = (function() {
	function onload() {
		// compute widths based on main width
		var mainWidth = $('#main').width();
		var leftWidth = 0.275 * mainWidth;
		var rightWidth = mainWidth - leftWidth;

		// set widths
		$("#main").width(mainWidth);
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
