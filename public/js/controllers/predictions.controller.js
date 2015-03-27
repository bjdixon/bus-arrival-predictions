(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('PredictionsController', PredictionsController);

    PredictionsController.$inject = ['$routeParams', 'fetchRestbusDataFactory'];

    function PredictionsController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.data_loading = true;
        vm.route_id = $routeParams.route_id;
        vm.route_title = '';
        vm.stop_id = $routeParams.stop_id;
        vm.stop_title = '';

        activate();

        function activate() {
            fetchRestbusDataFactory.get_predictions(vm.agency_id, vm.route_id, vm.stop_id)
                .then(function (data) {
                    vm.data_loading = false;
                    vm.predictions_available = false;
                    if (data !== undefined) {
                        vm.predictions = data.predictions;
                        vm.predictions_available = true;
                        vm.route_title = data.route_title;
                        vm.stop_title = data.stop_title;
                    }
                });
        }
    }

}());

