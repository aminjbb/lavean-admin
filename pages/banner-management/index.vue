<template>
  <div class="pb-10">
    <v-card height="64" color="GraniteGray">
      <v-row class="ma-0">
        <span class="white--text pa-5 mx-15 t18600"> مدیریت بنر </span>
      </v-row>
    </v-card>
    <div class="mx-5 mt-5">
      <TableBannerManagement />
    </div>
  </div>
</template>


<script>
import TableBannerManagement from "~/components/BannerManagement/TableBannerManagement.vue";
import { getAdminBanner } from "~/store/banner";
export default {
  components: {
    TableBannerManagement,
  },
  methods: {
    getAdminBanner,
  },
  beforeMount() {
    console.log("start");
    this.getAdminBanner();
  },
};
</script>