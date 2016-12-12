//begin Authorization--------->
// var auth = {
//     consumerKey: "pZHLAtErI_5JyA6Ckcbifw",
//     consumerSecret: "kssvJPwk6EW1UUjFJdkwZ46NBNA",
//     accessToken: "wh4FbNKTTeleY2ohHdai7GSiXTG0YyOn",
//     accessTokenSecret: "RmbeHAs1_pDMorIbTTcNc0HsnOY",
// };

// var terms = 'food';
// var near = 'San+Francisco';

// var accessor = {
//     consumerSecret: auth.consumerSecret,
//     tokenSecret: auth.accessTokenSecret
// };

// var parameters = [];
// parameters.push(['term', terms]);
// parameters.push(['location', near]);
// parameters.push(['oauth_consumer_key', auth.consumerKey]);
// parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
// parameters.push(['oauth_token', auth.accessToken]);

// var message = {
//     'action': 'http://api.yelp.com/v2/search',
//     'method': 'GET',
//     'parameters': parameters
// };

// OAuth.setTimestampAndNonce(message);
//
// OAuth.SignatureMethod.sign(message, accessor);
//
// var parameterMap = OAuth.getParameterMap(message.parameters);
// parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
//
// var url = OAuth.addToURL(message.action, parameterMap);
// var response = UrlFetchApp.fetch(url).getContentText();
// var responseObject = Utilities.jsonParse(response);
//have my JSON object, do whatever we want here, like add to spreadsheets

//end Authorization -------->

//new auth try----->

// var oauth = OAuth({
//     consumer: {
//         key: 'pZHLAtErI_5JyA6Ckcbifw',
//         secret: 'kssvJPwk6EW1UUjFJdkwZ46NBNA'
//     },
//     signature_method: 'HMAC-SHA1',
//     hash_function: function(base_string, key) {
//         return crypto.createHmac('sha1', key).update(base_string).digest('base64');
//     }
// });

//new auth try end---->

$(".allow_location").click(function() {

    // let $query = $.getJSON("https://api.yelp.com/v2/search/?term=pizza&location=" + searchLat + "," + searchLong + "&limit=3&category_filter=sportsbars")

    let $query = $.getJSON("GET\u0026https%3A%2F%2Fapi.yelp.com%2Fv2%2Fsearch%2F\u0026category_filter%3Dsportsbars%26limit%3D3%26location%3D" + searchLat + "," + searchLong + "%26oauth_consumer_key%3DpZHLAtErI_5JyA6Ckcbifw%26oauth_nonce%3DTTP6e7%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1481575919%26oauth_token%3Dwh4FbNKTTeleY2ohHdai7GSiXTG0YyOn%26oauth_version%3D1.0%26term%3DChicago Bears Bar")

    // let $query = $.getJSON("https://api.yelp.com/v2/search/?oauth_consumer_key=pZHLAtErI_5JyA6Ckcbifw&oauth_token=wh4FbNKTTeleY2ohHdai7GSiXTG0YyOn&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1481575919&oauth_nonce=TTP6e7&oauth_version=1.0&oauth_signature=NLLe1osu9DPF1mxLYLbOcalf5Wc%3D&term=pizza&location=" + searchLat + "," + searchLong + "&limit=3&category_filter=sportsbars")

    // beforeSend: function(xhr) {
    //     xhr.setRequestHeader("Authorization", "Basic " + res);

    $query.done((data) => {
        if ($query.status !== 200) {
            return;
        }
        // console.log(data);
        let results = data.Search;

        // Function to take JSON object and populate the HTML DOM
        breakDownSearchResults(results)

        console.log(results)

    });
    $query.fail(function(err) {
        console.log(err);
    })
})

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

// function for geolocation------>

// var searchLat = 38.92434;
// var searchLong = -105.234643;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    searchLat = position.coords.latitude;
    searchLong = position.coords.longitude;
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    map.setCenter(new google.maps.LatLng(lat, lng));
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    searchLat = crd.latitude;
    searchLong = crd.longitude;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// end geolocation---------->

//start Promise------->

// var coordinates = new Promise(function(resolve, reject) {
//         if () {
//             resolve(showPosition);
//         } else {
//             reject(Error("It Broke!"));
//         }
//     }
//
//
//     coordinates.then(function(result)) {
//         console.log(result);
//     }, fucntion(err) {
//         console.log(err);
//     });

//end promise-------->

//start CORS ----------->

