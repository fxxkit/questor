function initialize() {
	var mapOptions = {
  		center: { lat: 25.0562402, lng: 121.6241145},
  		zoom: 15,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);



    google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    console.log(map.getCenter());
    
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: 'Click to zoom'
      });
    // marker.
        window.setTimeout(function() {
            console.log(marker.getPosition());
            map.panTo(marker.getPosition());
        }, 100);
    });
}

console.log("XDDDDDD MAP");

