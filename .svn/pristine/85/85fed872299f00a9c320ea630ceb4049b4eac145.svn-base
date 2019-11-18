import CryptoJS from 'crypto-js';

export const passwordEncrypt = (userCode,password) =>{
  let pwd = CryptoJS.MD5(CryptoJS.MD5(password)+userCode).toString();
  var sendData = CryptoJS.enc.Utf8.parse(pwd);
  var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(userCode).toString());
  var iv  = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(userCode).toString());
  var encrypted = CryptoJS.AES.encrypt(sendData, key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.NoPadding});
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
