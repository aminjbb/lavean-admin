<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
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
  </v-data-table>
</template>

<script>
export default {
  props: {
    statuses: "",
  },
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      orderStatus: "",
    };
  },
  methods: {
    changeStatus() {
      this.loading = true;
      axios({
        method: "put",
        url: process.env.apiUrl + "order/admin/" + this.$route.params.id,
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
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>