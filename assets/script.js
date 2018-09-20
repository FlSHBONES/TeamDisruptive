$(document).ready(function () {

    var queryurl = "https://beermapping.com/webservice/loccity/48cae02b055a1f73e25b8d2c344bff76/philadelphia" + "&s=json "
    // var locquery;
    // var loccity;
    // var loc

    $.ajax({
        url: queryurl,
        method: "Get"
    }).then(function (response) {
        console.log(response[0]);

        var queryurl = "https://beermapping.com/webservice/loccity/48cae02b055a1f73e25b8d2c344bff76/philadelphia" + "&s=json "
    // var locquery;
    // var loccity;
    // var loc

    $.ajax({
        url: queryurl,
        method: "Get"
    }).then(function (response) {
        console.log(response[0]);
        $("#bar-name-display").text(response[0].name);
        $("#bar-address-display").text(response[0].street);
        $("#bar-rating-display").text("Rating: "+response[0].overall);
        var map = $("<iframe id='map'>");
        $(map).attr("src", response[0].proxylink);
        $(map).attr("height", "650px").attr("width", "523px");
        $(".mapHere").empty().append(map);
    });

        $("#bar-name-display").text(response[0].name);
        $("#bar-address-display").text(response[0].street);
        $("#bar-rating-display").text("Rating: "+response[0].overall);
        var map = $("<iframe id='map'>");
        $(map).attr("src", response[0].proxylink);
        $(map).attr("height", "650px").attr("width", "523px");
        $(".mapHere").empty().append(map);
    });

});