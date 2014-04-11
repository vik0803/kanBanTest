'use strict';

angular.module('project',['ngRoute'])
	.config(['$routeProvider', '$locationProvider', '$httpProvider',function($routeProvider, $locationProvider, $httpProvider) {
  // $locationProvider.html5Mode(true);

  //interceptor for spinner loading
  $httpProvider.interceptors.push(function($q) {
        return {
         'request': function(config) {
            $('.loader').show();
            return config || $q.when(config);
          },
          'response': function(response) {
            $('.loader').hide();
            return response || $q.when(response);
          }
        }
  });

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