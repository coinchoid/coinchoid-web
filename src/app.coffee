'use strict'

app = angular.module 'Coinchoid', [
  'ng'
  'ngResource'
  'ngAnimate'
  'ngSanitize'
  'ngMaterial'
  'ngMessages'
  'ui.router'
  'app.templates'
  'LocalStorageModule'
]

app.config (
  $locationProvider
  $urlRouterProvider
) ->

  $locationProvider.hashPrefix '!'

  $urlRouterProvider.otherwise '/'

app.config (localStorageServiceProvider) ->
  localStorageServiceProvider.setPrefix ''

app.config ($mdIconProvider) ->
  $mdIconProvider
    .defaultIconSet 'images/icons/mdi.light.svg'

app.config ($mdThemingProvider) ->
  $mdThemingProvider.theme('default')
    .primaryPalette('lime')
    .accentPalette('blue-grey')
