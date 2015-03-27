(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('HomepageController', HomepageController);

    HomepageController.$inject = ['$cookies'];

    function HomepageController($cookies) {
        var vm = this;
        vm.last_search = angular.fromJson($cookies.last_search) || false;
    }

}());

