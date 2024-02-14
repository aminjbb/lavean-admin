<template>
  <div>
    <v-card class="d-flex align-center" height="64" color="#616161" >
        <span class="white--text ma-5 mx-15 t18600"> لیست حسابداری </span>
    </v-card>
    <v-row class="ma-0" justify="center" align="center">
      <v-col class="px-6" cols="12">
        <TableAccounting class="mt-3" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import ModalAccounting from "~/components/public/ModalAccounting";
import TableAccounting from "~/components/Accounting/TableAccounting";
export default {
  name: "IndexPage",
  components: {
    ModalAccounting,
    TableAccounting,
  },
  data() {
    return {
      message: "",
      page: 1,
      nameFilter: "",
    };
  },

  computed: {
    variants() {
      return this.$store.getters["get_variants"];
    },

    pageLength() {
      return this.$store.getters["get_variantPageLength"];
    },
  },

  methods: {
    editProduct(obj) {
      this.$store.commit("public/set_producEdit", obj);
      this.$router.push("create-product/" + obj.id);
    },
    imageCover(e) {
      try {
        return (
          process.env.baseUrl + "/media/" + e.images[0].imageThumbnail.medium
        );
      } catch (error) {
        return "";
      }
    },
    deleteProduct(id) {
      this.$store.commit("public/set_deleteModal", true);
      this.$store.commit("public/set_statusDelete", "product");
      this.$store.commit("public/set_objectId", id);
    },
    filterVariants() {
      let filter =
        ",offset:" + (this.page - 1) * 200 + ',name:"' + this.nameFilter + '"';
      this.$store.dispatch("set_variants", filter);
    },
  },

  watch: {
    page(val) {
      let page = (val - 1) * 200;
      let filter = ",offset:" + page + ',name:"' + this.nameFilter + '"';
      this.$store.dispatch("set_variants", filter);
    },
  },

  beforeMount() {
    this.$store.dispatch("set_variants", "");
  },
};
</script>
