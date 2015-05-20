
function MyMap(){
    var oMap = this;
    // private property
    var map = null;

    //public methods
    oMap.init = function(latitude,longitude){
        var mapOptions = {
            center: { 'lat': latitude, 'lng': longitude},
            zoom: 15,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false
        }; 
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        //bind init event
        _bindCenterChangeEvent(map);
    };

    //private methods
    var _bindCenterChangeEvent = function(map){
        google.maps.event.addListener(map, 'dragend', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            console.log("===center====");
            var centerLat = map.getCenter().lat();
            var centerLng = map.getCenter().lng();
            console.log("centerLat: " + centerLat + " centerLng: " + centerLng);
            console.log("===bounds====");
            var boundNorthEastLat = map.getBounds().getNorthEast().lat();
            var boundNorthEastLng = map.getBounds().getNorthEast().lng();
            var boundSouthWestLat = map.getBounds().getSouthWest().lat();
            var boundSouthWestLng = map.getBounds().getSouthWest().lng();

            console.log("boundNorthEastLat: " + boundNorthEastLat + " boundNorthEastLng: " + boundNorthEastLng);
            console.log("boundSouthWestLat: " + boundSouthWestLat + " boundSouthWestLng: " + boundSouthWestLng);            
        });
    };
}


