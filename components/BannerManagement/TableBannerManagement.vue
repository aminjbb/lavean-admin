<template>
  <v-card outlined class="br-15" elevation="0">
    <v-data-table
      :headers="headers"
      :items="banners"
      :loading="loading"
      :items-per-page="-1"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:top>
        <v-row class="ma-0 pa-3" align="center" justify="end">
          <AddEditBanner :item="addBanner" method="post" />
        </v-row>
      </template>
      <template v-slot:item.image="{ item }">
        <v-col>
          <v-img
            v-if="item.image"
            :aspect-ratio="
              item.type == 'SHOP_DESKTOP_MAIN_PAGE_TOP' ? 3.2 : 1.52
            "
            max-width="120"
            :src="item.image ? imageUrl + item.image : ''"
          ></v-img>
        </v-col>
      </template>
      <template v-slot:item.type="{ item }">
        <v-col>
          <span
            v-text="
              item.type == 'SHOP_DESKTOP_MAIN_PAGE_TOP' ? 'دسکتاپ' : 'موبایل'
            "
          ></span>
        </v-col>
      </template>
      <template v-slot:item.url="{ item }">
        
          <a :href="item.url">{{ item.url }}</a>
        
      </template>
      <template v-slot:item.isActive="{ item }">
        <ActiveBanner :item="item" />
      </template>
      <template v-slot:item.edit="{ item }">
        <AddEditBanner :item="editBanner" method="put" :detail="item" />
      </template>
      <template v-slot:item.delete="{ item }">
        <AddEditBanner :item="deleteBanner" method="delete" :detail="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ActiveBanner from "~/components/BannerManagement/ActiveBanner.vue";
import AddEditBanner from "~/components/BannerManagement/AddEditBanner.vue";
export default {
  components: {
    ActiveBanner,
    AddEditBanner,
  },
  data() {
    return {
       
      headers: [
        {
          text: "تصویر",
          align: "end",
          sortable: false,
          value: "image",
          width: "200",
        },
        {
          text: "نوع",
          align: "end",
          sortable: false,
          value: "type",
          width: "300",
        },
        {
          text: "عنوان",
          align: "end",
          sortable: false,
          value: "title",
          width: "500",
        },
        {
          text: "لینک",
          align: "end",
          sortable: false,
          value: "url",
          width: "50",
        },
        {
          text: "فعال",
          align: "end",
          sortable: false,
          value: "isActive",
          width: "50",
        },
        {
          text: "ویرایش",
          align: "end",
          sortable: false,
          value: "edit",
          width: "50",
        },
        {
          text: "حذف",
          align: "end",
          sortable: false,
          value: "delete",
          width: "50",
        },
      ],
      addBanner: {
        addEdit: true,
        title: "افزودن بنر",
        mdiIcon: "image-plus",
        color: "info",
        icon: false,
        text: false,
        fab: true,
        dark: true,
        btnText: "افزودن",
      },
      editBanner: {
        addEdit: true,
        title: "ویرایش بنر",
        mdiIcon: "pencil",
        color: "#5BC0DE",
        icon: true,
        text: false,
        fab: false,
        dark: true,
        btnText: "ویرایش",
      },
      deleteBanner: {
        addEdit: false,
        title: "حذف وضعیت",
        mdiIcon: "delete-empty",
        color: "#BE5A43",
        icon: true,
        text: false,
        fab: false,
        dark: true,
        btnText: "حذف",
      },
    };
  },
  computed: {
    imageUrl() {
      return process.env.imageUrl;
    },
     loading() {
      return this.$store.getters['banner/get_tableLoading']
    },
    banners() {
      try {
        return this.$store.getters["banner/get_banner"];
      } catch (error) {
        return [];
      }
    },
  },
  methods: {},
};
</script>