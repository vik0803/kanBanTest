'use strict';

angular.module('project').
directive('archiveactions', ['ticketsXhr', function(ticketsXhr){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
				ticketsXhr.archiveTickets($scope,1);
				var pageNumber = 1;
				$('.show-remove').removeClass('remove'); 
				console.log($('.show-remove'))
				$scope.showMoreFn = function () {
					pageNumber++; 
					ticketsXhr.archiveTickets($scope,pageNumber);
				} 
		}
	};
}]);
