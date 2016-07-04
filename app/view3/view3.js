angular.module('emailParser',[])
    .config(['$interpolateProvider',function ($interpolateProvider) {
       /* $interpolateProvider.startSymbol('##');
        $interpolateProvider.endSymbol('##');*/
    }])
    .factory('EmailParser',['$interpolate',function ($interpolate) {
    return {
        parse:function (text,context) {
            var template = $interpolate(text);
            return template(context);
        }
    };
}]);
angular.module('myApp.view3',['ngRoute','emailParser'])
.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/view3',{
        templateUrl:'view3/view3.html',
        controller:'view3Ctrl'
    });
}])
    .controller('view3Ctrl',function () {
        console.log('view3--3');
    })
    .controller('timeCtrl',function ($scope,$timeout) {
       var updateClock = function () {
           $scope.clock = new Date().toLocaleString();
           $timeout(function () {
               updateClock();
           },1000)
       };
        updateClock();
    })
    .controller('timeCtrl2',function ($scope) {
        //time clock
        $scope.clock = {
            now:new Date().toLocaleString()
        };
        var updateClock = function () {
            $scope.clock.now = new Date().toLocaleString();
        };
        var print = function () {
          console.log(1);
        };

        setInterval(function () {
            $scope.$apply(updateClock);
        },1000);
    })
    .controller('WatchCtrl',['$scope',function ($scope) {
        //watch check email
        $scope.$watch('emailBody',function (body) {
            console.log($scope.to);
            if(body){
                var template = $interpolate(body);
                $scope.previewText = template({to:$scope.to})
            }
        });
    }])
    .controller('WatchCtrl2',['$scope','EmailParser',function ($scope,EmailParser) {
        $scope.ccc = new Date();
        //watch check email use interpolate
        $scope.$watch('emailBody',function (body) {
            console.log($scope.to);
            if(body){
                $scope.previewText = EmailParser.parse(body,{to:$scope.to})
            }
        });
    }])
;

