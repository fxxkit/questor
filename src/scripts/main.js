(function(){
    "use strict";

    var mapObj = null;
    var mapDefaultCenter = {
    	latitude: 25.03684,
    	longitude: 121.518
    };

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(updateGeo, updateGeoErrorHandler);
		} else {
			console.warn('Geolocation is not supported by this browser');
		}
	}
	function updateGeo(position) {
		console.debug('position.coords.latitude:',position.coords.latitude);
		console.debug('position.coords.longitude:',position.coords.longitude);
		mapObj.addMarker(position.coords.latitude, position.coords.longitude);
		mapObj.setCenter(position.coords.latitude, position.coords.longitude);
	}
	function updateGeoErrorHandler(err) {
	    switch(err.code) {
	        case err.PERMISSION_DENIED:
	            console.warn("User denied the request for Geolocation.");
	            break;
	        case err.POSITION_UNAVAILABLE:
	            console.warn("Location information is unavailable.");
	            break;
	        case err.TIMEOUT:
	            console.warn("The request to get user location timed out.");
	            break;
	        case err.UNKNOWN_ERROR:
	            console.warn("An unknown error occurred.");
	            break;
	    }
	    mapObj.addMarker(mapDefaultCenter.latitude, mapDefaultCenter.longitude);
	}

	$(document).ready(function() {
		
		mapObj = new MyMap();
	    mapObj.init(25.0562402, 121.6241145);

	    getLocation();

	    bindSearchEvents();
	});
})();

