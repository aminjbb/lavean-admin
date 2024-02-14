<template>
  <v-dialog
    v-model="modalAddEditBanner"
    :width="item.addEdit ? 700 : 500"
    internal-activator
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        :color="item.color"
        :dark="item.dark"
        :fab="item.fab"
        :icon="item.icon"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon> mdi-{{ item.mdiIcon }} </v-icon>
      </v-btn>
    </template>

    <v-card v-if="item.addEdit">
      <v-row class="ma-0 pa-3" justify="space-between" align="center">
        <span>{{ item.title }}</span>
        <v-btn @click="modalAddEditBanner = false" icon>
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-col class="pa-8">
        <v-form v-model="valid" ref="addEditBanner">
          <v-row class="ma-0" justify="center" align="center">
            <v-img
              class="mb-5"
              max-width="360"
              :aspect-ratio="type == 'SHOP_DESKTOP_MAIN_PAGE_TOP' ? 3.2 : 1.52"
              :src="
                url
                  ? url
                  : this.image && !url
                  ? imageUrl + this.image
                  : require('../../assets/img/no-preview.jpeg')
              "
            ></v-img>
          </v-row>
          <v-select
            label="نوع تصویر"
            :items="types"
            v-model="type"
            :rules="[rules.required]"
            outlined
            item-text="text"
            item-value="value"
          ></v-select>
          <v-file-input
            label="انتخاب عکس"
            @change="Preview_image"
            show-size
            :value="image"
            v-model="image"
            :rules="[rules.required]"
            outlined
          ></v-file-input>
          <v-text-field
            label="عنوان"
            v-model="imageTitle"
            outlined
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            label="لینک تصویر"
            v-model="link"
            outlined
            counter
            :rules="[rules.required, rules.validUrl]"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-divider></v-divider>
      <v-row class="ma-0 pa-3" justify="space-between" align="center">
        <v-btn color="error" text @click="modalAddEditBanner = false">
          انصراف
        </v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          elevation="0"
          large
          @click="validate()"
        >
          {{ item.btnText }}
        </v-btn>
      </v-row>
    </v-card>
    <v-card v-else>
      <v-col>
        <v-row class="ma-0 mb-8" justify="center" align="center">
          <v-icon color="warning" size="60"> mdi-alert-octagon </v-icon>
        </v-row>
        <p class="text-center">شما در حال حذف عکس هستید</p>
        <v-row class="ma-0 pa-3" justify="space-between" align="center">
          <v-btn color="error" text @click="modalAddEditBanner = false">
            انصراف
          </v-btn>
          <v-btn
            :loading="loading"
            color="error"
            elevation="0"
            large
            @click="submitAddEditBanner()"
          >
            {{ item.btnText }}
          </v-btn>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>


<script>
import { getAdminBanner } from "~/store/banner";
import axios from "axios";
export default {
  props: {
    item: null,
    method: "",
    detail: null,
  },
  data() {
    return {
      url: null,
      image: null,
      type: "",
      link: "",
      modalAddEditBanner: false,
      loading: false,
      valid: true,
      types: [
        { text: "نسخه دسکتاپ", value: "SHOP_DESKTOP_MAIN_PAGE_TOP" },
        { text: "نسخه موبایل", value: "SHOP_MOBILE_MAIN_PAGE_TOP" },
      ],
      rules: {
        required: (value) => !!value || "این فیلد الزامی است.",
        validUrl: (value) => this.isURL(value) || "url معتبر نیست",
      },
    };
  },
  methods: {
    getAdminBanner,
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    isURL(str) {
      let url;

      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
    validate() {
      this.$refs.addEditBanner.validate();
      setTimeout(() => {
        if (this.valid) {
          this.submitAddEditBanner();
        }
      }, 200);
    },
    async submitAddEditBanner() {
      this.loading = true;
      var data = new FormData();
      data.append("url", this.url);
      data.append("type", this.type);
      data.append("image", this.image);
      await axios({
        method: this.method,
        url:
          this.method == "post"
            ? process.env.apiUrl + "banner/admin/"
            : process.env.apiUrl + "banner/admin/" + this.detail.id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },

        data,
      })
        .then((response) => {
          this.loading = false;
          this.getAdminBanner();
          this.modalAddEditBanner = false;
          this.resetForm();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  watch: {
    modalAddEditBanner(val) {
      if (!val && this.method == "post") {
        (this.url = null),
          (this.image = null),
          (this.type = ""),
          (this.link = "");
      }
    },
  },
  computed: {
    imageUrl() {
      return process.env.imageUrl;
    },
  },
  mounted() {
    console.log(this.detail);
    if (this.detail) {
      (this.image = this.detail.image),
        (this.type = this.detail.type),
        (this.link = this.detail.url);
    }
  },
};
</script>