$(document).ready(function () {
// search button function
    $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    $("#search-value").val("");
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
});

// keyboard 'enter' button event
    $("#search-button").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            weatherFunction(searchTerm);
            weatherForecast(searchTerm);
        }
});
   
    // Search Storage and history row
    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        weatherFunction(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        createRow(history[i]);
    }

    function createRow(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".history").append(listItem);
    }
    // list item click functionality listener
    $(".history").on("click", "li", function () {
        weatherFunction($(this).text());
        weatherForecast($(this).text());
});

    function weatherFunction(searchTerm) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=9e54fcc6a6103cd924ea373317c87301&units=imperial",
            
        }).then(function (data) {
            if (history.indexOf(searchTerm) === -1) {
                history.push(searchTerm);
                localStorage.setItem("history", JSON.stringify(history));
                createRow(searchTerm);
            }
            $("#today").empty();

            var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

    // Todays weather output 
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=9e54fcc6a6103cd924ea373317c87301&lat=" + lat + "&lon=" + lon,


            }).then(function (response) {
                console.log(response);

// UV Index block
                var uvColor;
                var uvResponse = response.value;
                var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
                var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);


                if (uvResponse < 3) {
                    btn.addClass("btn-success");
                } else if (uvResponse < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                cardBody.append(uvIndex);
                $("#today .card-body").append(uvIndex.append(btn));

            });

            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
            console.log(data);
});