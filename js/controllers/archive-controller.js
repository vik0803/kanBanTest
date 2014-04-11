'use strict';

angular.module('project').
	controller('ArchiveCtrl', ['$scope', 'ticketsXhr','$log',function ($scope,ticketsXhr,$log) {
		$scope.loading = true;
	}]);