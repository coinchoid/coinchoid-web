'use strict';
var app;

app = angular.module('Coinchoid', ['ng', 'ngResource', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngMessages', 'ui.router', 'app.templates', 'LocalStorageModule', 'Coinchoid.toto']);

app.config(function($locationProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  return $urlRouterProvider.otherwise('/');
});

app.config(function(localStorageServiceProvider) {
  return localStorageServiceProvider.setPrefix('');
});

app.config(function($mdIconProvider) {
  return $mdIconProvider.defaultIconSet('icons/mdi.light.svg');
});

angular.module("Scrumble.constants", [])

.constant("API_URL", "http://localhost:8000/v1")

.constant("GOOGLE_CLIENT_ID", "TO BE DEFINED")

;
angular.module('Coinchoid.toto', []);

angular.module('Coinchoid.toto').config(function($stateProvider) {
  return $stateProvider.state('home', {
    url: '/',
    controller: 'DoneCtrl',
    templateUrl: 'admin/states/daily-stats/view.html'
  });
});

angular.module('Coinchoid.toto').controller('DoneCtrl', function($scope) {});
