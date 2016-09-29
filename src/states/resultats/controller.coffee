angular.module 'Coinchoid'
.controller 'ResultatsCtrl', ($scope, Parties) ->
  $scope.parties = Parties.get()
