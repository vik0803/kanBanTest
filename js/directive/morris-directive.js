'use strict';
angular.module('project').
directive('morris', ['ticketsXhr',function(ticketsXhr){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			ticketsXhr.ticketsXhrAll().success(function(data){
				var dataArrayCreate = [];
				var dataArrayQueue = [];
				var dataArrayDone = [];

				angular.forEach(data.tickets, function(key,value){
					if (key.ticket_date.length != 0) {

						dataArrayCreate.push(key.ticket_date);
					};

					if (key.queue_date.length != 0) {

						dataArrayQueue.push(key.queue_date);
					};

					if (key.done_date.length != 0) {

						dataArrayDone.push(key.done_date);
					};
				});

				var percents = dataArrayCreate.length + dataArrayQueue.length + dataArrayDone.length;

				Morris.Donut({
				  	element: 'graph',
				  	colors: ['#ffd700','#6b8e23','#4682b4'],
				  	data: [
					    {value: Math.round((dataArrayCreate.length / percents) * 100), label: 'Create'},
					    {value: Math.round((dataArrayQueue.length / percents) * 100), label: 'Queue'},
					    {value: Math.round((dataArrayDone.length / percents) * 100), label: 'Done'},
				  	],

					formatter: function (x) { return x + "%"}

				}).on('click', function(i, row){

				  console.log(i, row);
				});
			});
		}
	};
}]);