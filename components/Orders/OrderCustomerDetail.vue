<template>
  <div>
    <v-row class="ma-0 pa-3" justify="space-between">
      <span>
        <v-icon> mdi-person </v-icon>
        <span> {{ userName }}</span>
      </span>
      <span>{{ userMobile }}</span>
      <span> {{ userNationalCode }} </span>
    </v-row>
    <v-row class="pa-3">
      <v-col cols="6">
        <v-textarea outlined label="پیام ادمین" class="br-10"></v-textarea>
        <v-row class="ma-0">
          <v-btn @>ارسال</v-btn>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-textarea
          outlined
          label="پیام مشتری"
          class="br-10"
          disabled
        ></v-textarea>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div class="pa-3">
      <span class="DeepGreen--text t18600">آدرس تحویل سفارش :</span>
      <!-- <span>
        <span> استان </span>
        <span> شهر </span>
      </span> -->
      <span class="d-block mt-4"> آدرس : {{ userOrderAddressDetail }}</span>
      <!-- <span>
        <span> پلاک : </span>
      <span> واحد : </span>
      </span> -->
      <span> کد پستی : {{ userOrderAddressPostalCode }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: "",
    
  },
  computed: {
    userName() {
      try {
        return this.order.customer.client.user.firstName;
      } catch (error) {}
    },
    userMobile() {
      try {
        return this.order.customer.client.mobile;
      } catch (error) {}
    },
    userNationalCode() {
      try {
        return this.order.customer.client.nationalCode;
      } catch (error) {
        ("");
      }
    },
    userOrderAddressDetail() {
      try {
        return this.order.address.addressDetail;
      } catch (error) {
        ("");
      }
    },
    userOrderAddressPostalCode() {
      try {
        return this.order.address.postalCode;
      } catch (error) {
        ("");
      }
    },
  },
};
</script>