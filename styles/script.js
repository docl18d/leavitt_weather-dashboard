$(function () {
    
    // search button function
    $("search-button").on("click", function () {
        var searchTerm = $("#search-value").val();
        $("#search-value").val("");
        weatherFunction(searchTerm);
        weatherFunction(searchTerm);

        
    });

    // keyboard enter button event
    $("search-button").keypress(function (e) { 
        var keyCode = (e.keyCode ? e.keycode : e.which);
        if (keyCode === 13) {
            weatherFunction(searchTerm);
            weatherFunction(searchTerm);
        }
    });
    console.log(searchTerm);





})