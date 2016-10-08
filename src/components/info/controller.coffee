angular.module 'Coinchoid'
.controller 'infoCtrl', ($scope, annonce, Info) ->
  $scope.annonce = Info[annonce]
