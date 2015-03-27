(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('RoutesController', RoutesController);

    RoutesController.$inject = ['$routeParams', 'fetchRestbusDataFactory'];

    function RoutesController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.data_loading = true;

        activate();

        function activate() {
            return fetchRestbusDataFactory.get_routes(vm.agency_id)
                .then(function (data) {
                    vm.data_loading = false;
                    vm.routes = data;
                });
        }
    }

}());

