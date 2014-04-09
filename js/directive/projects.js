'use strict';

angular.module('project').
	directive('projects', ['serviceXhr','modal',function (serviceXhr,modal) {
		return {
			restrict: 'E',
			templateUrl: 'projects.html',
			link: function (scope, iElement, iAttrs) {

				//=========================================== projects data
				serviceXhr.projectsXhr().then(function(data){
					scope.projects = data.projects;
				});

				//=========================================== project events

				scope.deleteProject = function(id){
					serviceXhr.deleteProject(id,scope);
				}

				scope.activateClass = function (projIndex) {
					scope.selectedProject = projIndex;
					scope.selectedUser = -1;
				}

				//========================================= project modals

				scope.submitNewPrj = function () {
					serviceXhr.addProjectXhr(scope);
					modal.closeModal(scope);
				}

				scope.submitEditProject = function (id) {
					serviceXhr.editProjectXhr(id,scope);
					modal.closeModal(scope);
				}

				scope.showModal = function () {
					modal.addProject(scope);
				}

				scope.showEditModal = function (currentPrjName,currentPrjId) {
					modal.editProject(scope,currentPrjName,currentPrjId);
				}

				scope.closeModal = function () {
					modal.closeModal(scope);
				}
			}
		};
	}]);
