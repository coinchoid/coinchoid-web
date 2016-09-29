angular.module 'Coinchoid'
.controller 'NavCtrl', ($scope, $mdSidenav, Parties, $state) ->

  $scope.toggleSidenav = ->
    $mdSidenav('left').toggle()

  $scope.reset = ->
    Parties.reset()
    $state.go('nav.annonce', {}, {reload: true})
    $mdSidenav('left').toggle()

  $scope.goToDetails = ->
    $mdSidenav('left').toggle()
    $state.go('nav.resultats')
