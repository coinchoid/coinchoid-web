angular.module 'Coinchoid'
.controller 'NavCtrl', ($scope, $mdSidenav, Parties, $state) ->

  $scope.toggleSidenav = ->
    $mdSidenav('left').toggle()

  $scope.reset = ->
    Parties.reset()
    $state.go('nav.annonce', {}, {reload: true})
    $mdSidenav('left').toggle()
