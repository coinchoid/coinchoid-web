angular.module 'Coinchoid.toto'
.config ($stateProvider) ->
  $stateProvider

  .state 'home',
    url: '/'
    controller: 'DoneCtrl'
    templateUrl: 'admin/states/daily-stats/view.html'
