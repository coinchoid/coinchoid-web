angular.module 'Coinchoid'
.controller 'ResultatsCtrl', ($scope, Parties, $state) ->
  $scope.parties = Parties.get()

  $scope.reset = ->
    Parties.reset()
    $state.go('annonce')
