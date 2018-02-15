import CryptoJS from '../../../bower_components/crypto-js/crypto-js.js'
module.exports = function ($http, $rootScope) {
  var cryptoKey = 'G30m3rc4d0'
  // Defines Service Callback
  var cryptoService = {
    encrypt: encrypt,
    decrypt: decrypt
  }
  return cryptoService
  // start Functions
  function encrypt (message) {
    return CryptoJS.AES.encrypt(message, cryptoKey).toString()
  }
  function decrypt (message) {
    return CryptoJS.AES.decrypt(message, cryptoKey).toString(CryptoJS.enc.Utf8)
  }
}
