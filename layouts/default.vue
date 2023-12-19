<template>
  <v-app dark>
    <v-app-bar fixed app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
      <ModalConfirmDelete />
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      right
      fixed
      app
    >
      <v-toolbar elevation="0">
        <v-row class="ma-0" align="center" justify="center">
          <img src="../assets/img/logo.svg" alt="">
        </v-row>
      </v-toolbar>
      <!-- <div class="box-nav-laveen">
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
      </div> -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="my-4 mx-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ModalConfirmDelete from "~/components/public/ModalConfirmDelete";
export default {
  name: "DefaultLayout",
  components: {
    ModalConfirmDelete,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "مدیریت محصول",
          to: "/",
        },
        {
          icon: "mdi-source-branch",
          title: "مدیریت شعبه",
          to: "/branche",
        },
        {
          icon: "mdi-shape",
          title: "مدیریت دسته بندی",
          to: "/category",
        },
        {
          icon: "mdi-shape",
          title: " مدیریت دسته بندی بلاگ",
          to: "/blog-category",
        },
        {
          icon: "mdi-collage",
          title: "مدیریت کالکشن",
          to: "/collection",
        },

        {
          icon: "mdi-order-numeric-ascending",
          title: "مدیریت سفارشات",
          to: "/orders",
        },
        {
          icon: "mdi-post",
          title: "مدیریت بلاگ",
          to: "/blog",
        },

        {
          icon: "mdi-account-group",
          title: "مدیریت کاربران",
          to: "/user",
        },
        {
          icon: "mdi-numeric",
          title: "لیست حسابداری",
          to: "/accounting",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  beforeMount() {
    if (!this.$cookies.get("token")) {
      this.$router.push("/login");
    }
  },
};
</script>
