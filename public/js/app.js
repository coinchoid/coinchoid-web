window.addEventListener('load', function() { 

  var maybePreventPullToRefresh = false; 
  var lastTouchY = 0; 
  var touchstartHandler = function(e) { 
    if (e.touches.length != 1) return; 
    lastTouchY = e.touches[0].clientY; 
    // Pull-to-refresh will only trigger if the scroll begins when the 
    // document's Y offset is zero. 
    maybePreventPullToRefresh = window.pageYOffset == 0; 
  } 

  var touchmoveHandler = function(e) { 
    var touchY = e.touches[0].clientY; 
    var touchYDelta = touchY - lastTouchY; 
    lastTouchY = touchY; 

    if (maybePreventPullToRefresh) { 
      // To suppress pull-to-refresh it is sufficient to preventDefault the 
      // first overscrolling touchmove. 
      maybePreventPullToRefresh = false; 
      if (touchYDelta > 0) { 
        e.preventDefault(); 
        return; 
      } 
    } 
  } 

  document.addEventListener('touchstart', touchstartHandler, false); 
  document.addEventListener('touchmove', touchmoveHandler, false); 
}); 

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

angular.module('Coinchoid').config(function($stateProvider) {
  return $stateProvider.state('nav', {
    abstract: true,
    templateUrl: 'states/nav.html',
    controller: 'NavCtrl'
  }).state('nav.annonce', {
    url: '/',
    controller: 'DonneCtrl',
    templateUrl: 'states/donne/view.html'
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
    editScore: function(index, nous, eux) {
      parties[index] = {
        nous: parseInt(nous),
        eux: parseInt(eux)
      };
      return $rootScope.$broadcast('score:change');
    },
    get: function(index) {
      if (!index) {
        parties;
      }
      return parties[index];
    },
    reset: function() {
      parties = [];
      localStorageService.set('results', []);
      return $rootScope.$broadcast('score:change');
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

angular.module('Coinchoid').controller('NavCtrl', function($scope, $mdSidenav, $mdBottomSheet, $mdDialog, Parties, $state) {
  $scope.toggleSidenav = function() {
    return $mdSidenav('left').toggle();
  };
  $scope.openDetails = function() {
    return $mdBottomSheet.show({
      templateUrl: 'components/details/view.html',
      controller: 'ResultatsCtrl'
    });
  };
  return $scope.reset = function(ev) {
    var confirm;
    confirm = $mdDialog.confirm().title('Nouvelle partie').ariaLabel('Nouvelle partie ?').targetEvent(ev).ok('Oui !').cancel('Annuler');
    return $mdDialog.show(confirm).then(Parties.reset);
  };
});

angular.module('Coinchoid').controller('ResultatsCtrl', function($scope, $mdDialog, $mdBottomSheet, Parties) {
  $scope.parties = Parties.getCumulativeScore();
  return $scope.edit = function(index, ev) {
    $mdBottomSheet.hide();
    return $mdDialog.show({
      controller: 'editorCtrl',
      templateUrl: 'components/editor/view.html',
      targetEvent: ev,
      clickOutsideToClose: true,
      resolve: {
        index: function() {
          return index - 1;
        }
      }
    });
  };
});

angular.module('Coinchoid').controller('editorCtrl', function($scope, $mdDialog, index, Parties) {
  $scope.result = Parties.get(index);
  $scope.cancel = function() {
    return $mdDialog.cancel();
  };
  return $scope.save = function(nous, eux) {
    Parties.editScore(index, nous, eux);
    return $mdDialog.hide();
  };
});

angular.module('Coinchoid').controller('infoCtrl', function($scope, annonce, Info) {
  return $scope.annonce = Info[annonce];
});

angular.module('Coinchoid').service('Info', function() {
  return {
    80: {
      chuSansAtout: 66,
      chuToutAtout: 133,
      reussiSansAtout: 65,
      reussiToutAtout: 130
    },
    90: {
      chuSansAtout: 58,
      chuToutAtout: 117,
      reussiSansAtout: 73,
      reussiToutAtout: 146
    },
    100: {
      chuSansAtout: 50,
      chuToutAtout: 101,
      reussiSansAtout: 81,
      reussiToutAtout: 162
    },
    110: {
      chuSansAtout: 42,
      chuToutAtout: 85,
      reussiSansAtout: 89,
      reussiToutAtout: 178
    },
    120: {
      chuSansAtout: 34,
      chuToutAtout: 68,
      reussiSansAtout: 97,
      reussiToutAtout: 195
    },
    130: {
      chuSansAtout: 26,
      chuToutAtout: 52,
      reussiSansAtout: 105,
      reussiToutAtout: 211
    },
    140: {
      chuSansAtout: 18,
      chuToutAtout: 36,
      reussiSansAtout: 113,
      reussiToutAtout: 227
    },
    150: {
      chuSansAtout: 10,
      chuToutAtout: 20,
      reussiSansAtout: 121,
      reussiToutAtout: 243
    },
    150: {
      chuSansAtout: 2,
      chuToutAtout: 4,
      reussiSansAtout: 129,
      reussiToutAtout: 259
    },
    170: {
      chuSansAtout: 1,
      chuToutAtout: 1,
      reussiSansAtout: 130,
      reussiToutAtout: 262
    },
    180: {
      chuSansAtout: 1,
      chuToutAtout: 1,
      reussiSansAtout: 130,
      reussiToutAtout: 262
    },
    capot: {
      chuSansAtout: 1,
      chuToutAtout: 1,
      reussiSansAtout: 130,
      reussiToutAtout: 262
    }
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
      annonce: '=',
      bonus: '='
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

angular.module('Coinchoid').controller('DonneCtrl', function($scope, $mdDialog, Parties) {
  var reset;
  $scope.team = 'NOUS';
  reset = function() {
    $scope.annonce = 80;
    return $scope.bonus = 'NORMAL';
  };
  $scope.ok = function(team, annonce, bonus) {
    Parties.addScore(team, annonce, bonus);
    $scope.score = Parties.getScore();
    return reset();
  };
  $scope.ko = function(team, annonce, bonus) {
    if (team === 'NOUS') {
      Parties.addScore('EUX', annonce, bonus);
    } else {
      Parties.addScore('NOUS', annonce, bonus);
    }
    return reset();
  };
  return $scope.openInfo = function(annonce, ev) {
    return $mdDialog.show({
      controller: 'infoCtrl',
      templateUrl: 'components/info/view.html',
      targetEvent: ev,
      clickOutsideToClose: true,
      resolve: {
        annonce: function() {
          return annonce;
        }
      }
    });
  };
});
