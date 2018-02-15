module.exports = function ($rootScope, $mdDialog, $mdToast, $firebaseService) {
  $rootScope.throwError = throwError
  $rootScope.throwMessage = throwMessage
  $rootScope.setLoading = setLoading
  $firebaseService.startFirebase()
  function throwError (errorMsg) {
    showDialog(errorMsg)
  }
  function throwMessage (message) {
    showToast(message)
  }
  function setLoading (value) {
    $rootScope.isLoading = value
  }
  function showDialog (msg) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('')
      .textContent(msg)
      .ariaLabel('alert')
      .ok('Ok')
    )
  }
  function showToast (msg) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(msg)
      .position('top right')
      .hideDelay(5000)
    )
  }
  // function showConfirm (params) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.confirm()
  //   .title(params.title)
  //   .textContent(params.msg)
  //   .ariaLabel('Lucky day')
  //   .ok('Please do it!')
  //   .cancel('Sounds like a scam')
  //
  //   $mdDialog.show(confirm).then(ok, cancel)
  //
  //   function ok () {
  //     console.log('Clicked Ok')
  //   }
  //   function cancel () {
  //     console.log('Clicked Cancel')
  //   }
  // }
}
