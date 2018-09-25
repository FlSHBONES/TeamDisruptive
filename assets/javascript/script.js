$(document).ready(function () {

    // ==========================================

    // AIzaSyAYaTv-hKyNAp7NAQ1mKdP_F5-vpkfouoU

    // ==========================================

    var destination;
    var placeID;

    $("#directions-btn").on("click", function () {
        window.open("https://www.google.com/maps/dir/?api=1&destination=" + destination + "+Philadelphia+PA" + "&destination_place_id=" + placeID);
    });

    $(".splashPage").show()
    $(".locationPage").show()
    $("#displayPage").hide()

    $("#loc-submit").on("click", function () {
        console.log("hello")
        console.log($("#inputLocation").val().trim())

        $(".splashPage").hide()
        $(".locationPage").hide()
        $("#displayPage").show()

        // ============ TEXT SEARCH =================
        // finds the latitude and longitude of the location
        // entered into the search bar

        var location = $("#inputLocation").val().trim()
        // var location = "south philadelphia"
        var searchQuery = "query=" + location + ", philadelphia"
        var key = "&key=AIzaSyAYaTv-hKyNAp7NAQ1mKdP_F5-vpkfouoU"
        var proxyURL = "https://vast-shelf-62764.herokuapp.com/"
        var targetURL1 = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + searchQuery + key
        var queryURL1 = proxyURL + targetURL1

        $.ajax({
            url: queryURL1,
            method: "Get",
        }).then(function (response) {

            console.log(response.results[0].formatted_address);

            // ================= NEARBY SEARCH ================
            // uses the latitude and longitude to find local bars
            // and display them on the page

            var lat = response.results[0].geometry.location.lat;
            var lng = response.results[0].geometry.location.lng;
            var location = "location=" + lat + "," + lng
            var targetURL2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + "&radius=800&type=bar" + key;
            var queryURL2 = proxyURL + targetURL2;

            $.ajax({
                url: queryURL2,
                method: "Get",
            }).then(function (response2) {

                console.log(response2.results)

                function loop() {
                    var listItemDiv = $("<div>");
                    listItemDiv.attr("class", "col-4 text-center p-0 list-item-div bar-btn");
                    listItemDiv.attr("id", "li" + i);
                    listItemDiv.attr("name", response2.results[i].name);
                    listItemDiv.attr("rating", response2.results[i].rating);
                    listItemDiv.attr("addr", response2.results[i].vicinity.split(", Phi").shift());
                    listItemDiv.attr("place-id", response2.results[i].place_id);
                    listItemDiv.attr("lat", response2.results[i].geometry.location.lat)
                    listItemDiv.attr("lng", response2.results[i].geometry.location.lng)
                    var listItem = $("<p>");
                    $("#mapHere").append(listItemDiv);
                    $(listItemDiv).append(listItem);
                    var str = response2.results[i].name + "<br>" + response2.results[i].vicinity.split(", Phi").shift();
                    $(listItem).html(str);
                };

                if (response2.results.length >= 10) {

                    for (var i = 0; i < 10; i++) {
                        loop();
                    }
                } else {
                    for (var i = 0; i < response2.results.length; i++) {
                        loop();
                    };
                }

                $(document.body).on("click", ".bar-btn", function () {

                    $("#bar-name").text($(this).attr("name"));
                    $("#bar-rating").text("Rating: " + $(this).attr("rating"));
                    $("#bar-addr").text($(this).attr("addr"));
                    destination = $(this).attr("addr");
                    placeID = $(this).attr("place-id");

                    function showmethecrime() {

                        // TDO Latitude and longitude data will be equal to lat and lng output by Dalands API query.  This needs to A. go into his script and B. pull the lat and lng of the clicked restaurant. As shown below, if event handler cant be written to get bar Lat and Lng, we do a mile of the searched location.
                        // var lat = 0;
                        // var lng = 0;
                        // Querying the phl api for incident data.
                        queryURL3 = "https://phl.carto.com/api/v2/sql?q=SELECT * FROM incidents_part1_part2 WHERE ST_DWithin(the_geom::geography,ST_GeographyFromText('POINT(" + lng + " " + lat + ")'), 402)";

                        $.ajax({
                            url: queryURL3,
                            method: "GET"
                        }).then(function (response) {

                            // Printing the entire object to console
                            console.log(response);
                            console.log(response.rows);
                            console.log(response.rows.length);

                            var end = response.rows.length - 1;
                            for (let i = end; i >= end - 10; i--) {
                                console.log(response.rows[i]);
                                //Crime 1 (most recent)
                                var crime1type = response.rows[i].text_general_code;
                                var crime1location = response.rows[i].location_block;
                                var crime1date = response.rows[i].dispatch_date;
                                var crime1time = response.rows[i].dispatch_time;
                                //Crime 2-----------------------------------------------------
                                var crime2type = response.rows[i - 1].text_general_code;
                                var crime2location = response.rows[i - 1].location_block;
                                var crime2date = response.rows[i - 1].dispatch_date;
                                var crime2time = response.rows[i - 1].dispatch_time;
                                //Crime 3-----------------------------------------------------
                                var crime3type = response.rows[i - 2].text_general_code;
                                var crime3location = response.rows[i - 2].location_block;
                                var crime3date = response.rows[i - 2].dispatch_date;
                                var crime3time = response.rows[i - 2].dispatch_time;
                                //Crime 4-----------------------------------------------------
                                var crime4type = response.rows[i - 3].text_general_code;
                                var crime4location = response.rows[i - 3].location_block;
                                var crime4date = response.rows[i - 3].dispatch_date;
                                var crime4time = response.rows[i - 3].dispatch_time;
                                //Crime 5-----------------------------------------------------
                                var crime5type = response.rows[i - 4].text_general_code;
                                var crime5location = response.rows[i - 4].location_block;
                                var crime5date = response.rows[i - 4].dispatch_date;
                                var crime5time = response.rows[i - 4].dispatch_time;
                                //Crime 6-----------------------------------------------------
                                var crime6type = response.rows[i - 5].text_general_code;
                                var crime6location = response.rows[i - 5].location_block;
                                var crime6date = response.rows[i - 5].dispatch_date;
                                var crime6time = response.rows[i - 5].dispatch_time;
                                //Crime 7-----------------------------------------------------
                                var crime7type = response.rows[i - 6].text_general_code;
                                var crime7location = response.rows[i - 6].location_block;
                                var crime7date = response.rows[i - 6].dispatch_date;
                                var crime7time = response.rows[i - 6].dispatch_time;
                                //Crime 8-----------------------------------------------------
                                var crime8type = response.rows[i - 7].text_general_code;
                                var crime8location = response.rows[i - 7].location_block;
                                var crime8date = response.rows[i - 7].dispatch_date;
                                var crime8time = response.rows[i - 7].dispatch_time;


                            }
                            console.log(crime1type);
                            console.log(crime1location);
                            console.log(crime1date);
                            console.log(crime1time);
                            console.log("--------");
                            console.log(crime2type);
                            console.log(crime2location);
                            console.log(crime2date);
                            console.log(crime2time);
                            console.log("--------");
                            console.log(crime3type);
                            console.log(crime3location);
                            console.log(crime3date);
                            console.log(crime3time);
                            console.log("--------");
                            console.log(crime4type);
                            console.log(crime4location);
                            console.log(crime4date);
                            console.log(crime4time);
                            console.log("--------");
                            console.log(crime5type);
                            console.log(crime5location);
                            console.log(crime5date);
                            console.log(crime5time);
                            console.log("--------");
                            console.log(crime6type);
                            console.log(crime6location);
                            console.log(crime6date);
                            console.log(crime6time);
                            console.log("--------");
                            console.log(crime7type);
                            console.log(crime7location);
                            console.log(crime7date);
                            console.log(crime7time);
                            console.log("--------");
                            console.log(crime8type);
                            console.log(crime8location);
                            console.log(crime8date);
                            console.log(crime8time);




                            // Empty the contents of the crime div on new lcoations search to replace with new crime data.
                            $("#crimediv").empty();
                            var newRow1 = $("<tr>").append(
                                $("<td>").text(crime1type),
                                $("<td>").text(crime1date),
                                $("<td>").text(crime1time),
                                $("<td>").text(crime1location),

                            );

                            var newRow2 = $("<tr>").append(
                                $("<td>").text(crime2type),
                                $("<td>").text(crime2date),
                                $("<td>").text(crime2time),
                                $("<td>").text(crime2location),
                            );

                            var newRow3 = $("<tr>").append(
                                $("<td>").text(crime3type),
                                $("<td>").text(crime3date),
                                $("<td>").text(crime3time),
                                $("<td>").text(crime3location),
                            );

                            var newRow4 = $("<tr>").append(
                                $("<td>").text(crime4type),
                                $("<td>").text(crime4date),
                                $("<td>").text(crime4time),
                                $("<td>").text(crime4location),
                            );

                            var newRow5 = $("<tr>").append(
                                $("<td>").text(crime4type),
                                $("<td>").text(crime4date),
                                $("<td>").text(crime4time),
                                $("<td>").text(crime4location),
                            );

                            $("#crimediv").append(newRow1);
                            $("#crimediv").append(newRow2);
                            $("#crimediv").append(newRow3);
                            $("#crimediv").append(newRow4);
                            $("#crimediv").append(newRow5);


                        });
                    }


                    //TODO Chagne the Event Handler to not be clicking the submit button, but to update whenver a new bar is clicked.  If this is too difficult, then this can just be the radius of the search location (Fishtown, etc).  I'm thining half mile or mile radius.
                    // Event handler
                    $("#loc-submit").on("click", function (event) {
                        // Preventing the button from trying to submit the form
                        event.preventDefault();


                        // Running the crime function
                        showmethecrime();
                    });

                });

            });

            // ==========================================

        });

        // ==========================================
    });

});