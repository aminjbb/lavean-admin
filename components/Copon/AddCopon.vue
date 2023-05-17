<template>
    <v-card height="250" class="mx-10 mt-5 br-15" outlined>
        <v-row class="pt-10 px-10">
            <v-col cols="1" class="pr-0">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        نام کوپن
                    </span>
                </div>
                <v-text-field color="black" label="نام کوپن" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="1">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        تعداد
                    </span>
                </div>
                <v-text-field color="black" label="تعداد" type="number" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        تعداد استفاده
                    </span>
                </div>
                <v-text-field color="black" label="تعداد استفاده" type="number" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        زمان
                    </span>
                </div>
                <v-text-field color="black" label="زمان" class="br-10" filled dense    id="date"></v-text-field>
                <date-picker v-model="date" range format="jYYYY/jMM/jDD" custom-input="#date" />
            </v-col>

            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        درصد تخفیف
                    </span>
                </div>
                <v-text-field color="black" label="درصد تخفیف"  type="number" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        تعداد مجاز در خرید
                    </span>
                </div>
                <v-text-field color="black" label="تعداد مجاز در خرید"  type="number" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t14600 black--text">
                        Assign to
                    </span>
                </div>
                <v-select color="black" label="Assign to"  class="br-10" filled dense></v-select>
            </v-col>
        </v-row>

        <v-row justify="end" class="px-13 ">
            <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
            </v-btn>
            <v-btn color="DeepGreen" class="br-10 mr-5" width="199" height="44">
                <span class="t14400 white--text">
                    بارگذاری نهایی
                </span>
            </v-btn>

        </v-row>
    </v-card>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
    components: {
        datePicker: VuePersianDatetimePicker,
    },
    props: {
        close: { type: Function }
    }
}
</script>