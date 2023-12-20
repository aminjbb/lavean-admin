<template>
  <div class="text-center">
    <v-dialog v-model="modalLinkAccountingToProduct" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab @click="test" outlined v-bind="attrs" v-on="on">
          <v-icon>mdi-link-variant</v-icon>
        </v-btn>
      </template>

      <v-card min-height="700px" max-height="750px">
        <v-row class="ma-0 pa-3" align="center" justify="space-between">
          <span> اتصال کد حسابداری </span>
          <v-btn icon @click="modalLinkAccountingToProduct = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-row>
        <v-divider></v-divider>

        <v-row class="ma-0 pa-3" v-if="selectedWebhesab.length > 0">
          <v-chip
            v-for="(item, index) in selectedWebhesab"
            :key="index"
            label
            outlined
            color="FunGreen"
            class="ml-2 mb-2"
          >
            ({{ item.webhesabId }}) - {{ item.webhesabName }}
          </v-chip>
        </v-row>
        <v-row class="ma-0 pa-3" v-else align="center">
          <v-alert class="mb-0" color="red" dense outlined text type="error">
            کد مرتبط با وب حساب انتخاب نشده است
          </v-alert>
        </v-row>
        <v-divider></v-divider>
        <v-col>
          <v-text-field
            v-model="nameFilter"
            outlined
            background-color="white"
            color="black"
            label="نام محصول "
            class="br-15 mt-3"
            filled
            dense
            @keyup.enter="filterProduct"
          ></v-text-field>
        </v-col>

        <v-col>
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
        </v-col>
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
    selectedWebhesab: [],
  },
  data() {
    return {
      modalLinkAccountingToProduct: false,
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
      // let webhesabSelectedId = [];
      //   this.selectedWebhesab.forEach((element) => {
      //     var form = {
      //       id: element.id,
      //     };
      //     webhesabSelectedId.push(form);
      //   });
      let variantsID = this.selectedWebhesab.map(function (item) {
        return item["id"];
      });
      console.log(variantsID.map(Number));
       console.log(product);
        axios({
          method: "put",
          url: process.env.apiUrl + 'product/admin/bulk_assignment/' + product.id + '/' ,
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token"),
            "Content-Type": "application/json",
          },
          data: {
            variants: variantsID.map(Number),
          },
        })
          .then((response) => {
            this.modalLinkAccountingToProduct = false;
            this.$store.dispatch("set_variants", "");
            console.log(response);
          })
          .catch((err) => {
            this.loading = false;
          });
    },
  },
  //   beforeMount() {
  //     this.filterProduct();
  //   },
};
</script>