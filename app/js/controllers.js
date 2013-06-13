'use strict';

function SearchbarCtrl($scope,$http,$location) {

	$scope.submit = function() {
		$location.path('/').search({q:$scope.q});
	}
	
}
  
function ListCtrl($scope, $http, $location, Aggregation, ImageService) {
	
	if ($location.search().from) {
		$scope.from = $location.search().from;
	} else {
		$scope.from = 0;
	}

	console.log('searching');
	Aggregation.search({from: $location.search().from}, searchObject($location.search()), function(result) {
		$scope.aggregations = result.hits.hits;
		$scope.total = result.hits.total;
		$scope.facets = result.facets;
	});
	
	$scope.prevPage = function() {
		if ($scope.from - 10 >= 0) {
			$scope.from = $scope.from - 10;
			var search = $location.search();
			search.from = $scope.from;
			$location.path('/').search(search);
		}
	};
	
	$scope.nextPage = function() {
		if ($scope.from + 10 < $scope.total) {
			$scope.from = $scope.from + 10;
			var search = $location.search();
			search.from = $scope.from;
			$location.path('/').search(search);
		}
	};
	
	$scope.page = function() {
		return $scope.from / 10 + 1;
	};
	
	$scope.totalPages = function() {
		return Math.floor($scope.total / 10 + 1);
	};
	
	$scope.getThumb = function(aggregation) {
		return ImageService.getThumbForAggregation(aggregation);
	}

	/*
		This one selects one cho for showing on the 
		right hand side of the list page.
	*/
	$scope.preview = function(object) {
		$scope.focused = object;
	}

}

function DetailCtrl($scope, $http, $routeParams, Aggregation, ImageService) {

	Aggregation.get({id:$routeParams.id}, function(result) {
		$scope.aggregation = result;
		if (result._source['edm:aggregatedCHO']['dcterms:isPartOf']) {
			var parents = result._source['edm:aggregatedCHO']['dcterms:isPartOf'];
			for (var i=0; i<parents.length; i++) {
				if (parents[i].indexOf("http://www.danrw.de/cho/") == 0) {
					var parentId = parents[i].split("/").slice(-1)[0];
					$scope.parent = Aggregation.get({id:parentId});
				}
			}
		}
	});
	
	$scope.urlEncode = function(url) {
		return encodeURIComponent(url);
	};
	
	$scope.getThumb = function(aggregation) {
		return ImageService.getThumbForAggregation(aggregation);
	};
	
}
