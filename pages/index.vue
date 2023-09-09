<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="#616161" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت محصول
          </span>
        </v-row>
      </v-card>
      <v-card height="103" class="mx-10 mt-5 br-15 " outlined>
        <v-row justify="space-between" class="pt-8 px-10">
          <v-col cols="3">
            <v-text-field v-model="nameFilter" outlined background-color="white" color="black" label="نام محصول "
                          class="br-15" filled dense></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn @click="filterProduct" icon>
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <span><v-btn to="/create-product" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn></span>
          </v-col>

        </v-row>
      </v-card>


      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="product in products" :key="product.id">
        <v-row align="center" class="fill-height">
          <v-col cols="6">
            <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
              <v-col cols="3">
                <span>
                  <v-img class="br-10" :lazy-src="imageCover(product)" height="72" width="72"
                         :src="imageCover(product)"></v-img>
                </span>
              </v-col>
              <v-col cols="6">
                <span>
                  {{ product.name }}
                </span>
              </v-col>
              <v-col cols="3">
                <v-switch @change="(event) => changeActive(event,product)" inset
                          label="فعال سازی" v-model="product.isActive"></v-switch>
              </v-col>
              <v-col cols="3">
                <span v-if="product.collection">
                  {{ product.collection.name }}
                </span>
              </v-col>

              <!-- <span>
                ۰۹/۲۵ - ۰۹/۳۰
              </span> -->
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row justify="end" align="center" class="fill-height  mr-5 pl-10">

              <span>
                <v-btn @click="editProduct(product)" icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn @click="deleteProduct(product.id)" icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

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
import {ProductListFilter} from '~/store/classes'

export default {
  name: 'IndexPage',
  data() {
    return {
      message: '',
      page: 1,
      productFilter: new ProductListFilter(),
      nameFilter: ''
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
    changeActive(event, product) {
      axios({
        method: 'put',
        url: process.env.apiUrl + 'product/admin/' + product.id + '/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
            is_active: product.isActive,
        }
      })
        .then(response => {
          this.loading = false;
          this.resetForm()
          this.$store.dispatch('set_blogCategorys', '')
        })
        .catch(err => {
          this.loading = false;
        })
    },
    filterProduct() {
      this.page = 1
      let query = 'page=' + 1 + "&"
      if (this.nameFilter) {
        query += "name=" + this.nameFilter + "&"
      }

      this.$router.push('?' + query)

    },
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
      let fillter = ',offset:' + page
      this.$store.dispatch('set_products', fillter)
    },

    $route(val) {
      console.log(val, 'route');
      let fillter = ''
      if (val.query.name) {
        fillter += ',name_Icontains:"' + val.query.name + '"'
      }
      if (val.page) {
        fillter += ',offset:' + val.page
      }
      this.$store.dispatch('set_products', fillter)
    }
  },

  beforeMount() {
    this.$store.dispatch('set_products', '')
  }
}
</script>
