(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('MenuController', MenuController)
        .controller('AgenciesController', AgenciesController)
        .controller('RoutesController', RoutesController)
        .controller('StopsController', StopsController)
        .controller('PredictionsController', PredictionsController)
        .controller('HomepageController', HomepageController)
        .controller('AboutController', AboutController)
        .controller('ContactController', ContactController);

    function MenuController($scope, $location) {
        $scope.is_active = function (path_root) {
            return path_root === $location.path().substr(1, path_root.length);
        };
    }

    function AgenciesController($scope, fetchRestbusDataFactory) {
        $scope.data_loading = true;
        fetchRestbusDataFactory.get_agencies()
            .then(function (data) {
                $scope.agencies = data;
                $scope.data_loading = false;
            });
    }

    function RoutesController($scope, $routeParams, fetchRestbusDataFactory) {
        $scope.data_loading = true;
        $scope.agency_id = $routeParams.agency_id;
        fetchRestbusDataFactory.get_routes($routeParams.agency_id)
            .then(function (data) {
                $scope.routes = data;
                $scope.data_loading = false;
            });
    }

    function StopsController($scope, $routeParams, fetchRestbusDataFactory) {
        $scope.agency_id = $routeParams.agency_id;
        $scope.route_id = $routeParams.route_id;
        $scope.route_title = '';
        $scope.data_loading = true;
        fetchRestbusDataFactory.get_stops($routeParams.agency_id, $routeParams.route_id)
            .then(function (data) {
                $scope.stops = data.stops;
                $scope.route_title = data.title;
                $scope.data_loading = false;
            });
    }

    function PredictionsController($scope, $routeParams, fetchRestbusDataFactory) {
        $scope.agency_id = $routeParams.agency_id;
        $scope.route_id = $routeParams.route_id;
        $scope.route_title = '';
        $scope.stop_id = $routeParams.stop_id;
        $scope.stop_title = '';
        $scope.data_loading = true;
        fetchRestbusDataFactory.get_predictions($routeParams.agency_id, $routeParams.route_id, $routeParams.stop_id)
            .then(function (data) {
                if (data !== undefined) {
                    $scope.predictions = data.predictions;
                    $scope.predictions_available = true;
                    $scope.route_title = data.route_title;
                    $scope.stop_title = data.stop_title;
                    $scope.data_loading = false;
                } else {
                    $scope.predictions_available = false;
                    $scope.data_loading = false;
                }
            });
    }

    function HomepageController($scope, $cookies) {
        $scope.last_search = angular.fromJson($cookies.last_search) || false;
    }

    function AboutController() {
        // in case I want this later
        return undefined;
    }

    function ContactController() {
        // in case I want this later
        return undefined;
    }

}());

