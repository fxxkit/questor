var searchIconClickHandler = function (e) {
	$('.search-bar').focus();
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
	$('.search-wrap').click(searchIconClickHandler);
	$('.search-bar').focus(searchBoxFocusHandler).blur(searchBoxBlurHandler);
	$('.search-overlay').click(searchOverlayClickHander);
}
