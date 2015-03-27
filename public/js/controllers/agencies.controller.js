(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('AgenciesController', AgenciesController);

    AgenciesController.$inject = ['fetchRestbusDataFactory'];

    function AgenciesController(fetchRestbusDataFactory) {
        var vm = this;
        vm.data_loading = true;

        activate();

        function activate() {
            return fetchRestbusDataFactory.get_agencies()
                .then(function (data) {
                    vm.agencies = data;
                    vm.data_loading = false;
                });
        }
    }

}());

