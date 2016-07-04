'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  console.log(version);
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);
