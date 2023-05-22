<template>
    <v-row class="height-vh-100" justify="center" align="center">
        <v-card color="Cultured" width="392" height="374" class="br-25">
            <v-form v-model="valid" ref="login">
                <v-row justify="center">
                    <div class="login-avatar-box">
                        <img src="~/assets/img/UserCircle.png" alt="">
                    </div>

                    <v-col cols="9" class="py-0 mt-5">
                        <v-text-field v-model="username" :rules="rule" background-color="white" color="black"
                            label="نام کاربری" class="br-15" filled dense></v-text-field>
                    </v-col>
                    <v-col cols="9" class="py-0">
                        <v-text-field type="password" v-model="password" :rules="rule" background-color="white" color="black"
                            label="رمز عبور" class="br-15" filled dense></v-text-field>
                    </v-col>

                    <v-col cols="6" class="py-0">
                        <v-btn dark :loading="loading" @click="validate()" rounded="lg" color="black" block>
                            <span class="t12400 white--text">ورود</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <v-row justify="center" class="mt-8">
                            <img src="~/assets/img/lavinLogoMain.png" width="70" height="16" alt="">
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-row>
</template>

<script>
import axios from 'axios';
export default {
    layout: 'empty',
    data() {
        return {
            valid: false,
            username: '',
            password: '',
            rule: [v => !!v || 'این فیلد الزامی است'],
            loading: false
        }
    },


    methods: {
        validate() {
            this.$refs.login.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.login()
                }
            }, 200);
        },
        login() {
            this.loading = true
            axios({
                method: 'post',
                url: process.env.apiUrl + 'user/admin/login/',
                data: {
                    username: this.username,
                    password: this.password
                }
            })
                .then(response => {
                    this.$cookies.set('token', response.data.access)
                    this.$router.push('/')
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                })
        }
    }
}
</script>