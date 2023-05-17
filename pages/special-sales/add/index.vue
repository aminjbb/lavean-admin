<template>
    <v-card class="br-20 mx-10 mt-10" outlined >
        <v-row justify="center" class="my-15 pt-10">
            <v-col cols="8">
                <v-row>
                    <v-col cols="4">
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
                        <div class=" mt-5">
                            <v-btn color="DeepGreen" class="br-10 mr-5" width="136" height="44">
                                <span class="t14400 white--text">
                                    بارگذاری عکس
                                </span>
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="5">
                        <div class="pr-12 "><span class="t18400 black--text">نام دسته بندی</span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-text-field color="black" label="نام محصول" class="br-10" filled dense></v-text-field>
                        </div>
                        <div class="pr-12 "><span class="t18400 black--text">انتخاب کالکشن</span></div>
                        <div class="mx-12 ml-14 mt-3">
                            <v-select color="black" label="انتخاب کالکشن" class="br-10" filled dense></v-select>
                        </div>
                        <div class="pr-12 "><span class="t18400 black--text">زمان</span></div>
                        <div class="mx-12 ml-14 mt-3" style="width:176px">
                            <v-text-field  color="black" label="زمان" class="br-10" filled dense id="sales-date"></v-text-field>
                            <date-picker v-model="date" range format="jYYYY/jMM/jDD" custom-input="#sales-date" />
                        </div>
                      

                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </v-card>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
    components: {
        datePicker: VuePersianDatetimePicker,
    },
    data() {
        return {

        }
    }
}
</script>