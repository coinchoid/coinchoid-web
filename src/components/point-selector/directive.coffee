angular.module 'Coinchoid'
.directive 'pointSelector', ->
  restrict: 'E'
  templateUrl: 'components/point-selector/view.html'
  scope:
    annonce: '='
  controller: 'pointSelectorCtrl'
