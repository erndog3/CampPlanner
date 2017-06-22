var map, infoWindow, pos, stopover;
var waypoints = [];
var geocoder = new google.maps.Geocoder();

google.maps.event.addDomListener(window, "load", initMap);

function initMap() {
var center = {lat: 34.059476, lng: -118.446126};
map = new google.maps.Map(document.getElementById("map"), {
          zoom: 6,
          center: center
        });

}

function geolocation() {
	infoWindow = new google.maps.InfoWindow;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
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
var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pos,
    radius: 500000,
    type: ['campground']

 }, callback);
	var fields = $(".autofiller");
	fields.each(function() {
		$(this).val(pos.lat + " , " + pos.lng);
	});					
		})

}


	


}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var infoWindow = new google.maps.InfoWindow({
      	content: " ",
      	});
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'tent.png'
  });

 google.maps.event.addListener(marker, 'click', function() {
      console.log(place)
  infoWindow.setContent('<h3 style="text-align: center;">' + place.name + '</h>' + '<br>' + 
  						'<button onclick="addMe()">Add to Trip</button>');
  infoWindow.open(map, this);
 	stopover = place.name;
      });
       	

}

function addMe() {

console.log("stopover", stopover);
waypoints.push({
			location: stopover,
			stopover: true});

	$("#Stopovers").append('<li>' + stopover + '</li>');
	
} 


// function geocodeAddress() {
// 	var address = document.getElementById('address').value;
// 	geocoder.geocode({ 'address': address},
// 		function (results, status) {
// 			if (status == google.maps.GeocoderStatus.OK) {
// 				map.setCenter(results[0].geometry.location);

// 				var marker = new google.maps.Marker({
// 					map: map,
// 					position: results[0].geometry.location,
// 					animation: google.maps.Animation.DROP,
// 				});

// 				map.setZoom(17);
// 				map.panTo(marker.position)
// 			}
// 			else {
// 				console.log("Geocode failed with the following error: " + status);
// 			}
// 		});


// }

function calcRoute() {
	var directionsService = new google.maps.DirectionsService();

	var directionsDisplay;
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	var start = document.getElementById("start").value;
	var end = document.getElementById("destination").value;
	if (! end) {
		alert("No End Destination Set!")
		return
	};
	// waypoints = [

	// 	{ location: document.getElementById("stopover1").value,
	// 	  stopover: true},

// ];
	// var stopover2 = document.getElementById("stopover2").value
	// if (stopover2) {
	// 	waypoints.push({location: stopover2, stopover: true})
	// };

console.log("waypoints", waypoints)
	var request = {
		origin: start,
		waypoints: waypoints,
		optimizeWaypoints: true,
		destination: end,
		travelMode : google.maps.TravelMode.DRIVING
	};

	directionsService.route(request,function (result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
		else {
			console.log("Could not calculate directions. Try again, or buy a map!");
		}
	});

$("#directionsPanel").empty();

}