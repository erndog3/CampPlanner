var map, infoWindow;
var geocoder = new google.maps.Geocoder();

function initMap() {
var center = {lat: 34.059476, lng: -118.446126};
map = new google.maps.Map(document.getElementById("map"), {
          zoom: 6,
          center: center
        });
	infoWindow = new google.maps.InfoWindow;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
		var marker = new google.maps.Marker({
			map: map,
			position: pos
		});
			map.setCenter(pos);
			map.setZoom(10);
		})
	}
}

google.maps.event.addDomListener(window, "load", initMap);

function geocodeAddress() {
	var address = document.getElementById('address').value;
	geocoder.geocode({ 'address': address},
		function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				map.setZoom(17);
				map.panTo(marker.position)
			}
			else {
				alert("Geocode failed with the following error: " + status);
			}
		});


}