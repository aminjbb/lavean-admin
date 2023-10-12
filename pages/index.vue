<template>
  <div class="pb-10">
    <v-card height="64" color="GraniteGray">
      <v-row class="ma-0">
        <span class="white--text pa-5 mx-15 t18600"> مدیریت محصول </span>
      </v-row>
    </v-card>
    <v-card class="mx-5 mt-5 br-15" outlined>
      <v-row justify="space-between" class="ma-0 pa-10">
        <v-col cols="3" class="pa-0">
          <v-text-field
            v-model="nameFilter"
            outlined
            background-color="white"
            color="black"
            label="نام محصول "
            class="br-15"
            filled
            @keyup.enter="filterProduct"
            hide-details
            dense
          ></v-text-field>
        </v-col>

        <span>
          <v-btn to="/create-product" icon>
            <v-icon size="52">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </span>
      </v-row>
    </v-card>
    <div class="mx-5 mt-5">
      <TableProductManagement :products="products" />
    </div>
    <div class="text-center mt-5">
      <v-pagination
        v-model="page"
        :total-visible="5"
        :length="pageLength"
        circle
        color="black"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ProductListFilter } from "~/store/classes";
import TableProductManagement from "../components/Product/TableProductManagement.vue";
export default {
  components: {
    TableProductManagement,
  },
  name: "IndexPage",
  data() {
    return {
      message: "",
      page: 1,
      productFilter: new ProductListFilter(),
      nameFilter: "",
    };
  },

  computed: {
    products() {
      return this.$store.getters["get_products"];
    },

    pageLength() {
      console.log(this.$store.getters["get_productPageLength"] , "asdf");
      return this.$store.getters["get_productPageLength"];
    },
  },

  methods: {
    changeActive(event, product) {
      axios({
        method: "put",
        url: process.env.apiUrl + "product/admin/" + product.id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          is_active: product.isActive,
        },
      })
        .then((response) => {
          this.loading = false;
          this.resetForm();
          this.$store.dispatch("set_blogCategorys", "");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    filterProduct() {
      this.page = 1;
      let query = "page=" + 1 + "&";
      if (this.nameFilter) {
        query += "name=" + this.nameFilter + "&";
      }

      this.$router.push("?" + query);
    },
    // editProduct(obj) {
    //   this.$store.commit("public/set_producEdit", obj);
    //   this.$router.push("create-product/" + obj.id);
    // },
    // imageCover(e) {
    //   try {
    //     return (
    //       process.env.baseUrl + "/media/" + e.images[0].imageThumbnail.medium
    //     );
    //   } catch (error) {
    //     return "";
    //   }
    // },
    // deleteProduct(id) {
    //   this.$store.commit("public/set_deleteModal", true);
    //   this.$store.commit("public/set_statusDelete", "product");
    //   this.$store.commit("public/set_objectId", id);
    // },
  },

  watch: {
    page(val) {
      let page = (val - 1) * 20;
      let fillter = ",offset:" + page;
      this.$store.dispatch("set_products", fillter);
    },

    $route(val) {
      let fillter = "";
      if (val.query.name) {
        fillter += ',name_Icontains:"' + val.query.name + '"';
      }
      if (val.page) {
        fillter += ",offset:" + val.page;
      }
      this.$store.dispatch("set_products", fillter);
    },
  },

  beforeMount() {
    this.$store.dispatch("set_products", "");
  },
};
</script>
