<template>
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
                            <v-text-field :rules="rule" v-model="name" color="black" label="نام شعبه" class="br-10" filled
                                dense></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    استان
                                </span>
                            </div>
                            <v-select :rules="rule" v-model="provice" :items="provices" color="black" label="استان"
                                class="br-10" filled dense></v-select>
                        </v-col>
                        <v-col cols="3">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    شهر
                                </span>
                            </div>
                            <v-select :rules="rule" v-model="city" :items="citys" color="black" label="شهر" class="br-10"
                                filled dense></v-select>
                        </v-col>
                        <v-col cols="3">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    تلفن
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="phone" color="black" label="تلفن" class="br-10" filled
                                dense></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    آدرس
                                </span>
                            </div>
                            <v-text-field :rules="rule" v-model="address" color="black" label="آدرس" class="br-10" filled
                                dense></v-text-field>
                        </v-col>

                    </v-row>
                </v-col>
                <v-col cols="6">
                    <div class="position__relative leaf_map" id="map-wrap">
                        <client-only>
                            <l-map @moveend="getCenterMap" :zoom="12" :center="latLng1" id="map">
                                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                <!-- <l-marker :draggable="true" :lat-lng="latLng"></l-marker> -->
                            </l-map>
                            <div class="search_location-btn">
                                <v-autocomplete v-model="selectAddress" :loading="loadingSearch" :search-input.sync="search"
                                    @keyup="searchFunction()" label="جست و جوی نشانی" dense item-text="title"
                                    item-value="location" :items="Address" background-color="white" outlined
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
            <v-btn :loading="lodaing" @click="validate()" color="DeepGreen" class="br-10 mr-5" width="199" height="44">
                <span class="t14400 white--text">
                    بارگذاری نهایی
                </span>
            </v-btn>

        </v-row>
    </v-card>
</template>

<script>
import axios from 'axios'
import { gql } from "nuxt-graphql-request";
export default {
    props: {
        close: { type: Function }
    },

    data() {
        return {
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
            map: false
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
                method: 'post',
                url: process.env.apiUrl + 'branch/admin/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
                data: {
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    phone: this.phone,
                    is_active: false,
                    lat:this.latLng1[0],
                    long:this.latLng1[1],
                }
            })
                .then(response => {
                    this.loading = false;
                    this.$store.dispatch('set_branches' , '')
                    this.resetForm()
                })
                .catch(err => {
                    this.loading = false;
                })
        }
    }
}
</script>