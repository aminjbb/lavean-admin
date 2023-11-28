<template>
  <v-card outlined class="br-15" elevation="0">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="20"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item.image="{ item }">
        <v-col class="d-flex justify-center">
          <v-img
            aspect-ratio="1"
            max-width="70"
            class="br-15"
            v-if="item.details[0].variant"
            :src="
              imageUrl +
              item.details[0].variant.product.imageCover.imageThumbnail.medium
            "
          ></v-img>
        </v-col>
      </template>
      <template v-slot:item.mobile="{ item }">
        <v-row class="ma-0" align="center" justify="center">
          <v-icon> mdi-cellphone </v-icon>
          <span>
            {{ item.customer.client.mobile }}
          </span>
        </v-row>
      </template>
      <template v-slot:item.delivery="{ item }">
        <v-row class="ma-0" align="center" justify="center">
          <v-icon> mdi-map-marker-outline </v-icon>
          <span>
            {{ item.delivery.name }}
          </span>
        </v-row>
      </template>
      <template v-slot:item.status="{ item }">
        <v-col>
          <v-chip
            label
            class=""
            :color="item.currentStatus.colorCode"
            :dark="item.currentStatus.isDark"
          >
            {{ item.currentStatus.name }}
          </v-chip>
        </v-col>
      </template>
      <template v-slot:item.detail="{ item }">
        <ModalManageOrder :item="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ModalManageOrder from "../../components/Orders/ModalManageOrder.vue";
export default {
  components: {
    ModalManageOrder,
  },
  props: {
    orders: "",
  },
  data() {
    return {
      headers: [
        {
          text: "شماره",
          align: "end",
          sortable: false,
          value: "id",
          width: "30",
        },
        {
          text: "تصویر",
          align: "center",
          sortable: false,
          value: "image",
          width: "100",
        },

        {
          text: "نام محصول",
          align: "end",
          sortable: false,
          value: "details[0].variantName",
          width: "150",
          cellClass: "t14600",
        },
        {
          text: "مشتری",
          align: "center",
          sortable: false,
          value: "customer.client.user.firstName",
          width: "200",
        },
        {
          text: "شماره تماس",
          align: "center",
          sortable: false,
          value: "mobile",
          width: "100",
        },
        {
          text: "نوع ارسال",
          align: "center",
          sortable: false,
          value: "delivery",
          width: "100",
        },
        {
          text: "وضعیت",
          align: "center",
          sortable: false,
          value: "status",
          width: "100",
        },
        {
          text: "جزییات",
          align: "center",
          sortable: false,
          value: "detail",
          width: "50",
        },
      ],
    };
  },
  computed: {
    imageUrl() {
      return process.env.imageUrl;
    },
    orderClientName(e) {
      try {
        return e.customer.client.user.firstName;
      } catch (error) {
        return "";
      }
    },
  },
};
</script>