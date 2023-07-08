<template>
    <v-card class="br-20 mx-10 mt-10" outlined>
        <v-row justify="center" class="my-15 pt-10">
            <v-col cols="8">
                <v-row>
                    <v-col cols="4">
                        <div class="select-image-box">
                            <label class="label">
                                <div class="text-center">
                                    <img :src="pre.base64" v-if="pre.base64" width="394" height="394" alt=""
                                        class="mt-17 br-25">
                                    <img src="~/assets/img/ImageSquare.png" v-else alt="">
                                    <div class="text-center" v-if="!pre.base64">
                                        <span class="t14400">محل بارگذاری تصویر محصول</span>
                                    </div>
                                    <v-file-input class="default-file-input" v-model="image" accept="image/*"
                                        label="File input"></v-file-input>
                                </div>
                            </label>

                        </div>
                        <!-- <div class=" mt-5">
                            <v-btn color="DeepGreen" class="br-10 mr-5" width="136" height="44">
                                <span class="t14400 white--text">
                                    بارگذاری عکس
                                </span>
                            </v-btn>
                        </div> -->
                    </v-col>
                    <v-col cols="5">
                        <div class="pr-12 "><span class="t18400 black--text">نام </span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-text-field v-model="name" color="black" label="نام " class="br-10" filled
                                dense></v-text-field>
                        </div>
                        <div class="pr-12 "><span class="t18400 black--text">url </span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-text-field v-model="url" color="black" label="url " class="br-10" filled
                                dense></v-text-field>
                        </div>
                        <div class="pr-12 "><span class="t18400 black--text"> دسته بندی</span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-select :items="categories" v-model="category" color="black" label="دسته بندی" class="br-10"
                                filled dense></v-select>
                        </div>
                        <div class="pr-12 "><span class="t18400 black--text">نام زیرمجموعه‌ها</span></div>
                        <div class="mx-12 ml-14 mt-8">
                            <v-row class="px-3">
                                <v-col cols="4" class="py-1 mx-2">
                                    <div class="sub-category-box px-5 pt-3">
                                        <span class="t14400 GraniteGray--text">
                                            نگین دار
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="4" class="py-1 mx-2">
                                    <div class="sub-category-box px-5 pt-3">
                                        <span class="t14400 GraniteGray--text">
                                            نگین دار
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="4" class="py-1 mx-2">
                                    <div class="sub-category-box px-5 pt-3">
                                        <span class="t14400 GraniteGray--text">
                                            نگین دار
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="4" class="py-1 mx-2">
                                    <div class="sub-category-box px-5 pt-3">
                                        <span class="t14400 GraniteGray--text">
                                            نگین دار
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
        <v-row justify="end" class="px-13 mb-10">
            <v-btn @click="$router.push('/category')" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
            </v-btn>
            <v-btn dark @click="createCategory()" :loading="loading" color="DeepGreen" class="br-10 mr-5" width="199"
                height="44">
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
    data() {
        return {
            image: '',
            pre: {
                image: '',
                base64: '',
                name: '',
                desc: ''
            },
            name: '',
            category: '',
            loading: false,
            url: '',
            showImage:''
        }
    },

    methods: {
        imageToBase64() {

            this.pre.image = this.image
            var imageFile = this.image
            var fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                // console.log('base64:', srcData)
                this.pre.base64 = srcData
            };
            fileReader.readAsDataURL(imageFile);
        },

        createCategory() {
            this.loading = true;
            axios({
                method: 'put',
                url: process.env.apiUrl + 'category/admin/product/' + this.categoryEdit.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    name: this.name,
                    image: this.image,
                    parent: this.category,
                    url: this.url
                }
            })
                .then(response => {
                    this.loading = false;
                    this.$router.push('/category')
                    this.$store.dispatch('set_categories', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },


        setForm() {
            try {
                this.name = this.categoryEdit.name
                this.url = this.categoryEdit.url    
                this.showImage = this.categoryEdit.image    
            } catch (error) {

            }
        }

    },

    watch: {
        image(val) {
            this.imageToBase64()
        },
    },
    computed: {
        categories() {
            try {
                var cats = []
                this.$store.getters['get_categories'].forEach(element => {
                    var form = { text: element.name, value: element.id }
                    cats.push(form)
                });
                return cats
            } catch (error) {
                return []
            }
        },

        categoryEdit() {
            return this.$store.getters['public/get_categoryEdit']
        },
    },
    beforeMount() {
        this.$store.dispatch('set_categories', '')
      
    },

    mounted() {
        this.setForm()
    }
}
</script>