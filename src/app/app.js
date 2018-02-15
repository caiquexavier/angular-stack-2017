//  Application Boot Directive
import angular from 'angular'
import ngRedux from 'ng-redux'
//   Css Loaders
import '../style/app.css'
import '../../node_modules/angular-material/angular-material.css'
import '../../node_modules/angular-material-data-table/dist/md-data-table.min.css'
//  Import External Dependencies
import '../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
import '../../node_modules/angular-aria/angular-aria.js'
import '../../node_modules/angular-animate/angular-animate.js'
import '../../node_modules/angular-material/angular-material.js'
import '../../node_modules/angularfire/dist/angularfire.min.js'
import '../../node_modules/angular-material-data-table/dist/md-data-table.min.js'
import '../../bower_components/angular-toArrayFilter/toArrayFilter.js'
// start: Stores and actions
// end: Stores and Actions
//  Import Internal Dependencies
import appBoot from './app-boot.js'
import config from './config.js' //  Configuration (UiRouter/Cyrpto)
import AppDirective from './app.directive.js' //  Root Directive
import AppCtrl from './app.ctrl.js' // Root Controller
import FirebaseService from './services/firebase-service.js'
import CryptoService from './services/crypto-service.js'
import CartodbService from './services/cartodb-service.js'
// start: import app controllers
import LoginCtrl from './components/login/LoginCtrl.js'
// start: import admin controllers
import AdminCtrl from './back-office/admin/AdminCtrl.js'
import AppSettingsCtrl from './back-office/application-settings/AppSettingsCtrl.js'
import FilterSettingsCtrl from './back-office/filter-settings/FilterSettingsCtrl.js'
import FlashDataSettingsCtrl from './back-office/flashdata-settings/FlashDataSettingsCtrl.js'
import GeographySettingsCtrl from './back-office/geography-settings/GeographySettingsCtrl.js'
import OverlaySettingsCtrl from './back-office/overlay-settings/OverlaySettingsCtrl.js'
import ReportSettingsCtrl from './back-office/report-settings/ReportSettingsCtrl.js'
import UserSettingsCtrl from './back-office/user-settings/UserSettingsCtrl.js'
import AdminHomeCtrl from './back-office/admin-home/AdminHomeCtrl.js'
// start: import App controllers
import DashboardCtrl from './components/dashboard/DashboardCtrl.js'
// end: import admin controllers
const MODULE_NAME = 'app'
angular.module(MODULE_NAME, ['ui.router', 'ngMaterial', 'firebase', 'md.data.table', 'angular-toArrayFilter', ngRedux])
.service('$firebaseService', ['$http', '$rootScope', FirebaseService])
.service('$cryptoService', [CryptoService])
.service('$cartodbService', [CartodbService])
.run(['$rootScope', '$mdDialog', '$mdToast', '$firebaseService', appBoot])
.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$ngReduxProvider', config])
//  Directives Register
.directive('app', [AppDirective])
//  Controllers Register
.controller('AppCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', AppCtrl])
.controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$firebaseService', '$ngRedux', LoginCtrl])
// start: admin controllers signatures
.controller('AdminCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$mdSidenav', '$ngRedux', AdminCtrl])
.controller('AppSettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', AppSettingsCtrl])
.controller('FilterSettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$ngRedux', FilterSettingsCtrl])
.controller('FlashDataSettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$firebaseService', '$ngRedux', FlashDataSettingsCtrl])
.controller('GeographySettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$firebaseService', '$ngRedux', GeographySettingsCtrl])
.controller('OverlaySettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$firebaseService', '$ngRedux', OverlaySettingsCtrl])
.controller('ReportSettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', ReportSettingsCtrl])
.controller('UserSettingsCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', '$firebaseService', '$cryptoService', '$ngRedux', UserSettingsCtrl])
.controller('AdminHomeCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', AdminHomeCtrl])
// end: admin controllers signatures
// start: App controllers signatures
.controller('DashboardCtrl', ['$scope', '$rootScope', '$state', '$location', '$http', DashboardCtrl])
// end: App controllers signatures

export default MODULE_NAME
