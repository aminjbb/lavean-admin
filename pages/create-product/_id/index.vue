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
            @click="uploadImage"
            color="DeepGreen"
            class="br-10 px-5"
            outlined
            :loading="loadingImage"
          >
            <span class="t14400"> آپلود عکس </span>
          </v-btn>
          <v-row class="mt-6">
            <v-col
              cols="3"
              v-for="(item, i) in productById.images"
              :key="i"
              class="position__relative"
            >
              <v-card elevation="0" outlined class="position__relative br-25">
                <v-img
                  aspect-ratio="1"
                  max-width="400"
                  :src="baseUrl + '/media/' + item.imageThumbnail.medium"
                >
                </v-img>
              </v-card>
              <ModalRemoveConfirmation
                :itemName="item.caption"
                :modalRemoveConfirmationNeed="modalRemoveConfirmationNeed"
                :image="baseUrl + '/media/' + item.imageThumbnail.medium"
                @doSomthing="deleteImage(item.image)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-from v-model="valid" ref="product">
            <div>
              <v-text-field
                v-model="product.name"
                :rules="rule"
                color="black"
                label="نام محصول"
                class="br-10"
                outlined
                background-color="Cultured"
              ></v-text-field>
              <v-text-field
                v-model="product.url"
                color="black"
                label="url "
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
            </div>
          </v-from>
        </v-col>
      </v-row>
      <v-row justify="start" class="mt-15 pt-10">
        <v-col cols="6">
          <!-- <div class="box-card mr-10 py-15 pt-8">
            <v-row justify="center">
              <v-col cols="9">
                <v-text-field
                  color="black"
                  label="Past URL"
                  class="br-10 py-2"
                  hide-details
                  filled
                  dense
                ></v-text-field>

                <v-text-field
                  v-model="product.url"
                  color="black"
                  label="New URL"
                  class="br-10"
                  py-1
                  hide-details
                  filled
                  dense
                ></v-text-field>

                <v-text-field
                  color="black"
                  label="page"
                  class="br-10 py-2"
                  hide-details
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <span class="t18400">Redirect</span>
              </v-col>
            </v-row>
          </div> -->
          <v-card outlined class="br-10 pa-6 dir-ltr">
            <v-combobox
              v-model="product.metaTags"
              :items="items"
              label="Meta Tags"
              multiple
              chips
              class="br-10"
              outlined
              append-icon=""
              background-color="Cultured"
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                   
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
            <v-combobox
              v-model="product.metaTags"
              label="Meta Tags"
              :items="items"
              multiple
              class="br-10"
              outlined
              prepend-inner-icon=""
              background-color="Cultured"
            ></v-combobox>

            <v-text-field
              v-model="product.metaTitle"
              color="black"
              label="Meta Title"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-text-field>
            <v-textarea
              v-model="product.metaDescription"
              color="black"
              label="Meta Description"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-textarea>
            <v-text-field
              v-model="product.canonical"
              color="black"
              label="Canonical"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-text-field>
            <v-text-field
              v-model="product.pageTitle"
              color="black"
              label="Page Title"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-text-field>
            <v-textarea
              v-model="product.schema"
              color="black"
              label="schema"
              class="br-10"
              outlined
              background-color="Cultured"
            ></v-textarea>
            <v-row justify="start" class="px-8 mb-8">
              <span class="t18400 mt-2"> INDEX </span>
              <v-card outlined class="br-10 ml-15">
                <v-item-group v-model="product.noindex" mandatory>
                  <v-item v-slot="{ active, toggle }" :value="true">
                    <v-btn
                      width="100"
                      depressed
                      rounded
                      class="br-10"
                      large
                      @click="toggle"
                      :color="active ? 'DeepCarminePink' : 'transparent'"
                    >
                      <span class="t14400" :class="active ? 'white--text' : ''">
                        No Index</span
                      >
                    </v-btn>
                  </v-item>
                  <v-item v-slot="{ active, toggle }" :value="false">
                    <v-btn
                      width="100"
                      depressed
                      rounded
                      class="br-10"
                      large
                      @click="toggle"
                      :color="active ? 'DeepGreen' : 'transparent'"
                    >
                      <span class="t14400" :class="active ? 'white--text' : ''"
                        >Index</span
                      >
                    </v-btn>
                  </v-item>
                </v-item-group>
              </v-card>
            </v-row>
            <v-row justify="start" class="px-8">
              <span class="t18400 mt-2"> ROBOTS </span>
              <v-card outlined class="br-10 ml-11">
                <v-item-group v-model="product.unfollow">
                  <v-item v-slot="{ active, toggle }" :value="true">
                    <v-btn
                      width="100"
                      depressed
                      rounded
                      class="br-10"
                      large
                      @click="toggle"
                      :color="active ? 'DeepCarminePink' : 'transparent'"
                    >
                      <span class="t14400" :class="active ? 'white--text' : ''"
                        >Unfollow</span
                      >
                    </v-btn>
                  </v-item>
                  <v-item v-slot="{ active, toggle }" :value="false">
                    <v-btn
                      width="100"
                      depressed
                      rounded
                      class="br-10"
                      large
                      @click="toggle"
                      :color="active ? 'DeepGreen' : 'transparent'"
                    >
                      <span class="t14400" :class="active ? 'white--text' : ''"
                        >Follow</span
                      >
                    </v-btn>
                  </v-item>
                </v-item-group>
              </v-card>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-row justify="end" class="px-13 my-10">
            <v-btn
              @click="$router.push('/')"
              color="ChineseWhite"
              class="br-10"
              width="126"
              height="44"
            >
              <span class="t14400"> انصراف </span>
            </v-btn>
            <v-btn
              dark
              @click="validate()"
              :loading="loading"
              color="DeepGreen"
              class="br-10 mr-5"
              width="199"
              height="44"
            >
              <span class="t14400 white--text"> بارگذاری نهایی </span>
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
import cookies from "vue-cookies";
import { gql } from "nuxt-graphql-request";
import ModalRemoveConfirmation from "../../../components/public/ModalRemoveConfirmation.vue";
export default {
  components: {
    FAQA,
    ModalRemoveConfirmation,
  },
  data() {
    return {
      image: "",
      loadingImage: false,
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
        url: "",
        category: "",
        collection: "",
        description: "",
        metaTags: "",
        metaTitle: "",
        metaDescription: "",
        canonical: "",
        pageTitle: "",
        schema: "",
        noindex: "",
        unfollow: "",
      },
      productById: "",
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
      items: [],
    };
  },

  methods: {
    imageToBase64() {
      this.pre.image = this.image;
      var imageFile = this.image;
      var fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        // console.log('base64:', srcData)
        this.pre.base64 = srcData;
      };
      fileReader.readAsDataURL(imageFile);
    },
    async uploadImage() {
      if (this.pre.image) {
        this.loadingImage = true;
        return await axios({
          method: "post",
          url: process.env.apiUrl + "image/admin/",
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
          data: {
            product: this.$route.params.id,
            image: this.pre.image,
            caption: this.pre.name,
          },
        })
          .then((response) => {
            this.loadingImage = false;
            this.pre = {
              image: "",
              base64: "",
              name: "",
              desc: "",
            };
            this.getProduct(this.$route.params.id);
          })
          .catch((err) => {
            this.loadingImage = false;
          });
      }
    },
    validate() {
      this.$refs.addProduct.validate();
      setTimeout(() => {
        if (this.valid) {
          this.editProduct();
        }
      }, 200);
    },
    editProduct() {
      this.loading = true;
      axios({
        method: "put",
        url:
          process.env.apiUrl +
          "product/admin/" + this.$route.params.id
            +
          "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          // "Content-Type": "multipart/form-data",
        },
        data: {
          name: this.product.name,
          url: this.product.url,
          collection: this.product.collection,
          description: this.product.description,
          meta_tags: this.product.metaTags,
          meta_title: this.product.metaTitle,
          meta_description: this.product.metaDescription,
          canonical: this.product.canonical,
          page_title: this.product.pageTitle,
          schema: this.product.schema,
          unfollow: this.product.unfollow,
          noindex: this.product.noindex,
        },
      })
        .then((response) => {
          this.loading = false;
          // this.categoryAssignment(response.data.id);
          // this.main.forEach(element => {
          //     this.uploadImage(element, response.data.id)
          // });
          this.$router.push("/");
          this.$store.dispatch("set_products", "");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // categoryAssignment(id) {
    //   axios({
    //     method: "post",
    //     url: process.env.apiUrl + "category/admin/assignment/",
    //     headers: {
    //       Authorization: "Bearer " + this.$cookies.get("token"),
    //       "Content-Type": "multipart/form-data",
    //     },
    //     data: {
    //       product: id,
    //       category: this.product.category,
    //     },
    //   })
    //     .then((response) => {})
    //     .catch((err) => {
    //       this.loading = false;
    //     });
    // },
    async getProduct(id) {
      const requestHeaders = {
        Authorization: "Bearer " + cookies.get("token"),
      };
      const query =
        gql`
        query{
            adminProductById(productId:` +
        id +
        `)
            {
               canonical
                name
                url
                description
                pageTitle
                mainCategory {
                    id
                    name
                }
                collection {
                    id
                    name
                }
                metaTags
                metaTitle
                metaDescription
                noindex
                unfollow
                images {
                    caption
                    imageThumbnail {
                        low
                         medium
                    }
                }
            }
          } `;
      const result = await this.$graphql.default.request(
        query,
        {},
        requestHeaders
      );
      console.log(result);
      this.productById = result.adminProductById;
      this.product.name = this.productById.name;
      this.product.url = this.productById.url;
      this.product.category = this.productById.category;
      this.product.category = this.productById.mainCategory
        ? this.productById.mainCategory.id
        : "";
      this.product.collection = this.productById.collection
        ? this.productById.collection.id
        : "";
      this.product.description = this.productById.description
        ? this.productById.description
        : "";
      this.product.noindex = this.productById.noindex;
      this.product.unfollow = this.productById.unfollow;
      this.product.metaTitle = this.productById.metaTitle;
      this.product.metaDescription = this.productById.metaDescription;
      this.product.metaTags = this.productById.metaTags;
      this.product.canonical = this.productById.canonical;
      this.product.pageTitle = this.productById.pageTitle;
    },

    // setForm() {
    //   try {
    //     let product = this.$store.getters["public/get_producEdit"];
    //     console.log(this.product);
    //     this.product.name = product.name;
    //     this.product.metaTitle = product.metaTitle;
    //     this.product.metaDescription = product.metaDescription;
    //     this.product.canonical = product.canonical;
    //     this.product.url = product.url;

    //     if (product.mainCategory) {
    //       this.product.category = product.mainCategory.id;
    //     }
    //     if (product.collection) {
    //       this.product.collection = product.collection.id;
    //     }
    //   } catch (error) {}
    // },
  },

  watch: {
    image(val) {
      console.log(val);
      this.imageToBase64();
    },
  },

  beforeMount() {
    const productId = this.$route.params.id;
    this.$store.dispatch("set_categories", "");
    this.$store.dispatch("set_collections", "");
    this.getProduct(productId);
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
    baseUrl() {
      return process.env.baseUrl;
    },
  },
};
</script>
