<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="#616161" class="mx-3 mt-10">
                <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت شعبه
                    </span>
                </v-row>
            </v-card>
            <v-card v-if="!addBrache" height="103" class="mx-10 mt-5 br-15" outlined>
                <v-row justify="space-between" class="pa-11">
                    <span class="mt-2 t14600">
                        افزودن شعبه جدید
                    </span>
                    <span>
                        <v-btn icon @click="addBrache = true">
                            <img src="~/assets/img/PlusCircle.svg" alt="">
                        </v-btn>
                    </span>
                </v-row>

            </v-card>

            <AddBranche v-else :close="closeAdd"/>

            <v-card height="103" outlined class="ma-3 mx-10 br-15">
                <v-row align="center" class="fill-height">
                    <v-col cols="8">
                        <v-row justify="space-between" align="center" class="fill-height  mr-5">
                            <div>
                                <div class="mb-5">
                                    <span class="t14600">
                                        شعبه اوپال
                                    </span>
                                </div>
                                <v-row align="center" class="pr-2">
                                    <span class="ml-2">
                                        <img src="~/assets/img/map-pin.svg" alt="">
                                    </span>
                                    <span class="t14400">
                                        سعادت آباد، خیابان علامه جنوبی، کوچه ۳۴ شرقی، پلاک ۲۷، واحد ۱۶
                                    </span>
                                </v-row>
                            </div>
                            <div>
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/phone.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        ۰۹۳۰۰۱۷۹۶۴۸
                                    </span>
                                </v-row>
                            </div>
                            <div>
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/GlobeHemisphereWest.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        تهران
                                    </span>
                                </v-row>
                            </div>
                            <!-- <span>
                  ۰۹/۲۵ - ۰۹/۳۰
                </span> -->
                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

                            <span>
                                <v-btn icon>
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
import AddBranche from '~/components/Branche/AddBranche'
export default {
    components:{
        AddBranche
    },
    data() {
        return {
            message: '',
            addBrache:false
        }
    },


    methods:{
        closeAdd(){
            this.addBrache =false;
        }
    }
}
</script>
  