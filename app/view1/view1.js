'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope,githubService,$http) {
        //$scope.username = githubService.setUsername;
        //console.log($scope.username('jiang'));
        $http.get('/data.json').success(function (data) {
            console.log(data,'ccc');
        });
        $.get('/data.json',function (data) {
            console.log("jquery ajax");
        });

    }).directive('myDire', function () {
    return {
        restrict: 'A',
        scope: {
            'myProperty':'@'
        },
        template: 'inside myDirective ,isolate scope :{{myProperty}}'
    };
    }).directive('myInheritScopeDire',function () {
    return {    
      restrict:'A',
        scope:true, 
        'myProperty':'@',
        template:'Inside myDirective, isolate scope:{{myProperty}}'
    };
}).factory('githubService',function ($http) {
    var githubUsername;
    var runUserRequest = function (path) {
        return $http({
            'method':'get',
            url:'app/data.json'
        });
    };
    return {
        events:function(){
            return runUserRequest("events");
        },
        setUsername:function (username) {
            githubUsername =username;
            return username;
        }
    }
})
///拦截器
    .config(function ($httpProvider) {
        //
        //在这里构造响应拦截器,将拦截 所有的$http请求 和 html页面请求
        var interceptor = function ($q,$rootScope) {
            return{
                'response':function (resp) {
                    console.log('resp interceptor:',resp.data);
                    //debugger;
                    if (resp.config.url == '/api/login'){
                        //假设api服务器返回数据如下
                        //{token:"AUTH_TOKEN"}
                        //Auth.setToken(resp.data.token);
                    }

                    return resp;
                },
                'responseError':function (rejection) {
                    console.log('responseError interceptor');
                    //错误处理
                    switch(rejection.status){
                        case 401:
                            if (rejection.config.url !=='api/login'){
                                ///如果不是在登陆页面
                                $rootScope.$broadcast('auth:loginRequired');
                            }
                            break;
                        case 403:
                            $rootScope.$broadcast('auth:forbidden');
                            break;
                        case 404:
                            $rootScope.$broadcast('page:notFound');
                            break;
                        case 500:
                            $rootScope.$broadcast('server:error');
                            break;
                    }
                    return $q.reject(rejection);
                }
            }
        };
        $httpProvider.interceptors.push(interceptor);
    })
;
