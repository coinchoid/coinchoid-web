angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $mdDialog, Parties) ->
  $scope.team = 'NOUS'

  reset = ->
    $scope.annonce = 80
    $scope.bonus = 'NORMAL'

  $scope.ok = (team, annonce, bonus) ->
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()
    reset()

  $scope.ko = (team, annonce, bonus) ->
    if team is 'NOUS'
      Parties.addScore('EUX', annonce, bonus)
    else
      Parties.addScore('NOUS', annonce, bonus)
    reset()

  $scope.openInfo = (annonce, ev) ->
    $mdDialog.show({
      controller: 'infoCtrl'
      templateUrl: 'components/info/view.html'
      targetEvent: ev
      clickOutsideToClose: true
      resolve:
        annonce: -> annonce
    })
