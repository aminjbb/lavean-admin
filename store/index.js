import axios from 'axios'
import cookies from 'vue-cookies'
import { gql } from 'nuxt-graphql-request';

export const strict = false
export const state = () => ({
    branches: [],
    collections: [],
    categories: [],
    products: [],
    blogCategorys: [],
    orders: []

})

export const mutations = {
    set_orders(state, obj) {
        state.orders = obj
    },
    set_blogCategorys(state, obj) {
        state.blogCategorys = obj
    },
    set_products(state, obj) {
        state.products = obj
    },
    set_categories(state, obj) {
        state.categories = obj
    },

    set_collections(state, obj) {
        state.collections = obj
    },

    set_branches(state, obj) {
        state.branches = obj
    },


}


export const actions = {
    async set_orders({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminOrders(limit:20  `+ form + `){
                results{
                    id,
                    finalPrice,
                    delivery{
                        id,
                        name
                    }
                    address{
                        addressDetail
                    }
                    createdAt,
                    currentStatus{
                        name
                    },
                    details{
                        variantName,
                        variantUnitPriceWithoutDiscount,
                        variantUnitPrice
                    }
                    payments{
                        id,
                        amount,
                        paidAt
                    }
                    customer{
                        client{
                            mobile
                            user{
                                firstName
                            }
                        }
                    }
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_orders', obj.adminOrders.results);
    },
    async set_blogCategorys({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminBlogCategories(limit:200  `+ form + `){
                results{
                    id,
                    name,
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_blogCategorys', obj.adminBlogCategories.results);
    },
    async set_products({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminProducts(limit:20  `+ form + `){
                results{
                    id,
                    name,
                    collection{
                        name
                    }
                    mainCategory{
                        name
                    }
                    images{
                        imageThumbnail{
                            medium
                        }
                    }
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_products', obj.adminProducts.results);
    },
    async set_categories({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminProductCategories(limit:20  `+ form + `){
                results{
                    id,
                    name,
                    image
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_categories', obj.adminProductCategories.results);
    },
    async set_collections({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminCollections(limit:20  `+ form + `){
                results{
                    id,
                    name,
                  
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_collections', obj.adminCollections.results);
    },
    async set_branches({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminBranches(limit:20  `+ form + `){
                results{
                    id,
                    name,
                    address,
                    city{
                        name
                    }
                }
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_branches', obj.adminBranches.results);
    },

}


export const getters = {
    get_orders(state) {
        return state.orders
    },
    get_blogCategorys(state) {
        return state.blogCategorys
    },
    get_products(state) {
        return state.products
    },
    get_categories(state) {
        return state.categories
    },
    get_collections(state) {
        return state.collections
    },
    get_branches(state) {
        return state.branches
    }

}