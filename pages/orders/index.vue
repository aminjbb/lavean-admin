<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="#616161" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600"> مدیریت سفارشات </span>
        </v-row>
      </v-card>
      <!-- <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600"> افزودن سفارش جدید </span>
          <span>
            <v-btn icon>
              <img src="~/assets/img/PlusCircle.svg" alt="" />
            </v-btn>
          </span>
        </v-row>
      </v-card> -->
      <v-col>
        <TableOrdersManagement :orders="orders" />
      </v-col>
      <!-- <v-card
        height="103"
        outlined
        class="ma-3 mx-10 br-15"
        v-for="order in orders"
        :key="order.id"
      >
        <v-row align="center" class="fill-height">
          <v-col cols="8">
            <v-row
              justify="space-between"
              align="center"
              class="fill-height mr-5"
            >
              <v-col cols="2" class="pt-3">
                <span class="t14600">
                  {{ order.details[0].variantName }}
                </span>
              </v-col>
              <v-col cols="2" class="pt-3">
                <span class="t14600">
                  {{ orderClientName(order) }}
                </span>
              </v-col>
              <v-col cols="2">
                <v-row align="center" class="pr-2 pt-8">
                  <span class="ml-2">
                    <img src="~/assets/img/phone.svg" alt="" />
                  </span>
                  <span class="t14400 dana-fa">
                    {{ orderClientMobile(order) }}
                  </span>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-row align="center" class="pr-2 pt-8">
                  <span class="ml-2">
                    <img src="~/assets/img/map-pin.svg" alt="" />
                  </span>
                  <span class="t14400 dana-fa">
                    {{ order.delivery.name }}
                  </span>
                </v-row>
              </v-col>
              <v-col cols="2" class="pt-6">
                <div
                  class="status-box-success text-center pt-2"
                  v-if="order.currentStatus"
                >
                  <span class="t14400 DeepGreen--text">{{
                    order.currentStatus.name
                  }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row
              justify="end"
              align="center"
              class="fill-height mt-3 mr-5 pl-10"
            >
              <span>
                <v-btn icon>
                  <img src="~/assets/img/edit.svg" alt="" />
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn icon>
                  <img src="~/assets/img/trash-2.svg" alt="" />
                </v-btn>
              </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card> -->

      <div class="text-center mt-5">
        <v-pagination
          v-model="page"
          :length="pageLength"
          circle
          color="black"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>
  
<script>
import TableOrdersManagement from "../../components/Orders/TableOrdersManagement.vue";
export default {
  components: {
    TableOrdersManagement,
  },
  data() {
    return {
      message: "",
      page: 1,
    };
  },

  computed: {
    orders() {
      return this.$store.getters["get_orders"];
    },

    pageLength() {
      return this.$store.getters["get_orderPageLength"];
    },
  },

  watch: {
    page(val) {
      let page = (val - 1) * 20;
      let fillter = ",offset:" + page;
      this.$store.dispatch("set_orders", fillter);
    },
  },
  methods: {
    orderClientName(e) {
      try {
        return e.customer.client.user.firstName;
      } catch (error) {
        return "";
      }
    },
    orderClientMobile(e) {
      try {
        return e.customer.client.mobile;
      } catch (error) {
        return "";
      }
    },
    async getStatusOrder() {
      const query = gql`
        query {
          adminOrderStatuses {
            results {
              colorCode
              id
              isDark
              isDefault
              isDeleted
              isFinishedStatus
              isPayable
              isReduceQuantity
              name
            }
          }
        }
      `;
      this.$graphql.default.setHeader(
        "Authorization",
        "Bearer ".concat(this.$cookies.get("token"))
      );
      const data = await this.$graphql.default.request(query);
      if (data) {
        console.log(data, "data");
      }
    },
  },

  beforeMount() {
    this.$store.dispatch("set_orders", "");
  },
};
</script>
  