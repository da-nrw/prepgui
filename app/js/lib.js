function searchObject(search) {

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

