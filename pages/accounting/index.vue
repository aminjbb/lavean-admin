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
  
        <v-card height="103" outlined class="ma-3 mx-10 br-15">
          <v-row align="center" class="fill-height">
            <v-col cols="4">
              <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
              
                <v-col cols="6">
                  <span>
                 تست 
                  </span>
                </v-col>
        
  
              </v-row>
            </v-col>
            <v-col cols="8">
              <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <ModalAccounting/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <div class="text-center mt-5">
          <v-pagination v-model="page" :total-visible="5" :length="pageLength" circle color="black"></v-pagination>
        </div>
        
      </v-col>
    </v-row>
  </template>
  
  <script>
  import axios from 'axios'
  import ModalAccounting from '~/components/public/ModalAccounting'
  export default {
    name: 'IndexPage',
    components:{
        ModalAccounting
    },
    data() {
      return {
        message: '',
        page: 1
      }
    },
  
    computed: {
      products() {
        return this.$store.getters['get_products']
      },
  
      pageLength() {
        return this.$store.getters['get_productPageLength']
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
  
      }
    },
  
    watch: {
      page(val) {
        let page = (val - 1) * 20
        let fillter = ',offset:'+page
        this.$store.dispatch('set_products', fillter)
      }
    },
  
    beforeMount() {
      this.$store.dispatch('set_products', '')
    }
  }
  </script>
  