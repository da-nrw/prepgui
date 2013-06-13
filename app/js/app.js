'use strict';


// Declare app level module which depends on filters, and services
angular.module('prepgui', ['prepgui.filters', 'prepgui.services', 'prepgui.directives' ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/list.html', controller: 'ListCtrl'});
    $routeProvider.when('/detail/:id', {templateUrl: 'partials/detail.html', controller: 'DetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/?q=*'});
  }]);
