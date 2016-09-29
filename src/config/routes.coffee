angular.module 'Coinchoid'
.config ($stateProvider) ->
  $stateProvider

  .state 'nav',
    abstract: true
    templateUrl: 'states/nav.html'
    controller: 'NavCtrl'

  .state 'nav.annonce',
    url: '/'
    controller: 'DonneCtrl'
    templateUrl: 'states/donne/view.html'

  .state 'nav.resultats',
    url: '/resultats'
    controller: 'ResultatsCtrl'
    templateUrl: 'states/resultats/view.html'
