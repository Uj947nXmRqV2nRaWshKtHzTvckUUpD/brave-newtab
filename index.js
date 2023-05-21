"use strict";

let dom = document.getElementById("bgimg");

(function () {
    const categories = ["inspire", "life", "funny", "love", "art", "party", "summer", "technology", "forest", "jungle", "desert", "nature", "dream", "space", "inspirational", "motivational", "photography", "animals", "alpaca", "game", "music", "girl", "sexy", "flower", "tribal", "star", "chill", "relax", "coffee", "bird", "mountain", "aurora", "portrait", "joke", "event", "fashion", "travel", "architecture", "pet", "sports", "aerial", "science", "stock", "crystal", "gem", "cute", "piano", "drums", "guitar", "electro", "kitten", "cat", "dog", "sweet", "dessert", "landscape", "minimalist", "thinkins", "success", "statue", "young", "diva", "woman", "vr", "freedom", "stylish", "colourful", "futuristic", "abstract", "brain", "human", "skyline", "sunrise", "sunset", "greece", "italy", "food", "healthy", "convertible", "couple", "shoes", "sheep", "laugh", "smile", "happy", "child", "outdoor", "plane", "cosplay", "costume", "peace", "countryside", "tuscany", "leaves", "africal", "artificial", "intelligence", "family", "woods", "wireless", "city", "hands", "theater", "cinema", "movie", "retriever", "wedding", "teacher", "road", "gun", "wild", "lips", "jump", "wolf", "picture", "car", "sportscar", "legacy", "rocket", "saturn", "galaxy", "sun", "royal", "rock", "cartoon", "beach", "palm", "skyscraper", "graffiti", "spider", "butterfly", "kiss", "kid", "spaceship", "robot", "motorcycle", "blonde", "malta", "los angeles", "bike", "perfect-body", "model", "drummer", "supercar", "4k", "HD", "paint"]; //curated list of categories
    //const categories = ["winter", "autumn", "snow", "business", "management", "universe", "eye" ]; //extra categories

    //const photoTypes = ["random", "featured"]
    //const photoTypeNumber = Math.floor(Math.random() * photoTypes.length);
    //const photoType = photoTypes[photoTypeNumber]; //featured photos are more cool than random ones

    const photoType = "featured";
    //const photoType = "random";

    const randomCategoryNumber = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomCategoryNumber];

    //console.log("screen.resolution: " + screen.width + 'x' + screen.height);

    //const promisedImage = fetch('https://source.unsplash.com/' + photoType + '/' + screen.width + 'x' + screen.height) //no topic - much faster
    const promisedImage = fetch('https://source.unsplash.com/' + photoType + '/' + screen.width + 'x' + screen.height + '?' + randomCategory) //include specific search keywords
    //eg. https://source.unsplash.com/featured/1920x1080?drummer
        .then(response => response)
        .then((imageObj) => {
            //console.log('in async');
            return imageObj;
        }).catch(() => {
            error();
        });

    /*var propValue;
    for (var propName in imageObj) {
    propValue = imageObj[propName]
    console.log(propName, ":", propValue);
    } */

    /*ALTERNATIVE 1 (ORIGINAL)
    var image = new Image();
    var photoURL = imageObj.url;
    //console.log("photoURL: " + photoURL);
    image.onload = function () {
    dom.style.backgroundImage = `url(${photoURL})`;
    };
    image.src = photoURL;
     */

    //ALTERNATIVE 2
    (async function load() {
        let photoObj = await promisedImage;
        //console.log("onload");
        var photoURL = photoObj.url;
        //console.log("photoURL: " + photoURL);

        //START OF ONLOAD
        var img = new Image()
        img.onload = function () {
            dom.style.backgroundImage = `url(${photoURL})`;
        };
        img.src = photoURL;
        //END OF ONLOAD

        //dom.style.backgroundImage = 'url(' + photoURL + ')';
    })();

    function error() {
        let dom = document.getElementById("bgimg");
        dom.style.backgroundColor = 'WhiteSmoke';
    }

})();

