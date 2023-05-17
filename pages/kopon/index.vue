<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="#616161" class="mx-3 mt-10">
                <v-row class="px-5">
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت کوپن تخفیف
                    </span>
                </v-row>
            </v-card>

            <v-card v-if="!addCopon" height="103" class="mx-10 mt-5" outlined rounded="lg">
                <v-row justify="space-between" class="pa-11">
                    <span class="mt-2 t14600">
                        افزودن کوپن تخفیف

                    </span>
                    <span>
                        <v-btn @click="addCopon = true" icon>
                            <img src="~/assets/img/PlusCircle.svg" alt="">
                        </v-btn>
                    </span>
                </v-row>
            </v-card>

            <AddCopon v-else :close="closeAdd"/>
            <!-- <v-row class="ma-3">
          <v-col cols="2" >
            <v-text-field class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-text-field>
          </v-col>
          <v-col cols="2" >
            <v-select class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-select>
          </v-col>
          <v-col cols="2" >
            <v-btn color="#0A0A0A" height="44" width="136" class="mt-1 rounded-lg" >
              <v-row justify="space-between px-2">
                <span class="white--text">
                  فیلتر
                </span>
              </v-row>
            </v-btn>
          </v-col>
        </v-row> -->

            <div class="my-3 px-10">
                <v-data-table hide-default-footer :headers="headers" :items="desserts" :items-per-page="5"
                    class="elevation-1"></v-data-table>
            </div>
        </v-col>
    </v-row>
</template>
  
<script>
import AddCopon from '~/components/Copon/AddCopon'
export default {
    components: {
        AddCopon
    },
    data() {
        return {
            addCopon:false,
            headers: [
                {
                    text: 'نام کوپن',
                    align: 'center',
                    sortable: false,
                    value: 'name',
                },
                { text: 'تعداد', align: 'center', value: 'calories' },
                { text: 'تعداد استفاده', align: 'center', value: 'fat' },
                { text: 'تاریخ شروع', align: 'center', value: 'carbs' },
                { text: 'تاریخ انقضا', align: 'center', value: 'protein' },
                { text: 'درصد تخفیف', align: 'center', value: 'iron' },
                { text: 'تعداد مجاز در خرید', align: 'center', value: 'iron' },
                { text: 'Assign to', align: 'center', value: 'iron' },
                { text: 'مدیریت تخفیف', align: 'center', value: 'iron' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 1,
                },

            ],
        }
    },

    methods:{
        closeAdd(){
            this.addCopon = false
        }
    }
}
</script>
  