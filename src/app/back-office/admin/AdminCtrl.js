import { setAdminState } from '../../stores/actions/admin-actions.js'
module.exports = function ($scope, $rootScope, $state, $location, $http, $mdSidenav, $ngRedux) {
  var self = this

  // functions declarations
  self.navState = true
  self.init = init
  self.quit = quit
  self.openNav = openNav
  self.invertStateNav = invertStateNav
  self.closeNav = closeNav
  // initializations
  self.pageTitle = 'Admin'
  self.sidebarNavigation = {}
  self.init()

  function init () {
    let unsubscribe = $ngRedux.connect(getState, dispatchActions)(self)
    // Unsubscribe to changes when your directive is destroyed
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      return state
    }
    function dispatchActions (dispatch) {
      return {
        setAdminState: (snap) => dispatch(setAdminState(snap))
      }
    }
    $rootScope.adminDbRef.on('value', snap => processDbSnapshot(snap))
    function processDbSnapshot (snap) {
      self.setAdminState(snap.val())
    }
    // set components to be displayed in navigation bar
    self.sidebarNavigation = {
      'items': [
        {
          'title': 'Home',
          'url': 'admin.home',
          'img': 'home'
        },
        {
          'title': 'Aplicações',
          'url': 'admin.appsettings',
          'img': 'desktop_mac'
        },
        {
          'title': 'Filtros',
          'url': 'admin.filtersettings',
          'img': 'filter_list'
        },
        {
          'title': 'Flash Data',
          'url': 'admin.flashdatasettings',
          'img': 'info_outline'
        },
        {
          'title': 'Geografias',
          'url': 'admin.geographysettings',
          'img': 'public'
        },
        {
          'title': 'Overlays',
          'url': 'admin.overlaysettings',
          'img': 'adjust'
        },
        {
          'title': 'Relatórios',
          'url': 'admin.reportsettings',
          'img': 'show_chart'
        },
        {
          'title': 'Usuários',
          'url': 'admin.usersettings',
          'img': 'supervisor_account'
        }
      ]
    }
  }
  function quit () {
    $state.go('login')
  }
  function openNav () {
    if (self.navState) {
      self.navState = !self.navState
    }
    $mdSidenav('left').toggle()
  }
  function closeNav () {
    $mdSidenav('left').close()
  }
  function invertStateNav () {
    self.navState = !self.navState
  }
}
