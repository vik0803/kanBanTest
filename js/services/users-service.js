'use strict';

angular.module('project')
	.factory('usersXhr', ['$http', 'modal','$window','$rootScope',function ($http,modal, $window,$rootScope) {

		var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
		return {
			usersXhr: function () {
				var promise = $http.get('../../php/users.php').then(function(data){
					return data.data;
				});
				return promise;
			},

			addUserXhr: function (scope) {
		    	var $this = this;

                $http({
		            method: "POST",
		            url: "../../php/users.php?action=add",
		            data: $('#users').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.users = data.users;
				
	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });
		    },

		    deleteUser: function (id,scope) {
		    	var $this = this;

		    	$http({
		            method: "GET",
		            url: "../../php/users.php?action=delete&id=" + id,
		            data: $('#users').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {

                	$this.usersXhr().then(function(data){
						scope.users = data.users;
					});
	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });
		    },

		    editUserXhr: function (id,scope) {
		    	var $this = this;

		    	$http({
		            method: "POST",
		            url: "../../php/users.php?action=edit&id=" + id,
		            data: $('#users').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {

                	$this.usersXhr().then(function(data){
						scope.users = data.users;
					});
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
		    },

		    editUserAccXhr: function (elem,scope) {
		    	var $this = this;
		     	var files;

				// Add events
				$(elem).find('input[type=file]').on('change', prepareUpload);
				$(elem).on('submit', uploadFiles);

				// Grab the files and set them to our variable
				function prepareUpload(event)
				{
					files = event.target.files;
				}

				// Catch the form submit and upload the files
				function uploadFiles(event)
				{
					event.stopPropagation(); // Stop stuff happening
			        event.preventDefault(); // Totally stop stuff happening

			        // START A LOADING SPINNER HERE

			        // Create a formdata object and add the files
					var data = new FormData();
					$.each(files, function(key, value)
					{
						data.append(key, value);
					});
			        
			        $.ajax({
			            url: '../../php/user-acc.php?files',
			            type: 'POST',
			            data: data,
			            cache: false,
			            dataType: 'json',
			            processData: false, // Don't process the files
			            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			            success: function(data, textStatus, jqXHR)
			            {
			            	if(typeof data.error === 'undefined')
			            	{
			            		// Success so call function to process the form
			            		submitForm(event, data);
			            	}
			            	else
			            	{
			            		// Handle errors here
			            		console.log('1ERRORS: ' + data.error);
			            	}
			            },
			            error: function(jqXHR, textStatus, errorThrown)
			            {
			            	// Handle errors here
			            	console.log('2ERRORS: ' + textStatus);
			            	// STOP LOADING SPINNER
			            }
			        });
			    }

			    function submitForm(event, data)
				{
					// Create a jQuery object from the form
					var $form = $(elem);
					
					// Serialize the form data
					var formData = $form.serialize();
					
					// You should sterilise the file names
					$.each(data.files, function(key, value)
					{
						formData = formData + '&filenames[]=' + value;
					});

					$.ajax({
						url: '../../php/user-acc.php',
			            type: 'POST',
			            data: formData,
			            cache: false,
			            dataType: 'json',
			            success: function(data, textStatus, jqXHR)
			            {
			            	if(typeof data.error === 'undefined')
			            	{
			            		// Success so call function to process the form
			            		modal.closeModal(scope);
			            		console.log('SUCCESS: ', data);
			            		angular.forEach(data.users, function(value,key){
			            			if (value.user_id == curUserLs.users[0].user_id) {
			            				localStorage.setItem('isLogged',JSON.stringify(
			            					{
			            						users:[{
													first_name: value.first_name,
													password: value.password,
													sur_name: value.sur_name,
													user_id: value.user_id,
													user_img: value.user_img,
													username: value.username
												}]
											}
										));
			            			};
			            		});
			            		if (curUserLs != null) {
				            		curUserLs = JSON.parse(localStorage.getItem('isLogged'));
			            		};
			            		$window.location.reload()
			            	}
			            	else
			            	{
			            		// Handle errors here
			            		console.log('3ERRORS: ' + data.error);
			            	}
			            },
			            error: function(jqXHR, textStatus, errorThrown)
			            {
			            	// Handle errors here
			            	console.log('4ERRORS: ' + textStatus);
			            },
			            complete: function()
			            {
			            	// STOP LOADING SPINNER
			            }
					});
				}
		    },

		    userLocalSt: function () {
		    	return curUserLs;
		    }
		};
	}])