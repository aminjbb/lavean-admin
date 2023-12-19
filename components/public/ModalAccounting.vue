<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <img src="~/assets/img/edit.svg" alt="" />
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          اتصال موجودی وب حساب به محصولات سایت
        </v-card-title>

        <v-card height="103" class="mx-10 mt-5 br-15" outlined>
          <v-row justify="space-between" class="pt-8 px-10">
            <v-col cols="12">
              <v-text-field
                v-model="nameFilter"
                outlined
                background-color="white"
                color="black"
                label="نام محصول "
                class="br-15"
                filled
                dense
                @keyup.enter="filterProduct"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <v-divider></v-divider>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-right">کد محصول</th>
                <th class="text-right">نام محصول</th>
                <th class="text-right">اتصال</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <v-btn
                    color="primary"
                    @click="assignVariantToProduct(product)"
                  >
                    اتصال</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import { gql } from "nuxt-graphql-request";
import axios from "axios";

export default {
  props: {
    variant: Object,
  },
  data() {
    return {
      dialog: false,
      products: [],
      nameFilter: "",
      items: [],
    };
  },
  methods: {
    async filterProduct() {
      const requestHeaders = {
        Authorization: "Bearer " + cookies.get("token"),
      };
      const query = gql`
                query{
                  adminProducts(name_Icontains:"${this.nameFilter}", limit:100){
                    results{
                      id,
                      name
                    }
                  }
                }`;
      const obj = await this.$graphql.default.request(
        query,
        {},
        requestHeaders
      );
      this.products = obj.adminProducts.results;
    },
    assignVariantToProduct(product) {
      console.log(product.id, this.variant.id);
      axios({
        method: "patch",
        url: process.env.apiUrl
          .concat("variant/admin/")
          .concat(this.variant.id)
          .concat("/"),
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          "Content-Type": "application/json",
        },
        data: {
          product: product.id,
        },
      })
        .then((response) => {
          this.dialog = false;
          this.$store.dispatch("set_variants", "");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  beforeMount() {
    this.filterProduct();
  },
};
</script>
