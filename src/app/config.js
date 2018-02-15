import { createLogger } from 'redux-logger'
import { rootReducer } from './stores/reducers/reducers.js'
module.exports = function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $ngReduxProvider) {
  // start: ui-router config
  var loginState = {
    name: 'login',
    url: '/login',
    template: require('./components/login/LoginView.html'),
    controller: 'LoginCtrl',
    controllerAs: 'login'
  }
  // Start: App States
  var dashboardState = {
    name: 'dashboard',
    url: '/dashboard',
    template: require('./components/dashboard/DashboardView.html'),
    controller: 'DashboardCtrl',
    controllerAs: 'dashboard'
  }
  // START:BACKOFFICE STATES
  var AdminState = {
    name: 'admin',
    url: '/admin',
    template: require('./back-office/admin/AdminView.html'),
    controller: 'AdminCtrl',
    controllerAs: 'admin'
  }
  var AppSettingsState = {
    name: 'admin.appsettings',
    url: '/appsettings',
    template: require('./back-office/application-settings/AppSettingsView.html'),
    controller: 'AppSettingsCtrl',
    controllerAs: 'appSettings'
  }
  var FilterSettingsState = {
    name: 'admin.filtersettings',
    url: '/filtersettings',
    template: require('./back-office/filter-settings/FilterSettingsView.html'),
    controller: 'FilterSettingsCtrl',
    controllerAs: 'filterSettings'
  }
  var FlashDataSettingsState = {
    name: 'admin.flashdatasettings',
    url: '/flashdatasettings',
    template: require('./back-office/flashdata-settings/FlashDataSettingsView.html'),
    controller: 'FlashDataSettingsCtrl',
    controllerAs: 'flashdataSettings'
  }
  var GeographySettingsState = {
    name: 'admin.geographysettings',
    url: '/geographysettings',
    template: require('./back-office/geography-settings/GeographySettingsView.html'),
    controller: 'GeographySettingsCtrl',
    controllerAs: 'geographySettings'
  }
  var OverlaySettingsState = {
    name: 'admin.overlaysettings',
    url: '/overlaysettings',
    template: require('./back-office/overlay-settings/OverlaySettingsView.html'),
    controller: 'OverlaySettingsCtrl',
    controllerAs: 'overlaySettings'
  }
  var ReportSettingsState = {
    name: 'admin.reportsettings',
    url: '/reportsettings',
    template: require('./back-office/report-settings/ReportSettingsView.html'),
    controller: 'ReportSettingsCtrl',
    controllerAs: 'reportSettings'
  }
  var UserSettingsState = {
    name: 'admin.usersettings',
    url: '/usersettings',
    template: require('./back-office/user-settings/UserSettingsView.html'),
    controller: 'UserSettingsCtrl',
    controllerAs: 'userSettings'
  }
  var AdminHomeState = {
    name: 'admin.home',
    url: '/home',
    template: require('./back-office/admin-home/AdminHomeView.html'),
    controller: 'AdminHomeCtrl',
    controllerAs: 'adminHome'
  }
  // END:BACKOFFICE STATES

  $stateProvider.state(loginState)
  .state(dashboardState)
  .state(AdminState)
  .state(AppSettingsState)
  .state(FilterSettingsState)
  .state(FlashDataSettingsState)
  .state(GeographySettingsState)
  .state(OverlaySettingsState)
  .state(ReportSettingsState)
  .state(UserSettingsState)
  .state(AdminHomeState)

  $urlRouterProvider.otherwise('login')
  // end: ui-router Config
  // start: Angular Material
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('red')

  //  start: Redux Config
  $ngReduxProvider.createStoreWith(rootReducer, [createLogger()])
}
