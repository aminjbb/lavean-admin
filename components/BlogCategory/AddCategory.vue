<template>
    <v-card height="250" class="mx-10 mt-5 br-15" outlined>
        <v-form v-model="valid" ref="addCollection" @submit.prevent="validate()">
            <v-row class="pt-10 px-10">
                <v-col cols="2" class="pr-0">
                    <div class="pr-2 mb-5">
                        <span class="t18400 black--text">
                            نام دسته بندی
                        </span>
                    </div>
                    <v-text-field :rules="rule" v-model="name" color="black" label="نام " class="br-10" filled
                        dense></v-text-field>
                </v-col>
            </v-row></v-form>


        <v-row justify="end" class="px-13 ">
            <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
            </v-btn>
            <v-btn dark @click="validate()" :loading="loading" color="DeepGreen" class="br-10 mr-5" width="199" height="44">
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
        close: { type: Function },
    },

    data() {
        return {
            name: '',
            rule: [v => !!v || 'این فیلد الزامی است'],
            loading: false,
            valid: true
        }
    },

    methods: {
        validate() {
            this.$refs.addCollection.validate();
            setTimeout(() => {
                if (this.valid) {
                    this.createCategory()
                }
            }, 200);
        },
        resetForm() {
            this.$refs.addCollection.reset()
        },
        createCategory() {
            this.loading = true;
            axios({
                method: 'post',
                url: process.env.apiUrl + 'blog/category/admin/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    name: this.name,

                }
            })
                .then(response => {
                    this.loading = false;
                    this.resetForm()
                    this.$store.dispatch('set_blogCategorys', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        }
    }


}
</script>