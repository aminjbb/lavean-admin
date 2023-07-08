<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="#616161" class="mx-3 mt-10">
                <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت کاربر‌ ‌ها
                    </span>
                </v-row>
            </v-card>

            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="(user , index) in useres" :key="index">
                <v-row align="center" class="fill-height">
                    <v-col cols="5">
                        <v-row justify="space-between" align="center" class="fill-height  mr-5">
                            <v-col cols="2" class="pt-8">
                                <span class="t14600">
                                   {{customerName(user)}}
                                </span>
                            </v-col>
                            <v-col cols="3">
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/phone.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        {{customerMobile(user)}}
                                    </span>
                                </v-row>
                            </v-col>
                            <!-- <div>
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/userDate.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        ۱۴۰۱/۱۲/۲۴
                                    </span>
                                </v-row>
                            </div> -->

                        </v-row>
                    </v-col>
                    <v-col cols="7">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

                            <span>
                                <v-btn icon :to="'/user/' + user.id">
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
import AddUser from '~/components/User/AddUser'
export default {
    name: 'IndexPage',
    components:{
        AddUser
    },
    data() {
        return {
            message: ''
        }
    },


    methods:{
        customerName(e){
            try {
                return e.client.user.firstName
            } catch (error) {
                return ''
            }
        },
        customerMobile(e){
            try {
                return e.client.mobile
            } catch (error) {
                return ''
            }
        }
    },

    computed:{
        useres(){
            return this.$store.getters['get_customers']
        }
    },

    beforeMount(){
        this.$store.dispatch('set_customers' , '')
    }
}
</script>
  