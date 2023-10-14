<template>
  <v-dialog v-model="ModalRemoveConfirmation" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :icon="modalRemoveConfirmationNeed.needicon"
         class=""
        :fab="modalRemoveConfirmationNeed.fab"
        :text="modalRemoveConfirmationNeed.text"
        :color="modalRemoveConfirmationNeed.color"
        :absolute="modalRemoveConfirmationNeed.absolute"
        :class="modalRemoveConfirmationNeed.class"
        :small="modalRemoveConfirmationNeed.small"
      >
        <v-icon v-if="modalRemoveConfirmationNeed.icon" :color="modalRemoveConfirmationNeed.iconColor">{{ modalRemoveConfirmationNeed.icon }}</v-icon>
        <span v-if="modalRemoveConfirmationNeed.btnText">{{ modalRemoveConfirmationNeed.btnText }}</span>
      </v-btn>
    </template>

    <v-card>
      <v-row class="ma-0 pa-6" justify="center" align="center">
        <v-icon size="52" color="error">mdi-close-octagon</v-icon>
      </v-row>
      <v-col>
        <v-row class="ma-0 mb-6" align="center" justify="center" v-if="image">
          <v-img class="br-25" aspect-ratio="1" max-width="200" :src="this.image"> </v-img>
        </v-row>
        <p class="text-center t16400">
          ایا از حذف آیتم
          <span class="t16800" v-if="itemName">{{ itemName }}</span> اطمینان
          دارید؟
        </p>
      </v-col>

      <v-row class="ma-0 pa-3" align="center" justify="space-between">
        <v-btn
          class="px-8"
          color="error"
          depressed
          @click="deleteItem"
        >
          حذف
        </v-btn>
        <v-btn outlined depressed @click="ModalRemoveConfirmation = false">
          انصراف
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    itemName: "",
    itemId: "",
    deleteUrl: "",
    image : null,
    modalRemoveConfirmationNeed: null,
  },
  data() {
    return {
      ModalRemoveConfirmation: false,
    };
  },
  methods: {
    deleteItem() {
      this.ModalRemoveConfirmation = false;
      this.$emit("doSomthing");
    },
  },
};
</script>