module.exports = function ($scope, $rootScope, $state, $location, $http, $firebaseService, $ngRedux) {
  var self = this

  // functions declarations
  self.init = init
  self.save = save
  self.cancel = cancel
  self.setTableParams = setTableParams
  self.searchOverlay = searchOverlay
  self.numOverlays = numOverlays
  self.addOverlay = addOverlay
  self.createOverlay = createOverlay
  self.updateOverlay = updateOverlay
  self.deleteThisOverlay = deleteThisOverlay
  self.loadFormThisOverlay = loadFormThisOverlay

  // attributes declarations
  self.pageTitle = '' // string: card title
  self.tableHide = false
  self.overlays = null
  self.stateSearchOverlay = false
  self.formTitle = ''
  self.formOption = ''
  self.overlayObject = {}

  // attributes initialization
  self.init()

  function init () {
    self.pageTitle = 'Overlays'
    let unsubscribe = $ngRedux.connect(getState, dispatchActions)((state, action) => serializeState(state))
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      console.log('overlay state: ', state)
      return state
    }
    function dispatchActions (dispatch) {
      return true
    }
    function serializeState (state) {
      self.session = state.session.userSession
      if (self.session === null) {
        $state.go('login')
      }
      self.overlays = state.admin.state.overlays // upload overlays
      console.log('overlays')
      console.log(self.overlays)
    }
    self.setTableParams()
    console.log('numero de overlays')
    console.log(Object.values(self.overlays))
  }

  function save (form) {
    console.log(form)
    if (form.formOption === 'create') {
      form.formOption = undefined
      self.createOverlay(form)
    } else if (form.formOption === 'update') {
      form.formOption = undefined
      self.updateOverlay(form)
    } else {
      self.init()
      $state.go('admin.overlaysettings')
    }
    self.tableHide = false
    self.overlayObject = {}
  }

  function cancel () {
    self.tableHide = false
    self.overlayObject = {}
  }

  function createOverlay (overlayObj) { // criar um novo overlay no banco de dados , a partir do overlay passado por parametro
    var endpoint = '/admin/overlays'
    $firebaseService.createChild(endpoint, overlayObj)
    .then(createComplete)
    .catch(createFailed)

    function createComplete (response) {
      console.log('success')
      console.log(response)
      self.init()
      $state.go('admin.overlaysettings')
    }
    function createFailed (response) {
      console.log('erro')
      console.log(response)
    }
  }
  function updateOverlay (overlayObj) { // atualizar o overlay que foi passado por parametro
    let endpoint = '/admin/overlays/' + overlayObj.$key.toString()
    $firebaseService.insertChild(endpoint, overlayObj)
    .then(updateComplete)
    .catch(updateFailed)

    function updateComplete (response) {
      console.log('success')
      console.log(response)
      self.init()
      $state.go('admin.overlaysettings')
    }

    function updateFailed (response) {
      console.log('error')
      console.log(response.status)
    }
  }

  function deleteThisOverlay (overlay) { // deletar o overlay qye foi passado pelo parametro
    var endpoint = '/admin/overlays/' + overlay.$key
    $firebaseService.deleteChild(endpoint)
    .then(deleteComplete)
    .catch(deleteFailed)

    function deleteComplete (response) {
      console.log('success dete overlay')
      console.log(response)
      self.init()
      $state.go('admin.overlaysettings')
    }

    function deleteFailed (response) {
      console.log('erro')
      console.log(response)
    }
  }

  function searchOverlay () { // procurar overlay
    self.tableParams.displaySearchBar = !self.tableParams.displaySearchBar
    self.tableParams.searchField = ''
  }

  function addOverlay () { // criar novo formulario de overlay
    self.tableHide = true
    self.formTitle = 'Novo overlay'
    self.overlayObject.formOption = 'create'
  }

  function loadFormThisOverlay (overlay) { // carregar um formulario com overlay ja existente
    self.overlayObject = overlay
    self.tableHide = true
    self.formTitle = 'Editar overlay'
    self.overlayObject.formOption = 'update'
  }

  function numOverlays () { // contar numero de elementos puxados do banco de dados
    if (!self.overlays) {
      return 0
    } else {
      return Object.keys(self.overlays).length
    }
  }

  function setTableParams () {
    self.tableParams = {
      displaySearchBar: false,
      searchField: '',
      rowsLim: 10,
      currentPage: 1,
      limitOptions: [
        10,
        30,
        50,
        {
          label: 'todos',
          value: function () {
            return self.numOverlays()
          }
        }
      ],
      labelOptions: {
        page: 'Pagina',
        rowsPerPage: 'Linhas por página:',
        of: 'de'
      }
    }
  }
}
