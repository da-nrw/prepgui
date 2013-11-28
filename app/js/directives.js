'use strict';

/* Directives */


angular.module('prepgui.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('listFromArray', ['values', function(values) {
    return {
    	template: '<ul><li ng-repeat="value in value">{{value}}</li></ul>'
    };
  }]);
