angular.module('project').
directive('activeLink', ['$location', function(location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does bot return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
                if (path === newPath) {
                    element.addClass(clazz);
                } else {
                    element.removeClass(clazz);
                }
            });
        }
    };

    }]);

angular.module('project').
directive('editAcc', ['$location', 'modal', function (location,modal) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {

            scope.editAccFn = function () {
                modal.editAccMdl(scope);
            }

            scope.closeModal = function () {
                modal.closeModal(scope);
            }
        }
    };
}]);

angular.module('project').
directive('editAccForm', ['$location', 'modal', 'usersXhr',function (location,modal,usersXhr) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
                usersXhr.editUserAccXhr(element,scope);
        }
    };
}]);