<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-card-text class="mt-12">
                <h3 class="text-center">Login in to Your Account</h3>
                <h5 style="margin-top: 2%;" class="text-center  text-grey ">Log in to your account then you can access
                    everything </h5>
                <v-row justify="center">
                    <v-col cols="12" sm="8">
                        <v-form>
                            <v-text-field :rules="emailRules" v-model="email" label="Email" :error-messages="emailError"
                                outlined dense color="blue" autocomplete="false" class="mt-16" />
                            <v-text-field :rules="passwordRules" v-model="password" label="Password"
                                :error-messages="passwordError" outlined dense color="blue" autocomplete="false"
                                type="password" />
                            <v-row>
                                <v-col cols="12" sm="7">
                                    <v-checkbox label="Remember Me" class="mt-n1" color="blue">
                                    </v-checkbox>
                                </v-col>
                                <v-col cols="12" sm="5">
                                    <span class="caption text-blue">Forgot password</span>
                                </v-col>
                            </v-row>
                            <v-btn color="blue" :disabled=isButtonDisable @click="handleLogin" dark block tile>Log
                                in</v-btn>
                        </v-form>
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
                <v-card-text class="text-white">
                    <h3 class="text-center ">Don't Have an Account Yet?</h3>
                    <h4 style="margin-top: 2%;" class="text-center">Create a new account and start discovering new books!
                    </h4>
                </v-card-text>
                <div class="text-center">
                    <v-btn size="large" variant="outlined" color="white" @click="changeStep">SIGN UP</v-btn>

                </div>
            </div>
        </v-col>
    </v-row>

    <div class="text-center">
        <v-snackbar color="red-darken-2" location=" top" timeout="8000" v-model="snackbar" multi-line>
            {{ errorMessage }}

            <template v-slot:actions>
                <v-btn color="white" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import axios from '@/api/axios';

export default {
    emits: ['changeStep'],
    data() {
        return {
            snackbar: false,
            errorMessage: null,
            emailError: null,
            passwordError: null,
            email: '',
            password: '',
            isButtonDisable: true,
            passwordRules: [
                value => {
                    if (value.length >= 3) {
                        this.isButtonDisable = false
                        return true
                    }
                    this.isButtonDisable = true
                    return 'password must be more than three characters'
                },
            ],
            emailRules: [
                
                 value => {
                    if (value) {
                        this.isButtonDisable = false
                        return true
                    }
                    this.isButtonDisable = true
                    return 'You must enter a email.'
                },
                value => {
                    if (value?.length <= 50) {
                        this.isButtonDisable = false
                        return true
                    }

                    this.isButtonDisable = true
                    return 'Name must be less than 50 characters.'
                },
                value => {
                    if (this.emailRegex(value)) {
                        this.isButtonDisable = false
                        if (this.password.length === 0)
                            this.isButtonDisable = true
                        return true
                    }
                    this.isButtonDisable = true
                    return 'E-mail must be valid'
                },

            ],
        }
    },

    methods: {
        changeStep() {
            // Alt component içinde veriyi değiştirme
            this.step = 2;

            // Değişikliği üst componente emit et
            this.$emit('changeStep', this.step);
        },
        emailRegex(email) {
            
            if (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true
            }
            return false
        },
        handleLogin() {
            axios.postData("/auth/generate-token", {
                email: this.email,
                password: this.password
            }).then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))

                if (response.status === 200) {
                    this.$router.push('/')
                }

            }).catch(error => {
                if (error.response.status === 400) { // Burada apide yapılan email- password validasyonundan dönen hatalar gösteriliyor. Bu sayede frontend form validasyonu yapmama gerek kalmadı.
                    this.emailError = error.response.data.email
                    this.passwordError = error.response.data.password
                }

                if (error.response.status === 404) { // Eğer kullanıcı kayıtlı değilse onun hatası gösteriliyor.
                    this.errorMessage = error.response.data.error
                    this.passwordError = null
                    this.snackbar = true
                }
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