// $.ajax({
//
//     // The 'type' property sets the HTTP method.
//     // A value of 'PUT' or 'DELETE' will trigger a preflight request.
//     type: 'GET',
//
//     // The URL to make the request to.
//     url: 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html',
//
//     // The 'contentType' property sets the 'Content-Type' header.
//     // The JQuery default for this property is
//     // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
//     // a preflight. If you set this value to anything other than
//     // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
//     // you will trigger a preflight request.
//     contentType: 'text/plain',
//
//     xhrFields: {
//         // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
//         // This can be used to set the 'withCredentials' property.
//         // Set the value to 'true' if you'd like to pass cookies to the server.
//         // If this is enabled, your server must respond with the header
//         // 'Access-Control-Allow-Credentials: true'.
//         withCredentials: false
//     },
//
//     headers: {
//         // Set any custom headers here.
//         // If you set any non-simple headers, your server must include these
//         // headers in the 'Access-Control-Allow-Headers' response header.
//     },
//
//     success: function() {
//         // Here's where you handle a successful response.
//     },
//
//     error: function() {
//         // Here's where you handle an error response.
//         // Note that if the error was due to a CORS issue,
//         // this function will still fire, but there won't be any additional
//         // information about the error.
//     }
// });

//end CORS ------------>

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

// start map to html function--------->

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 39.75,
//             lng: -105.00
//         },
//         zoom: 14,
//         // Map Type:
//         // mapTypeId: google.maps.MapTypeId.SATELLITE
//     });
//
// }

// end map to html function------>

if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
    module.exports = OAuth;
}

/**
 * Constructor
 * @param {Object} opts consumer key and secret
 */
function OAuth(opts) {
    if (!(this instanceof OAuth)) {
        return new OAuth(opts);
    }

    if (!opts) {
        opts = {};
    }

    if (!opts.consumer) {
        throw new Error('consumer option is required');
    }

    this.consumer = opts.consumer;
    this.nonce_length = opts.nonce_length || 32;
    this.version = opts.version || '1.0';
    this.parameter_seperator = opts.parameter_seperator || ', ';

    if (typeof opts.last_ampersand === 'undefined') {
        this.last_ampersand = true;
    } else {
        this.last_ampersand = opts.last_ampersand;
    }

    // default signature_method is 'PLAINTEXT'
    this.signature_method = opts.signature_method || 'PLAINTEXT';

    if (this.signature_method == 'PLAINTEXT' && !opts.hash_function) {
        opts.hash_function = function(base_string, key) {
            return key;
        }
    }

    if (!opts.hash_function) {
        throw new Error('hash_function option is required');
    }

    this.hash_function = opts.hash_function;
}

/**
 * OAuth request authorize
 * @param  {Object} request data
 * {
 *     method,
 *     url,
 *     data
 * }
 * @param  {Object} key and secret token
 * @return {Object} OAuth Authorized data
 */
OAuth.prototype.authorize = function(request, token) {
    var oauth_data = {
        oauth_consumer_key: this.consumer.key,
        oauth_nonce: this.getNonce(),
        oauth_signature_method: this.signature_method,
        oauth_timestamp: this.getTimeStamp(),
        oauth_version: this.version
    };

    if (!token) {
        token = {};
    }

    if (token.key) {
        oauth_data.oauth_token = token.key;
    }

    if (!request.data) {
        request.data = {};
    }

    oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);

    return oauth_data;
};

/**
 * Create a OAuth Signature
 * @param  {Object} request data
 * @param  {Object} token_secret key and secret token
 * @param  {Object} oauth_data   OAuth data
 * @return {String} Signature
 */
OAuth.prototype.getSignature = function(request, token_secret, oauth_data) {
    return this.hash_function(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
};

/**
 * Base String = Method + Base Url + ParameterString
 * @param  {Object} request data
 * @param  {Object} OAuth data
 * @return {String} Base String
 */
OAuth.prototype.getBaseString = function(request, oauth_data) {
    return request.method.toUpperCase() + '&' + this.percentEncode(this.getBaseUrl(request.url)) + '&' + this.percentEncode(this.getParameterString(request, oauth_data));
};

/**
 * Get data from url
 * -> merge with oauth data
 * -> percent encode key & value
 * -> sort
 *
 * @param  {Object} request data
 * @param  {Object} OAuth data
 * @return {Object} Parameter string data
 */
OAuth.prototype.getParameterString = function(request, oauth_data) {
    var base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));

    var data_str = '';

    //base_string_data to string
    for (var key in base_string_data) {
        var value = base_string_data[key];
        // check if the value is an array
        // this means that this key has multiple values
        if (value && Array.isArray(value)) {
            // sort the array first
            value.sort();

            var valString = "";
            // serialize all values for this key: e.g. formkey=formvalue1&formkey=formvalue2
            value.forEach((function(item, i) {
                valString += key + '=' + item;
                if (i < value.length) {
                    valString += "&";
                }
            }).bind(this));
            data_str += valString;
        } else {
            data_str += key + '=' + value + '&';
        }
    }

    //remove the last character
    data_str = data_str.substr(0, data_str.length - 1);
    return data_str;
};

