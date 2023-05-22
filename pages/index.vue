<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="#616161" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت محصول
          </span>
        </v-row>
      </v-card>
      <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600">
            افزودن محصول جدید
          </span>
          <span>
            <v-btn to="/create-product" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn>
          </span>
        </v-row>
      </v-card>
      <!-- <v-row class="ma-3">
        <v-col cols="2" >
          <v-text-field class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-text-field>
        </v-col>
        <v-col cols="2" >
          <v-select class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-select>
        </v-col>
        <v-col cols="2" >
          <v-btn color="#0A0A0A" height="44" width="136" class="mt-1 rounded-lg" >
            <v-row justify="space-between px-2">
              <span class="white--text">
                فیلتر
              </span>
            </v-row>
          </v-btn>
        </v-col>
      </v-row> -->

      <v-card height="103" outlined class="ma-3 mx-10 br-15">
        <v-row align="center" class="fill-height">
          <v-col cols="4">
            <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
              <span>
                <v-img class="br-10" lazy-src="https://picsum.photos/id/11/10/6" height="72" width="72"
                  src="https://picsum.photos/id/11/500/300"></v-img>
              </span>
              <span>
                گردن بند زمردی
              </span>
              <span>
                کالکشن اردیبهشت
              </span>
              <!-- <span>
                ۰۹/۲۵ - ۰۹/۳۰
              </span> -->
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: ''
    }
  }
}
</script>
