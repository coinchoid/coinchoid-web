'use strict';
var app;

app = angular.module('Coinchoid', ['ng', 'ngResource', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngMessages', 'ui.router', 'app.templates', 'LocalStorageModule']);

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
angular.module('Coinchoid').config(function($stateProvider) {
  return $stateProvider.state('home', {
    url: '/',
    controller: 'DonneCtrl',
    templateUrl: 'states/donne/view.html'
  }).state('resultats', {
    url: '/resultats',
    controller: 'ResultatsCtrl',
    templateUrl: 'states/resultats/view.html'
  });
});

angular.module('Coinchoid').service('Parties', function() {
  var parties;
  parties = [];
  return {
    addScore: function(team, annonce, bonus) {
      if (team === 'NOUS') {
        return parties.push({
          nous: annonce,
          eux: 0
        });
      } else {
        return parties.push({
          nous: 0,
          eux: annonce
        });
      }
    },
    get: function() {
      return parties;
    }
  };
});

angular.module('Coinchoid').controller('ResultatsCtrl', function($scope, Parties) {
  return $scope.parties = Parties.get();
});

angular.module('Coinchoid').controller('DonneCtrl', function($scope, Parties) {
  $scope.nous = function(annonce, bonus) {
    return Parties.addScore('NOUS', annonce, bonus);
  };
  return $scope.eux = function(annonce, bonus) {
    return Parties.addScore('EUX', annonce, bonus);
  };
});
