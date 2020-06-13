$("h1").css("color", "red");

$(document).keypress(function (event) {
    let key = event.key;
    $("h1").text(key);
});