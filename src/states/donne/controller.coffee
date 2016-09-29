angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $state, Parties) ->
  $scope.annonce = 80
  $scope.bonus = 'NORMAL'
  $scope.team = 'NOUS'

  $scope.ok = (team, annonce, bonus) ->
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()

  $scope.ko = (team, annonce, bonus) ->
    if team is 'NOUS'
      Parties.addScore('EUX', annonce, bonus)
    else
      Parties.addScore('NOUS', annonce, bonus)
    $scope.score = Parties.getScore()

  $scope.score = Parties.getScore()

  $scope.reset = ->
    Parties.reset()
    $scope.score = Parties.getScore()
