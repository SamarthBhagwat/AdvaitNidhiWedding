$(document).ready(function() {

    /*-----------------------------------------------------------------------------------*/
    /*	Smooth Scroll
    /*  Thanks to: https://github.com/davist11/jQuery-One-Page-Nav
    /*-----------------------------------------------------------------------------------*/

    function smoothScroll() {
        $(".nav").onePageNav({
            filter: ':not(.external)',
            scrollSpeed: 1500
        });

        var formTarget = $(".js-form"); // Assign this class to corresponding section on Index.html

        // Scrolls to form section
        $(".js-scroll").on("click", function() {
            $('html, body').animate({
                scrollTop: formTarget.offset().top
            }, 2000);
            return false;
        });

        return false;
    }

    smoothScroll();

    /*-----------------------------------------------------------------------------------*/
    /*	Backstretch
    /*  Thanks to: http://srobbin.com/jquery-plugins/backstretch/
    /*-----------------------------------------------------------------------------------*/

    function backStrech() {
        $("aside").backstretch([
            "img/placeholder-1.jpg",
            "img/placeholder-2.jpg",

        ], {
            duration: 5000,
            fade: 1000
        });
    }

    backStrech();

    /*-----------------------------------------------------------------------------------*/
    /*	Flexslider
    /*  Thanks to: http://www.woothemes.com/flexslider/
    /*-----------------------------------------------------------------------------------*/

    function flexSlider() {
        $('.flexslider').flexslider({
            animation: "slide",
            slideshow: false,
            touch: true
        });
    }

    flexSlider();

    /*-----------------------------------------------------------------------------------*/
    /*	RSVP Form Validation + Submission
    /*-----------------------------------------------------------------------------------*/

    function rsvpFormSubmit() {
        
        // this is the id of the form
        var formID = $("#js-form");

        // submits form with ajax method
        formID.on("submit", function() {
            /*
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbzB2cQnGFy7UerQjH_KTHuHSLg6vfZfiy-Hg2Sd2LfhTbSqycL3AVbLWMEJw1Xn5ooc/exec",
                type: "POST",
                data: {
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    noOfPersons: $("#noOfPersons").val(),
                    phone: $("#phone").val()
                },
                success: function(response) {
                    $(".js-display")
                        .addClass("message-panel")
                        .html("RSVP submitted successfully!");
                },
                error: function(xhr, status, error) {
                    $(".js-display")
                        .addClass("message-panel")
                        .html("Error submitting RSVP.");

                    console.error("AJAX error details:");
                    console.error("Status:", status);
                    console.error("Error:", error);
                    console.error("Response Text:", xhr.responseText);
                    console.error("XHR object:", xhr);
                }
            });
            */

            const formData = {
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                noOfPersons: document.getElementById("noOfPersons").value,
                phone: document.getElementById("phone").value
            };

            fetch("https://script.google.com/macros/s/AKfycby-u3VZKkEHjXw77mUI6sS4F6PAj1yTSuC8TlhhU4UcYqhMcvGxJQQEiZmLXzAVZ2-3/exec", {
                method: "POST",
                mode: "no-cors", // This will suppress CORS errors but also block access to the response
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                document.querySelector(".js-display")
                    .classList.add("message-panel");
                document.querySelector(".js-display").innerHTML = "RSVP submitted successfully!";
                console.error("Submit successful");
                document.getElementById("popup").classList.remove("hidden");
            })
            .catch(error => {
                document.querySelector(".js-display")
                    .classList.add("message-panel");
                document.querySelector(".js-display").innerHTML = "Error submitting RSVP.";
                console.error("Fetch error:", error);
                alert("Error submitting RSVP.");
            });

            // Close popup logic
            document.getElementById("closePopup").addEventListener("click", () => {
                document.getElementById("popup").classList.add("hidden");
            });

            return false; // avoid to execute the actual submit of the form.

        });

        // Show/Hide RSVP Menu selection on accept/decline
        $(".decline").on("click", function() {
            $(".rsvp-meal-choice").fadeOut();
        });
        $(".accept").on("click", function() {
            $(".rsvp-meal-choice").fadeIn();
        });
        
       
    }
    rsvpFormSubmit();


});

/*-----------------------------------------------------------------------------------*/
/*	Google Map API 
/*  Credit to: http://stiern.com/tutorials/adding-custom-google-maps-to-your-website/
/*-----------------------------------------------------------------------------------*/

var map;
var myLatlng = new google.maps.LatLng(41.38031, 2.17416); // Specify YOUR coordinates

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

    /*----------------------------------------------------------------------------*/
    /* Creates a custom color scheme for map
    /* For details on styling go to the link below:
    /* http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool */
    /*----------------------------------------------------------------------------*/

    var featureOpts = [{
        "featureType": "road",
        "stylers": [{
                "hue": "#ff3300"
            },
            {
                "gamma": 0.82
            },
            {
                "visibility": "on"
            },
            {
                "saturation": 62
            },
            {
                "lightness": -7
            }
        ]
    }, {
        "featureType": "poi",
        "stylers": [{
                "hue": "#ff0000"
            },
            {
                "lightness": 14
            }
        ]
    }, {
        "stylers": [{
            "hue": "#ff0000"
        }]
    }]

    var mapOptions = {
        zoom: 18,
        center: myLatlng,
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    var image = new google.maps.MarkerImage("img/map-marker@2x.png", null, null, null, new google.maps.Size(55, 57));

    // Includes custom marker on map
    var myLatLng = new google.maps.LatLng(41.38031, 2.17416);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

google.maps.event.addDomListener(window, 'load', initialize);