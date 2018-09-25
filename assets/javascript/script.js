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

                });

            });

            // ==========================================

        });

        // ==========================================
    });

});