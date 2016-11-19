angular.module 'Coinchoid'
.controller 'DonneCtrl', ($scope, $mdDialog, $mdToast, Parties) ->
  $scope.team = null

  reset = ->
    $scope.annonce = 80
    $scope.bonus = 'NORMAL'
    $scope.team = null

  teamAlert = (ev) ->
    $mdToast.simple().textContent('Qui a gagné ?')

  alert = $mdToast.simple().textContent('Qui a gagné ?')

  $scope.ok = (team, annonce, bonus, ev) ->
    unless team?
      return $mdToast.show alert
    Parties.addScore(team, annonce, bonus)
    $scope.score = Parties.getScore()
    reset()

  $scope.ko = (team, annonce, bonus) ->
    unless team?
      return $mdToast.show alert
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
