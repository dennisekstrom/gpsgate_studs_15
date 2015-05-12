var TAG = 'op6tag';
var PASSWORD = 'pass';
var MAP;
var STATUS = 'unk';

function start() {

    MAP = initializeMap();

    getUsersInTag(TAG);

    $('#swagButton').click(function() {
        STATUS = 'swa';
    });

    $('#sadButton').click(function() {
        STATUS = 'sad';
    });

    $('#submitButton').click(function() {
        var msg = STATUS + ':' + $('#message').val();
        reportPosition($('#name').val(), msg, TAG);
    });
}

function reportPosition(strUsername, strMessage, strTag) {

    // console.log(strUsername);
    // console.log(strMessage);

    navigator.geolocation.getCurrentPosition(function(pos) {

        // console.log('Coords: ' + pos.coords.longitude + ', ' + pos.coords.longitude);

        return GpsGate.Server.Hackathon.ReportPosition(strUsername, 
                                                       PASSWORD, 
                                                       strMessage, 
                                                       strTag, 
                                                       pos.coords.longitude, 
                                                       pos.coords.latitude).addCallbacks(
            function(result) {
                // Do something with the result
                // console.log(result);
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
    $.each(users, function(i, user) {

        var spl = user.message.split(':', 1);
        var sta = spl[0];
        var msg = spl[1];

        var icon;
        switch (sta) {
            case "swa":
                icon = 'swag1.png';
                break;
            case "sad":
                icon = 'swag2.png';
                break;
            default:
                icon = 'question.png';
                break;
        }

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(user.position.lat, user.position.lng),
            // title:user.username,
            icon: icon
        });

        // To add the marker to the map, call setMap();
        marker.setMap(MAP);

        var infowindow = new google.maps.InfoWindow({
            content: "<span>" + user.username + "</span>"
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(MAP, marker);
        });
    });
}

function getUsersInTag(tag) {               
    return GpsGate.Server.Hackathon.GetUsersInTag(tag).addCallbacks(
        function(result) {
            // Do something with the result
            console.log(result);
            addUserMarkers(result);
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
