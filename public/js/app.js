'use strict';

var predictionsApp = angular.module('predictionsApp', ['ngRoute']);

// route configuration
predictionsApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
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
    $locationProvider.html5Mode(true);
});

