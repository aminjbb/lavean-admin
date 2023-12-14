<template>
  <v-card outlined class="br-15" elevation="0">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="20"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item.time="{ item }">
        {{ calcDate(item.createdAt) }}
      </template>
      <template v-slot:item.province="{ item }">
         <span v-if="item.address && item.address.city && item.address.city.province">
          {{ item.address.city.province.name }}
         </span>
      </template> 
      <!-- <template v-slot:item.image="{ item }">
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
      </template> -->
      <template v-slot:item.mobile="{ item }">
        <v-row class="ma-0" align="center" justify="center">
          <!-- <v-icon> mdi-cellphone </v-icon> -->
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
            :color="'#' + item.currentStatus.colorCode"
            :dark="item.currentStatus.isDark"
          >
            {{ item.currentStatus.name }}
          </v-chip>
        </v-col>
      </template>
      <template v-slot:item.detail="{ item }">
        <!-- <ModalManageOrder :item="item" /> -->
        <v-btn icon :to="'/orders/' + item.id">
          <v-icon>mdi-pencil-box-outline</v-icon>
        </v-btn>
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
          text: "تاریخ ",
          align: "end",
          sortable: false,
          value: "time",
          width: "30",
        },
        {
          text: "استان",
          align: "end",
          sortable: false,
          value: "province",
          width: "30",
        },
        {
          text: "مشتری",
          align: "center",
          sortable: false,
          value: "customer.client.user.firstName",
          width: "150",
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
  methods: {
    calcDate(date) {
      var tmp = date.split("T");
      console.log(tmp, "tmp");
      var newDate = tmp[0].split("-");
      var persianDate = this.gregorian_to_jalali(
        parseInt(newDate[0]),
        parseInt(newDate[1]),
        parseInt(newDate[2])
      );
      return persianDate[0] + "/" + persianDate[1] + "/" + persianDate[2];
    },
    calcTime(date) {
      var tmp = date.split("T");
      console.log(tmp, "tmp");
      var newTime = tmp[1].split(":");
      return newTime[0] + ":" + newTime[1];
    },
    gregorian_to_jalali(gy, gm, gd) {
      var g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = gm > 2 ? gy + 1 : gy;
      days =
        355666 +
        365 * gy +
        ~~((gy2 + 3) / 4) -
        ~~((gy2 + 99) / 100) +
        ~~((gy2 + 399) / 400) +
        gd +
        g_d_m[gm - 1];
      jy = -1595 + 33 * ~~(days / 12053);
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
      }
      return [jy, jm, jd];
    },
    test() {
      console.log(this.orders);
    },
  },
};
</script>