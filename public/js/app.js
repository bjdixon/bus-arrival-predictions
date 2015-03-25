(function () {
    'use strict';

    angular
        .module('predictionsApp', ['ngRoute', 'ngCookies'])
        .constant("appConstants", {
            "url": "//localhost",
            "api_url": "//localhost:3000"
        })
        .config(function ($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl : '/templates/homepage.html',
                    controller : 'HomepageController',
                    controllerAs: 'vm'
                })
                .when('/agencies', {
                    templateUrl : '/templates/agencies.html',
                    controller : 'AgenciesController',
                    controllerAs: 'vm'
                })
                .when('/agency/:agency_id', {
                    templateUrl : '/templates/routes.html',
                    controller : 'RoutesController',
                    controllerAs: 'vm'
                })
                .when('/agency/:agency_id/:route_id', {
                    templateUrl : '/templates/stops.html',
                    controller : 'StopsController',
                    controllerAs: 'vm'
                })
                .when('/agency/:agency_id/:route_id/:stop_id', {
                    templateUrl : '/templates/predictions.html',
                    controller : 'PredictionsController',
                    controllerAs: 'vm'
                })
                .when('/about', {
                    templateUrl : '/templates/about.html',
                    controller : 'AboutController',
                    controllerAs: 'vm'
                })
                .when('/contact', {
                    templateUrl : '/templates/contact.html',
                    controller : 'ContactController',
                    controllerAs: 'vm'
                });
            $locationProvider.html5Mode(true);
        });
}());
