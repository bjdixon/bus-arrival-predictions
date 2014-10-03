'use strict';

predictionsApp.controller('PredictionsController',
    function PredictionsController($scope, $http) {
        $scope.message = 'hello world';
        $scope.agencies = {};

        $http.get('http://localhost:3000/agencies') 
            .success(function(data) { 
                $scope.agencies = data; 
                console.log($scope.agencies); 
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);
