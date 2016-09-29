angular.module 'Coinchoid'
.controller 'ResultatsCtrl', ($scope, Parties, $state) ->
  $scope.parties = Parties.getCumulativeScore()

  $scope.reset = ->
    Parties.reset()
    $state.go('annonce')
