'use strict';

angular.module('project')
	.directive('poolofideas', ['serviceXhr', 'ticketsXhr',function (serviceXhr,ticketsXhr) {
		return {
			link: function (scope, iElement, iAttrs) {
				
				//=========================================== pool of ideas data
				serviceXhr.projectsXhr().then(function(data){
					scope.portfolioProjects = data.projects;
				});

				var curProjectAct = JSON.parse(localStorage.getItem('curPjct'))
				scope.selectPoolProject = curProjectAct.curProjectIndxAct;
				scope.projectId = curProjectAct.curProjectIdAct;
				ticketsXhr.getTickets(curProjectAct.curProjectIdAct,scope);

				//=========================================== pool of ideas events
				scope.activatePoolClass = function (projIndex,curProjectId) {
					scope.selectPoolProject = projIndex;
					scope.projectId = curProjectId;

					ticketsXhr.getTickets(curProjectId,scope);
					localStorage.setItem('curPjct',JSON.stringify(
						{
							curProjectIndxAct: projIndex,
							curProjectIdAct: curProjectId
						}
					));
				}

				scope.addNewTicket = function(projectId) {

					scope.projectId = projectId;

					ticketsXhr.getTicketState().then(function(data){
						scope.ticketStates = data.ticketstate;
						scope.newTicketTextarea = '';
						$('newticket').addClass('visible');
					});
				};

				scope.deleteTicketFn = function(ticketId,projectId) {
			
					ticketsXhr.deleteTickets(ticketId,projectId,scope);
				};

				scope.textareaChangeFn = function(ticketId,ticketDsrptn) {
					var newVal = $('.ticketTextarea' + ticketId).val();

					if (ticketDsrptn !== newVal) {
						ticketsXhr.editTickets(ticketId,newVal,scope);
					};
				}

				scope.moveTicketFn = function(moveTktProjectId,ticketId,ticketInx) {
				    	$('.curr-ticket-move' + ticketInx).parents('.ticket').css({'position':'relative', 'z-index': 100});
						scope.$evalAsync(  // you might need to wrap the next line in a function, not sure
					     	$('.curr-ticket-move' + ticketInx).parents('.ticket')
						    .animate({
								left: '-50px'
						    },
						    {
						   		duration: 300,
						   		complete: function () {
						   			$('.curr-ticket-move' + ticketInx).parents('.ticket')
									    .animate({
											left: '100px',
											opacity: 0
									    },
									    {
									   		duration: 200,
									   		complete: function() {
									   			ticketsXhr.moveTicket(moveTktProjectId,ticketId,scope);
									   		}
									    });
						   		}
						})
					   );		
				}
			}
		};
	}]);

angular.module('project')
	.directive('newticket', ['ticketsXhr', function (ticketsXhr) {
		return {
			restrict: 'E',
			templateUrl: 'newTicket.html',
			link: function (scope, iElement, iAttrs) {

				iElement.clickOutside(function(event, obj) { 
					if (event.target != $('.create-ticket') && obj.is(':visible')) {

						$('newticket').removeClass('visible');
					};
				});

				scope.submitNewTicket = function (projectId) {
					ticketsXhr.addNewTicket(scope);
					$('newticket').removeClass('visible');
				};	
			}
		};
	}])