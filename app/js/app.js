'use strict';

angular.module('prepgui', ['prepgui.filters', 'prepgui.services', 'prepgui.directives' ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {templateUrl: 'partials/list.html', controller: 'ListCtrl'});
    $routeProvider.when('/detail/:id', {templateUrl: 'partials/detail.html', controller: 'DetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/search'});
  }]);
