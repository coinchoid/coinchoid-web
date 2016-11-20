angular.module 'Coinchoid'
.config ($stateProvider) ->
  $stateProvider

  .state 'nav',
    abstract: true
    templateUrl: 'states/nav.html'

  .state 'nav.annonce',
    url: '/'
    controller: 'DonneCtrl'
    templateUrl: 'states/donne/view.html'

  .state 'nav.annonce.new',
    url: 'new'
    onEnter: ($mdDialog, $state, Parties) ->
      $mdDialog.show($mdDialog
        .confirm()
        .title('Nouvelle partie')
        .ariaLabel('Nouvelle partie ?')
        # .targetEvent(ev)
        .ok('Oui !').cancel('Annuler')
      )
      .then(Parties.reset)
      .catch -> $state.go '^'
    onExit: ($mdDialog) ->
      $mdDialog.hide()

  .state 'nav.annonce.details',
    url: 'details'
    onEnter: ($mdBottomSheet, $state) ->
      $mdBottomSheet.show(
        templateUrl: 'components/details/view.html'
        controller: 'ResultatsCtrl'
      )
      .then -> $state.go '^'
      .catch -> $state.go '^'
    onExit: ($mdBottomSheet) ->
      $mdBottomSheet.hide()
