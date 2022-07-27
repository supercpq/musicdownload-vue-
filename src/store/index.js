//引入Vuex
import Vuex from 'vuex';
import Vue from "vue";
import musicList from './musiclists'

//使用vuex来集中管理状态,必要
//new store的前提是必须要使用Vuex插件
Vue.use(Vuex);


//创建并暴露store
export default new Vuex.Store({
    modules: {
        musicList,
    }
});