(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        let time = h + ":" + m;
        document.getElementById('time').innerHTML = time;
        setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();

class Init {
    constructor() {
        this.dateDetails = null;
        this.weatherDetails = null;
    }
}

class TabAction extends Init {
    constructor(props) {
        super(props);
    }
    setDateDetails() {
        this.dateDetails = getdateDetails();
    }
}

let tab = new TabAction;
tab.setDateDetails();
insertinDom();

function insertinDom() {
    document.getElementById('date').innerHTML = `${tab.dateDetails.day}, ${tab.dateDetails.month} ${tab.dateDetails.date}`;
    document.getElementById('weather').innerHTML = '<br>'; //create space for weather
}

function getdateDetails() {
    var today = new Date();
    var day = today.getDay();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var dL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        day: dL[day],
        month: mL[mm],
        date: dd,
        year: yyyy
    }
}

//____________________________________________________________________________

//WEATHER & QUOTES

var now = new Date();
//console.log("time now: " + now.getTime());

/* lat-long alternative
$.get("https://api.ipify.org?format=jsonp", function (response) {
console.log(response); //{ip: "<ip>"}
var ip = response.ip;
//console.log(ip); //<ip>

//$.get('https://ipapi.co/' + ip + '/latlong/', function (response) {
//var latlong = response.split(',');
//console.log(latlong);
//$.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latlong[0] + '&lon=' + latlong[1] + '&appid=7e4dd03efbd4c382e324241cd5ab52ec' + '&units=metric', function (response) {
}, "jsonp");
 */

