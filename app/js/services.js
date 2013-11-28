'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('prepgui.services', ['ngResource']);

services.factory('Aggregation', function($resource){
	return $resource("http://data.danrw.de/search/portal/aggregation/:id",
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
