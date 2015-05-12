var TAG = 'op6tag';
var PASSWORD = 'pass';

function start() {

    $('#submitButton').click(function() {
        reportPosition($('#name').val(), $('#message').val(), TAG);
    });

    getUsersInTag(TAG);

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

function getUsersInTag(tag) {               
    return GpsGate.Server.Hackathon.GetUsersInTag(tag).addCallbacks(
        function(result) {
            // Do something with the result
            console.log(result);
        },
        function(err) {
            // An error occured
            console.error(err);
        }
    );
};