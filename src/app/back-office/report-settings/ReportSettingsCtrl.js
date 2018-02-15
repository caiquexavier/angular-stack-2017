module.exports = function ($scope, $rootScope, $state, $location, $http) {
  var self = this

  // functions declarations
  self.init = init
  self.save = save
  self.cancel = cancel

  // attributes declarations
  self.pageTitle = '' // string: card title

  // attributes initialization
  self.init()

  function init () {
    self.pageTitle = 'Relatórios'
  }

  function save () {
    $state.go('admin.home')
  }

  function cancel () {
    $state.go('admin.home')
  }
}
