'use strict';

angular.module('project').
	controller('ArchiveCtrl', ['$scope', 'ticketsXhr','$log',function ($scope,ticketsXhr,$log) {
		$scope.loading = true;
		// ticketsXhr.archiveTickets().then( function ( response ) {
		// 	console.log('msg')
		//     $scope.loading = false;
		// }, function ( response ) {
		//     // TODO: handle the error somehow
		//     $scope.loading = false;
		// });
	}]);