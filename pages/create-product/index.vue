<template>
    <div>
        <v-row justify="center" class="mt-15 pt-10">
            <v-col cols="4">
                <v-row justify="center">
                    <div class="select-image-box">
                        <label class="label">
                            <div class="text-center">
                                <img src="~/assets/img/ImageSquare.png" alt="">
                                <div class="text-center">
                                    <span class="t14400">محل بارگذاری تصویر محصول</span>
                                </div>
                                <v-file-input class="default-file-input" v-model="image" accept="image/*"
                                    label="File input"></v-file-input>
                            </div>
                        </label>

                    </div>

                    <div class="mx-3">
                        <div class="selected-image-box"></div>
                        <div class="selected-image-box mt-5"></div>
                        <div class="selected-image-box mt-5"></div>
                    </div>
                </v-row>

                <div class="mx-12 ml-14 mt-8">
                    <v-text-field color="black" label="Alternative name" class="br-10" filled dense></v-text-field>
                </div>
                <div class="mx-12 ml-14">
                    <v-textarea color="black" label="Alternative Caption" class="br-10" filled dense></v-textarea>
                </div>
                <div class="mr-8">
                    <v-btn color="DeepGreen" class="br-10 mr-5" width="136" height="44">
                        <span class="t14400 white--text">
                            بارگذاری عکس
                        </span>
                    </v-btn>
                </div>
            </v-col>
            <v-col cols="4">
                <div>
                    <div class="pr-12 "><span class="t18400 black--text">نام محصول</span></div>
                    <div class="mx-12 ml-14 mt-3">
                        <v-text-field color="black" label="نام محصول" class="br-10" filled dense></v-text-field>
                    </div>
                    <div class="pr-12 "><span class="t18400 black--text">انتخاب دسته بندی</span></div>
                    <div class="mx-12 ml-14 mt-3">
                        <v-select color="black" label="دسته بندی" class="br-10" filled dense></v-select>
                    </div>
                    <div class="pr-12 "><span class="t18400 black--text">انتخاب کالکشن</span></div>
                    <div class="mx-12 ml-14 mt-3">
                        <v-select color="black" label="کالکشن" class="br-10" filled dense></v-select>
                    </div>
                    <div class="mx-12 ml-14 ">
                        <v-text-field color="black" label="Meta title" class="br-10" filled dense></v-text-field>
                    </div>
                    <div class="mx-12 ml-14">
                        <v-textarea color="black" label="Meta Description" class="br-10" filled dense></v-textarea>
                    </div>
                </div>

            </v-col>

        </v-row>
        <v-row justify="center" class="mt-15 pt-10">
            <v-col cols="4">
                <div class="box-card mr-10 py-15 pt-8">
                    <v-row justify="center">
                        <v-col cols="9">
                            <v-text-field color="black" label="Past URL" class="br-10 py-2" hide-details filled
                                dense></v-text-field>

                            <v-text-field color="black" label="New URL" class="br-10" py-1 hide-details filled
                                dense></v-text-field>

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

                <div class="box-card mr-10 mt-15 py-5 pt-8">
                    <v-row justify="space-between" class="px-8 pb-2">

                        <v-btn width="94" height="40" depressed rounded class="br-10" large color="DeepGreen">

                            <span class="t14400 white--text">EDIT</span>
                        </v-btn>

                        <span class="t18400 mt-2">
                            FAQA
                        </span>

                    </v-row>

                </div>
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
                            <v-text-field color="black" label="Meta Title" class="br-10" filled dense></v-text-field>
                        </div>
                        <div class="pl-14 text-left"><span class="t18400 black--text">Meta Description</span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-textarea color="black" label="Meta Description" class="br-10" filled dense></v-textarea>
                        </div>
                        <div class="pl-14 text-left"><span class="t18400 black--text">Canonical</span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-text-field  color="black" label="Canonical" class="br-10" filled dense></v-text-field>
                        </div>
                       
                    </div>
                </div>

            </v-col>


        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: ''
        }
    }
}
</script>