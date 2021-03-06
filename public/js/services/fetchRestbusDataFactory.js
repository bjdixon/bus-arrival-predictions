(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .factory('fetchRestbusDataFactory', fetchRestbusData);

    fetchRestbusData.$inject = ['$http', '$location', '$cookieStore', 'appConstants'];

    function fetchRestbusData($http, $location, $cookieStore, appConstants) {
        return {
            get_agencies: get_agencies,
            get_predictions: get_predictions,
            get_routes: get_routes,
            get_stops: get_stops
        };

        function get_agencies() {
            return $http.get(appConstants.api_url + '/agencies')
                .then(get_agencies_data);

            function get_agencies_data(response) {
                return response.data;
            }
        }

        function get_predictions(agency_id, route_id, stop_id) {
            return $http.get(appConstants.api_url + '/agencies/' + agency_id + '/routes/' + route_id + '/stops/' + stop_id + '/predictions')
                .then(get_predictions_data);

            function get_predictions_data(response) {
                if (response.data.length === 0) {
                    return undefined;
                }
                $cookieStore.put('last_search', {
                    route: response.data[0].route.title,
                    stop: response.data[0].stop.title,
                    url: $location.path()
                });
                return {
                    predictions: response.data[0].values,
                    route_title: response.data[0].route.title,
                    stop_title: response.data[0].stop.title
                };
            }
        }

        function get_routes(agency_id) {
            return $http.get(appConstants.api_url + '/agencies/' + agency_id + '/routes')
                .then(get_routes_data);

            function get_routes_data(response) {
                if (agency_id === 'ttc') {
                    angular.forEach(response.data, function (value) {
                        value.title = value.title.split('-')[1];
                    });
                }
                return response.data;
            }
        }

        function get_stops(agency_id, route_id) {
            return $http.get(appConstants.api_url + '/agencies/' + agency_id + '/routes/' + route_id)
                .then(get_stops_data);

            function get_stops_data(response) {
                return response.data;
            }
        }
    }

}());
