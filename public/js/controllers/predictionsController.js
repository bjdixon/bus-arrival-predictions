'use strict';

predictionsApp.controller('menuController', 
    function menuController($scope, $location) {
        $scope.is_active = function (path_root) {
            return path_root === $location.path().substr(1, path_root.length);
        };
    }
);

predictionsApp.controller('agenciesController',
    function agenciesController($scope, $http) {
        $scope.agencies = {};

        $http.get('http://localhost:3000/agencies') 
            .success(function(data) { 
                $scope.agencies = data; 
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);

predictionsApp.controller('routesController',
    function routesController($scope, $http, $routeParams) {
        $scope.routes = {};
        $scope.agency_id = $routeParams.agency_id;

        $http.get('http://localhost:3000/agencies/' + $scope.agency_id + '/routes')
            .success(function(data) {
                $scope.routes = data;
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);

predictionsApp.controller('stopsController',
    function stopsController($scope, $http, $routeParams) {
        $scope.stops = {};
        $scope.agency_id = $routeParams.agency_id;
        $scope.route_id = $routeParams.route_id;

        $http.get('http://localhost:3000/agencies/' + $scope.agency_id + '/routes/' + $scope.route_id)
            .success(function(data) {
                $scope.stops = data.stops;
                // TODO
                // get data.directions
                // if data.stops.stop.id in data.directions.direction.id
                // add direction.title to data.stops.stop
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);

predictionsApp.controller('predictionsController',
    function predictionsController($scope, $http, $routeParams) {
        $scope.predictions = {};
        $scope.agency_id = $routeParams.agency_id;
        $scope.route_id = $routeParams.route_id;
        $scope.stop_id = $routeParams.stop_id;

        $http.get('http://localhost:3000/agencies/' + $scope.agency_id + '/routes/' + $scope.route_id + '/stops/' + $scope.stop_id + '/predictions')
            .success(function(data) {
                $scope.predictions_available = false;
                $scope.predictions = (data[0].values != undefined) ? data[0].values : [];
                if ($scope.predictions.length > 0) {
                    $scope.predictions_available = true;
                }
                console.log($scope.predictions);
            })
            .error(function(data) {
                console.log('ERROR: ' + data);
            });
    }
);
predictionsApp.controller('aboutController', 
    function aboutController($scope, $http, $routeParams) {
        // in case I want this later
    }
);

predictionsApp.controller('contactController',
    function contactController($scope, $http, $routeParams) {
        // in case I want this later
    }
);


predictionsApp.controller('homepageController',
    function homepageController($scope, $http, $routeParams) {
        // in case I want this later
    }
);
