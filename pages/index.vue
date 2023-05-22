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
      <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600">
            افزودن محصول جدید
          </span>
          <span>
            <v-btn to="/create-product" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn>
          </span>
        </v-row>
      </v-card>


      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="product in products" :key="product.id">
        <v-row align="center" class="fill-height">
          <v-col cols="4">
            <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
              <v-col cols="3">
                <span>
                  <v-img class="br-10" :lazy-src="imageCover(product)" height="72" width="72"
                    :src="imageCover(product)"></v-img>
                </span>
              </v-col>
              <v-col cols="6">
                <span>
                  {{product.name }}
                </span>
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
          <v-col cols="8">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: ''
    }
  },

  computed: {
    products() {
      return this.$store.getters['get_products']
    },

   
  },

  methods:{
    imageCover(e){
      try {
        return process.env.baseUrl + '/media/'+ e.images[0].imageThumbnail.medium
      } catch (error) {
        return ''
      }
    }
  },

  beforeMount() {
    this.$store.dispatch('set_products', '')
  }
}
</script>
