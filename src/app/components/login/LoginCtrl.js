import { setUserSession } from '../../stores/actions/session-actions.js'
module.exports = function ($scope, $rootScope, $state, $location, $http, $firebaseService, $ngRedux) {
  var self = this

  self.title = 'Login'
  // props
  self.user = null
  self.password = null
  self.isLoading = false
  // functions
  self.init = init
  self.save = save
  self.setSession = setSession
  self.setLoading = setLoading
  self.handleError = handleError

  init()
  // Init Method
  function init () {
    let unsubscribe = $ngRedux.connect(getState, dispatchActions)(self)
    // Unsubscribe to changes when your directive is destroyed
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      return state
    }
    function dispatchActions (dispatch) {
      return {
        setUserSession: (userSession) => dispatch(setUserSession(userSession))
      }
    }
  }
  // Save method
  function save (login) {
    try {
      self = login
      singIn()
    } catch (error) {
      $rootScope.throwError(error.message)
    }
  }
  // Sing In Resolve
  function singIn () {
    setLoading(true)
    $firebaseService.singIn(self.user, self.password).then(
      (firebaseUser) => $firebaseService.getChild('/admin/users/' + firebaseUser.uid).then(
        (userData) => setSession(userData.data, firebaseUser)
      )
    )
    .catch((error) => handleError(error))
  }
  function setSession (userData, firebaseUser) {
    var userSession = {
      userData,
      firebaseUser
    }
    self.setUserSession(userSession)
    $state.go('dashboard')
    setLoading(false)
  }
  function setLoading (value) {
    self.isLoading = value
  }
  function handleError (error) {
    console.log(error)
    $rootScope.throwError(error.message)
  }
}
