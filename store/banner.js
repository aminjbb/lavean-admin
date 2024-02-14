import { gql } from 'nuxt-graphql-request';
import cookies from 'vue-cookies'
export const state = () => ({
    tableLoading: false,
    banner: [],
    bannerPageLength: 1,
})

export const mutations = {
    set_tableLoading(state, bool) {
        state.tableLoading = bool
    },
    set_banner(state, obj) {
        state.banner = obj
    },
    set_bannerPageLength(state, num) {
        state.bannerPageLength = num
    },
}

export const actions = {
    async set_banner({ commit }, form) {
        commit('set_tableLoading', true)
        const requestHeaders = {
            Authorization: "Bearer " + cookies.get("token"),
        };
        const query = gql`
                query {
                    adminBanners(${form}) {
                        results {
                          id
                          image
                          isActive
                          position
                          title
                          type
                          url
                        }
                        totalCount
                      }
                  } `;
        try {
            const result = await this.$graphql.default.request(query, {}, requestHeaders);
            commit('set_banner', result.adminBanners.results);
            console.log(result.adminBanners.results);
            commit('set_bannerPageLength', Math.ceil(result.adminBanners.totalCount / 20));
            commit('set_tableLoading', false)

        } catch (error) {
            if (error.response.status == 401 || error.response.status == 403) {
                cookies.remove("token");
                this.$router.push("/login");
            }
            commit('set_tableLoading', false)
        }




    },


}

export const getters = {
    get_tableLoading(state) {
        return state.tableLoading
    },
    get_banner(state) {
        return state.banner
    },
    get_bannerPageLength(state) {
        return state.bannerPageLength
    },

}


export function getAdminBanner() {
    console.log("end");
    // let offset = this.$route.query.page
    //     ? (parseInt(this.$route.query.page) - 1) * 20
    //     : 0
    // let type = this.$route.query.type
    //     ? this.$route.query.type
    //     : '[]'
    let staticFilter = 'limit:20000000'
    var form = `${staticFilter}`
    this.$store.dispatch('banner/set_banner', form)
}