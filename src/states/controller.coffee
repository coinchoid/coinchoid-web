angular.module 'Coinchoid'
.controller 'NavCtrl', ($scope, $mdSidenav, $mdBottomSheet, $mdDialog, Parties, $state) ->

  $scope.toggleSidenav = ->
    $mdSidenav('left').toggle()

  $scope.openDetails = ->
    $mdBottomSheet.show({
      templateUrl: 'components/details/view.html',
      controller: 'ResultatsCtrl'
    })

  $scope.reset = (ev) ->
    confirm = $mdDialog
      .confirm()
      .title('Nouvelle partie')
      .ariaLabel('Nouvelle partie ?')
      .targetEvent(ev)
      .ok('Oui !').cancel('Annuler')

    $mdDialog.show(confirm).then Parties.reset
