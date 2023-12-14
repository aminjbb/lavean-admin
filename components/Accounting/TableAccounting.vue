<template>
  <v-data-table
    v-model="selected"
    item-key="id"
    show-select
    :headers="headers"
    :items="variants"
    :items-per-page="200"
    hide-default-footer
  >
    <template v-slot:top>
      <v-row justify="space-between" class="pt-8 px-10">
        <v-col cols="3">
          <v-text-field
            v-model="nameFilter"
            outlined
            background-color="white"
            color="black"
            label="نام محصول "
            class="br-15"
            filled
            dense
            @keyup.enter="filterVariants"
          ></v-text-field>
        </v-col>
        <v-btn fab @click="test">
          <v-icon>mdi-link-variant</v-icon>
        </v-btn>
      </v-row>
    </template>
    <template v-slot:item.edit="{ item }">
      <ModalAccounting :variant="variant" />
    </template>
    <template v-slot:footer>
      <div class="text-center mt-5">
        <v-pagination
          v-model="page"
          :total-visible="5"
          :length="pageLength"
          circle
          color="black"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import ModalAccounting from "~/components/public/ModalAccounting";
export default {
  components: {
    ModalAccounting,
  },
  data() {
    return {
      message: "",
      page: 1,
      nameFilter: "",
      selected: [],
      headers: [
        {
          text: "وب حساب ID",
          align: "end",
          sortable: false,
          value: "webhesabId",
        },
        {
          text: "نام در وب حساب",
          align: "end",
          sortable: false,
          value: "webhesabName",
        },
        {
          text: "ویرایش",
          align: "center",
          sortable: false,
          value: "edit",
        },
      ],
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
    test(){
        console.log(this.selected);
    },
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
};
</script>