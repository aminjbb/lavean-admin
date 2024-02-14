<template>
   
    <v-checkbox class="ma-0 pa-0" v-model="bannerActiveStatus" hide-details></v-checkbox>
   
</template>

<script>
import { getAdminBanner } from "~/store/banner";
import axios from "axios";
export default {
  props: {
    item: "",
  },
  data() {
    return {
      bannerActiveStatus: false,
    };
  },
  watch: {
    bannerActiveStatus: {
      handler(val) {
        this.updateBannerStatus(val);
      },
      deep: true,
    },
  },
  methods: {
    getAdminBanner,
    updateBannerStatus(active) {
      axios({
        method: "put",
        url: process.env.apiUrl + "banner/admin/" + this.item.id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          is_active: active,
        },
      })
        .then((response) => {
        })
        .catch((err) => {
          
        });
    },
  },
  mounted() {
    this.bannerActiveStatus = this.item.isActive;
  },
};
</script>