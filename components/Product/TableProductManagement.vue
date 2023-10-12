<template>
  <v-card outlined class="br-15" elevation="0">
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="20"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item.image="{ item }">
        <v-col>
          <v-img
            class="br-10"
            aspect-ratio="1"
            max-width="70"
            v-if="item.images[0]"
            :src="baseUrl + '/media/' + item.images[0].imageThumbnail.medium"
          ></v-img>
        </v-col>
      </template>
      <template v-slot:item.status="{ item }">
        <v-switch
          @change="changeActive(item.id, item.isActive)"
          inset
          v-model="item.isActive"
        ></v-switch>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn @click="editProduct(item)" icon>
          <img src="~/assets/img/edit.svg" alt="" />
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <ModalRemoveConfirmation
          :itemName="item.name"
          :itemId="item.id"
          deleteUrl="product/admin/"
          @doSomthing="getProductAgain"
        />
        
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import ModalRemoveConfirmation from "../../components/public/ModalRemoveConfirmation.vue";
export default {
  props: {
    products: "",
  },
  components: {
    ModalRemoveConfirmation,
  },
  data() {
    return {
      headers: [
        {
          text: "تصویر",
          align: "end",
          sortable: false,
          value: "image",
          width: "200",
        },
        {
          text: "نام",
          align: "end",
          sortable: false,
          value: "name",
          width: "300",
        },
        {
          text: "فعال",
          align: "end",
          sortable: false,
          value: "status",
          width: "500",
        },
        {
          text: "ویرایش",
          align: "end",
          sortable: false,
          value: "edit",
          width: "50",
        },
        {
          text: "حذف",
          align: "end",
          sortable: false,
          value: "delete",
          width: "50",
        },
      ],
      
    };
  },
  computed: {
    baseUrl() {
      return process.env.baseUrl;
    },
  },
  methods: {
    changeActive(id, isActive) {
      axios({
        method: "put",
        url: process.env.apiUrl + "product/admin/" + id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          is_active: isActive,
        },
      })
        .then((response) => {
          this.loading = false;
          //   this.resetForm();
          this.$store.dispatch("set_blogCategorys", "");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    editProduct(obj) {
      this.$store.commit("public/set_producEdit", obj);
      this.$router.push("create-product/" + obj.id);
    },
    getProductAgain(){
        this.$store.dispatch("set_products", "")
    }
    // deleteProduct(id) {
    //   this.$store.commit("public/set_deleteModal", true);
    //   this.$store.commit("public/set_statusDelete", "product");
    //   this.$store.commit("public/set_objectId", id);
    // },
  },
};
</script>