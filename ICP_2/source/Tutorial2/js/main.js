angular.module('findweather',[]).controller('findweathercontrol', function($scope, $http)
{
    $scope.getWeather = function()
    {
        var stateBox = document.getElementById("txt_state");
        var cityBox= document.getElementById("txt_city");
        var url = 'http://api.wunderground.com/api/4bbbc25f4f5946dd/conditions/q/'

        var state = stateBox.value
        var city = cityBox.value

        url += state + "/" + city + ".json";

        if(state != "" || city != "")
        {
            $http.get(url).success(function(data){
                temp = data.current_observation.temp_f;
                tempCel = data.current_observation.temp_c;
                winddir = data.current_observation.wind_dir;
                windspd = data.current_observation.wind_mph;
                pressure = data.current_observation.pressure_mb;
                humid = data.current_observation.relative_humidity;
                icon = data.current_observation.icon_url;
                weather = data.current_observation.weather;
                $scope.weatherValue = {
                    html: "Current weather: " + weather + "</br>"
                    + "Temperature: " + temp + "&deg; F, " + tempCel + "&deg; C</br>"
                    + "Wind: " + winddir + " wind at " + windspd + " mph</br>"
                    + "Pressure: " + pressure + " millibars"
                }
                $scope.weatherIcon = {
                    html: "<img src='" + icon + "'/>"
                }
            })
        }
    }
});
