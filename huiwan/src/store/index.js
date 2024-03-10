/**
 * @author zw
 * @time 2024-02-21 
 * @description 定义状态数据管理器，实现缓存和持久化
 */
import { createPinia } from 'pinia';
import persisteStatePlugin from './persiste';
import useCommonStore from "./common";

const pinia = createPinia();
pinia.use(persisteStatePlugin)
export{
    pinia,
    useCommonStore
}