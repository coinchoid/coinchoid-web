angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $state, Parties) ->
  $scope.team = 'NOUS'

  $scope.ok = (team, annonce, bonus) ->
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()

  $scope.ko = (team, annonce, bonus) ->
    if team is 'NOUS'
      Parties.addScore('EUX', annonce, bonus)
    else
      Parties.addScore('NOUS', annonce, bonus)
