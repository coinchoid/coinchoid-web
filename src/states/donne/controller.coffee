angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $mdDialog, Parties) ->
  $scope.team = 'NOUS'

  $scope.ok = (team, annonce, bonus) ->
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()

  $scope.ko = (team, annonce, bonus) ->
    if team is 'NOUS'
      Parties.addScore('EUX', annonce, bonus)
    else
      Parties.addScore('NOUS', annonce, bonus)

  $scope.openInfo = (annonce, ev) ->
    $mdDialog.show({
      controller: 'infoCtrl'
      templateUrl: 'components/info/view.html'
      targetEvent: ev
      clickOutsideToClose: true
      resolve:
        annonce: -> annonce
    })
