(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$location'];

    function MenuController($location) {
        var vm = this;
        vm.is_active = function (path_root) {
            return path_root === $location.path().substr(1, path_root.length);
        };
    }

}());

