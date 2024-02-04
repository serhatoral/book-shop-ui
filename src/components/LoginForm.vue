<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-card-text class="mt-12">
                <h3 class="text-center">Login in to Your Account</h3> 
                <h5 style="margin-top: 2%;" class="text-center  text-grey ">Log in to your account then you can access everything </h5>
                <v-row  justify="center">
                    <v-col cols="12" sm="8">

                        <v-text-field v-model="email" label="Email" outlined dense color="blue" autocomplete="false" class="mt-16" />
                        <v-text-field v-model="password" label="Password" outlined dense color="blue" autocomplete="false" type="password" />
                        <v-row>
                            <v-col cols="12" sm="7">
                                <v-checkbox label="Remember Me" class="mt-n1" color="blue">
                                </v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <span class="caption text-blue">Forgot password</span>
                            </v-col>
                        </v-row>
                        <v-btn color="blue" @click="handleLogin" dark block tile>Log in</v-btn>

                        <!-- <h5 class="text-center  text-grey mt-4 mb-3">Or Log in using</h5>
                        <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                            <v-btn depressed outlined color="grey">
                                <v-icon icon="fas fa-home" color="red">fab fa-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                                <v-icon color="blue">fab fa-facebook-f</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                                <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                            </v-btn>
                        </div> -->
                    </v-col>
                </v-row>
            </v-card-text>
        </v-col>
        <v-col cols="12" md="6" class="rounded-bl-xl" style="background-color:#2196F3 ">
            <div style="text-align: center; padding: 180px 0;">
                <v-card-text  class="text-white">
                    <h3 class="text-center ">Don't Have an Account Yet?</h3>
                    <h4 style="margin-top: 2%;" class="text-center">Create a new account and start discovering new books!</h4>
                </v-card-text>
                <div class="text-center">
                    <v-btn size="large" variant="outlined" color="white" @click="changeStep">SIGN UP</v-btn>

                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from '@/api/axios';

export default {

    data() {
        return {

            email: '',
            password: ''
        }
    },

    methods: {
        changeStep() {
            // Alt component içinde veriyi değiştirme
            this.step = 2;

            // Değişikliği üst componente emit et
            this.$emit('changeStep', this.step);
        },

         handleLogin(){
                axios.postData("/auth/generate-token",{
                    email: this.email,
                    password: this.password
                }).then(response=>{
                    console.log(response)
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('user',JSON.stringify(response.data.user))

                    if(response.status ===200){
                        this.$router.push('/')
                    }
                                           
                }).catch(error =>{
                    console.log(error.response)
                })
        }
    }
}
</script>


<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>