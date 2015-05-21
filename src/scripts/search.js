
var searchIconPressHandler = function (e) {
	if ($('.search-overlay').hasClass('mounted')) {
		e.preventDefault();
	} else {
		$('.search-bar').focus();
	}
	
}
var searchBoxFocusHandler = function (e) {
	$('.search-overlay').addClass('mounted');
}
var searchBoxBlurHandler = function () {
	$('.search-overlay').removeClass('mounted');
}

var searchOverlayClickHander = function () {
	$('.search-overlay').removeClass('mounted');
}

function bindSearchEvents () {
	$('.search-wrap').mousedown(searchIconPressHandler).mouseup(searchIconPressHandler);
	$('.search-bar').focus(searchBoxFocusHandler).blur(searchBoxBlurHandler);
	$('.search-overlay').click(searchOverlayClickHander);
}
