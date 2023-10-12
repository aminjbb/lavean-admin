<template>
  <v-dialog v-model="ModalRemoveConfirmation" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <img src="~/assets/img/trash-2.svg" alt="" />
      </v-btn>
    </template>

    <v-card>
      <v-row class="ma-0 pa-6" justify="center" align="center">
        <v-icon size="52" color="error">mdi-close-octagon</v-icon>
      </v-row>
      <v-col>
        <p class="text-center t16400">ایا از حذف ایتم <span class="t16800">{{ itemName }}</span> اطمینان دارید؟</p>
      </v-col>
      <!-- @ModalRemoveConfirmation="dialog = false" -->
      <v-row class="ma-0 pa-3" align="center" justify="space-between">
        <v-btn class="px-8" color="error" depressed @click="deleteItem( deleteUrl, itemId)"> حذف </v-btn>
        <v-btn outlined depressed @click="test" >
          انصراف
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    itemName: "",
    itemId: "",
    deleteUrl: "",
  },
  data() {
    return {
      ModalRemoveConfirmation: false,
    };
  },
  methods: {
    deleteItem(url, id) {
        
      this.loading = true;
      axios({
        method: "delete",
        url: process.env.apiUrl + url + id + "/",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
      })
        .then((response) => {
          this.ModalRemoveConfirmation = false;
          this.$emit("doSomthing");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    test(){
        console.log(this.deleteUrl);
    }
  },
};
</script>