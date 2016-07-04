'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [function () {

    }])
    .controller('timeCtrl',function ($scope) {
        $scope.clock = new Date();
        console.log('view2:timeCtrl');
    })
    .directive('ensureUnique', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function (n) {
                if (!n)return;
                $http({
                    method: 'get',
                    url: 'data.json',
                    data: {
                        field: attrs.ensureUnique,
                        value: scope.ngModel
                    }
                }).success(function (data) {
                    console.log(data);
                    c.$setValidity('unique', data.isUnique)
                }).error(function (data) {
                    c.$setValidity('unique', false)
                })
            });
        }
    }
})
;