module.exports = function ($scope, $rootScope, $state, $location, $http, $mdSidenav, $log) {
  var self = this
  self.init = init

  init()
  function init () {
    console.log('Init dashboard')
  }
}
