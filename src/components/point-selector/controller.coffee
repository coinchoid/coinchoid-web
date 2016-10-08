angular.module 'Coinchoid'
.controller 'pointSelectorCtrl', ($scope) ->
  $scope.firstRangeAnnonce = true
  $scope.annonce = 80
  $scope.bonus = 'NORMAL'

  $scope.select = (annonce) ->
    $scope.annonce = annonce

  $scope.toggleAnnonces = ->
    $scope.firstRangeAnnonce = not $scope.firstRangeAnnonce