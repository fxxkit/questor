function MyMap(mountPoint){
    'use strict';
    var oMap = this;
    // private property
    var map = null;
    var taskMarker = {};
    var prevInfoWindow = null;

    //public methods
    oMap.init = function(latitude,longitude){
        var mapOptions = {
            zoom: 15,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false
        };
        map = new google.maps.Map(mountPoint, mapOptions);

        //Init user location
        _getUserLocation();

        //bind init event
        _bindBoundsChangeEvent();
    };

    oMap.addUserLocationMarker = function (latitude, longitude) {
        var latlng = new google.maps.LatLng(latitude, longitude);
        var image = {
            url: "images/current.png",
            scaledSize: new google.maps.Size(20, 20),
        };

        var marker = new google.maps.Marker({
            position:latlng, 
            map:map, 
            title:"You are here!",
            icon: image
        });
    };

    oMap.addTaskMarkers = function (taskObj) {
        $.each(taskObj, function (idx, task) {
            var latlng = new google.maps.LatLng(task.lat,task.lng);
            var marker = new google.maps.Marker({
                position:latlng, 
                map:map, 
                title:"You are here!",
            });
            marker.set("taskObj", task);
            google.maps.event.addListener(marker,'click',function(){
                if (prevInfoWindow !== null){
                    prevInfoWindow.close();
                }
                var infowindow = new google.maps.InfoWindow();
                var taskObj = marker.get("taskObj");
                infowindow.setContent("taskId: " + taskObj.taskId);
                infowindow.open(map,marker);
                prevInfoWindow = infowindow;
            });
        });
    };

    oMap.setCenter = function (latitude, longitude) {
        var latlon = new google.maps.LatLng(latitude, longitude);
        map.panTo(latlon);
        map.setCenter(latlon);
    };
    
    oMap.fetchNearbyTasks = function (neLat, neLng, swLat, swLng) {
        var borderLatLng = _getBorderLatLng();
        $.getJSON('/api/tasks/near', 
            {nrthEstLat: borderLatLng.nrthEstLat,
            nrthEstLng: borderLatLng.nrthEstLng,
            sthWstLat: borderLatLng.sthWstLat ,
            sthWstLng: borderLatLng.sthWstLng
            },
            function (nearbyTasks) {
                oMap.addTaskMarkers(nearbyTasks);
        });
    };

    //private methods
    var _bindBoundsChangeEvent = function(){
        google.maps.event.addListener(map, 'bounds_changed', function() {
            console.log('==== BODER CHANGE ====');
            _getBorderLatLng();        
        });
    };

    var _getUserLocation =  function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(_initGeo, _initGeoErrorHandler);
        } else {
            console.warn('Geolocation is not supported by this browser');
        }
    };

    var _initGeo = function (position) {
        console.debug('position.coords.latitude:',position.coords.latitude);
        console.debug('position.coords.longitude:',position.coords.longitude);
        oMap.addUserLocationMarker(position.coords.latitude, position.coords.longitude);
        oMap.setCenter(position.coords.latitude, position.coords.longitude);
        oMap.fetchNearbyTasks();
    };
    var _initGeoErrorHandler = function (err) {
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
        oMap.addUserLocationMarker(mapDefaultCenter.latitude, mapDefaultCenter.longitude);
    };


    var _getBorderLatLng = function(){
        //console.log("===center====");
        var centerLat = map.getCenter().lat();
        var centerLng = map.getCenter().lng();
        //console.log("centerLat: " + centerLat + " centerLng: " + centerLng);
        //console.log("===bounds====");
        var boundNorthEastLat = map.getBounds().getNorthEast().lat();
        var boundNorthEastLng = map.getBounds().getNorthEast().lng();
        var boundSouthWestLat = map.getBounds().getSouthWest().lat();
        var boundSouthWestLng = map.getBounds().getSouthWest().lng();

        console.log("boundNorthEastLat: " + boundNorthEastLat + " boundNorthEastLng: " + boundNorthEastLng);
        console.log("boundSouthWestLat: " + boundSouthWestLat + " boundSouthWestLng: " + boundSouthWestLng);            

        var returnObj = {
                            nrthEstLat: boundNorthEastLat,
                            nrthEstLng: boundNorthEastLng,
                            sthWstLat: boundSouthWestLat ,
                            sthWstLng: boundSouthWestLng
                        };

        return returnObj;
    };
}






