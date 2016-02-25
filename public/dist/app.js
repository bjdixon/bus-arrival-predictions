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

(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('AboutController', AboutController);

    function AboutController() {
        return undefined;
    }

}());


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


(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('ContactController', ContactController);

    function ContactController() {
        return undefined;
    }

}());


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


(function () {
    'use strict';

    angular
        .module('predictionsApp')
        .controller('StopsController', StopsController);

    StopsController.$inject = ['$routeParams', 'fetchRestbusDataFactory'];

    function StopsController($routeParams, fetchRestbusDataFactory) {
        var vm = this;
        vm.agency_id = $routeParams.agency_id;
        vm.data_loading = true;
        vm.route_id = $routeParams.route_id;
        vm.route_title = '';

        activate();

        function activate() {
            fetchRestbusDataFactory.get_stops(vm.agency_id, vm.route_id)
                .then(function (data) {
                    vm.data_loading = false;
                    vm.route_title = data.title;
                    vm.stops = data.stops;
                });
        }
    }

}());


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
