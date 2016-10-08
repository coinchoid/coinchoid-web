angular.module 'Coinchoid'
.controller 'NavCtrl', ($scope, $mdSidenav, $mdDialog, Parties, $state) ->

  $scope.toggleSidenav = ->
    $mdSidenav('left').toggle()

  $scope.reset = (ev) ->
    confirm = $mdDialog
      .confirm()
      .title('Nouvelle partie')
      .ariaLabel('Nouvelle partie ?')
      .targetEvent(ev)
      .ok('Oui !').cancel('Annuler')

    $mdDialog.show(confirm).then Parties.reset
