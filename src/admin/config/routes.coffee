angular.module 'Coinchoid.toto'
.config ($stateProvider) ->
  $stateProvider

  .state 'home',
    url: '/'
    controller: 'StatsCtrl'
    templateUrl: 'admin/states/daily-stats/view.html'
