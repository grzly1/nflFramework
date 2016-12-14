// $(".allow_location").click(function() {
//
//     let url = "https://api.yelp.com/v2/search/?oauth_consumer_key=pZHLAtErI_5JyA6Ckcbifw&oauth_token=wh4FbNKTTeleY2ohHdai7GSiXTG0YyOn&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1481575919&oauth_nonce=TTP6e7&oauth_version=1.0&oauth_signature=NLLe1osu9DPF1mxLYLbOcalf5Wc%3D&term=pizza&location=" + searchLat + "," + searchLong + "&limit=3&category_filter=sportsbars"
//
//     $.support.cors = true
//
//     function cb(data) {
//         console.log("cb: " + JSON.stringify(data));
//     }
//
//     var auth = {
//         //
//         // Update with your auth tokens.
//         //
//         consumerKey: "pZHLAtErI_5JyA6Ckcbifw",
//         consumerSecret: "kssvJPwk6EW1UUjFJdkwZ46NBNA",
//         accessToken: "wh4FbNKTTeleY2ohHdai7GSiXTG0YyOn",
//         // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
//         // You wouldn't actually want to expose your access token secret like this in a real application.
//         accessTokenSecret: "RmbeHAs1_pDMorIbTTcNc0HsnOY",
//         serviceProvider: {
//             signatureMethod: "HMAC-SHA1"
//         }
//     };
//
//     let $query = $.ajax({
//         beforeSend: function(request) {
//             request.setRequestHeader("Access-Control-Allow-Origin", "*");
//             request.setRequestHeader("x-my-custom-header", "mattsbar");
//             request.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//             request.setRequestHeader("Access-Control-Allow-Methods", "GET");
//             return request
//         },
//         url: url,
//         success: bars,
//         crossDomain: true,
//         dataType: "jsonp",
//         jsonpCallback: "cb",
//         async: "false",
//         cache: true
//
//
//     })
//
//     // beforeSend: function(xhr) {
//     //     xhr.setRequestHeader("Authorization", "Basic " + res);
//
//     function bars(data, status) {
//         console.log(url)
//         if (status !== "success") {
//             return;
//         }
//         // console.log(data);
//         let results = data.Search;
//
//         // Function to take JSON object and populate the HTML DOM
//         breakDownSearchResults(results)
//
//         console.log(results)
//
//     }
//
//     $query.fail(function(err) {
//         console.log(err);
//     })
// })
//
// const breakDownSearchResults = function(array) {
//
//     // FOR LOOP example of populating the DOM with JSON elements
//
//     // for (var i = 0; i < array.length; i++) {
//     //   console.log(array[i]);
//     //   let newResult = document.createElement( 'div' )
//     //   $(newResult).addClass('result')
//     //
//     //   $('#searchResults').append("<h6>"+ array[i]["Title"] +"</h6>");
//     //   $('#searchResults').append("<h6>"+ array[i]["Year"] +"</h6>");
//     //   $('#searchResults').append("<img src='"+ array[i]["Poster"] + " ' />");
//     // }
//
//     // Higher Order Function that Creates each result container Div and Appends it to the DOM
//     // Then calls populateResultDivs function to populate the individual result divs
//     array.forEach((result) => {
//         let newResult = document.createElement("div")
//         $(newResult).addClass("result")
//         $("#searchResults").append(populateResultDivs(result, newResult))
//             // console.log(result);
//     })
// }

// function for geolocation------>

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }
//
// function showPosition(position) {
//     searchLat = position.coords.latitude;
//     searchLong = position.coords.longitude;
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;
//     map.setCenter(new google.maps.LatLng(lat, lng));
// }
//
// var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// };
//
// function success(pos) {
//     var crd = pos.coords;
//     searchLat = crd.latitude;
//     searchLong = crd.longitude;
//
//     console.log('Your current position is:');
//     console.log('Latitude : ' + crd.latitude);
//     console.log('Longitude: ' + crd.longitude);
//     console.log('More or less ' + crd.accuracy + ' meters.');
// };
//
// function error(err) {
//     console.warn('ERROR(' + err.code + '): ' + err.message);
// };
//
// navigator.geolocation.getCurrentPosition(success, error, options);

// end geolocation---------->

// omdb function ----------->

$(document).ready(function() {


    $('#submitBtn').on('click', function() {
        $('#searchResults').empty();

        let searchText = $('#searchBox').val();
        let $query = $.getJSON('http://www.omdbapi.com/?s=' + searchText);

        $query.done((data) => {
            if ($query.status !== 200) {
                return;
            }
            // console.log(data);
            let results = data.Search;

            // Function to take JSON object and populate the HTML DOM
            breakDownSearchResults(results)

            $query.fail(function(err) {
                console.log(err);
            });
        })
    })

    // Iterate over results; create container Div; append to DOM
    const breakDownSearchResults = function(array) {

        // FOR LOOP example of populating the DOM with JSON elements

        // for (var i = 0; i < array.length; i++) {
        //   console.log(array[i]);
        //   let newResult = document.createElement( 'div' )
        //   $(newResult).addClass('result')
        //
        //   $('#searchResults').append("<h6>"+ array[i]["Title"] +"</h6>");
        //   $('#searchResults').append("<h6>"+ array[i]["Year"] +"</h6>");
        //   $('#searchResults').append("<img src='"+ array[i]["Poster"] + " ' />");
        // }

        // Higher Order Function that Creates each result container Div and Appends it to the DOM
        // Then calls populateResultDivs function to populate the individual result divs
        array.forEach((result) => {
            let newResult = document.createElement("div")
            $(newResult).addClass("result")
            $("#searchResults").append(populateResultDivs(result, newResult))
                // console.log(result);
        })
    }

    // Populate result div with result specific info
    const populateResultDivs = function(obj, containerDiv) { // obj = data.Search[0].Title
        let title = obj.Title; //Batman Begins
        let poster = obj.Poster; //....jpg
        let releaseYear = obj.Year; // 2005

        $(containerDiv).append("<h5>" + title + "</h5>");
        $(containerDiv).append("<h6>" + releaseYear + "</h6>");
        $(containerDiv).append("<img class='poster' src='" + poster + "' alt='title' />");
        return containerDiv
    }

});

// end omdb function------->
