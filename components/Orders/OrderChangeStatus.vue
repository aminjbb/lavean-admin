<template>
  <v-data-table
    :headers="headers"
    :items="statusesLog"
    :items-per-page="5"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-row class="ma-0 pa-3" align="start">
        <v-col cols="6">
          <v-select
            v-model="orderStatus"
            :items="statuses"
            item-value="id"
            item-text="name"
            label="وضعیت ها"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-btn
            @click="changeStatus"
            color="DeepGreen"
            depressed
            class="br-10 mr-5"
            dark
            height="40"
          >
            تغییر وضعیت
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.adminName="{ item }">
      <span v-if="item.addedBy">
        {{ item.addedBy.client.user.firstName }} {{ item.addedBy.client.user.lastName }}
      </span>
      <span v-else> سیستم </span>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip
        v-if="item.status"
        label
        class=""
        :color="'#' + item.status.colorCode"
        :dark="item.status.isDark"
      >
        {{ item.status.name }}
      </v-chip>
    </template>
    <template v-slot:item.date="{ item }">
      <span item.date>
        {{ calcDate(item.addedAt) }} - {{ calcTime(item.addedAt) }}
      </span>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  props: {
    statuses: "",
    statusesLog: [],
  },
  data() {
    return {
      headers: [
        {
          text: "نام ادمین ",
          align: "end",
          sortable: false,
          value: "adminName",
          width: "30",
          cellClass: "justify-start",
        },
        {
          text: "تاریخ و ساعت",
          align: "end",
          sortable: false,
          value: "date",
          width: "30",
          cellClass: "justify-start",
        },
        {
          text: "وضعیت",
          align: "end",
          sortable: false,
          value: "status",
          width: "30",
          cellClass: "justify-start",
        },
      ],
      orderStatus: "",
    };
  },
  methods: {
    changeStatus() {
      this.loading = true;
      axios({
        method: "put",
        url: process.env.apiUrl + "order/admin/" + this.$route.params.id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          status: this.orderStatus,
        },
      })
        .then((response) => {
          this.loading = false;
          this.$store.dispatch("set_orders", "");
          this.$emit("getOrderAgain");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    calcDate(date) {
      var tmp = date.split("T");
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
  },
};
</script>