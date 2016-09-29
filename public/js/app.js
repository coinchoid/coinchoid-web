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
  return $mdIconProvider.defaultIconSet('images/icons/mdi.light.svg');
});

angular.module("Scrumble.constants", [])

.constant("API_URL", "http://localhost:8000/v1")

.constant("GOOGLE_CLIENT_ID", "TO BE DEFINED")

;
angular.module('Coinchoid').config(function($stateProvider) {
  return $stateProvider.state('annonce', {
    url: '/',
    controller: 'DonneCtrl',
    templateUrl: 'states/donne/view.html'
  }).state('resultats', {
    url: '/resultats',
    controller: 'ResultatsCtrl',
    templateUrl: 'states/resultats/view.html'
  });
});

angular.module('Coinchoid').service('Parties', function(localStorageService) {
  var getCumulativeScore, parties;
  parties = localStorageService.get('results') || [];
  getCumulativeScore = function() {
    var cumulativeResult, last, partie, _i, _len;
    cumulativeResult = [
      {
        nous: 0,
        eux: 0
      }
    ];
    for (_i = 0, _len = parties.length; _i < _len; _i++) {
      partie = parties[_i];
      last = cumulativeResult[cumulativeResult.length - 1];
      cumulativeResult.push({
        nous: partie.nous + last.nous,
        eux: partie.eux + last.eux
      });
    }
    return cumulativeResult;
  };
  return {
    addScore: function(team, annonce, bonus) {
      var score;
      score = annonce;
      if (bonus === 'COINCHE') {
        score = score * 2;
      }
      if (bonus === 'SURCOINCHE') {
        score = score * 4;
      }
      if (team === 'NOUS') {
        parties.push({
          nous: score,
          eux: 0
        });
      } else {
        parties.push({
          nous: 0,
          eux: score
        });
      }
      return localStorageService.set('results', parties);
    },
    getCumulativeScore: getCumulativeScore,
    get: function() {
      return parties;
    },
    reset: function() {
      return parties = [];
    },
    getScore: (function(_this) {
      return function() {
        var last, _ref;
        _ref = getCumulativeScore(), last = _ref[_ref.length - 1];
        return last;
      };
    })(this)
  };
});

angular.module('Coinchoid').controller('DonneCtrl', function($scope, $state, Parties) {
  $scope.annonce = 80;
  $scope.bonus = 'NORMAL';
  $scope.team = 'NOUS';
  $scope.ok = function(team, annonce, bonus) {
    Parties.addScore(team, annonce, bonus);
    return $scope.score = Parties.getScore();
  };
  $scope.ko = function(team, annonce, bonus) {
    if (team === 'NOUS') {
      Parties.addScore('EUX', annonce, bonus);
    } else {
      Parties.addScore('NOUS', annonce, bonus);
    }
    return $scope.score = Parties.getScore();
  };
  return $scope.score = Parties.getScore();
});

angular.module('Coinchoid').controller('ResultatsCtrl', function($scope, Parties, $state) {
  $scope.parties = Parties.getCumulativeScore();
  return $scope.reset = function() {
    Parties.reset();
    return $state.go('annonce');
  };
});
