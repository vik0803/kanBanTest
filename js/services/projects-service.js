angular.module('project').
	factory('serviceXhr', ['$http',function ($http) {

		return {
		    projectsXhr: function() {
				var promise = $http.get('../../php/project.php').then(function(data){
					return data.data;
				});

				return promise;
		    },

		    addProjectXhr: function (scope) {
		    	var $this = this;

                $http({
		            method: "POST",
		            url: "../../php/project.php?action=add",
		            data: $('#proba').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {

                	$this.projectsXhr().then(function(data){
						scope.projects = data.projects;
					});
	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });
		    },

		    deleteProject: function (id,scope) {
		    	var $this = this;

		    	$http({
		            method: "GET",
		            url: "../../php/project.php?action=delete&id=" + id,
		            data: $('#proba').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {

                	$this.projectsXhr().then(function(data){
						scope.projects = data.projects;
					});
	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });
		    },

		    editProjectXhr: function (id,scope) {
		    	var $this = this;

		    	$http({
		            method: "POST",
		            url: "../../php/project.php?action=edit&id=" + id,
		            data: $('#proba').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {

                	$this.projectsXhr().then(function(data){
						scope.projects = data.projects;
					});
	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });
		    }
		};
	}])