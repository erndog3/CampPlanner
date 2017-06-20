/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(".navbar-collapse").collapse('hide');
});

var map, infoWindow;
var geocoder = new google.maps.Geocoder();



google.maps.event.addDomListener(window, "load", initMap);

 function geocodeAddress() {
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

}

function calcRoute() {
	var directionsService = new google.maps.DirectionsService();

	var directionsDisplay;
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	var start = document.getElementById("start").value;
	var end = document.getElementById("destination").value;
	var waypoints = [
		{ location: document.getElementById("stopover").value,
		  stopover: true}];

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