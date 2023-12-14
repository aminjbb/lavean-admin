<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderStatus"
      :items-per-page="1"
      hide-default-footer
      class="elevation-0"
    >
      <template v-slot:item.time="{ item }">
        <span v-if="item.createdAt">
          {{ calcDate(item.createdAt) }}
        </span>
      </template>

      <template v-slot:item.branchName="{ item }">
        <span> </span>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
        v-if="item.currentStatus"
          label
          class=""
          :color="'#' + item.currentStatus.colorCode"
          :dark="item.currentStatus.isDark"
        >
          {{ item.currentStatus.name }}
        </v-chip>
      </template>
      <template v-slot:item.totalPrice="{ item }">
        {{ splitChar(item.finalPrice) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    order: "",
  },
  data() {
    return {
      headers: [
        {
          text: "تاریخ ",
          align: "end",
          sortable: false,
          value: "time",
          width: "100",
        },
        {
          text: "نام شعبه",
          align: "end",
          sortable: false,
          value: "branchName",
          width: "150",
        },
        {
          text: "وضعیت ",
          align: "center",
          sortable: false,
          value: "status",
          width: "70",
        },
        {
          text: "هزینه کل",
          align: "center",
          sortable: false,
          value: "totalPrice",
          width: "70",
        },
      ],
      itemOrderStatus: [],
    };
  },
  computed: {
    orderStatus() {
      try {
        this.itemOrderStatus.unshift(this.order);
        return this.itemOrderStatus;
      } catch (error) {
        return [];
      }
    },
  },
  methods: {
    test() {
      console.log(this.orderStatus);
    },
    splitChar(text) {
      if (text) {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return text;
      }
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