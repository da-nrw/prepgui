var riakSearchURL = 'http://data.danrw.de/search/portal_crafted/aggregation/_search?q=';

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

function searchObject(search) {
console.log(search);
	var q = "*";
	if (search.q) q = search.q; 
	var query = {
		"query_string": {
			"query": q
		}
	};
	var facets = {
	  	"formats": {
			"terms": {"field": "edm:hasView.dc:format"}
		},
		"providers": {
			"terms": {"field": "data_provider_facet"}
		}
	};
	
	var filters = [];
	if (search['facet.providers']) {
		filters.push({"term" : { "data_provider_facet" : search['facet.providers'] }});
	}
	if (search['facet.formats']) {
		filters.push({"term" : { "edm:hasView.dc:format" : search['facet.formats'] }});
	}
	if (filters.length) {
		console.log(filters);
		var query = { "filtered": { "query": query , "filter": { "and": [] } } };
		console.log(query);
		for (var i=0; i<filters.length; i++) {
			query.filtered.filter.and.push(filters[i]);
		}
	}
	
	return { query: query, facets: facets };
}

