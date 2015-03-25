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
                    controller : 'HomepageController'
                })
                .when('/agencies', {
                    templateUrl : '/templates/agencies.html',
                    controller : 'AgenciesController'
                })
                .when('/agency/:agency_id', {
                    templateUrl : '/templates/routes.html',
                    controller : 'RoutesController'
                })
                .when('/agency/:agency_id/:route_id', {
                    templateUrl : '/templates/stops.html',
                    controller : 'StopsController'
                })
                .when('/agency/:agency_id/:route_id/:stop_id', {
                    templateUrl : '/templates/predictions.html',
                    controller : 'PredictionsController'
                })
                .when('/about', {
                    templateUrl : '/templates/about.html',
                    controller : 'AboutController'
                })
                .when('/contact', {
                    templateUrl : '/templates/contact.html',
                    controller : 'ContactController'
                });
            $locationProvider.html5Mode(true);
        });
}());
