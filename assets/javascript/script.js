$(document).ready(function () {

    // var queryurl = "https://beermapping.com/webservice/loccity/48cae02b055a1f73e25b8d2c344bff76/philadelphia" + "&s=json "
    // // var locquery;
    // // var loccity;
    // // var loc

    // $.ajax({
    //     url: queryurl,
    //     method: "Get"
    // }).then(function (response) {
    //     console.log(response[0]);

    //     $("#bar-name-display").text(response[0].name);
    //     $("#bar-address-display").text("Address: " + response[0].street);
    //     $("#bar-rating-display").text("Rating: " + response[0].overall);
    //     var map = $("<iframe class='embed-responsive-item' id='map'>");
    //     $(map).attr("src", response[0].proxylink);
    //     // $(map).attr("height", "650px").attr("width", "523px");
    //     $(".mapHere").empty().append(map);
    // });

    // $.ajax({
    //     url: queryurl,
    //     method: "Get"
    // }).then(function (response) {
    //     console.log(response[0]);

    // $("#submit").on("click", function () {

    //     var location = $("#inputLocation").val()
    //     console.log("This is the location: " + location)
    //     var queryurl = "http://beermapping.com/webservice/loccity/48cae02b055a1f73e25b8d2c344bff76/" + location + "&s=json "

    //     $.ajax({
    //         url: queryurl,
    //         method: "Get"
    //     }).then(function (response) {
    //         console.log(response);
    //     });
    // });

    // NEARBY SEARCH (Requires lat and long)=====


    // AIzaSyAYaTv-hKyNAp7NAQ1mKdP_F5-vpkfouoU

    // var queryurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAYaTv-hKyNAp7NAQ1mKdP_F5-vpkfouoU"

    // $.ajax({
    //     url: queryurl,
    //     method: "Get"
    // }).then(function (response) {

    //     console.log(response);

    // });

    // ==========================================

    // TEXT SEARCH (Requires lat and long)=====

    var searchQuery = "query=" + "fishtown, philadelphia"
    var key = "&key=AIzaSyAYaTv-hKyNAp7NAQ1mKdP_F5-vpkfouoU"
    var proxyURL = "https://cors-anywhere.herokuapp.com/"
    var targetURL1 = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + searchQuery + key
    var queryURL1 = proxyURL + targetURL1

    $.ajax({
        url: queryURL1,
        method: "Get",
    }).then(function (response) {

        console.log(response.results[0].formatted_address);
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);

        var lat = response.results[0].geometry.location.lat;
        var lng = response.results[0].geometry.location.lng;
        var location = "location=" + lat + "," + lng
        var targetURL2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + "&rankby=distance&type=bar" + key;
        var queryURL2 = proxyURL + targetURL2;

        $.ajax({
            url: queryURL2,
            method: "Get",
        }).then(function (response2) {

            console.log(targetURL2)

            for (var i = 0; i < response2.results.length; i++) { 
                console.log(response2.results[i].name)
            }
            console.log(response2.results)
        

        });

    });


    // ==========================================

});