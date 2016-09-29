angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, Parties) ->
  $scope.nous = (annonce, bonus) ->
    Parties.addScore('NOUS', annonce, bonus)

  $scope.eux = (annonce, bonus) ->
    Parties.addScore('EUX', annonce, bonus)
