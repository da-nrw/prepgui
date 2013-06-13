var riakSearchURL = 'http://da-nrw-vm2.hki.uni-koeln.de/search/portal/aggregation/_search?q=';

function askRiak($scope, $http, hitsPerPage,selectedPage) {
	
  var chos = new Array()
  $http
        .get(riakSearchURL+"\""+$scope.search_term+"\"")
        .success(
    function(data){

      var hits = data["hits"]["total"];
      var pages = new Array()
      $scope.pages = pages
      for (var i=0;i<hits;i++){
        if (i % hitsPerPage == 0) $scope.pages.push(i / hitsPerPage)
      }

      $scope.hits = hits
      for (var i=(selectedPage*hitsPerPage);i<(selectedPage*hitsPerPage+hitsPerPage);i++){
        if (i<$scope.hits) chos.push(data["hits"]["hits"][i]);
      };

    });
    $scope.chos = chos
}

/*
 * asks riak for a specifix object
 * sets $scope.cho asynchronously
 */ 
function askRiakForDetails($scope,$http,cho_id) {

  $http
        .get(riakSearchURL+$scope.search_term+"\""+cho_id+"\"")
        .success(
    function(data){

        $scope.cho = data["hits"]["hits"][0];
    });
}

