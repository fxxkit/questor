(function(){
    "use strict";

    var mapObj = null;
	
	$(document).ready(function() {
		
		mapObj = new MyMap();
	    mapObj.init();
	    bindSearchEvents();

	});
})();

