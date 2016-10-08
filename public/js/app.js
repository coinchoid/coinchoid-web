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

app.config(function($mdThemingProvider) {
  return $mdThemingProvider.theme('default').primaryPalette('lime').accentPalette('blue-grey');
});


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('coinchoid').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/vendor.css',
        '/css/app.css',
        'images/icons/mdi.light.svg',
        '/images/icons/icon.svg',
        '/images/icons/icon-256x256.png',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-152x152.png',
        '/images/icons/icon-128x128.png',
        '/images/icons/icon-144x144.png',
        '/js/templates.js',
        '/js/app.js',
        '/js/vendor.js'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

angular.module('Coinchoid').config(function($stateProvider) {
  return $stateProvider.state('nav', {
    abstract: true,
    templateUrl: 'states/nav.html',
    controller: 'NavCtrl'
  }).state('nav.annonce', {
    url: '/',
    controller: 'DonneCtrl',
    templateUrl: 'states/donne/view.html'
  }).state('nav.resultats', {
    url: '/resultats',
    controller: 'ResultatsCtrl',
    templateUrl: 'states/resultats/view.html'
  });
});

angular.module('Coinchoid').service('Parties', function(localStorageService, $rootScope) {
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
      localStorageService.set('results', parties);
      return $rootScope.$broadcast('score:change');
    },
    getCumulativeScore: getCumulativeScore,
    get: function() {
      return parties;
    },
    reset: function() {
      parties = [];
      return localStorageService.set('results', []);
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

angular.module('Coinchoid').controller('NavCtrl', function($scope, $mdSidenav, Parties, $state) {
  $scope.toggleSidenav = function() {
    return $mdSidenav('left').toggle();
  };
  $scope.reset = function() {
    Parties.reset();
    $state.go('nav.annonce', {}, {
      reload: true
    });
    return $mdSidenav('left').toggle();
  };
  return $scope.goToDetails = function() {
    $mdSidenav('left').toggle();
    return $state.go('nav.resultats');
  };
});

angular.module('Coinchoid').controller('pointSelectorCtrl', function($scope) {
  $scope.firstRangeAnnonce = true;
  $scope.annonce = 80;
  $scope.bonus = 'NORMAL';
  $scope.select = function(annonce) {
    return $scope.annonce = annonce;
  };
  return $scope.toggleAnnonces = function() {
    return $scope.firstRangeAnnonce = !$scope.firstRangeAnnonce;
  };
});

angular.module('Coinchoid').directive('pointSelector', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/point-selector/view.html',
    scope: {
      annonce: '='
    },
    controller: 'pointSelectorCtrl'
  };
});

angular.module('Coinchoid').controller('scoreCtrl', function($scope, $rootScope, Parties) {
  $scope.score = Parties.getScore();
  return $rootScope.$on('score:change', function() {
    return $scope.score = Parties.getScore();
  });
});

angular.module('Coinchoid').directive('score', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/scores/view.html',
    controller: 'scoreCtrl'
  };
});

angular.module('Coinchoid').controller('DonneCtrl', function($scope, $state, Parties) {
  $scope.team = 'NOUS';
  $scope.ok = function(team, annonce, bonus) {
    Parties.addScore(team, annonce, bonus);
    return $scope.score = Parties.getScore();
  };
  return $scope.ko = function(team, annonce, bonus) {
    if (team === 'NOUS') {
      return Parties.addScore('EUX', annonce, bonus);
    } else {
      return Parties.addScore('NOUS', annonce, bonus);
    }
  };
});

angular.module('Coinchoid').controller('ResultatsCtrl', function($scope, Parties, $state) {
  $scope.parties = Parties.getCumulativeScore();
  return $scope.reset = function() {
    Parties.reset();
    return $state.go('annonce');
  };
});
