<template>
  <div class="pa-3">
    <v-card elevation="0" outlined min-height="100vh">
      <v-row align="center" justify="space-between" class="pa-3 ma-0">
        <span>
          سفارش شماره
          <span class="t18600">{{ orderId }} </span>
          -
          <span>{{ name }}</span>
        </span>
        <v-chip label class="" :color="'#' + colorCode" :dark="isDark">
          {{ currentStatus }}
        </v-chip>
      </v-row>
      <v-divider></v-divider>
      <v-row class="ma-0">
        <v-col cols="6">
          <v-card outlined>
            <OrderDetail2 :order="this.order" />
          </v-card>
          <v-card outlined class="mt-4">
            <OrderChangeStatus
              :statuses="this.statuses"
              :statusesLog="statusesLog"
              @getOrderAgain="getOrderAgain"
            />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card outlined>
            <OrderDetail :order="this.order" />
          </v-card>
          <v-card outlined class="mt-4">
            <OrderCustomerDetail :order="this.order" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import OrderDetail from "~/components/Orders/OrderDetail.vue";
import OrderDetail2 from "~/components/Orders/OrderDetail2.vue";
import OrderCustomerDetail from "~/components/Orders/OrderCustomerDetail.vue";
import OrderChangeStatus from "~/components/Orders/OrderChangeStatus.vue";
export default {
  components: {
    OrderDetail,
    OrderDetail2,
    OrderCustomerDetail,
    OrderChangeStatus,
  },

  data() {
    return {
      orderID: "",
      order: "",
      statuses: "",
      statusesLog: [],
    };
  },
  computed: {
    orderId() {
      try {
        return this.order.id;
      } catch (error) {
        return "";
      }
    },
    name() {
      try {
        return this.order.customer.client.user.firstName;
      } catch (error) {
        return "";
      }
    },
    colorCode() {
      try {
        return this.order.currentStatus.colorCode;
      } catch (error) {
        return "";
      }
    },
    isDark() {
      try {
        return this.order.currentStatus.isDark;
      } catch (error) {
        return "";
      }
    },
    currentStatus() {
      try {
        return this.order.currentStatus.name;
      } catch (error) {
        return "";
      }
    },
  },
  methods: {
    async getorder(id) {
      const query =
        gql`
        query {
          adminOrder(orderId:` +
        id +
        `) {
            address {
              addressDetail
              city {
                id
                name
                branchSet {
                  name
                }
              }
              postalCode
            }
            adminComment
            clientComment
            createdAt
            currentStatus {
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
            customer {
              nationalCode
              birthdate
              sex
              client {
                mobile
                user {
                  firstName
                  lastName
                  username
                }
              }
            }
            finalPrice
            id
             statusLog {
      addedAt
      id
      status {
        colorCode
        isDark
        name
      }
      addedBy {
        client {
          user {
            firstName
            lastName
          }
        }
      }
    }
            details{
                variant {
                    branch {
                        name
                            }
                    product {
                        imageCover {
                        imageThumbnail {
                            medium
                                }
                              }
                            }
                          }
                    variantName,
                    variantUnitPriceWithoutDiscount,
                    variantUnitPrice
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
        this.order = data.adminOrder;
        this.statusesLog = data.adminOrder.statusLog;
        console.log(this.order, "data");
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
        this.statuses = data.adminOrderStatuses.results;
        console.log(this.statuses);
      }
    },
    getOrderAgain(){
      this.getorder(this.orderID)
    }
  },
  beforeMount() {
    this.orderID = this.$route.params.id;
    this.getorder(this.orderID);
    this.getStatusOrder();
  },
};
</script>