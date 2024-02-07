<template>
    <!--  <v-app-bar :elevation="8" rounded  title="Application bar" class="flex text-center"></v-app-bar> -->

    <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
            <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-app-bar-title style="margin-left: 5%;">Expoler the books...</v-app-bar-title>

        <v-spacer></v-spacer>

        <div class="text-center">
            <v-menu transition="fab-transition">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="ma-2" icon="mdi-account-circle"></v-btn>
                </template>

                <v-list v-if="isLogin">
                    <v-list-item :prepend-avatar=avatar :title=username :subtitle=email></v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    <v-list-item class="d-flex justify-center mt-3">

                        <v-btn color="#D32F2F" size="large" class="mb-3" @click="login">
                            Logout <v-icon class="ml-2">mdi-login</v-icon>
                        </v-btn>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>

                <v-btn color="#BBDEFB" size="large" class="mb-3" v-if="isLogin === false" @click="login">
                    Login <v-icon class="ml-2">mdi-login</v-icon>
                </v-btn>

            </v-menu>
        </div>

        <v-btn icon>
            <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

    </v-app-bar>
</template>


<script>
export default {
    data: () => ({
        avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        isLogin: localStorage.getItem('token') ? true : false
    }),

    created() {
        if (this.isLogin) {
            let user = JSON.parse(localStorage.getItem('user'));
            this.username = user.firstName + ' ' + user.lastName;
            this.email = user.email
        }
    },
    methods: {
        login() { // login- logout işleminin ikisini de yapar
            localStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>