angular.module('project').
	factory('modal',['$compile',function ($compile) {
		return  {

			addProject: function (scope) {

				if ($('div').hasClass('modal-wrapper')) {
					return;
				} else {

					$(document.body).append(
						$compile(
								'<div class="modal-wrapper">' +
									'<form id="proba" method="post">' +
									'<h2>Add project</h2>' +
									'<div><input type="text" name="name" placeholder="project name"/></div>' +
									'<input type="submit" value="add" ng-click="submitNewPrj()" />' +
									'<input type="button" value="cancel" ng-click="closeModal()" />' +
									'</form>' +
								'</div>'
							)(scope)
						);
					$('.modal-wrapper').fadeIn();	

					setTimeout(function(){
						$(".modal-wrapper").clickOutside(function(event, obj) { 
							obj.fadeOut(); 
							obj.remove();
						});	
					},200);

					scope.selectedProject = -1;	
					scope.selectedUser = -1;
				};
			},

			editProject: function (scope,currentPrjName,currentPrjId) {
				$(document.body).append(
					$compile(
						'<div class="modal-wrapper">' +
							'<form id="proba" method="post">' +
							'<h2>Edit project</h2>' +
							'<div><input type="text" name="name" placeholder="project name" ng-model="modalCurrentPrjName" /></div>' +
							'<input type="submit" value="save" ng-click="submitEditProject(' + currentPrjId + ')" />' +
							'<input type="button" value="cancel" ng-click="closeModal()" />' +
							'</form>' +
						'</div>'
					)(scope)
				);

				$('.modal-wrapper').fadeIn();

				scope.modalCurrentPrjName = currentPrjName;

				setTimeout(function(){
					$(".modal-wrapper").clickOutside(function(event, obj) { 
						obj.fadeOut(); 
						obj.remove();
					});	
				},200);	
			},

			addUser: function (scope) {
				$(document.body).append(
					$compile(
						'<div class="modal-wrapper">' +
							'<form id="users" method="post">' +
							'<h2>Add user</h2>' +
							'<div><input type="text" name="name" class="user-name" placeholder="user name" placeholder="user name" /></div>' +
							'<div><input type="password" name="password" placeholder="password" required/></div>' +
							'<input type="submit" value="save" ng-click="submitNewUser()" />' +
							'<input type="button" value="cancel" ng-click="closeModal()" />' +
							'</form>' +
						'</div>'
					)(scope)
				);
				
				$('.modal-wrapper').fadeIn();

				setTimeout(function(){
					$(".modal-wrapper").clickOutside(function(event, obj) { 
						obj.fadeOut(); 
						obj.remove();
					});	
				},200);	
			},

			editUser: function (scope, currentUserName, currentUserId,itemPassword) {
				$(document.body).append(
					$compile(
						'<div class="modal-wrapper">' +
							'<form id="users" method="post">' +
							'<h2>Edit user</h2>' +
							'<div><input type="text" name="name" placeholder="user name" ng-model="modalCurrentUserName" /></div>' +
							'<div><input type="password" name="password" ng-model="modalItemPassword"/></div>' +
							'<input type="submit" value="save" ng-click="submitEdituser(' + currentUserId + ')" />' +
							'<input type="button" value="cancel" ng-click="closeModal()" />' +
							'</form>' +
						'</div>'
					)(scope)
				);
				scope.modalCurrentUserName = currentUserName;
				scope.modalItemPassword = itemPassword;
				$('.modal-wrapper').fadeIn();

				setTimeout(function(){
					$(".modal-wrapper").clickOutside(function(event, obj) { 
						obj.fadeOut(); 
						obj.remove();
					});	
				},200);	
			},

			editAccMdl: function (scope) {

				var curUserItems = JSON.parse(localStorage.getItem('isLogged'));
				$(document.body).append(
					$compile(
						'<div class="modal-wrapper editAccForm-wrapper">' +
						'<form id="editAccForm" enctype="multipart/form-data" edit-acc-form>' +
						'<h2>Edit account</h2>' +
						'<div><input type="text" name="name" id="name" placeholder="name" value="' + curUserItems.users[0].first_name + '" multiple></div>' +
						'<div><input type="password" name="password" id="name" placeholder="password" multiple></div>' +
						'<div><input type="hidden" name="u_id" id="u_id" value="' + curUserItems.users[0].user_id +'" multiple></div>' +
						'<div class="upload-file"><label for="file">icon</label><input type="file" name="file_upload" id="file_upload" multiple></div>' +
						'<input type="submit" name="submit" value="Submit" >' +
						'<input type="button" value="Cancel" ng-click="closeModal()">' +
						'</form>' +
						'</div>'
					)(scope)
				);
				
				$('.modal-wrapper').fadeIn();

				setTimeout(function(){
					$(".modal-wrapper").clickOutside(function(event, obj) { 
						obj.fadeOut(); 
						obj.remove();
					});	
				},200);	
			},

			closeModal: function (scope) {

					scope.add = '';
					$('.modal-wrapper').remove();
			}	
		};
	}]);