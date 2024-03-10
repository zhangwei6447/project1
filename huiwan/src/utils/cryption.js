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
export {
    encodeApi,
    decodeApi,
    valiPhone
}