/**
 * @author zw
 * @description 通用的其他方法
 */

// import { showToast } from "vant";
// import { cartAddApi, cartModefin, getCartList } from "../apis/cartApi";
import { useCommonStore } from "../store";



const store = useCommonStore()

/** 添加到购物车
 * params : it
 */
// function addToCart(it){
//     let obj = {
//         userId:store.userInfo.id,
//         price:it.price,
//         id:it.id,
//         time:Date.now()+'',
//         count:'1',
//         name:it.title,
//         detailaddress:it,
//         bgUrl:it.path,
//     }
//     getCartList(store.userInfo.id).then((d)=>{
//         if(d.code ==200){
//             if(d.data.some((oo)=>{return oo.id == it.id})){
//                 let theCount = 0;
//                 d.data.forEach((oo)=>{
//                     if(oo.id == it.id){
//                         theCount = oo.count
//                     }
//                 })
//                 cartModefin({
//                     userId:store.userInfo.id,
//                     id:it.id,
//                     count:(theCount-0)+1,
//                 }).then((d1)=>{
//                     if(d1.code == 200){
//                         showToast(d1.message)
//                     }
//                 })
//             }else{
//                 cartAddApi(obj).then((d2)=>{
//                     if(d2.code == 200){
//                         showToast(d2.message)
//                     }else{
//                         showToast(d2.message)
//                     }
//                 })
//             }     
//         }
//     })
// }

function scaleImage(_file){
    return new Promise(resolve => {
        let _fr = new FileReader();
        /** 等fileReader读取完成以后得到一个回调方法 */
        _fr.onload = function() {
            /** 把base64转为一个Image对象 */
            let _img = new Image()
            /** 等Image对象加载完成图片 */
            _img.onload = function() {
                /** 把我们的图片等比缩放后画到一个画布上 */
                let _canvas = document.createElement('canvas')
                /** 得到画笔 */
                let _ctx = _canvas.getContext('2d') ;
                /** 设置需要得到的图片大小 */
                let _width = 60;
                _canvas.width = _width;
                _canvas.height = _width;

                /** 算图片的缩放比率，然后得到高度和宽度 */
                let _destWidth;
                let _destHeight;
                if (_img.width < _width && _img.height < _width) {
                    _destHeight = _img.height;
                    _destWidth = _img.width;
                } else {
                    let _rate = (_img.width >= _img.height ? _img.width : _img.height) / _width;
                    /** 图片缩放后的宽度 */
                    _destWidth = _img.width / _rate;
                    _destHeight = _img.height / _rate;
                }

                /** 开始画图 */
                _ctx.drawImage(_img, 0, 0, _img.width, _img.height, (_width - _destWidth) / 2, (_width - _destHeight) / 2, _destWidth, _destHeight);
                /** 得到base64 */
                resolve(_canvas.toDataURL())
            }
            /** 开始加载图片 */
            _img.src = _fr.result ;
        }
        /** 把一个文件读成一个base64字节码 */
        _fr.readAsDataURL(_file);
    })
}
export {
    // addToCart,
    scaleImage
}

