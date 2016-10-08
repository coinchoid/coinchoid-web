angular.module 'Coinchoid'
.controller 'ResultatsCtrl', ($scope, $mdDialog, $mdBottomSheet, Parties) ->
  $scope.parties = Parties.getCumulativeScore()

  $scope.edit = (index, ev) ->
    $mdBottomSheet.hide()

    $mdDialog.show({
      controller: 'editorCtrl'
      templateUrl: 'components/editor/view.html'
      targetEvent: ev
      clickOutsideToClose: true
      resolve:
        index: -> index - 1
    })
