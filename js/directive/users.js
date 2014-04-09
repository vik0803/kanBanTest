'use strict';
angular.module('project')
	.directive('users', ['usersXhr','modal',function (usersXhr,modal) {

		return {
			restrict: 'E',
			templateUrl: 'users.html',
			link: function (scope, iElement, iAttrs) {
				//=========================================== users data

				usersXhr.usersXhr().then(function(data){
					scope.users = data.users;
				});
				//=========================================== users events

				scope.deleteUser = function(id){
					usersXhr.deleteUser(id,scope);
				}

				scope.activateUserClass = function (userIndex) {
					scope.selectedUser = userIndex;
					scope.selectedProject = -1;
				}

				//=========================================== users modal

				scope.showUsrAddModal = function () {
					modal.addUser(scope);
					scope.selectedProject = -1;	
					scope.selectedUser = -1;
				}

				scope.submitNewUser = function () {
					usersXhr.addUserXhr(scope);
					modal.closeModal(scope);
				}

				scope.submitEdituser = function (id) {
					usersXhr.editUserXhr(id,scope);
					modal.closeModal(scope);
				}

				scope.showEditUserModal = function (currentUserName,currentUserId,itemPassword) {
					modal.editUser(scope,currentUserName,currentUserId,itemPassword);
				}
			}
		};
	}])
