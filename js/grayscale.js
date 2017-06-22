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
        $(this).val('<p style="color: black;">' + pos.lat + " , " + pos.lng + '</p>');
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
  infoWindow = new google.maps.InfoWindow({
        content: " ",
        });
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'tent.png'
  });

 google.maps.event.addListener(marker, 'click', function() {
      console.log(place)
  infoWindow.setContent('<h3 style="text-align: center; color: black;">' + place.name + '</h3>' + '<br>' + 
                        '<button onclick="addMe()" style="margin: auto">Add to Trip</button>');
  infoWindow.open(map, this);
    stopover = place.name;
      });
        

}

function addMe() {
    var newStop = $('<li>' + stopover + '</li>');

var cancel = $("<button>");

cancel.addClass("cancelbtn");
cancel.append("X");

newStop.append(cancel);

console.log("stopover", stopover);
waypoints.push({
            location: stopover,
            stopover: true});

    $("#Stopovers").append(newStop);

 if (infoWindow) {
    infoWindow.close();
 }
}


$(document).on('click', ".cancelbtn", function() {
    var index = $(this).parent().index();
    console.log(index);
        $(this).parent().remove();
        waypoints.splice(index, 1);
        console.log(waypoints);
})

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