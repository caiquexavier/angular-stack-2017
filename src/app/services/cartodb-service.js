module.exports = function ($http, $rootScope) {
  // Defines Service Callback
  var cartodbService = {
    load: load
  }
  return cartodbService
  // start Functions
  function load () {
    return 'teste'
  }
}
