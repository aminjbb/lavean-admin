<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="#616161" class="mx-3 mt-10">
                <v-row>
            <span class="white--text ma-5 mx-15 t18600">
              لیست حسابداری
            </span>
                </v-row>
            </v-card>
            <v-card height="103" class="mx-10 mt-5 br-15 " outlined>
                <v-row justify="space-between" class="pt-8 px-10">
                    <v-col cols="3">
                        <v-text-field v-model="nameFilter" outlined background-color="white" color="black"
                                      label="نام محصول "
                                      class="br-15" filled dense
                                      @keyup.enter="filterVariants"></v-text-field>
                    </v-col>
                </v-row>
            </v-card>
            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="variant  in variants" :key="variant.id">
                <v-row align="center" class="fill-height">
                    <v-col cols="4">
                        <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">

                            <v-col cols="6">
                  <span>
                     {{ variant.webhesabId }}
                  </span>
                            </v-col>
                            <v-col cols="6">
                  <span>
                     {{ variant.webhesabName }}
                  </span>
                            </v-col>


                        </v-row>
                    </v-col>
                    <v-col cols="8">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">
                            <ModalAccounting :variant="variant"/>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
            <div class="text-center mt-5">
                <v-pagination v-model="page" :total-visible="5" :length="pageLength" circle
                              color="black"></v-pagination>
            </div>

        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
import ModalAccounting from '~/components/public/ModalAccounting'

export default {
    name: 'IndexPage',
    components: {
        ModalAccounting
    },
    data() {
        return {
            message: '',
            page: 1,
            nameFilter: '',
        }
    },

    computed: {
        variants() {
            return this.$store.getters['get_variants']
        },

        pageLength() {
            return this.$store.getters['get_variantPageLength']
        }
    },

    methods: {
        editProduct(obj) {
            this.$store.commit('public/set_producEdit', obj)
            this.$router.push('create-product/' + obj.id)
        },
        imageCover(e) {
            try {
                return process.env.baseUrl + '/media/' + e.images[0].imageThumbnail.medium
            } catch (error) {
                return ''
            }
        },
        deleteProduct(id) {
            this.$store.commit('public/set_deleteModal', true)
            this.$store.commit('public/set_statusDelete', 'product')
            this.$store.commit('public/set_objectId', id)

        },
        filterVariants(){
            let filter = ',offset:' + (this.page - 1) * 200 + ',name:"' + this.nameFilter + '"'
            this.$store.dispatch('set_variants', filter)
        }
    },

    watch: {
        page(val) {
            let page = (val - 1) * 200
            let filter = ',offset:' + page + ',name:"' + this.nameFilter + '"'
            this.$store.dispatch('set_variants', filter)
        }
    },

    beforeMount() {
        this.$store.dispatch('set_variants', '')
    }
}
</script>