//Weather (updated each 10 minutes)
if (typeof (Storage) !== "undefined") {
    var expiry = localStorage.getItem("expiry");
    //console.log("previous city expiry time: " + expiry);
    //console.log("Web Storage support - OK");
    localStorage.setItem("now", now.getTime());
    if (now.getTime() < expiry) {
        // Retrieving values from local storage and assign to variables
        var feelTemp = localStorage.getItem("feelTemp");
        var weatherDescription = localStorage.getItem("weatherDescription");
        document.getElementById('weather').innerHTML = `${feelTemp}°C, ${weatherDescription}`;
    } else { //local storage expired, get updated city
        //console.log("previous city expired. Requesting new one");
        $.get('https://ipapi.co/json', function (response) {
            //console.log(response);
            var city = response.city;
            // Store value

            localStorage.setItem("city", city);
            //console.log(city);
            const ttl = 10 * 60 * 1000; // 10 minutes to live (in milliseconds)
            var expiry = now.getTime() + ttl;
            //console.log(expiry);
            localStorage.setItem("expiry", expiry);
            $.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7e4dd03efbd4c382e324241cd5ab52ec' + '&units=metric', function (response) {
                //console.log(response);
                var feelTemp = Math.round(response.main.feels_like);
                //console.log("feelTemp: " + feelTemp);
                localStorage.setItem("feelTemp", feelTemp);
                var weatherDescription = response.weather[0].description;
                //console.log(weatherDescription);
                localStorage.setItem("weatherDescription", weatherDescription);
                //var humidity = response.main.humidity;
                //console.log(humidity);
                document.getElementById('weather').innerHTML = `${feelTemp}°C, ${weatherDescription}`;
            })
            //.done(function () {
            //    alert("second success");
            //})
            //.fail(function () {
            //    alert("error");
            //})
            //.always(function () {
            //    alert("finished");
            //});
        })
    }

    //____________________________________________________________________________

    /**/

    //Quote of the day

    var quoteExpiry = localStorage.getItem("quoteExpiry");
    //console.log("previous quote expiry time: " + quoteExpiry);
    //console.log("Web Storage support - OK");
    if (now.getTime() < quoteExpiry) {
        // Retrieve value from local storage and assign to variable
        //localStorage.setItem("quote", "to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be to be or not to be "); //simulate local storage (to be commented in prod)
        //localStorage.setItem("author", "Fusion"); //simulate local storage (to be commented in prod)
        //console.log("Using quote from cached variable in local storage");
        var quote = localStorage.getItem("quote");
        var author = localStorage.getItem("author");
        document.getElementById('quote').innerHTML = `“${quote}”... <br> – ${author}`;
    } else { //local storage expired, get updated quote
        const categories = ["courage", "creativity", "character", "failure", "famous-quotes", "freedom", "future", "gratitude", "happiness", "humorous", "imagination", "inspirational", "knowledge", "leadership", "life", "motivational", "perseverance", "philosophy", "proverb", "power-quotes", "science", "society", "spirituality", "success", "technology", "time", "truth", "virtue", "wellness", "wisdom"]; // https://api.quotable.io/tags
        const random = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[random];
        //console.log(randomCategory);
        //console.log("previous quote expired. Requesting new one");
        
        //$.get('https://quotes.rest/qod?category=' + randomCategory, function (response) { // requires key
        //$.get('https://zenquotes.io/api/today' + randomCategory, function (response) { // cors error
        $.get('https://api.quotable.io/random?tags=' + randomCategory + '&maxLength=500', function (response) {
            //REF: https://github.com/lukePeavey/quotable

            console.log(response);
            //var quote = response.contents.quotes[0].quote; //quotes.rest
            var quote = response.content;
            //var author = response.contents.quotes[0].author; //quotes.rest
            var author = response.author;
            // Store value
            localStorage.setItem("quote", quote);
            localStorage.setItem("author", author);
            //const ttl = 60 * 60 * 1000; // 1hour time to live (in milliseconds) // useful for quotes.rest - allows 10 calls per hour in free plan
            const ttl = 5 * 1000; // 5 seconds for quotable.io
            var quoteExpiry = now.getTime() + ttl;
            //console.log(quoteExpiry);
            localStorage.setItem("quoteExpiry", quoteExpiry);
            document.getElementById('quote').innerHTML = `“${quote}”... <br> – ${author}`;
        })
            //.done(function () {
            //    alert("second success");
            //})
            .fail(function () {
                const quote = "Understand the past, question the present, prepare for the future";
                const author = "Fusionneur";
                document.getElementById('quote').innerHTML = `“${quote}”... <br> – ${author}`;
            })
        //.always(function () {
        //    alert("finished");
        //});


    }

} else {
    console.error("No Web Storage support");
}

//____________________________________________________________________________


/*REF:
// $. is an alias for jQuery

//fetch image
https://javascript.info/fetch

//contentySecurityPolicy (manifest)
https://developer.chrome.com/extensions/contentSecurityPolicy
https://stackoverflow.com/questions/34950009/chrome-extension-refused-to-load-the-script-because-it-violates-the-following-c

//libraries
https://developers.google.com/speed/libraries
https://jquery.com/download/

//get IP
https://www.ipify.org/ //use https://api.ipify.org?format=jsonp
https://stackoverflow.com/questions/2067472/what-is-jsonp-and-why-was-it-created
/*if used add this snippet in manifest
,
"content_scripts": [{
"matches": [
"https://api.ipify.org/*"
],
"js": ["jquery-3.5.1.min.js"]
}
],
"content_security_policy": "script-src 'self' https://api.ipify.org; object-src 'self'"
 */

/*
//location by ip
https://ipapi.co/<ip>/latlong/
https://ipinfo.io/ //not used (requires api key), but gives ip, city, country

//weather by lat/lon
https://api.openweathermap.org/data/2.5/weather?lat=44&lon=26&appid=<apiId>
https://home.openweathermap.org/api_keys
//

//quotes
//https://quotes.rest/

//https://api.jquery.com/jQuery.get/


//image
https://source.unsplash.com/
*/
