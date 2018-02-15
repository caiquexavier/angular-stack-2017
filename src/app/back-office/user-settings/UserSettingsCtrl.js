module.exports = function ($scope, $rootScope, $state, $location, $http, $firebaseService, $cryptoService, $ngRedux) {
  var self = this

  self.pageTitle = 'Usuários'
  self.session = null
  // props
  self.userSearch = true
  self.user = {}
  self.users = []
  self.visiblePass = 'password'
  self.visibleForm = false
  self.action = null
  // functions
  self.init = init
  self.save = save
  self.update = update
  self.cancel = cancel
  self.setPaginationTable = setPaginationTable
  self.stateSearchUser = stateSearchUser
  self.addUser = addUser
  self.editUser = editUser
  self.generatePassword = generatePassword
  self.tooglePassword = tooglePassword
  self.toogleForm = toogleForm

  self.init()

  function init () {
    let unsubscribe = $ngRedux.connect(getState, dispatchActions)((state, actions) => serializeState(state))
    // Unsubscribe to changes when your directive is destroyed
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      return state
    }
    function dispatchActions (dispatch) {
      return true
    }
    function serializeState (state) {
      self.users = state.admin.state.users
      self.session = state.session.userSession
      if (self.session == null) {
        $state.go('login')
      }
      self.setPaginationTable()
    }
  }
  function save (userForm) {
    setLoading(true)
    $firebaseService.createUser(userForm.email, userForm.password)
    .then(
      (firebaseUser) => serializeNewUser(firebaseUser.uid, userForm)
    )
    .catch(
      (error) => handleError(error)
    )
    function serializeNewUser (userId, user) {
      user.password = user.passwordHash
      var userObj = {
        [userId]: user
      }
      $firebaseService.insertChild('/admin/users', userObj).then(insertComplete())
      .catch(
        (error) => handleError(error)
      )
      function insertComplete () {
        $rootScope.throwMessage('Usuário incluído com sucesso...')
        setLoading(false)
        toogleForm(false)
      }
    }
  }
  function update (userForm) {
    setLoading(true)
    userForm.password = userForm.passwordHash
    var endpoint = '/admin/users/' + userForm.$key.toString()
    $firebaseService.insertChild(endpoint, userForm)
    .then(updateComplete())
    .catch(
      (error) => handleError(error)
    )
    function updateComplete () {
      $rootScope.throwMessage('Usuário atualizado com sucesso...')
      setLoading(false)
      toogleForm(false)
    }
  }
  function cancel () {
    toogleForm(false)
  }
  function setPaginationTable () {
    self.paginationParams = {
      'rowsLim': 10,
      'currentPage': 1,
      'limitOptions': [
        10,
        {
          'label': 'todos',
          'value': function () {
            return self.users.length
          }
        }
      ],
      'labelOptions': {
        'page': 'Página',
        'rowsPerPage': 'Linhas por página:',
        'of': 'de'
      }
    }
  }
  function stateSearchUser () {
    self.userSearch = !self.userSearch
    self.userFilter = ''
  }
  function addUser () {
    self.action = 'save'
    self.user = {}
    toogleForm(true)
    self.formTitle = 'Novo Usuario'
    self.user.type = 'usuario'
    self.user.company = 1
  }
  function editUser (userEdit) {
    self.action = 'update'
    self.user = userEdit
    toogleForm(true)
    self.formTitle = 'Editar Usuario'
    self.user.password = $cryptoService.decrypt(userEdit.passwordHash)
  }
  function generatePassword () {
    var newPassword = Math.random().toString(36).slice(-8)
    console.log('Generated pass: ', newPassword)
    self.user.password = newPassword
    self.user.passwordHash = $cryptoService.encrypt(newPassword)
    console.log('Encrypted pass: ', self.user.passwordHash)
  }
  function tooglePassword () {
    if (self.visiblePass === 'password') {
      self.visiblePass = 'text'
    } else {
      self.visiblePass = 'password'
    }
  }
  function toogleForm (value) {
    self.visibleForm = value
  }
  function handleError (error) {
    console.log(error)
    $rootScope.throwError(error.message)
  }
  function setLoading (value) {
    $rootScope.setLoading(value)
  }
}
