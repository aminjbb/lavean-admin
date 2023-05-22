<template>
    <v-dialog transition="dialog-bottom-transition" max-width="1080" v-model="dialog" class="br-20">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" width="94" height="40" depressed rounded class="br-10" large color="DeepGreen">

                <span class="t14400 white--text">EDIT</span>
            </v-btn>


        </template>

        <v-card class="br-20 py-10">
            <v-row justify="space-between" align="center" class="pa-10 px-15 mx-10">

                <v-icon color="black">
                    mdi-close-circle-outline
                </v-icon>
                <span class="black--text">FAQA</span>
            </v-row>
            <v-row justify="center" class="px-15">
                <v-card width="866" height="293" outlined class="br-20">
                    <v-row justify="center" align="center" class="pa-5">

                        <v-col cols="6">
                            <v-btn :loading="loading" @click="validate()" icon>
                                <v-icon size="42" color="black">mdi-plus-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="form.question" color="black" label="Question" class="br-10 py-2"
                                hide-details filled dense></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="form.answer" color="black" label="Answer" class="br-10" filled
                                dense></v-textarea>
                        </v-col>
                    </v-row>
                </v-card>

                <ExpansionFAQs/>
            </v-row>
            <!-- <v-form class="mt-5" v-model="valid" @submit.prevent="validate()" ref="addCatalogForm">
                <v-row justify="center" align="center">
                    <v-col class="pa-5">
                        <v-form v-model="valid" ref="addFaq">
                            <v-col cols="12">
                                <v-text-field :rules='rule' v-model="form.question" label="پرسش" outlined>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea :rules='rule' v-model="form.answer" label="پاسخ" outlined rows="4">
                                </v-textarea>
                            </v-col>
                        </v-form>

                        <v-row class="ma-0 px-3">
                            <v-btn :loading="loading" @click="validate()" icon>
                                <v-icon size="42" color="primary">mdi-plus-circle-outline</v-icon>
                            </v-btn>
                        </v-row>

                        <v-divider class="mb-6"></v-divider>
                        <ExpansionFAQs :qa="faq" :getDetail="getQa" />
                    </v-col>

                </v-row>
            </v-form> -->
            <!-- <v-card-actions class="justify-end">
                <v-btn :loading="loading" text @click="dialog = false">ذخیره</v-btn>
            </v-card-actions> -->
        </v-card>
    </v-dialog>
</template>

<script>
import ExpansionFAQs from '~/components/Product/ExpansionFAQs'
export default {
    components:{
        ExpansionFAQs
    },  
    data() {
        return {
            dialog: false,
            valid: false,
            loading: false,
            detail: '',
            rule: [(v) => !!v || "این فیلد الزامی است"],
            form: {
                question: "",
                answer: ''
            },
        };
    },
}
</script>