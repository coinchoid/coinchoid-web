angular.module 'Coinchoid'
.directive 'score', ->
  restrict: 'E'
  templateUrl: 'components/scores/view.html'
  controller: 'scoreCtrl'
