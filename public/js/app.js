(function () {
    'use strict';
    var predictionsApp = angular.module('predictionsApp', ['ngRoute', 'ngCookies']);

    // constants
    predictionsApp.constant("appConstants", {
        "url": "//localhost",
        "api_url": "//localhost:3000"
    });

    // route configuration
    predictionsApp.config(function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/templates/homepage.html',
                controller : 'homepageController'
            })
            .when('/agencies', {
                templateUrl : '/templates/agencies.html',
                controller : 'agenciesController'
            })
            .when('/agency/:agency_id', {
                templateUrl : '/templates/routes.html',
                controller : 'routesController'
            })
            .when('/agency/:agency_id/:route_id', {
                templateUrl : '/templates/stops.html',
                controller : 'stopsController'
            })
            .when('/agency/:agency_id/:route_id/:stop_id', {
                templateUrl : '/templates/predictions.html',
                controller : 'predictionsController'
            })
            .when('/about', {
                templateUrl : '/templates/about.html',
                controller : 'aboutController'
            })
            .when('/contact', {
                templateUrl : '/templates/contact.html',
                controller : 'contactController'
            });
        $locationProvider.html5Mode(true);
    });
}());
