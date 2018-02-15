module.exports = function ($scope, $rootScope, $state, $location, $http, $ngRedux) {
  var self = this

  // functions declarations
  self.init = init
  self.save = save
  self.cancel = cancel
  self.getFilterGroupsArray = getFilterGroupsArray // XXX:proxy
  self.setTableParams = setTableParams
  self.toggleSearchBar = toggleSearchBar
  self.toggleFilterForm = toggleFilterForm
  self.toggleGeography = toggleGeography
  self.isGeographySelected = isGeographySelected
  self.setFormParams = setFormParams
  self.updateGeolistDisplayCondition = updateGeolistDisplayCondition
  self.pushGeography = pushGeography

  // attributes declarations
  self.pageTitle = null // string: card title
  self.session = null // user session
  self.filterGroupsArray = null // array: stores filter groups
  self.tableParams = null // object: stores table related parameters
  self.formParams = null // object: stores params to build create/update form
  self.geographies = null // array: stores list of avaliable geographies

  // attributes initialization
  self.init()

  function init () {
    self.pageTitle = 'Filtros'
    self.filterGroupsArray = self.getFilterGroupsArray()
    self.displayFilterForm = false
    self.setTableParams()

    let unsubscribe = $ngRedux.connect(getState, dispatchActions)((state, action) => serializeState(state))
    // Unsubscribe to changes when your directive is destroyed
    $scope.$on('$destroy', unsubscribe)
    function getState (state) {
      console.log('state: ', state)
      return state
    }
    function dispatchActions (dispatch) {
      return true
    }
    function serializeState (state) {
      self.geographies = state.admin.state.geographies
      self.session = state.session.userSession

      // redirects to login if user session is null
      if (self.session === null) {
        $state.go('login')
      }

      // since form params need this, we ensure the form is set afterwards
      // XXX:not sure if this is best-practicy
      self.setFormParams()
    }
  }

  function save () {
    self.init() // rewinds component to initial state
    $state.go('admin.filtersettings')
  }

  function cancel () {
    self.init() // rewinds component to initial state
    $state.go('admin.filtersettings')
  }

  function setTableParams () {
    self.tableParams = {
      'displaySearchBar': false,
      'idSearch': '',
      'nameSearch': '',
      'rowsLim': 10,
      'currentPage': 1,
      'limitOptions': [
        10,
        30,
        50,
        {
          'label': 'todos',
          'value': function () {
            return self.filterGroupsArray.length
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
    // reset search fields
    self.tableParams.idSearch = ''
    self.tableParams.nameSearch = ''
    if (self.tableParams.displaySearchBar === true) {
      self.tableParams.displaySearchBar = false
    } else {
      self.tableParams.displaySearchBar = true
    }
  }

  function setFormParams () {
    self.formParams = {
      'display': false, // boolean: condition to display form
      'displayGeoList': false, // boolean: condition to display list of filtered geographies
      'geoRefSearch': '', // string: text to match geography's ref againt
      'name': '',
      'geographies': self.geographies, // XXX
      'selectedGeos': [],
      'variables': []
    }
  }

  function toggleFilterForm () {
    if (self.formParams.display === false) {
      self.formParams.display = true
    } else {
      self.formParams.display = false
    }
  }

  function toggleGeography (geoObj) {
    var ind = self.formParams.selectedGeos.indexOf(geoObj)
    if (ind > -1) {
      self.formParams.selectedGeos.splice(ind, 1)
    } else {
      self.formParams.selectedGeos.push(geoObj)
    }
  }

  function isGeographySelected (geoObj) {
    return (self.formParams.selectedGeos.indexOf(geoObj) !== -1)
  }

  function updateGeolistDisplayCondition (matchedGeos) {
    if (self.formParams.geoRefSearch === '' || matchedGeos.length === 0) {
      self.formParams.displayGeoList = false
    } else {
      self.formParams.displayGeoList = true
    }
  }

  function pushGeography (keyCode, matchedGeos) {
    if (keyCode === 13 && matchedGeos.length === 1) {
      self.formParams.geoRefSearch = ''
      self.toggleGeography(matchedGeos.pop())
      self.updateGeolistDisplayCondition(matchedGeos)
    } else if (keyCode === 13 && matchedGeos.length > 1) {
      console.log('match must be unique')
    } else if (keyCode === 13 && matchedGeos.length < 1) {
      self.formParams.geoRefSearch = ''
    }
  }

  // XXX:proxy for reducer (to be implemented)
  function getFilterGroupsArray () {
    return [
      {
        'json': {
          'ordem': 1100,
          'obs': 'Aqui vai um texto'
        },
        'id': 6,
        'name': 'Domic\u00edlios por Classe Econ\u00f4mica (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 7,
        'name': 'Postos de Combust\u00edveis'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 8,
        'name': 'Redes de Super/Hipermercados por Grupo'
      },
      {
        'json': {
          'ordem': 1500,
          'obs': 'IPC'
        },
        'id': 12,
        'name': '\u00cdndice de Potencial de Consumo (%BR Estimativa 2016)'
      },
      {
        'json': {
          'ordem': 10,
          'obs': 'Aqui vai um texto'
        },
        'id': 13,
        'name': 'Produto Interno Bruto (PIB)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 14,
        'name': 'Estimativa de Renda Domiciliar (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 15,
        'name': 'Chefe de Fam\u00edlia por Faixa Et\u00e1ria (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 17,
        'name': 'Popula\u00e7\u00e3o por Classe Econ\u00f4mica (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 18,
        'name': 'Domic\u00edlios por Tipo (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 19,
        'name': 'Domic\u00edlios Pr\u00f3prios ou Alugados (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 20,
        'name': 'Estimativa de Renda do Respons\u00e1vel (2016)'
      },
      {
        'json': {
          'ordem': 1000,
          'obs': 'Aqui vai um texto'
        },
        'id': 21,
        'name': 'Popula\u00e7\u00e3o Residente (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 22,
        'name': 'Popula\u00e7\u00e3o por Faixa Et\u00e1ria (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 23,
        'name': 'Chefe de Fam\u00edlia por Grau de Instru\u00e7\u00e3o (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 24,
        'name': 'Popula\u00e7\u00e3o por Grau de Instru\u00e7\u00e3o(2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 25,
        'name': '\u00cdndice de Desenvolvimento Humano'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 26,
        'name': 'Munic\u00edpios por Porte de Popula\u00e7\u00e3o (2016)'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 31,
        'name': 'TecBan por Categoria'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 36,
        'name': 'ERBs por Operadora'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 37,
        'name': 'Canais de Venda por Operadora'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 38,
        'name': 'Dorel:  Faturamento Bruto'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 39,
        'name': 'Dorel:  Quantidade Vendida'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 40,
        'name': 'Dorel:  Receita L\u00edquida'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 41,
        'name': 'Frota de Ve\u00edculos'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 42,
        'name': 'Estabelecimentos por Porte de Funcion\u00e1rios'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 43,
        'name': 'Empregos por Porte de Empresa'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 44,
        'name': 'M\u00eddia :  Cobertura Globo'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 45,
        'name': 'Vivo :  Informa\u00e7\u00f5es Setores Censit\u00e1rio MG'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 46,
        'name': 'Dorel:  Margem de Contribui\u00e7\u00e3o'
      },
      {
        'json': {
          'ordem': 1100,
          'obs': 'Aqui vai um texto'
        },
        'id': 6,
        'name': 'Domic\u00edlios por Classe Econ\u00f4mica (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 7,
        'name': 'Postos de Combust\u00edveis'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 8,
        'name': 'Redes de Super/Hipermercados por Grupo'
      },
      {
        'json': {
          'ordem': 1500,
          'obs': 'IPC'
        },
        'id': 12,
        'name': '\u00cdndice de Potencial de Consumo (%BR Estimativa 2016)'
      },
      {
        'json': {
          'ordem': 10,
          'obs': 'Aqui vai um texto'
        },
        'id': 13,
        'name': 'Produto Interno Bruto (PIB)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 14,
        'name': 'Estimativa de Renda Domiciliar (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 15,
        'name': 'Chefe de Fam\u00edlia por Faixa Et\u00e1ria (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 17,
        'name': 'Popula\u00e7\u00e3o por Classe Econ\u00f4mica (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 18,
        'name': 'Domic\u00edlios por Tipo (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 19,
        'name': 'Domic\u00edlios Pr\u00f3prios ou Alugados (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 20,
        'name': 'Estimativa de Renda do Respons\u00e1vel (2016)'
      },
      {
        'json': {
          'ordem': 1000,
          'obs': 'Aqui vai um texto'
        },
        'id': 21,
        'name': 'Popula\u00e7\u00e3o Residente (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 22,
        'name': 'Popula\u00e7\u00e3o por Faixa Et\u00e1ria (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 23,
        'name': 'Chefe de Fam\u00edlia por Grau de Instru\u00e7\u00e3o (2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 24,
        'name': 'Popula\u00e7\u00e3o por Grau de Instru\u00e7\u00e3o(2016)'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 25,
        'name': '\u00cdndice de Desenvolvimento Humano'
      },
      {
        'json': {
          'ordem': 1,
          'obs': 'Aqui vai um texto'
        },
        'id': 26,
        'name': 'Munic\u00edpios por Porte de Popula\u00e7\u00e3o (2016)'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 31,
        'name': 'TecBan por Categoria'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 36,
        'name': 'ERBs por Operadora'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 37,
        'name': 'Canais de Venda por Operadora'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 38,
        'name': 'Dorel:  Faturamento Bruto'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 39,
        'name': 'Dorel:  Quantidade Vendida'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 40,
        'name': 'Dorel:  Receita L\u00edquida'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 41,
        'name': 'Frota de Ve\u00edculos'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 42,
        'name': 'Estabelecimentos por Porte de Funcion\u00e1rios'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 43,
        'name': 'Empregos por Porte de Empresa'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 44,
        'name': 'M\u00eddia :  Cobertura Globo'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 45,
        'name': 'Vivo :  Informa\u00e7\u00f5es Setores Censit\u00e1rio MG'
      },
      {
        'json': {
          'ordem': 100,
          'obs': 'Aqui vai um texto'
        },
        'id': 46,
        'name': 'Dorel:  Margem de Contribui\u00e7\u00e3o'
      }
    ]
  }
}
