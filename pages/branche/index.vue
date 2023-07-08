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
            <v-card v-if="!addBrache && !editBranche" height="103" class="mx-10 mt-5 br-15" outlined>
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

            <AddBranche v-else-if="addBrache && !editBranche" :close="closeAdd" />
            <div v-if="editBranche && !addBrache">
                <v-card min-height="250" class="mx-10 mt-5 br-15" outlined>
                    <v-form v-model="valid" ref="addBranche" @submit.prevent="validate()">
                        <v-row class="pt-10 px-10">
                            <v-col cols="6">
                                <v-row justify="center">
                                    <v-col cols="3" class="pr-0">
                                        <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                نام شعبه
                                            </span>
                                        </div>
                                        <v-text-field :rules="rule" v-model="name" color="black" label="نام شعبه"
                                            class="br-10" filled dense></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                استان
                                            </span>
                                        </div>
                                        <v-select :rules="rule" v-model="provice" :items="provices" color="black"
                                            label="استان" class="br-10" filled dense></v-select>
                                    </v-col>
                                    <v-col cols="3">
                                        <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                شهر
                                            </span>
                                        </div>
                                        <v-select :rules="rule" v-model="city" :items="citys" color="black" label="شهر"
                                            class="br-10" filled dense></v-select>
                                    </v-col>
                                    <v-col cols="3">
                                        <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                تلفن
                                            </span>
                                        </div>
                                        <v-text-field :rules="rule" v-model="phone" color="black" label="تلفن" class="br-10"
                                            filled dense></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                آدرس
                                            </span>
                                        </div>
                                        <v-text-field :rules="rule" v-model="address" color="black" label="آدرس"
                                            class="br-10" filled dense></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <div class="position__relative leaf_map" id="map-wrap1">
                                    <client-only>
                                        <l-map @moveend="getCenterMap" :zoom="12" :center="latLng1" id="map1">
                                            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                            <!-- <l-marker :draggable="true" :lat-lng="latLng"></l-marker> -->
                                        </l-map>
                                        <div class="search_location-btn">
                                            <v-autocomplete v-model="selectAddress" :loading="loadingSearch"
                                                :search-input.sync="search" @keyup="searchFunction()"
                                                label="جست و جوی نشانی" dense item-text="title" item-value="location"
                                                :items="Address" background-color="white" outlined
                                                prepend-inner-icon="mdi-magnify" no-data-text="آدرس مورد نظر را وارد کنید"
                                                class="over_map br-15" color="black">
                                                <template v-slot:item="address">
                                                    <v-col class="pa-0" cols="12">
                                                        <v-row class="ma-0" align="center">
                                                            <v-col cols="1" class="d-flex align-center justify-center">
                                                                <img src="~/assets/img/location.svg" alt="" />
                                                            </v-col>
                                                            <v-col>
                                                                <p class="t12600 OuterSpace--text mb-1">
                                                                    {{ address.item.title }}
                                                                </p>
                                                                <p class="t10400 DimGray--text mb-0">
                                                                    {{ address.item.neighbourhood }}
                                                                </p>
                                                            </v-col>

                                                        </v-row>
                                                        <v-divider></v-divider>
                                                    </v-col>

                                                </template>

                                            </v-autocomplete>
                                        </div>
                                        <v-btn small fab depressed @click="getLocation()" absolute class="my_location-btn">
                                            <v-icon>mdi-crosshairs-gps</v-icon>
                                        </v-btn>
                                    </client-only>
                                    <img width="40" src="~/assets/img/map-pin.svg" class="marker_center" alt="" />
                                </div>
                            </v-col>

                        </v-row>
                    </v-form>


                    <v-row justify="end" class="pa-13 ">
                        <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                            <span class="t14400">
                                انصراف
                            </span>
                        </v-btn>
                        <v-btn :loading="lodaing" @click="validate()" color="DeepGreen" class="br-10 mr-5" width="199"
                            height="44">
                            <span class="t14400 white--text">
                                بارگذاری نهایی
                            </span>
                        </v-btn>

                    </v-row>
                </v-card>
            </div>
            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="branche  in branches" :key="branche.id">
                <v-row align="center" class="fill-height">
                    <v-col cols="8">
                        <v-row justify="space-between" align="center" class="fill-height  mr-5">
                            <v-col cols="5">
                                <div class="mb-5">
                                    <span class="t14600">
                                        {{ branche.name }}
                                    </span>
                                </div>
                                <v-row align="center" class="pr-2">
                                    <span class="ml-2">
                                        <img src="~/assets/img/map-pin.svg" alt="">
                                    </span>
                                    <span class="t14400">
                                        {{ branche.address }}
                                    </span>
                                </v-row>
                            </v-col>
                            <v-col cols="3">
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/phone.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        ۰۹۳۰۰۱۷۹۶۴۸
                                    </span>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/GlobeHemisphereWest.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa" v-if="branche.city">
                                        {{ branche.city.name }}
                                    </span>
                                </v-row>
                            </v-col>
                            <!-- <span>
                  ۰۹/۲۵ - ۰۹/۳۰
                </span> -->
                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

                            <span>
                                <v-btn @click="editBrancheFunc(branche)" icon>
                                    <img src="~/assets/img/edit.svg" alt="">
                                </v-btn>
                            </span>
                            <span class="mr-5">
                                <v-btn @click="deleteBranche(branche.id)" icon>
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
import axios from 'axios'
import { gql } from "nuxt-graphql-request";
export default {
    components: {
        AddBranche
    },
    data() {
        return {
            message: '',
            addBrache: false,
            name: '',
            phone: '',
            address: '',
            provice: '',
            city: '',
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: true,
            loading: false,
            latLng1: [35.6996, 51.4018],
            loadingSearch: false,
            search: "",
            selectAddress: "",
            search: "",
            Address: [],
            map: false,
            editBranche: false,
            brancheId: ''
        }
    },
    computed: {
        provices() {
            var provice = []
            this.$store.getters['public/get_provinces'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                provice.push(form)
            });
            return provice
        },
        citys() {
            var city = []
            this.$store.getters['public/get_citys'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                city.push(form)
            });
            return city
        },
        branches() {
            return this.$store.getters['get_branches']
        }
    },

    watch: {
        provice(val) {
            this.$store.dispatch('public/set_citys', val)
        },
        selectAddress(val) {
            if (val) {
                this.latLng1 = [val.y, val.x];
            }
        },
        addressMapModal(val) {
            if (val) {
                this.mapLoad()
            }
        }
    },

    methods: {
        mapLoad() {
            setTimeout(() => {
                this.map = true
            }, 500)
        },
        searchFunction() {
            if (this.search) {
                setTimeout(() => {
                    this.searchAddress();
                }, 2000);
            } else {
                this.Address = [];
            }
        },
        async searchAddress() {
            const query =
                gql`
      query {
        neshan(requestUrl:"v1/search?term=` +
                this.search +
                `&lat=` +
                this.latLng[0] +
                `&lng=` +
                this.latLng[1] +
                `")
    } `;
            this.loadingSearch = true;
            const map = await this.$graphql.default.request(query, {});
            var text = map.neshan;
            let result = text.replace(/'/g, '"');
            const obj = JSON.parse(result);
            this.loadingSearch = false;
            this.Address = obj.items;
        },
        async getGraphLocation() {
            const query = gql`
        query {
          neshan(requestUrl:"v5/reverse?lat=`+ this.latLng1[0] + `&lng=` + this.latLng1[1] + `")
          } `;
            this.loading = true
            const map = await this.$graphql.default.request(query, {});
            var text = map.neshan
            var result = text.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false').replace(/None/g, 'null');

            var form = {
                lat: this.latLng1[0],
                lng: this.latLng1[1],
                address: JSON.parse(result)
            }

            this.$store.commit('public/set_addressOnMap', form)
            this.close()
            if (localStorage.getItem('modalMap') != 'edit') {
                this.$store.commit('public/set_addAddressModal', true)

            }


            // this.$store.commit('user/set_mapAddress', form);
            this.loading = false
        },
        getLocation() {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((e) => {
                    this.latLng1 = [e.coords.latitude, e.coords.longitude];
                });
                console.log(this.latLng1);
            } else {
                // x.innerHTML = "Geolocation is not supported by this browser.";
            }
        },

        getCenterMap(e) {
            // console.log(e.target.getCenter());
            var latlng = e.target.getCenter();
            // console.log(latlng.lat);
            this.latLng1 = [latlng.lat, latlng.lng];
        },
        closeAdd() {
            this.addBrache = false;
            this.editBranche = false
        },
        deleteBranche(id) {
            this.$store.commit('public/set_deleteModal', true)
            this.$store.commit('public/set_statusDelete', 'branche')
            this.$store.commit('public/set_objectId', id)
            
        },
        editBrancheFunc(branche) {
            this.brancheId = branche.id
            this.editBranche = true
            this.addBrache = false
            try {
                this.name = branche.name
                this.address = branche.address
                this.provice = branche.city.province.id
                this.city = branche.city.id
                this.latLng1 = [branche.lat, branche.long]
            } catch (error) {

            }
        },

        validate() {
            this.$refs.addBranche.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.createBranche()
                }
            }, 200);
        },

        resetForm() {
            this.$refs.addBranche.rest()
        },

        createBranche() {
            this.loading = true;
            axios({
                method: 'put',
                url: process.env.apiUrl + 'branch/admin/' + this.brancheId + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    phone: this.phone,
                    is_active: false,
                    lat: this.latLng1[0],
                    long: this.latLng1[1],
                }
            })
                .then(response => {
                    this.loading = false;
                    this.$store.dispatch('set_branches', '')
                    this.editBranche = false
                    this.resetForm()
                })
                .catch(err => {
                    this.loading = false;
                })
        }
    },

    beforeMount() {
        this.$store.dispatch('public/set_provinces')
        this.$store.dispatch('set_branches', '')
    }
}
</script>
  