/**
 * Create a Signing Key
 * @param  {String} token_secret Secret Token
 * @return {String} Signing Key
 */
OAuth.prototype.getSigningKey = function(token_secret) {
    token_secret = token_secret || '';

    if (!this.last_ampersand && !token_secret) {
        return this.percentEncode(this.consumer.secret);
    }

    return this.percentEncode(this.consumer.secret) + '&' + this.percentEncode(token_secret);
};

/**
 * Get base url
 * @param  {String} url
 * @return {String}
 */
OAuth.prototype.getBaseUrl = function(url) {
    return url.split('?')[0];
};

/**
 * Get data from String
 * @param  {String} string
 * @return {Object}
 */
OAuth.prototype.deParam = function(string) {
    var arr = string.split('&');
    var data = {};

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split('=');

        // '' value
        item[1] = item[1] || '';

        data[item[0]] = decodeURIComponent(item[1]);
    }

    return data;
};

/**
 * Get data from url
 * @param  {String} url
 * @return {Object}
 */
OAuth.prototype.deParamUrl = function(url) {
    var tmp = url.split('?');

    if (tmp.length === 1)
        return {};

    return this.deParam(tmp[1]);
};

/**
 * Percent Encode
 * @param  {String} str
 * @return {String} percent encoded string
 */
OAuth.prototype.percentEncode = function(str) {
    return encodeURIComponent(str)
        .replace(/\!/g, "%21")
        .replace(/\*/g, "%2A")
        .replace(/\'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29");
};

/**
 * Percent Encode Object
 * @param  {Object} data
 * @return {Object} percent encoded data
 */
OAuth.prototype.percentEncodeData = function(data) {
    var result = {};

    for (var key in data) {
        var value = data[key];
        // check if the value is an array
        if (value && Array.isArray(value)) {
            var newValue = [];
            // percentEncode every value
            value.forEach((function(val) {
                newValue.push(this.percentEncode(val));
            }).bind(this));
            value = newValue;
        } else {
            value = this.percentEncode(value);
        }
        result[this.percentEncode(key)] = value;
    }

    return result;
};

/**
 * Get OAuth data as Header
 * @param  {Object} oauth_data
 * @return {String} Header data key - value
 */
OAuth.prototype.toHeader = function(oauth_data) {
    oauth_data = this.sortObject(oauth_data);

    var header_value = 'OAuth ';

    for (var key in oauth_data) {
        if (key.indexOf('oauth_') === -1)
            continue;
        header_value += this.percentEncode(key) + '="' + this.percentEncode(oauth_data[key]) + '"' + this.parameter_seperator;
    }

    return {
        Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length) //cut the last chars
    };
};

/**
 * Create a random word characters string with input length
 * @return {String} a random word characters string
 */
OAuth.prototype.getNonce = function() {
    var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';

    for (var i = 0; i < this.nonce_length; i++) {
        result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
    }

    return result;
};

/**
 * Get Current Unix TimeStamp
 * @return {Int} current unix timestamp
 */
OAuth.prototype.getTimeStamp = function() {
    return parseInt(new Date().getTime() / 1000, 10);
};

////////////////////// HELPER FUNCTIONS //////////////////////

/**
 * Merge object
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @return {Object}
 */
OAuth.prototype.mergeObject = function(obj1, obj2) {
    obj1 = obj1 || {};
    obj2 = obj2 || {};

    var merged_obj = obj1;
    for (var key in obj2) {
        merged_obj[key] = obj2[key];
    }
    return merged_obj;
};

/**
 * Sort object by key
 * @param  {Object} data
 * @return {Object} sorted object
 */
OAuth.prototype.sortObject = function(data) {
    var keys = Object.keys(data);
    var result = {};

    keys.sort();

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result[key] = data[key];
    }

    return result;
};
