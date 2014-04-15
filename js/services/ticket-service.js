angular.module('project')
	.factory('ticketsXhr', ['$http', function ($http) {

		return {

			ticketsXhr: function () {
				var promise = $http.get('../../php/tickets.php').then(function(data){
					return data.data;
				});

				return promise;
			},

			getTickets: function (id,scope) {

		    	$http({
		            method: "GET",
		            url: "../../php/tickets.php?action=getticket&id=" + id,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			getDashboardTickets: function (scope) {

		    	$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=getticket&id=" + 2,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			editTickets: function (id,txtareaValue,scope) {
				var postData = {description:txtareaValue , id:id};

		    	$http({
		            method: "POST",
		            url: "../../php/tickets.php",
		            dataType: "json",
		            data: {myData:postData},
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        });
			},

			deleteTickets: function (id,prjId,scope) {

		    	$http({
		            method: "GET",
		            url: "../../php/tickets.php?action=deleteticket&id=" + id +'&projectid=' + prjId, 
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			deleteDashboardTicket: function (ticketId,scope) {
				$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=deleteticket&id=" + ticketId, 
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			deleteinPrgrsTicket: function (ticketId,scope) {
				$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=deleteinprogressticket&id=" + ticketId, 
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.prgTickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			deleteDoneTicket: function (ticketId,scope) {
				$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=deletedoneticket&id=" + ticketId, 
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.ticketsDone = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			addNewTicket: function (scope) {

				$http({
	            method: "POST",
	            url: "../../php/ticket.php",
	            data: $('#create-new-ticket').serialize(), 
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			moveTicket: function (prjId,ticketId,scope) {

		    	$http({
		            method: "GET",
		            url: "../../php/tickets.php?action=moveticket&tktPstn=" + 2 + '&id=' + ticketId + '&projectid=' + prjId,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.tickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			moveTicketDashboard: function (prjId,ticketId,scope) {
				var $this = this;
				var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
				var curUserLsId = curUserLs.users[0].user_id;

		    	$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=movedashboardticket&tktPstn=" + 3 + '&id=' + ticketId + '&projectid=' + prjId + '&userId=' + curUserLsId,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	$this.getDashboardTickets(scope);
		        	scope.prgTickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			moveTicketDone: function (prjId,ticketId,scope) {
				var $this = this;
				var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
				var curUserLsId = curUserLs.users[0].user_id;

		    	$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=movedinprogressticket&tktPstn=" + 4 + '&id=' + ticketId + '&projectid=' + prjId + '&userId=' + curUserLsId,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.prgTickets = data.tickets;
                    $this.doneTickets(scope);
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			moveTicketArchive: function (prjId,ticketId,scope) {
				var $this = this;
				var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
				var curUserLsId = curUserLs.users[0].user_id;

		    	$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=moveticketarchive&tktPstn=" + 5 + '&id=' + ticketId + '&projectid=' + prjId + '&userId=' + curUserLsId,
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.doneTickets = data.tickets;
                    $this.doneTickets(scope);
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

			inProgressTickets: function (scope) {

				var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
				var curUserLsId = curUserLs.users[0].user_id;
				
		    	$http({
		            method: "GET",
		            url: "../../php/dashboard-tickets.php?action=inprogresstickets",
		            data: $('#tickets').serialize(), 
		            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		       
		        }).success(function (data, status, headers, config) {
		        	scope.prgTickets = data.tickets;
	            }).error(function (data, status, headers, config) {
	                scope.status = status;
	            });
			},

            doneTickets: function (scope) {

                var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
                var curUserLsId = curUserLs.users[0].user_id;

                $http({
                    method: "GET",
                    url: "../../php/dashboard-tickets.php?action=donetickets",
                    data: $('#tickets').serialize(),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                }).success(function (data, status, headers, config) {
                    scope.ticketsDone = data.tickets;
                }).error(function (data, status, headers, config) {
                    scope.status = status;
                });
            },

		 	archiveTickets: function (scope,pageNumber) {

                var curUserLs = JSON.parse(localStorage.getItem('isLogged'));
                var curUserLsId = curUserLs.users[0].user_id;

                $http({
                    method: "GET",
                    url: "../../php/dashboard-tickets.php?action=archivetickets" + "&pageNumber=" + pageNumber,
                    data: $('#tickets').serialize(),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                }).success(function (data, status, headers, config) {
                    scope.ticketsArchive = data.tickets;
                    if (data.limit.to > data.limit.size) {
                    	$('.show-more').addClass('remove');
                    };
                }).error(function (data, status, headers, config) {
                    scope.status = status;
                });
            },

			getTicketState: function (id) {
				var promise = $http.get('../../php/state.php').then(function(data){
					return data.data;
				});

				return promise;
			},

			ticketsXhrAll: function () {
				return $http.get('../../php/tickets.php?action=morrisinfo');
			}
		};
	}])