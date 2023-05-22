<template>
    <v-card height="250" class="mx-10 mt-5 br-15" outlined>
        <v-form v-model="valid" ref="addBranche" @submit.prevent="validate()">
            <v-row class="pt-10 px-10">
                <v-col cols="2" class="pr-0">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            نام شعبه
                        </span>
                    </div>
                    <v-text-field :rules="rule" v-model="name" color="black" label="نام شعبه" class="br-10" filled
                        dense></v-text-field>
                </v-col>
                <v-col cols="2">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            استان
                        </span>
                    </div>
                    <v-select :rules="rule" v-model="provice" :items="provices" color="black" label="استان" class="br-10"
                        filled dense></v-select>
                </v-col>
                <v-col cols="2">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            شهر
                        </span>
                    </div>
                    <v-select :rules="rule" v-model="city" :items="citys" color="black" label="شهر" class="br-10" filled
                        dense></v-select>
                </v-col>

                <v-col cols="4">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            آدرس
                        </span>
                    </div>
                    <v-text-field :rules="rule" v-model="address" color="black" label="آدرس" class="br-10" filled
                        dense></v-text-field>
                </v-col>
                <v-col cols="2">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            تلفن
                        </span>
                    </div>
                    <v-text-field :rules="rule" v-model="phone" color="black" label="تلفن" class="br-10" filled
                        dense></v-text-field>
                </v-col>
            </v-row>
        </v-form>


        <v-row justify="end" class="px-13 ">
            <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
            </v-btn>
            <v-btn :loading="lodaing" @click="validate()" color="DeepGreen" class="br-10 mr-5" width="199" height="44">
                <span class="t14400 white--text">
                    بارگذاری نهایی
                </span>
            </v-btn>

        </v-row>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        close: { type: Function }
    },

    data() {
        return {
            name: '',
            phone: '',
            address: '',
            provice: '',
            city: '',
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: true,
            loading: false,
        }
    },
    watch: {
        provice(val) {
            this.$store.dispatch('public/set_citys', val)
        }
    },
    computed: {
        provices() {
            var provice = []
            this.$store.getters['public/get_provinces'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                provice.push(form)
            });
            return provice
        },
        citys() {
            var city = []
            this.$store.getters['public/get_citys'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                city.push(form)
            });
            return city
        },
    },

    methods: {
        validate() {
            this.$refs.addBranche.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.createBranche()
                }
            }, 200);
        },

        resetForm() {
            this.$refs.addBranche.rest()
        },

        createBranche() {
            this.loading = true;
            axios({
                method: 'post',
                url: process.env.apiUrl + 'branch/admin/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    phone: this.phone,
                    is_active: false
                }
            })
                .then(response => {
                    this.loading = false;
                    this.resetForm()
                })
                .catch(err => {
                    this.loading = false;
                })
        }
    }
}
</script>