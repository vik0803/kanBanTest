angular.module('project')
	.directive('dashboard', ['ticketsXhr','usersXhr',function (ticketsXhr,usersXhr) {
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) {
				ticketsXhr.getDashboardTickets(scope);
				ticketsXhr.inProgressTickets(scope);
				ticketsXhr.doneTickets(scope);

				usersXhr.usersXhr().then(function(data){
					scope.users = data.users;

				}).then(function(){
				var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
				var curUserLsId = curUserLs.users[0].user_id;
					scope.curUserActive = curUserLsId;
					scope.$watch("item.first_name", function() {

					   	scope.$evalAsync(  // you might need to wrap the next line in a function, not sure
					      slider(curUserLsId)
					   	);
					});	
				});

				scope.moveTicketDashboardFn = function(moveTktProjectId,ticketId,ticketInx) {
				    	$('.curr-ticket-move' + ticketId).parents('.ticket').css({'position':'relative', 'z-index': 100});
						scope.$evalAsync(  // you might need to wrap the next line in a function, not sure
					     	$('.curr-ticket-move' + ticketId).parents('.ticket')
						    .animate({
								left: '-50px'
						    },
						    {
						   		duration: 300,
						   		complete: function () {
						   			$('.curr-ticket-move' + ticketId).parents('.ticket')
									    .animate({
											left: '100px',
											opacity: 0
									    },
									    {
									   		duration: 200,
									   		complete: function() {
									   			ticketsXhr.moveTicketDashboard(moveTktProjectId,ticketId,scope);
									   		}
									    });
						   		}
						})
					    );		
				}

				scope.moveTicketDoneFn = function(moveTktProjectId,ticketId,ticketInx) {
				    	$('.curr-ticket-move' + ticketId).parents('.ticket').css({'position':'relative', 'z-index': 100});
						scope.$evalAsync(  // you might need to wrap the next line in a function, not sure
					     	$('.curr-ticket-move' + ticketId).parents('.ticket')
						    .animate({
								left: '-50px'
						    },
						    {
						   		duration: 300,
						   		complete: function () {
						   			$('.curr-ticket-move' + ticketId).parents('.ticket')
									    .animate({
											left: '100px',
											opacity: 0
									    },
									    {
									   		duration: 200,
									   		complete: function() {
									   			ticketsXhr.moveTicketDone(moveTktProjectId,ticketId,scope);
									   		}
									    });
						   		}
						})
					    );		
				}

				scope.moveTicketArchiveFn = function(moveTktProjectId,ticketId,ticketInx) {
				    	$('.curr-ticket-move' + ticketId).parents('.ticket').css({'position':'relative', 'z-index': 100});
						scope.$evalAsync(  // you might need to wrap the next line in a function, not sure
					     	$('.curr-ticket-move' + ticketId).parents('.ticket')
						    .animate({
								left: '-50px'
						    },
						    {
						   		duration: 300,
						   		complete: function () {
						   			$('.curr-ticket-move' + ticketId).parents('.ticket')
									    .animate({
											left: '100px',
											opacity: 0
									    },
									    {
									   		duration: 200,
									   		complete: function() {
									   			ticketsXhr.moveTicketArchive(moveTktProjectId,ticketId,scope);
									   		}
									    });
						   		}
						})
					    );		
				}
				
				scope.textareaChangeFn = function(ticketId,ticketDsrptn) {
					var newVal = $('.ticketTextarea' + ticketId).val();
					if (ticketDsrptn !== newVal) {
						ticketsXhr.editTickets(ticketId,newVal,scope);
					};
				}

				scope.deleteDashboardTicketFn = function(ticketId) {
					ticketsXhr.deleteDashboardTicket(ticketId,scope);
				};

				scope.deleteInPrgrsTicketFn = function(ticketId) {
					ticketsXhr.deleteinPrgrsTicket(ticketId,scope);
				};

				scope.deleteDoneTicketFn = function(ticketId) {
					ticketsXhr.deleteDoneTicket(ticketId,scope);
				};

				scope.curUserTciketFn = function(curUserTciket) {
					var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
					var curUserLsId = curUserLs.users[0].user_id;
					return curUserLsId == curUserTciket;
				}

			}
		};
	}]);

