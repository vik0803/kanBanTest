'use strict';
angular.module('project')
	.factory('loginXhr', ['$http','$window', '$location', function ($http, $window, $location) {
	var lgi = !!localStorage.getItem('isLogged');

	return {

		loginSendXhr: function (scope) {

            $http({
	            method: "POST",
	            url: "../../php/login.php",
	            data: $('#login').serialize(), 
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	       
	        }).success(function (data, status, headers, config) {

					if(data != 0){
						localStorage.setItem('isLogged', JSON.stringify(data));
						lgi = true;	
						$location.path('/dashboard');								
					} else {
						scope.activateError = true;
					}

            }).error(function (data, status, headers, config) {
                scope.status = status;
            		console.log('error');
            });
		},

		isLogged: function(callback) {
			var loging = localStorage.getItem('isLogged');
			if (typeof callback === "function") {
				callback(loging, lgi);
			} else {
				return {isLogged: lgi, data: loging}
			};
		}
	};
}])