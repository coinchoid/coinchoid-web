'use strict';
var app;

app = angular.module('Coinchoid', ['ng', 'ngResource', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngTouch', 'ui.router', 'app.templates', 'LocalStorageModule']);

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
  return $mdThemingProvider.theme('default').primaryPalette('lime').accentPalette('blue-grey').backgroundPalette('grey', {
    'default': '200'
  });
});

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

angular.module('Coinchoid').config(function($stateProvider) {
  return $stateProvider.state('nav', {
    abstract: true,
    templateUrl: 'states/nav.html'
  }).state('nav.annonce', {
    url: '/',
    controller: 'DonneCtrl',
    templateUrl: 'states/donne/view.html'
  }).state('nav.annonce.new', {
    url: 'new',
    onEnter: function($mdDialog, $state, Parties) {
      return $mdDialog.show($mdDialog.confirm().title('Nouvelle partie').ariaLabel('Nouvelle partie ?').ok('Oui !').cancel('Annuler')).then(Parties.reset)["catch"](function() {
        return $state.go('^');
      });
    },
    onExit: function($mdDialog) {
      return $mdDialog.hide();
    }
  }).state('nav.annonce.details', {
    url: 'details',
    onEnter: function($mdBottomSheet, $state) {
      return $mdBottomSheet.show({
        templateUrl: 'components/details/view.html',
        controller: 'ResultatsCtrl'
      }).then(function() {
        return $state.go('^');
      })["catch"](function() {
        return $state.go('^');
      });
    },
    onExit: function($mdBottomSheet) {
      return $mdBottomSheet.hide();
    }
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
  return $scope.annonce = Info.getHelp(annonce);
});

angular.module('Coinchoid').service('Info', function() {
  return {
    getHelp: function(input) {
      if (input === 'capot' || input > 160) {
        return {
          chuSansAtout: 0,
          chuToutAtout: 0,
          reussiSansAtout: 0,
          reussiToutAtout: 0
        };
      }
      return {
        chuSansAtout: Math.ceil((162 - input) * 130 / 162),
        chuToutAtout: Math.ceil((162 - input) * 258 / 162),
        reussiSansAtout: Math.ceil(input * 130 / 162),
        reussiToutAtout: Math.ceil(input * 258 / 162)
      };
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

angular.module('Coinchoid').controller('DonneCtrl', function($scope, $mdDialog, $mdToast, Parties) {
  var alert, reset, teamAlert;
  $scope.team = null;
  reset = function() {
    $scope.annonce = 80;
    $scope.bonus = 'NORMAL';
    return $scope.team = null;
  };
  teamAlert = function(ev) {
    return $mdToast.simple().textContent('Qui a gagné ?');
  };
  alert = $mdToast.simple().textContent('Qui a gagné ?');
  $scope.ok = function(team, annonce, bonus, ev) {
    if (team == null) {
      return $mdToast.show(alert);
    }
    Parties.addScore(team, annonce, bonus);
    $scope.score = Parties.getScore();
    return reset();
  };
  $scope.ko = function(team, annonce, bonus) {
    if (team == null) {
      return $mdToast.show(alert);
    }
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
