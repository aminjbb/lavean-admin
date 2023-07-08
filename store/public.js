import axios from 'axios'
import cookies from 'vue-cookies'
import { gql } from 'nuxt-graphql-request';

export const strict = false
export const state = () => ({
    provinces: [],
    citys: [],
    producEdit: '',
    categoryEdit: '',
    deleteModal: false,
    statusDelete: '',
    objectId:''

})

export const mutations = {
    set_objectId(state , id){
        state.objectId = id
    },
    set_statusDelete(state , bool){
        state.statusDelete =bool
    },
    set_deleteModal(state, bool) {
        state.deleteModal = bool
    },
    set_categoryEdit(state, obj) {
        state.categoryEdit = obj
    },

    set_producEdit(state, obj) {
        state.producEdit = obj
    },

    set_citys(state, obj) {
        state.citys = obj
    },

    set_provinces(state, obj) {
        state.provinces = obj
    },
}



export const actions = {
    async set_citys({ commit }, id) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            clientCities(limit:1000 ,province_Id: `+ id + `){
                results{
                    id,
                    name
                }
            }
          } `;
        const me = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_citys', me.clientCities.results);
    },
    async set_provinces({ commit }) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            clientProvinces(limit:1000){
                results{
                    id,
                    name
                }
            }
          } `;
        const me = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_provinces', me.clientProvinces.results);
    },
}


export const getters = {
    get_objectId(state){
       return state.objectId
    },
    get_statusDelete(state ){
       return state.statusDelete
    },
    get_deleteModal(state) {
        return state.deleteModal
    },
    get_categoryEdit(state) {
        return state.categoryEdit
    },

    get_producEdit(state) {
        return state.producEdit
    },

    get_citys(state) {
        return state.citys
    },
    get_provinces(state) {
        return state.provinces
    },
}