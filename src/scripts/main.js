(function(){
    "use strict";

    var mapObj = null;
    var mapContainerId = 'map-canvas';
	
	$(document).ready(function() {

        // check if the map mounting point exists
        var mountPoint = document.getElementById(mapContainerId) || 0;
        if (mountPoint) {
            mapObj = new MyMap(mountPoint);
            mapObj.init();
        }
	    bindSearchEvents();

	});
})();

