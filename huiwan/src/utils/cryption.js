/**
 * @author zw
 * 加解密通用方法
 */
import { AES, enc, MD5 } from 'crypto-js';
import { CRYPTO_KEY } from "../config/common.cfg.js";

/**
 * 加密方法
 */
function encodeApi(msg) {
    return AES.encrypt(msg, CRYPTO_KEY).toString()
}
/**
 * 解密方法
 */
function decodeApi(msg) {
    return AES.decrypt(msg, CRYPTO_KEY).toString(enc.Utf8)
}
/**
 * 手机号正则验证
 */
function valiPhone(phone) {
    return /^1[3-9]{1}[0-9]{9}$/.test(phone + '')
}
/**
 * base64转file
 */
function base64ToFile(base64, fileName) {
    let arr = base64.split(",");
    let mime=arr[0].split(';')[0].split('/')[1]
    let bstr = window.atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new FormData([u8arr], fileName, { type: mime });
}


export {
    encodeApi,
    decodeApi,
    valiPhone,
    base64ToFile
}