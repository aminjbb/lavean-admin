<template>
  <v-data-table
    :headers="headers"
    :items="details"
    :items-per-page="1"
    hide-default-footer
    class="elevation-0"
  >
    <template v-slot:item.image="{ item }">
      <v-col class="d-flex justify-start">
        <v-img
          aspect-ratio="1"
          max-width="70"
          class="br-15"
          :src="
            imageUrl + item.variant.product.imageCover.imageThumbnail.medium
          "
        ></v-img>
      </v-col>
    </template>
  </v-data-table>
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
          text: "تصویر ",
          align: "end",
          sortable: false,
          value: "image",
          width: "30",
          cellClass: 'justify-start'
        },
        {
          text: "نام محصول",
          align: "end",
          sortable: false,
          value: "time",
          width: "30",
        },
        {
          text: "قیمت ",
          align: "end",
          sortable: false,
          value: "time",
          width: "30",
        },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
  computed: {
    imageUrl() {
      return process.env.imageUrl;
    },
    details() {
      try {
        return this.order.details;
      } catch (error) {
        return "";
      }
    },
  },
};
</script>