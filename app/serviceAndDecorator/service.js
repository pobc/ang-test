var githubDecorator = function ($delegate, $log) {
    var events = function (path) {
        var startedAt = new Date();
        var events = $delegate.getUserEvents(path);
        //事件是一个promise
        events.finally(function () {
            $log.info('fetching events took:' + (new Date() - startedAt) + "ms");
        });
        return events;
    };
    return {
        events: events
    };
};
var cc = angular.module('service', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider, $provide) {
        $stateProvider.state('hh', {
            url: '/',
            templateUrl: 'serviceChild.html',
            controller: 'serviceCtrl'
        });
        $provide.decorator('githubService', githubDecorator);
        $urlRouterProvider.otherwise('/');
    }).factory('githubService', ['$http', function ($http) {
        return {
            getUserEvents: function (username) {
                console.log(username);
                return $http.get('/data.json')
            }
        }
    }]);
cc.config(function ($httpProvider) {
    //响应 拦截器
    var interceptor = function ($q, $rootScope, Auth) {
        return {
            'response': function (resp) {

            }
        }
    }
});
cc.controller('serviceCtrl', function (githubService) {
    console.log(githubService);
    githubService.events(1);
    //githubService('1');
    //alert(1);
});
console.log('service.js');

