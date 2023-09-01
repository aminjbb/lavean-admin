<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">

                <v-btn v-bind="attrs" v-on="on" icon>
                    <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    اتصال به محصول
                </v-card-title>

                <v-card-text class="py-10">
                    <v-autocomplete v-model="product" :items="items"  label="محصولات" 
                        solo></v-autocomplete>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false">
                        تایید
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            product:null,
            items:[]
        }
    },
}
</script>