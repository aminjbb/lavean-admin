<template>
    <v-card height="250" class="mx-10 mt-5 br-15" outlined>
        <v-row class="pt-10 px-10">
            <v-col cols="2" class="pr-0">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        نام شعبه
                    </span>
                </div>
                <v-text-field color="black" label="نام شعبه" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        شهر
                    </span>
                </div>
                <v-text-field color="black" label="شهر" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="6">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        آدرس
                    </span>
                </div>
                <v-text-field color="black" label="آدرس" class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
                <div class="pr-2 mb-5">
                    <span class="t18400 black--text">
                        تلفن
                    </span>
                </div>
                <v-text-field color="black" label="تلفن" class="br-10" filled dense></v-text-field>
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
export default {
    props: {
        close: { type: Function }
    }
}
</script>