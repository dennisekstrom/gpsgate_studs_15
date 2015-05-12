var TAG = 'op6tag';
var PASSWORD = 'pass';
var MAP;

function start() {

    MAP = initializeMap();

    getUsersInTag(TAG);

    $('#submitButton').click(function() {
        reportPosition($('#name').val(), $('#message').val(), TAG);
    });
}

function reportPosition(strUsername, strMessage, strTag) {

    console.log(strUsername);
    console.log(strMessage);

    navigator.geolocation.getCurrentPosition(function(pos) {

        console.log('Coords: ' + pos.coords.longitude + ', ' + pos.coords.longitude);

        return GpsGate.Server.Hackathon.ReportPosition(strUsername, 
                                                       PASSWORD, 
                                                       strMessage, 
                                                       strTag, 
                                                       pos.coords.longitude, 
                                                       pos.coords.latitude).addCallbacks(
            function(result) {
                // Do something with the result
                console.log(result);
            },
            function(err) {
                // An error occured
                console.error(err);
            }
        );
    }, function(err) {
        console.log(err);
    });
}

function addUserMarkers(users) {
    console.log('apa');
    for (user in users) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(user.position.lat, user.position.lng),
            title:users.username
        });

        // To add the marker to the map, call setMap();
        marker.setMap(MAP);

        console.log(marker);
    }
}

function getUsersInTag(tag) {               
    return GpsGate.Server.Hackathon.GetUsersInTag(tag).addCallbacks(
        function(result) {
            // Do something with the result
            console.log(result);
            addUserMarkers(results);
        },
        function(err) {
            // An error occured
            console.error(err);
        });
}

function initializeMap() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(59.19, 18.03)
    };
    return new google.maps.Map(document.getElementById('googleMap'), mapOptions);
}