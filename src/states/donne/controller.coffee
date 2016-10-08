angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $mdBottomSheet, Parties) ->
  $scope.team = 'NOUS'

  $scope.ok = (team, annonce, bonus) ->
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()

  $scope.ko = (team, annonce, bonus) ->
    if team is 'NOUS'
      Parties.addScore('EUX', annonce, bonus)
    else
      Parties.addScore('NOUS', annonce, bonus)

  $scope.openDetails = ->
    $mdBottomSheet.show({
      templateUrl: 'components/details/view.html',
      controller: 'ResultatsCtrl'
    })
