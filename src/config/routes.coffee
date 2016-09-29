angular.module 'Coinchoid'
.config ($stateProvider) ->
  $stateProvider

  .state 'annonce',
    url: '/'
    controller: 'DonneCtrl'
    templateUrl: 'states/donne/view.html'

  .state 'resultats',
    url: '/resultats'
    controller: 'ResultatsCtrl'
    templateUrl: 'states/resultats/view.html'
