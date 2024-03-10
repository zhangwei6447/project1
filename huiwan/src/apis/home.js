/**
 * @author zw
 * @description 首页接口
 */

import { HOME_RECOMMEND_URL, HOME_TYPES_URL, LIST_TYPE_URL, RECOMMEND_TYPE_URL,RECOMMEND_DETAILTYPE_URL } from "../config/urls.cfg";
import request from "./ajax";


/** 首页分类数据Api */
export function homeTypesApi() {
    return request({
        url: HOME_TYPES_URL,
        method: "GET"
    })
}

/** 首页推荐列表数据Api */
export function homeRecommendApi(page,size) {
    return request({
        url: HOME_RECOMMEND_URL,
        method: 'GET',
        params:{page,size}
    })
}

/** ListType数据Api */
export function listTypeApi(){
    return request({
        url:LIST_TYPE_URL,
        method:'GET'
    })
}

/** 类型商品推荐Api */
export function recommendTypeApi(page,size,type){
    return request({
        url:RECOMMEND_TYPE_URL,
        method:'GET',
        params:{page,size,type}
    })
}

/** 详细类型商品推荐Api */
export function recommendDetailTypeApi(page,size,type,detailType){
    return request({
        url:RECOMMEND_DETAILTYPE_URL,
        method:'GET',
        params:{page,size,type,detailType}
    })
}