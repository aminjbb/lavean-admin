<template>
    <div>
        <v-form v-model="valid" ref="addBlog">
            <v-row justify="center" class="mt-15 pt-10">
                <v-col cols="12">
                    <v-row justify="center">
                        <div class="select-image-box-blog">
                            <label class="label">
                                <div class="text-center">

                                    <img :src="baseUrl + preImage" v-if="preImage && !pre.base64" width="394" height="394" alt=""
                                        class="mt-17 br-25">
                                    <div v-else>
                                        <img :src="pre.base64" v-if="pre.base64" width="394" height="394" alt=""
                                            class="mt-17 br-25">
                                        <img src="~/assets/img/ImageSquare.png" v-else alt="">
                                        <div class="text-center" v-if="!pre.base64">
                                            <span class="t14400">محل بارگذاری تصویر محصول</span>
                                        </div>
                                    </div>
                                    <v-file-input class="default-file-input" v-model="image" accept="image/*"
                                        label="File input"></v-file-input>
                                </div>
                            </label>

                        </div>


                    </v-row>
                    <!-- 
                <v-row justify="center" class="mt-15">
                    <div>
                        <v-btn color="DeepGreen" class="br-10 mr-5" width="136" height="44">
                            <span class="t14400 white--text">
                                بارگذاری عکس
                            </span>
                        </v-btn>
                    </div>
                </v-row> -->
                </v-col>
                <v-col cols="8">
                    <v-from v-model="valid" ref="product">
                        <v-row justify="center">
                            <v-col cols="3" class="px-0 ma-0">
                                <div class="pr-12 "><span class="t18400 black--text">نام مطلب</span></div>
                                <div class="mx-12 ml-1 mt-3">
                                    <v-text-field :rules="rule" v-model="form.mainTitle" color="black" label="نام مطلب"
                                        class="br-10" filled dense></v-text-field>
                                </div>
                            </v-col>
                            <!-- <v-col cols="3" class="px-0">
                        <div class="pr-12 "><span class="t18400 black--text">نویسنده</span></div>
                        <div class="mx-12 ml-1 mt-3">
                            <v-select color="black" label="نویسنده" class="br-10" filled dense></v-select>
                        </div>
                    </v-col>
                    <v-col cols="3" class="px-0">
                        <div class="pr-12 "><span class="t18400 black--text">تاریخ</span></div>
                        <div class="mx-12 ml-1 mt-3">
                            <v-select color="black" label="کالکشن" class="br-10" filled dense></v-select>
                        </div>
                    </v-col> -->
                            <v-col cols="3" class="px-0">
                                <div class="pr-12 "><span class="t18400 black--text">دسته بندی</span></div>
                                <div class="mx-12 ml-1 mt-3">
                                    <v-select :rules="rule" :items="categories" v-model="form.category" color="black"
                                        label="دسته بندی" class="br-10" filled dense></v-select>
                                </div>
                            </v-col>

                        </v-row>
                    </v-from>
                </v-col>

            </v-row>
            <v-row justify="center" class="mt-15 pt-10">
                <v-col cols="4">
                    <div class="box-card mr-10 py-15 pt-8">
                        <v-row justify="center">
                            <v-col cols="9">
                                <v-text-field color="black" label="Past URL" class="br-10 py-2" hide-details filled
                                    dense></v-text-field>

                                <v-text-field v-model="form.url" color="black" label="New URL" class="br-10" py-1
                                    hide-details filled dense></v-text-field>

                                <v-text-field color="black" label="page" class="br-10 py-2" hide-details filled
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <span class="t18400">Redirect</span>
                            </v-col>
                        </v-row>
                    </div>

                    <div class="box-card mr-10 mt-15 py-5 pt-8">
                        <v-row justify="end" class="px-8">
                            <v-card outlined class="br-10  ml-15" max-height="40" width="194">
                                <v-item-group v-model="available" active-class="btn2_toggle-plp">

                                    <v-item v-slot="{ active, toggle }" value="all">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepCarminePink' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''"> No Index</span>
                                        </v-btn>
                                    </v-item>
                                    <v-item v-slot="{ active, toggle }" value="available">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepGreen' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Index</span>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>
                            <span class="t18400 mt-2">
                                INDEX
                            </span>


                        </v-row>
                        <v-row justify="end" class="px-8 mt-6 mb-2">
                            <v-card outlined class="br-10  ml-11" max-height="40" width="194">
                                <v-item-group v-model="available" active-class="btn2_toggle-plp">

                                    <v-item v-slot="{ active, toggle }" value="all">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepCarminePink' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Unfollow</span>
                                        </v-btn>
                                    </v-item>
                                    <v-item v-slot="{ active, toggle }" value="available">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepGreen' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Follow</span>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>
                            <span class="t18400 mt-2">
                                ROBOTS
                            </span>


                        </v-row>
                    </div>

                    <!-- <div class="box-card mr-10 mt-15 py-5 pt-8">
                        <v-row justify="space-between" class="px-8 pb-2">
                            <FAQA />

                            <span class="t18400 mt-2">
                                FAQA
                            </span>

                        </v-row>

                    </div> -->
                </v-col>
                <v-col cols="4">
                    <div class="box-card mr-10 py-4 pt-8">
                        <div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Keyword</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field color="black" label="Meta Keyword" class="br-10" filled dense></v-text-field>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Title</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field v-model="form.metaTitle" color="black" label="Meta Title" class="br-10" filled
                                    dense></v-text-field>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Description</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-textarea v-model="form.metDescription" color="black" label="Meta Description"
                                    class="br-10" filled dense></v-textarea>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Canonical</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field v-model="form.canonical" color="black" label="Canonical" class="br-10" filled
                                    dense></v-text-field>
                            </div>

                        </div>
                    </div>

                </v-col>
                <v-col cols="8">
                    <TinymceVue v-if="load" v-model="form.longDescription" id="d2" class="mb-8" :other_options="options">
                    </TinymceVue>
                </v-col>

            </v-row>
        </v-form>

        <v-row justify="end" class="pa-13 ml-15">
            <v-btn color="ChineseWhite" class="br-10" width="126" height="44">
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
    </div>
