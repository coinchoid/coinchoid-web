angular.module 'Coinchoid'
.config ($stateProvider) ->
  $stateProvider

  .state 'nav',
    abstract: true
    templateUrl: 'states/nav.html'
    controller: 'NavCtrl'

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
