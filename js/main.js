'use strict';

angular.module('project',['ngRoute'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
	$routeProvider
		.when('/login', {
			templateUrl: 'login.html'
		})

		.when('/project', {
			templateUrl: 'admin.html',
      controller: 'ProjectCntr'
		})

    .when('/dashboard', {
      templateUrl: 'dashboard.html',
      controller: 'Dashboard'
    })
    .when('/poolofideas', {
      templateUrl: 'poolofideas.html',
      controller: 'PoolofideasCtrl'
    })
    .when('/metrics', {
      templateUrl: 'metrics.html',
      controller: 'MetricsCtrl'
    })
    .when('/archive', {
      templateUrl: 'archive.html',
      controller: 'ArchiveCtrl'
    })
	}])
	.controller('ProjectCntr',['$scope', '$rootScope', '$location', '$http', 'loginXhr','usersXhr',
        function ($scope, $rootScope, $location, $http, loginXhr,usersXhr) {

            $scope.$on('$locationChangeSuccess', function (event, next, current) {     
              var tmp = loginXhr.isLogged();
              if(!tmp.isLogged) {
                $location.path('/login');
                $scope.isLogged = tmp.isLogged;
              } else {
                var userItems = JSON.parse(localStorage['isLogged'] || null);
                $scope.userIcon = userItems.users[0].user_img;
                $scope.isLogged = true;
              }
            });

            $scope.logoutFn = function() {
              localStorage.removeItem('isLogged');
              $scope.isLogged = false;
            }
        }])
  .controller('LoginCtrl',['$scope','loginXhr',function ($scope,loginXhr){
  }])
  .controller('UsersCtrl', ['$scope', function ($scope) {
  }]);

	