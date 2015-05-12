function reportPosition(strUsername, strMessage) {

    var strPassword = 'pass';
    var strTagName = 'op6tag'

    console.log(navigator.geolocation);

    navigator.geolocation.getCurrentPosition(function(pos) {

        console.log('Coords: ' + pos.coords);


        return GpsGate.Server.Hackathon.ReportPosition(strUsername, 
                                                       strPassword, 
                                                       strMessage, 
                                                       strTagName, 
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
