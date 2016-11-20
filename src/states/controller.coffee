angular.module 'Coinchoid'
.controller 'NavCtrl', ($scope, $mdSidenav, $mdBottomSheet) ->

  $scope.toggleSidenav = ->
    $mdSidenav('left').toggle()

  $scope.openDetails = ->
    $mdBottomSheet.show({
      templateUrl: 'components/details/view.html',
      controller: 'ResultatsCtrl'
    })
