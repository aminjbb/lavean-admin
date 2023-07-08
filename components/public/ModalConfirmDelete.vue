<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">

            <v-card>
                <v-col>
                    <v-row class="ma-0" justify="center" align="center">
                        <v-icon color="error" size="64">mdi-close-octagon</v-icon>
                    </v-row>
                    <p>آیا از پاک کردن آیتم مورد نظر مطمئنید؟</p>
                </v-col>
                <v-divider></v-divider>
                <v-col>
                    <v-row class="ma-0" justify="space-between" align="center">
                        <v-btn outlined @click="close()"> انصراف </v-btn>
                        <v-btn :loading="loading" color="error" @click="remove()">
                            حذف
                        </v-btn>
                    </v-row>
                </v-col>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        dialog() {
            return this.$store.getters['public/get_deleteModal']
        },
        status() {
            return this.$store.getters['public/get_statusDelete']
        },
        id() {
            return this.$store.getters['public/get_objectId']
        }
    },

    methods: {
        close() {
            this.$store.commit('public/set_deleteModal', false)
            this.$store.commit('public/set_statusDelete', '')
            this.$store.commit('public/set_objectId', '')
        },
        remove() {
            if (this.status == 'product') this.deleteProduct()
            else if (this.status == 'branche') this.deleteBranche()
            else if (this.status == 'category') this.deleteCategory()
            else if (this.status == 'collection') this.deleteCollection()
            else if (this.status == 'blog') this.deleteBlog()
            else if (this.status == 'blogCategory') this.deleteBlogCategory()
        },

        deleteProduct() {
            this.loading = true
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'product/admin/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_products', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        deleteBranche() {
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'branch/admin/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_branches', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        deleteCategory() {
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'category/admin/product/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_categories', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        deleteCollection() {
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'collection/admin/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_collections', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        deleteBlog() {
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'blog/post/admin/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_blogs', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
        deleteBlogCategory() {
            axios({
                method: 'delete',
                url: process.env.apiUrl + 'blog/category/admin/' + this.id + '/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },

            })
                .then(response => {
                    this.loading = false
                    this.close()
                    this.$store.dispatch('set_blogCategorys', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },
    }
}
</script>