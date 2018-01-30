angular.module('mashup',[]).controller('recipeSpeech', function($scope, $http)
{
    $scope.recipeSearch = function()
    {
        var recipeBox = document.getElementById("txt_rec");
        var url = 'https://api.edamam.com/api/nutrition-data?app_id=<id>&app_key=<key>&ingr=1'

        var recipe = recipeBox.value

        url += "" + recipe;

        if(recipe != "")
        {
            $http.get(url).success(function(data){
                var calories = data.calories;
                var weight = data.totalWeight

                $scope.recipe = {
                    html: "Calories: " + calories + "</br>"
                    + "Weight: " + weight + "</br>"
                }
            })
        }
    }

    $scope.textSpeech = function()
    {
        var recipeBox = document.getElementById("txt_rec");
        var url = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?' +
            'username=<username>&password=<password>&accept=audio/wav&text='
        var recipe = recipeBox.value

        url += "" + recipe;

        if(recipe != "")
        {
            $scope.speech = {
                html: "<audio controls>" +
                "  <source src=" + url + " type=\"audio/wav\">" +
                "</audio>"
            }
        }
    }
});