angular.module 'Coinchoid'
.config ($stateProvider) ->
  $stateProvider

  .state 'home',
    url: '/'
    controller: 'DonneCtrl'
    templateUrl: 'states/donne/view.html'
