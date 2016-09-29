angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $state, Parties) ->
  $scope.annonce = 80

  $scope.nous = (annonce, bonus) ->
    Parties.addScore('NOUS', annonce, bonus)
    $state.go('resultats')

  $scope.eux = (annonce, bonus) ->
    Parties.addScore('EUX', annonce, bonus)
    $state.go('resultats')
