module.exports = function ($scope, $rootScope, $state, $location, $http, $firebaseService, $ngRedux) {
  var self = this

  // functions declarations
  self.init = init
  self.save = save
  self.cancel = cancel
  self.setTableParams = setTableParams
  self.toggleSearchBar = toggleSearchBar
  self.setFormParams = setFormParams
  self.displayForm = displayForm
  self.loadFormParams = loadFormParams
  self.updateGeography = updateGeography
  self.createGeography = createGeography
  self.deleteGeography = deleteGeography
  self.numGeographies = numGeographies

  // attributes declarations
  self.pageTitle = '' // string: card title
  self.session = null // object: user session
  self.geographies = null // array: stores list of geographies
  self.tableParams = null // object: json to configure table parameters
  self.formParams = null // object: json to configure create/update form

  // attributes initialization
  self.init()

  function init () {
    self.pageTitle = 'Geografias'

    let unsubscribe = $ngRedux.connect(getState, dispatchActions)((state, action) => serializeState(state))
    // Unsubscribe to changes when your directive is destroyed
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      console.log('state: ')
      console.log(state)
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
      self.geographies = state.admin.state.geographies

      self.setTableParams()
      self.setFormParams()
    }
  }

  function save (form) {
    if (form.mode === 'update') {
      self.updateGeography(form.geoObj)
    } else if (form.mode === 'create') {
      self.createGeography(form.geoObj)
    } else {
      self.init()
      $state.go('admin.geographysettings')
    }
  }

  function cancel () {
    self.init() // rewinds to initial state
    $state.go('admin.geographysettings')
  }

  function numGeographies () {
    if (!self.geographies) { // XXX:gambs
      return 0
    } else {
      return Object.keys(self.geographies).length
    }
  }

  function updateGeography (geoObj) {
    var endpoint = '/admin/geographies/' + geoObj.$key.toString()
    $firebaseService.insertChild(endpoint, geoObj)
      .then(updateComplete)
      .catch(updateFailed)

    function updateComplete (response) {
      console.log('success')
      console.log(response)

      self.init() // rewinds component
      $state.go('admin.geographysettings')
    }

    function updateFailed (err) {
      console.log('ERROR')
      console.log(err)
    }
  }

  function createGeography (geoObj) {
    var endpoint = '/admin/geographies'
    $firebaseService.createChild(endpoint, geoObj)
      .then(createComplete)
      .catch(createFailed)

    function createComplete (response) {
      console.log('success')
      console.log(response)

      self.init() // rewinds component
      $state.go('admin.geographysettings')
    }

    function createFailed (err) {
      console.log('ERROR')
      console.log(err)
    }
  }

  function deleteGeography (geoObj) {
    var endpoint = '/admin/geographies/' + geoObj.$key
    $firebaseService.deleteChild(endpoint)
      .then(deleteComplete)
      .catch(deleteFailed)

    function deleteComplete (response) {
      console.log('success')
      console.log(response)

      self.init() // rewinds component
      $state.go('admin.geographysettings')
    }

    function deleteFailed (err) {
      console.error('ERROR')
      console.log(err)
    }
  }

  function setTableParams () {
    self.tableParams = {
      'displaySearchBar': false,
      'refSearch': '', // search by ref string
      'geoSearch': '', // search by geography string
      'rowsLim': 10,
      'currentPage': 1,
      'limitOptions': [
        10,
        30,
        50,
        {
          'label': 'todos',
          'value': function () {
            return self.numGeographies()
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

  function toggleSearchBar () {
    self.tableParams.refSearch = ''
    self.tableParams.geoSearch = ''
    if (self.tableParams.displaySearchBar === false) {
      self.tableParams.displaySearchBar = true
    } else {
      self.tableParams.displaySearchBar = false
    }
  }

  function setFormParams () {
    self.formParams = {
      'mode': 'create', // XXX:should it come from global variable?
      'display': false,
      'geoObj': {}
    }
  }

  function displayForm () {
    self.formParams.display = true
  }

  function loadFormParams (geoObj) {
    self.formParams = {
      'mode': 'update',
      'display': true,
      'geoObj': geoObj
    }
  }
}
