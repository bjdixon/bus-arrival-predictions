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

    function MenuController($location) {
        var vm = this;
        vm.is_active = function (path_root) {
            return path_root === $location.path().substr(1, path_root.length);
        };
    }

    function AgenciesController(fetchRestbusDataFactory) {
        var vm = this;
        vm.data_loading = true;
        fetchRestbusDataFactory.get_agencies()
            .then(function (data) {
                vm.agencies = data;
                vm.data_loading = false;
            });
    }

    function RoutesController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.data_loading = true;
        vm.agency_id = $routeParams.agency_id;
        fetchRestbusDataFactory.get_routes($routeParams.agency_id)
            .then(function (data) {
                vm.routes = data;
                vm.data_loading = false;
            });
    }

    function StopsController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.route_id = $routeParams.route_id;
        vm.route_title = '';
        vm.data_loading = true;
        fetchRestbusDataFactory.get_stops($routeParams.agency_id, $routeParams.route_id)
            .then(function (data) {
                vm.stops = data.stops;
                vm.route_title = data.title;
                vm.data_loading = false;
            });
    }

    function PredictionsController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.route_id = $routeParams.route_id;
        vm.route_title = '';
        vm.stop_id = $routeParams.stop_id;
        vm.stop_title = '';
        vm.data_loading = true;
        fetchRestbusDataFactory.get_predictions($routeParams.agency_id, $routeParams.route_id, $routeParams.stop_id)
            .then(function (data) {
                if (data !== undefined) {
                    vm.predictions = data.predictions;
                    vm.predictions_available = true;
                    vm.route_title = data.route_title;
                    vm.stop_title = data.stop_title;
                    vm.data_loading = false;
                } else {
                    vm.predictions_available = false;
                    vm.data_loading = false;
                }
            });
    }

    function HomepageController($cookies) {
        var vm = this;
        vm.last_search = angular.fromJson($cookies.last_search) || false;
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

