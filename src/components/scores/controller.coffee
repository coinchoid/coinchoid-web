angular.module 'Coinchoid'
.controller 'scoreCtrl', ($scope, $rootScope, Parties) ->
  $scope.score = Parties.getScore()

  $rootScope.$on 'score:change', ->
    $scope.score = Parties.getScore()
