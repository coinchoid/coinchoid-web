angular.module 'Coinchoid'
.controller 'editorCtrl', ($scope, $mdDialog, index, Parties) ->
  $scope.result = Parties.get(index)

  $scope.cancel = ->
    $mdDialog.cancel()

  $scope.save = (nous, eux) ->
    Parties.editScore(index, nous, eux)
    $mdDialog.hide()
