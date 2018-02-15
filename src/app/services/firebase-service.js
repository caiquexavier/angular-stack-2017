import * as firebase from 'firebase'
module.exports = function ($http, $rootScope) {
  // Define Firebase Properties
  var fireBaseConfig = {
    apiKey: 'AIzaSyAW9jOasUeCHNt2j4QqjmbUSIOuE4fFhFA',
    authDomain: 'simv2-acd42.firebaseapp.com',
    databaseURL: 'https://simv2-acd42.firebaseio.com',
    projectId: 'simv2-acd42',
    storageBucket: 'simv2-acd42.appspot.com',
    messagingSenderId: '771115314030'
  }
  var firebaseRootEndpoint = 'https://simv2-acd42.firebaseio.com/object/sim'
  // Defines Service Callback
  var firebaseService = {
    startFirebase: startFirebase,
    getChild: getChild,
    createChild: createChild,
    deleteChild: deleteChild,
    insertChild: insertChild,
    singIn: singIn,
    createUser: createUser,
    getUserToken: getUserToken
  }
  return firebaseService
  // start Functions
  function startFirebase () {
    firebase.initializeApp(fireBaseConfig)
    $rootScope.adminDbRef = firebase.database().ref('/object/sim').child('admin')
  }
  function getChild (childId) {
    return getUserToken()
    .then(
      (token) => $http.get(firebaseRootEndpoint + childId + '.json?auth=' + token)
    ).catch(
      (error) => $rootScope.throwError(error)
    )
  }
  function insertChild (childId, childObj) {
    console.log('Iserting Child Object: ', childObj, 'on: ', childId)
    return getUserToken()
    .then(
      (token) => $http.patch(firebaseRootEndpoint + childId + '.json?auth=' + token, childObj)
    ).catch(
      (error) => $rootScope.throwError(error)
    )
  }
  function createChild (endpoint, childObj) {
    console.log('Creating object: ', childObj)
    return getUserToken()
    .then(
      (token) => $http.post(firebaseRootEndpoint + endpoint + '.json?auth=' + token, childObj)
    ).catch(
      (error) => $rootScope.throwError(error)
    )
  }
  function deleteChild (endpoint) {
    console.log('Deleting object')
    return getUserToken()
    .then(
      (token) => $http.delete(firebaseRootEndpoint + endpoint + '.json?auth=' + token)
    ).catch(
      (error) => $rootScope.throwError(error)
    )
  }
  function singIn (user, password) {
    return firebase.auth().signInWithEmailAndPassword(user, password)
  }
  function createUser (email, password) {
    console.log(email, password)
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }
  function getUserToken () {
    return firebase.auth().currentUser.getIdToken(true)
  }
}
