'use strict';

angular.module('project')
	.directive('login', ['loginXhr','$window',function (loginXhr,$window) {

		return {
			restrict: 'E',

			link: function (scope, iElement, iAttrs) {

				//=========================================== login data

				scope.submitLogin = function (loginName,loginPass) {
					loginXhr.loginSendXhr(scope);
				}
			}
		};
	}]);