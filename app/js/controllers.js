'use strict';
var hitsPerPage = 8

function SearchbarCtrl($scope,$http,$location) {

	$scope.submit = function() {
		$location.path('/')
		askRiak($scope,$http,8,0)
	}
}
  
function ListCtrl($scope,$http) {

	$scope.selectedPage = 0;

	$scope.selectPage = function(sel_page) {
		
		$scope.selectedPage = sel_page
		askRiak($scope, $http, 8, sel_page)
	}

	/*
		This one selects one cho for showing on the 
		right hand side of the list page.
	*/
	$scope.previewCho = function(cho) {
		$scope.focused_cho = cho
	}

}

function DetailCtrl($scope, $http, $routeParams) {

	$scope.ifHasProperty = function(property) {
		if (property != null) return true; else return false
	}

	askRiakForDetails($scope, $http, $routeParams.cho_id)
}