</template>

<script>
import TinymceVue from "~/components/public/TinymceVue";
import axios from 'axios'
export default {
    data() {
        return {
            preImage: '',
            image: '',
            load: false,
            loading: false,
            valid: true,
            rule: [v => !!v || 'این فیلد الزامی است'],
            options: {
                height: 500,
            },
            pre: {
                image: '',
                base64: '',
                name: '',
                desc: ''
            },
            form: {
                mainTitle: '',
                category: '',
                metaTitle: '',
                metDescription: '',
                canonical: '',
                longDescription: '',
                url: ''
            }
        }
    },

    methods: {
        setForm(obj) {
            this.form.mainTitle = obj.mainTitle
            this.form.metDescription = obj.metaDescription
            this.form.canonical = obj.canonical
            this.preImage = obj.image
            this.form.metaTitle = obj.metaTitle
            this.form.url = obj.url
            this.form.longDescription = obj.description

            this.load = true
        },
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
        validate() {
            this.$refs.addBlog.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.createBlog()
                }
            }, 200);
        },
        createBlog() {
            this.loading = true;
            var formdate = new FormData();
            formdate.append('main_title' ,this.form.mainTitle)
            formdate.append('meta_description' ,this.form.metDescription)
            formdate.append('meta_title' ,this.form.metaTitle)
            formdate.append('description' ,this.form.longDescription)
            formdate.append('category' ,this.form.category)
            formdate.append('canonical' ,this.form.canonical)
            formdate.append('url' ,this.form.url)
            if (this.image)   formdate.append('image' ,this.image)
            axios({
                method: 'put',
                url: process.env.apiUrl + 'blog/post/admin/' + this.$route.params.id +'/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                    "Content-Type": "multipart/form-data",
                },
                data: formdate
            })
                .then(response => {
                    this.loading = false;

                    this.$router.push('/blog')
                    this.$store.dispatch('set_blogCategorys', '')
                })
                .catch(err => {
                    this.loading = false;
                })

        }
    },

    components: {
        TinymceVue
    },

    watch: {
        image(val) {
            this.imageToBase64()
        },

        blog(val) {
            console.log(val);
            this.setForm(val)
        }
    },

    computed: {
        categories() {
            try {
                var catregories = []
                this.$store.getters['get_blogCategorys'].forEach(element => {
                    var form = { text: element.name, value: element.id }
                    catregories.push(form)
                });
                return catregories
            } catch (error) {
                return []
            }
        },
        blog() {
            try {
                return this.$store.getters['get_blog']
            } catch (error) {
                return ''
            }
        },

        baseUrl() {
            return process.env.baseUrl + '/media/'
        }
    },
    beforeMount() {
        this.$store.dispatch('set_blogCategorys', '')
        this.$store.dispatch('set_blog', this.$route.params.id)
    },

}
</script>