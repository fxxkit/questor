var searchIconClickHandler = function (e) {
	$('.search-bar').focus();
}

function bindSearchEvents () {
	$('.search-wrap').click(searchIconClickHandler);
}