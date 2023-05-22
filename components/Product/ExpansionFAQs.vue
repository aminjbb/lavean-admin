<template>
  <v-expansion-panels class="px-15 mt-5 br-20">
    <v-expansion-panel class="border__1">
      <v-expansion-panel-header class="t14500 py-4 Gunmetal--text" disable-icon-rotate>
        سوال
        <template v-slot:actions>
          <v-row justify="end" align="center" class="">

            <span>
              <v-btn icon>
                <img src="~/assets/img/edit.svg" alt="">
              </v-btn>
            </span>
            <span class="mr-1">
              <v-btn icon>
                <img src="~/assets/img/trash-2.svg" alt="">
              </v-btn>
            </span>

          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-divider></v-divider>
        <p class="mt-3 t14400 l_h2">
          جواب
        </p>
      
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
// import ModalEditFAQ from "~/components/catalogs/ModalEditFAQ.vue";
export default {
  props: {
    qa: [],
    getDetail: { type: Function }
  },
  // components: {
  //   ModalEditFAQ,
  // },

  methods: {
    remove(id) {
      var title = "آیا از پاک کردن آیتم مطمئن هستید؟";
      this.$store.commit("set_confirmModalTitle", title);
      this.$store.commit("set_confirmModalStatus", "qa");
      this.$store.commit("set_confirmModalId", id);
      this.$store.commit("set_confirmModal", true);
    },
  },
  data() {
    return {

    };
  },

  watch: {
    confirmModal(val) {
      if (!val) {
        this.getDetail()
      }
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters["get_confirmModal"];
    }
  }
};
</script>