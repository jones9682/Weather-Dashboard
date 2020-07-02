var APIKey = "940e51422e694402b09f44884b4904e9";

$("#subBtn").on("click", function () {
  /*
    1. use jquery to grab value of input, which is the city, and set that equal to a variable
    2. use that variable to make ajax call to get weather results
    3. in success callback function of ajax call, use jqeury to create more html elements.
  */
  var cityInput = $("#city").val();
  console.log(cityInput);

  // URL needed to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    cityInput +
    "&appid=" +
    APIKey;
  // console.log(queryURL);

  // AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // store all of the retrieved data inside of an object
    .then(function (response) {

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      // Transfer content to HTML
      $("#city-name").text(response.name);
      $("#tempF").text("Current Temp: " + tempF.toFixed(2) + " °F");
      $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $("#humidity").text("Humidity: " + response.main.humidity + " %");

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Current Temp: " + tempF);
      getUvIndex(response.coord.lat, response.coord.lon);
      console.log(response);
    });
});
function getUvIndex(lat, long) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    $("#uvIndex").text("UV Index: " + response.current.uvi);

  });
}
