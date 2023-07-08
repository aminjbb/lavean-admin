<template>
    <div class="pa-5">
        <v-row justify="center" align="center">
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        نام و نام خانوادگی
                    </span>
                </div>
                <v-text-field :rules="rule" v-model="name" color="black" label="نام و نام خانوادگی" class="br-10" filled
                    dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        جنسیت
                    </span>
                </div>
                <v-text-field :rules="rule" v-model="name" color="black" label="جنسیت" class="br-10" filled
                    dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        شماره موبایل
                    </span>
                </div>
                <v-text-field :rules="rule" v-model="name" color="black" label="شماره موبایل" class="br-10" filled
                    dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        نام کالکشن
                    </span>
                </div>
                <v-text-field :rules="rule" v-model="name" color="black" label=" کد ملی" class="br-10" filled
                    dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        تاریخ تولد
                    </span>
                </div>
                <v-text-field id="birthdate" :rules="rule" v-model="date" color="black" label="تاریخ تولد " class="br-10" filled
                    dense></v-text-field>
                    <date-picker v-model="date" range format="jYYYY/jMM/jDD" custom-input="#birthdate" />
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        ایمیل
                    </span>
                </div>
                <v-text-field :rules="rule" v-model="name" color="black" label=" ایمیل" class="br-10" filled
                    dense></v-text-field>
            </v-col>
        </v-row>

        <v-row justify="end" class="px-5 ">
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
    </div>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
export default {
    components:{
        datePicker: VuePersianDatetimePicker,
    },
    data() {
        return {
            name: '',
            date:'',
            rule: [v => !!v || 'این فیلد الزامی است']
        }
    }
}
</script>