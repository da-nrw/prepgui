'use strict';

// URL to elasticsearch index
var indexUrl = "http://data.danrw.de/search/portal";

var services = angular.module('prepgui.services', ['ngResource']);

services.factory('Aggregation', function($resource){
	return $resource(indexUrl+"/ore\\:Aggregation/:id",
			{ id: '_id' },
			{
				query: { method:'GET', params: { id:'_search' }, isArray:false },
				search: { method:'POST', params: { id:'_search'}, isArray:false }
			});
});

services.factory('ImageService', function(){
	return {
		getThumbForAggregation: function(aggregation) {
			if (aggregation && aggregation['edm:object'] && aggregation['edm:object']['@id'])
				return aggregation['@id'].substring(0, aggregation['@id'].lastIndexOf('-')).replace(/aggregation/g,"file") + "/" + aggregation['edm:object']['@id'];
			else if (aggregation && aggregation['edm:isShownBy'] && aggregation['edm:isShownBy']['@id'])
                return aggregation['@id'].substring(0, aggregation['@id'].lastIndexOf('-')).replace(/aggregation/g,"file") + "/" + aggregation['edm:isShownBy']['@id'];
			else
				return 'img/image.png'
		}
	}
});
