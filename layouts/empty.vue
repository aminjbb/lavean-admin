<template>
  <v-app dark>

    <v-main>
      <Nuxt />
    </v-main>

  </v-app>
</template>
  
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {

    }
  },

  beforeMount() {
    if (!this.$cookies.get('token')) {
      this.$router.push('/login')
    }
  }
}
</script>
  