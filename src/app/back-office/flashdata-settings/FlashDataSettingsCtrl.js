module.exports = function ($scope, $rootScope, $state, $location, $http, $firebaseService, $ngRedux) {
  var self = this

  // functions declarations
  self.init = init
  self.save = save
  self.cancel = cancel
  self.addFlashData = addFlashData
  self.setTableParams = setTableParams
  self.numFlashsData = numFlashsData
  self.searchFlashData = searchFlashData
  self.createFlashData = createFlashData
  self.updateFlashData = updateFlashData
  self.loadFormThisFlashData = loadFormThisFlashData
  self.deleteThisFlashData = deleteThisFlashData
  // attributes declarations
  self.pageTitle = null // string: card title
  self.flashDataArray = null // array: array with flashData objects
  self.tableHide = false
  self.flashDataEdit = {}
  // attributes initialization
  self.init()

  function init () {
    self.pageTitle = 'Flash Data'
    let unsubscribe = $ngRedux.connect(getState, dispatchActions)((state, action) => serializeState(state))
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      console.log('flashdata state: ', state)
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
      self.flashDataArray = state.admin.state.flashdata // upload overlays
      console.log('flashsdatas')
      console.log(self.flashDataArray)
    }
    self.setTableParams()
  }

  function save (form) {
    if (form.formOption === 'create') {
      console.log('create')
      form.formOption = undefined
      self.createFlashData(form)
    } else if (form.formOption === 'update') {
      form.formOption = undefined
      self.updateFlashData(form)
    } else {
      self.init()
      $state.go('admin.flashdatasettings')
    }
    self.tableHide = false
    self.flashDataEdit = {}
  }

  function createFlashData (flashObj) {
    let endpoint = '/admin/flashdata'
    $firebaseService.createChild(endpoint, flashObj)
    .then(createCompleto)
    .catch(createFailed)

    function createCompleto (response) {
      console.log('sucess')
      console.log(response)
      self.init()
      $state.go('admin.flashdatasettings')
    }

    function createFailed (response) {
      console.log('error')
      console.log(response.status)
    }
  }

  function updateFlashData (flashObject) {
    let endpoint = '/admin/flashdata/' + flashObject.$key.toString()
    $firebaseService.insertChild(endpoint, flashObject)
    .then(updateComplete)
    .catch(updateFailed)

    function updateComplete (response) {
      console.log('success')
      console.log(response)
      self.init()
      $state.go('admin.flashdatasettings')
    }

    function updateFailed (response) {
      console.log('error')
      console.log(response)
    }
  }

  function cancel () {
    self.tableHide = false
    self.flashDataEdit = {}
  }

  function addFlashData () {
    self.tableHide = true
    self.formTitle = 'New flashData'
    self.flashDataEdit.formOption = 'create'
  }

  function loadFormThisFlashData (flash) {
    self.flashDataEdit = flash
    self.tableHide = true
    self.formTitle = 'Editar flash data'
    self.flashDataEdit.formOption = 'update'
  }

  function deleteThisFlashData (flash) {
    let endpoint = '/admin/flashdata/' + flash.$key
    $firebaseService.deleteChild(endpoint)
    .then(deleteComplete)
    .catch(deleteFailed)

    function deleteComplete (response) {
      console.log('success')
      console.log(response)
      self.init()
      $state.go('admin.flashdatasettings')
    }

    function deleteFailed (response) {
      console.log('error')
      console.log(response)
    }
  }

  function numFlashsData () {
    if (!self.flashDataArray) {
      return 0
    } else {
      return Object.keys(self.flashDataArray).length
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
            return self.numFlashsData()
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
  function searchFlashData () {
    self.tableParams.searchField = ''
    self.tableParams.displaySearchBar = !self.tableParams.displaySearchBar
  }
}
