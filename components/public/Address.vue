<template>
    <div class="mt-2 mx-10">
        <div class="box-delivery border-r-15 py-3 text-right">
            <v-row align="center" class="px-15">
                <span >
                    <img src="~/assets/img/map-pin.svg" alt="">
                </span>
                <p class="t14400 Arsenic--text ma-3 my-4 mr-8 ">
                    {{ address.addressDetail }}
                </p>

            </v-row>
        </div>

    </div>
</template>

<script>

export default {
    props: {
        address: ''
    },

    data(){
        return {}
    }
}
</script>