<template>
  <div class="rcontainer">
    <v-form v-model="valid" ref="addProduct">
      <v-row justify="center" class="mt-15 pt-10">
        <v-col cols="6">
          <v-row justify="center">
            <v-card elevation="0" outlined class="position__relative br-25">
              <v-img
                aspect-ratio="1"
                max-width="170"
                width="170"
                :src="
                  pre.base64
                    ? pre.base64
                    : require('~/assets/img/add-image.png')
                "
              >
                <v-file-input
                  class="default-file-input"
                  v-model="image"
                  hide-details
                  accept="image/*"
                ></v-file-input>
              </v-img>
            </v-card>
          </v-row>
          <div class="mt-6">
            <v-text-field
              :rules="rules"
              v-model="pre.name"
              color="black"
              label="Alternative name"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-text-field>
            <v-textarea
              v-model="pre.dec"
              color="black"
              label="Alternative Caption"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-textarea>
          </div>

          <v-btn
            @click="saveImage()"
            color="DeepGreen"
            class="br-10 px-5"
            outlined
          >
            <span class="t14400"> آپلود عکس </span>
          </v-btn>

          <v-row class="ma-0">
            <v-col
              cols="3"
              v-for="(item, i) in main"
              :key="i"
              class="position__relative"
            >
              <v-card elevation="0" outlined class="position__relative br-25">
                <v-img aspect-ratio="1" max-width="400" :src="item.base64">
                </v-img>
              </v-card>
              <ModalRemoveConfirmation
                :itemName="item.name"
                :modalRemoveConfirmationNeed="modalRemoveConfirmationNeed"
                :image="item.base64"
                @doSomthing="removeImage(item.image)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-from v-model="valid" ref="product">
            <v-text-field
              v-model="product.name"
              :rules="rule"
              color="black"
              label="نام محصول"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-text-field>
            <v-select
              :items="categories"
              v-model="product.category"
              :rules="rule"
              color="black"
              label="دسته بندی"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-select>
            <v-select
              :items="collections"
              v-model="product.collection"
              color="black"
              label="کالکشن"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-select>
            <v-textarea
              v-model="product.description"
              color="black"
              label="توضیح"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-textarea>
          </v-from>
        </v-col>
        <v-col cols="12">
          <v-row justify="end" class="my-10">
            <v-btn
              dark
              @click="validate()"
              :loading="loading"
              color="DeepGreen"
              class="br-10 mr-5"
              width="199"
              height="44"
            >
              <span class="t14400 white--text"> ساخت محصول </span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import FAQA from "~/components/Product/FAQA.vue";
import axios from "axios";
import ModalRemoveConfirmation from "../../components/public/ModalRemoveConfirmation.vue";
export default {
  components: {
    FAQA,
    ModalRemoveConfirmation,
  },
  data() {
    return {
      image: "",
      pre: {
        image: "",
        base64: "",
        name: "",
        desc: "",
      },
      main: [],
      valid: true,
      rule: [(v) => !!v || "این فیلد الزامی است"],
      loading: false,
      product: {
        name: "",
        category: "",
        collection: "",
        metaTitle: "",
        metaDescription: "",
        canonical: "",
        url: "",
      },
      modalRemoveConfirmationNeed: {
        needicon: true,
        icon: "mdi-close-circle",
        color: "",
        iconColor: "error",
        fab: false,
        text: false,
        btnText: false,
        absolute: true,
        class: "btn_delete-card",
        small: false,
      },
    };
  },

  methods: {
    test() {
      console.log(this.main);
    },
    imageToBase64() {
      if (this.image) {
        this.pre.image = this.image;
        var imageFile = this.image;
        var fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          this.pre.base64 = srcData;
        };
        fileReader.readAsDataURL(imageFile);
      }
    },
    saveImage() {
      if (this.pre.base64) {
        this.main.push(this.pre);
        this.pre = {
          image: "",
          base64: "",
          name: "",
          desc: "",
        };
      }
    },

    validate() {
      this.$refs.addProduct.validate();
      setTimeout(() => {
        if (this.valid) {
          this.createProduct();
        }
      }, 200);
    },

    createProduct() {
      this.loading = true;
      axios({
        method: "post",
        url: process.env.apiUrl + "product/admin/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          // "Content-Type": "multipart/form-data",
        },
        data: {
          name: this.product.name,
          meta_description: this.product.metaDescription,
          meta_title: this.product.metaTitle,
          canonical: this.product.canonical,
          url: this.product.url,
          collection: this.product.collection,
        },
      })
        .then(async (response) => {
          this.categoryAssignment(response.data.id);
          await this.uploadImages(response.data.id);
          this.loading = false;
          this.$router.push("/");
          this.$store.dispatch("set_products", "");
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    categoryAssignment(id) {
      axios({
        method: "post",
        url: process.env.apiUrl + "category/admin/assignment/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
        data: {
          product: id,
          category: this.product.category,
        },
      })
        .then((response) => {})
        .catch((err) => {
          this.loading = false;
        });
    },

    async uploadImages(product_id) {
      for (const element of this.main) {
        await this.uploadImage(element, product_id);
      }
    },

    async uploadImage(obj, id) {
      return await axios({
        method: "post",
        url: process.env.apiUrl + "image/admin/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
        data: {
          product: id,
          image: obj.image,
          caption: obj.name,
        },
      })
        .then((response) => {})
        .catch((err) => {
          this.loading = false;
        });
    },

    removeImage(e) {
      const indexOfObject = this.main.findIndex((object) => {
        return object.image === e;
      });
      this.main.splice(indexOfObject, 1);
    },
  },

  watch: {
    image(val) {
      console.log(val);
      this.imageToBase64();
    },
  },

  beforeMount() {
    this.$store.dispatch("set_categories", "");
    this.$store.dispatch("set_collections", "");
  },

  computed: {
    categories() {
      var cats = [];
      this.$store.getters["get_categories"].forEach((element) => {
        var form = {
          text: element.name,
          value: element.id,
        };
        cats.push(form);
      });
      return cats;
    },
    collections() {
      var collections = [];
      this.$store.getters["get_collections"].forEach((element) => {
        var form = {
          text: element.name,
          value: element.id,
        };
        collections.push(form);
      });
      return collections;
    },
  },
};
</script>
