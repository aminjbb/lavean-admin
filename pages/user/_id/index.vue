<template>
    <div>
        <v-card class="mx-10 mt-10 br-15" outlined>
            <div class="pa-5 ">
                <v-form v-model="valid" ref="editUser">
                    <v-row justify="center" align="center">
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    نام و نام خانوادگی
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="name" color="black" label="نام و نام خانوادگی"
                                class="br-10" filled dense></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    جنسیت
                                </span>
                            </div>
                            <v-select :items="sexObj" :rules="rule" v-model="sex" color="black" label="جنسیت" class="br-10"
                                filled dense></v-select>
                        </v-col>
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    شماره موبایل
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="mobile" color="black" label="شماره موبایل" class="br-10"
                                filled dense></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    کد ملی
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="nationalCode" color="black" label=" کد ملی" class="br-10"
                                filled dense></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    تاریخ تولد
                                </span>
                            </div>
                            <v-text-field id="birthdate" :rules="rule" v-model="date" color="black" label="تاریخ تولد "
                                class="br-10" filled dense></v-text-field>
                            <date-picker v-model="date" format="jYYYY/jMM/jDD" custom-input="#birthdate" />
                        </v-col>
                        <v-col cols="2">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    ایمیل
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="email" color="black" label=" ایمیل" class="br-10" filled
                                dense></v-text-field>
                        </v-col>
                    </v-row></v-form>

                <v-row justify="end" class="px-5 ">
                    <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                        <span class="t14400">
                            انصراف
                        </span>
                    </v-btn>
                    <v-btn dark @click="validate()" :loading="loading" color="DeepGreen" class="br-10 mr-5" width="199"
                        height="44">
                        <span class="t14400 white--text">
                            ویرایش کاربر
                        </span>
                    </v-btn>

                </v-row>

            </div>
        </v-card>

        <v-row justify="center" class="px-10">
            <v-col cols="6">
                <v-card class=" mt-10 br-15" min-height="80" outlined>
                    <Address v-for="(address, index) in customerAddress" :key="index" :address="address" />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card class=" mt-10 br-15" min-height="80" outlined>
                    <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="order in customerOrder" :key="order.id">
                        <v-row align="center" class="fill-height">
                            <v-col cols="8">
                                <v-row justify="space-between" align="center" class="fill-height  mr-5">
                                    <v-col cols="6" class="pt-3">
                                        <span class="t14600">
                                            {{ order.details[0].variantName }}
                                        </span>
                                    </v-col>
                                    <v-col cols="6" class="pt-3">
                                        <span class="t14600">
                                            {{ order.details[0].variantUnitPrice }}
                                        </span>
                                    </v-col>



                                </v-row>
                            </v-col>

                        </v-row>
                    </v-card>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Address from '~/components/public/Address'
import axios from 'axios'
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import { PublicMethod } from '~/store/classes.js'
export default {
    components: {
        Address,
        datePicker: VuePersianDatetimePicker,
    },
    data() {
        return {
            loading: false,
            valid: true,
            name: '',
            sex: '',
            mobile: '',
            nationalCode: '',
            date: '',
            email: '',
            rule: [v => !!v || 'این فیلد الزامی است'],
            sexObj: [{
                text: 'آقا', value: 'Male'
            },
            {
                text: 'خانم', value: 'Female'
            }]
        }
    },
    beforeMount() {
        this.$store.dispatch('set_customer', this.$route.params.id)
    },

    computed: {
        customer() {
            try {
                return this.$store.getters['get_customer']
            } catch (error) {
                return ''
            }
        },

        customerAddress() {
            try {
                return this.customer.client.addresses
            } catch (error) {
                return []
            }
        },
        customerOrder() {
            try {
                let ordres = this.customer.orders.slice(0, 5)
                return ordres
            } catch (error) {
                return []
            }
        }
    },

    methods: {
        validate() {
            this.$refs.editUser.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.editCustomer()
                }
            }, 200);
        },
        editCustomer() {
            var publicMethod = new PublicMethod()
            this.loading = true;
            let date = this.date.split('/')
            axios({
                method: 'put',
                url: process.env.apiUrl + 'customer/admin/' + this.$route.params.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    sex: this.sex,
                    national_code: this.nationalCode,
                    birthdate: publicMethod.jalaliToGregorian(date[0], date[1], date[2])

                }
            })
                .then(response => {
                    this.editUser()
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        editUser() {
            axios({
                method: 'put',
                url: process.env.apiUrl + 'user/admin/user/' + this.customer.client.user.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    first_name: this.name,
                    username: this.email,
                    // birthdate :this.date

                }
            })
                .then(response => {
                    this.editCient()

                })
                .catch(err => {
                    this.loading = false;
                })
        },

        editCient() {
            axios({
                method: 'put',
                url: process.env.apiUrl + 'user/admin/user/' + this.customer.client.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    mobile: this.mobile,


                }
            })
                .then(response => {
                    this.loading = false;
                    this.$router.push('/user')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        setForm(obj) {
            var publicMethod = new PublicMethod()
            this.name = obj.client.user.firstName
            
            this.mobile = obj.client.mobile
            this.nationalCode = obj.nationalCode
            this.email = obj.client.user.email
            if (obj.sex=='MALE') this.sex = 'Male'
            else this.sex = 'Female'
            if (obj.birthdate) {
                var dateSplit = obj.birthdate.split("-")
                this.date = publicMethod.gregorian_to_jalali(parseInt(dateSplit[0]), parseInt(dateSplit[1]), parseInt(dateSplit[2]))
            }
        }
    },

    watch: {
        customer(val) {
            console.log(val);
            this.setForm(val);
        }
    }
}
</script>