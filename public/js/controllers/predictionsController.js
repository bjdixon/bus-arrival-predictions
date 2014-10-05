'use strict';

predictionsApp.controller('agenciesController',
    function agenciesController($scope, $http) {
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

predictionsApp.controller('routesController',
    function routesController($scope, $http, $routeParams) {
        $scope.routes = {};
        var agency = $routeParams.agency_id;

        $http.get('http://localhost:3000/agencies/' + agency + '/routes')
            .success(function(data) {
                $scope.routes = data;
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);

