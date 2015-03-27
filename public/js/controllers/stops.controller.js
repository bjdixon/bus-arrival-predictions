(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('StopsController', StopsController);

    StopsController.$inject = ['$routeParams', 'fetchRestbusDataFactory'];

    function StopsController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.data_loading = true;
        vm.route_id = $routeParams.route_id;
        vm.route_title = '';

        activate();

        function activate() {
            fetchRestbusDataFactory.get_stops(vm.agency_id, vm.route_id)
                .then(function (data) {
                    vm.data_loading = false;
                    vm.route_title = data.title;
                    vm.stops = data.stops;
                });
        }
    }

}());

