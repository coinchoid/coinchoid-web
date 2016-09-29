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
  'Coinchoid.toto'
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
    .defaultIconSet 'icons/mdi.light.svg'
