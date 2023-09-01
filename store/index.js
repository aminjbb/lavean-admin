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
    orders: [],
    blogs: [],
    blog: '',
    customers: [],
    customer: '',
    productPageLength:1,
    blogPageLength:1,
    userPageLength:1,
    orderPageLength:1,

})

export const mutations = {
    set_orderPageLength(state , num){
        state.orderPageLength = num
    },
    set_userPageLength(state , num){
        state.userPageLength = num
    },
    set_blogPageLength(state , num){
        state.blogPageLength = num
    },
    set_productPageLength(state , num){
        state.productPageLength = num
    },
    set_customer(state, obj) {
        state.customer = obj
    },
    set_customers(state, obj) {
        state.customers = obj
    },
    set_blog(state, obj) {
        state.blog = obj
    },
    set_blogs(state, obj) {
        state.blogs = obj
    },
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
    async set_customer({ commit }, id) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminCustomer(customerId:`+ id + `){
                id
                sex
                birthdate
                nationalCode
                cartDetails{
                    variant{
                        id,
                        weight
                        price
                        product{
                            id
                            name
                            collection{
                                id
                                name
                            }
                            mainCategory{
                                id
                                name
                            }
                            images{
                                imageThumbnail{
                                    medium
                                }
                            }
                        }
                    }
                }
                orders{
                    id
                    finalPrice
                    details{
                        variantName,
                        variantUnitPriceWithoutDiscount,
                        variantUnitPrice
                    }
                }
                client{
                    id
                    mobile
                    
                    addresses{
                        id,
                        addressDetail
                        number
                    },
                    user{
                        id
                        username
                        firstName
                        lastName
                        email
                    }
                }
                   
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_customer', obj.adminCustomer);
    },
    async set_customers({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminCustomers(limit:20  `+ form + `){
                totalCount
                results{
                    id
                    sex
                    birthdate
                    cartDetails{
                        variant{
                            id,
                            weight
                            price
                            product{
                                id
                                name
                                collection{
                                    id
                                    name
                                }
                                mainCategory{
                                    id
                                    name
                                }
                                images{
                                    imageThumbnail{
                                        medium
                                    }
                                }
                            }
                        }
                    }
                    orders{
                        id
                        finalPrice
                        details{
                            variantName,
                            variantUnitPriceWithoutDiscount,
                            variantUnitPrice
                        }
                    }
                    client{
                        id
                        mobile
                        
                        addresses{
                            id,
                            addressDetail
                            number
                        },
                        user{
                            username
                            firstName
                            lastName
                            email
                        }
                    }
                }
                   
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_userPageLength', Math.round(obj.adminCustomers.totalCount / 20));
        commit('set_customers', obj.adminCustomers.results);
    },
    async set_blog({ commit }, id) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminBlogPost(blogPostId:`+ id + `){
                id,
                    mainTitle,
                    image,
                    createdAt,
                    canonical
                    schema
                    url
                    metaDescription
                    metaTitle
                    description
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        commit('set_blog', obj.adminBlogPost);
    },
    async set_blogs({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminBlogPosts(limit:20  `+ form + `){
                totalCount
                results{
                    id,
                    mainTitle,
                    image,
                    createdAt,
                    createdBy{
                        id,
                        client{
                            user{
                                firstName
                            }
                        }
                    }
                }
                   
            }
          } `;
        const obj = await this.$graphql.default.request(query, {}, requestHeaders);
        
        commit('set_blogPageLength', Math.round(obj.adminBlogPosts.totalCount / 20));
        commit('set_blogs', obj.adminBlogPosts.results);
    },
    async set_orders({ commit }, form) {
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
        query{
            adminOrders(limit:20  `+ form + `){
                totalCount
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
        commit('set_orderPageLength', Math.round(obj.adminOrders.totalCount / 20));
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
                totalCount,
                results{
                    id,
                    isActive,
                    name,
                    metaDescription,
                    metaTitle,
                    canonical,
                    schema,
                    url,
                    collection{
                        name,
                        id
                    }
                    mainCategory{
                        name,
                        id
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
        commit('set_productPageLength', Math.round(obj.adminProducts.totalCount / 20));
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
                    image,
                    url,
                    subCategories{
                        id,
                        name
                    }
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
                    lat,
                    long,

                    address,
                    city{
                        province{
                            id,
                        },
                        id
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
    get_orderPageLength(state){
       return state.orderPageLength
    },
    get_userPageLength(state){
       return state.userPageLength
    },
    get_blogPageLength(state){
       return state.blogPageLength
    },
    get_productPageLength(state){
       return state.productPageLength
    },
    get_customer(state) {
        return state.customer
    },
    get_customers(state) {
        return state.customers
    },
    get_blog(state) {
        return state.blog
    },
    get_blogs(state) {
        return state.blogs
    },
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