<template>
    <v-row>
        <v-col cols="12" md="6" class="rounded-br-xl" style="background-color: #2196F3;">
            <div style="  text-align: center; padding: 180px 0;">
                <v-card-text class="text-white">
                    <h3 class="text-center ">Alredy Signed up?</h3>
                    <h4 style="margin-top: 3%;" class="text-center">Log in to your account then you can access everything!
                    </h4>
                </v-card-text>
                <div class="text-center">
                    <v-btn size="large" variant="outlined" color="white" @click="changeStep">Log in</v-btn>
                </div>
            </div>
        </v-col>

        <v-col cols="12" md="6">
            <v-card-text class="mt-12">
                <h3 class="text-center">Sign Up for an Account</h3>
                <h5 class="text-center  text-grey ">Create a new account and start discovering new books!</h5>
                <v-row justify="center">
                    <v-col cols="12" sm="8">
                        <v-form>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field :rules="firstNameRules" v-model="createUserRequest[0].firstName"
                                        :error-messages="fieldsError.firstName" label="First Name" outlined dense
                                        color="blue" autocomplete="false" class="mt-4" />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field :rules="lastNameRules" v-model="createUserRequest[0].lastName"
                                        :error-messages="fieldsError.lastName" label="Last Name" outlined dense color="blue"
                                        autocomplete="false" class="mt-4" />
                                </v-col>
                            </v-row>
                            <v-text-field :rules="emailRules" v-model="createUserRequest[0].email"
                                :error-messages="fieldsError.email" label="Email" outlined dense color="blue"
                                autocomplete="false" />
                            <v-text-field :rules="passwordRules" v-model="createUserRequest[0].password"
                                :error-messages="fieldsError.password" label="Password" outlined dense color="blue"
                                autocomplete="false" type="password" />
                            <v-row>
                                <v-col cols="12" sm="7">
                                    <v-checkbox label="I Accept AAE" class="mt-n1" color="blue">
                                    </v-checkbox>
                                </v-col>
                                <v-col cols="12" sm="5">
                                    <span class="caption blue--text ml-n4">Terms &Conditions</span>
                                </v-col>
                            </v-row>
                            <v-btn color="blue" :disabled=isButtonDisable dark block tile @click="handleSingup">Sign
                                up</v-btn>

                            <!-- <h5 class="text-center  grey--text mt-4 mb-3">Or Sign up using</h5>
                        <div class="d-flex  justify-space-between align-center mx-10 mb-11">
                            <v-btn depressed outlined color="grey">
                                <v-icon color="red">fab fa-google</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                                <v-icon color="blue">fab fa-facebook-f</v-icon>
                            </v-btn>
                            <v-btn depressed outlined color="grey">
                                <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                            </v-btn>
                        </div> -->
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-col>
    </v-row>

    <div class="text-center">
        <v-snackbar color="red-darken-2" location=" top" timeout="8000" v-model="snackbar" multi-line>
            {{ fieldsError.errorMessage }}

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
            isButtonDisable: true,
            fieldsError: {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                errorMessage: null
            },
            createUserRequest: [
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }
            ],

            firstNameRules: [
                value => {
                    if (value?.length >= 2) {

                        if (this.emailRegex(this.createUserRequest[0].email) && this.createUserRequest[0].lastName.length >= 2
                            && this.createUserRequest[0].password.length >= 3)  
                            this.isButtonDisable = false

                        return true
                    }
                    this.isButtonDisable = true
                    return 'password must be more than two characters'
                },
            ],
            lastNameRules: [
                value => {
                    if (value?.length >= 2) {

                        if (this.emailRegex(this.createUserRequest[0].email) && this.createUserRequest[0].firstName.length >= 2
                            && this.createUserRequest[0].password.length >= 3)    
                            this.isButtonDisable = false
                        return true
                    }
                    this.isButtonDisable = true
                    return 'last must be more than two characters'
                },
            ],
            emailRules: [

                value => {
                    if (value) return true

                    this.isButtonDisable = true
                    return 'You must enter a email.'
                },
                value => {
                    if (value?.length <= 50) return true

                    this.isButtonDisable = true
                    return 'Name must be less than 50 characters.'
                },
                value => {
                    if (this.emailRegex(value)) {

                        if (this.createUserRequest[0].password.length >= 3 && this.createUserRequest[0].firstName.length >= 2
                            && this.createUserRequest[0].lastName.length >= 2) 
                            this.isButtonDisable = false

                        return true
                    }
                    this.isButtonDisable = true
                    return 'E-mail must be valid'
                },
            ],
            passwordRules: [
                value => {
                    if (value?.length >= 3) {
                        
                        if (this.emailRegex(this.createUserRequest[0].email) && this.createUserRequest[0].firstName.length >= 2
                            && this.createUserRequest[0].lastName.length >= 2) 
                            this.isButtonDisable = false
                        
                        return true
                    }
                    this.isButtonDisable = true
                    return 'password must be more than three characters'
                },
            ],
        }
    },

    methods: {
        changeStep() {
            // Alt component içinde veriyi değiştirme
            this.step = 1;

            // Değişikliği üst componente emit et
            this.$emit('changeStep', this.step);
        },

        emailRegex(email) {

            if (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true
            }
            return false
        },
        handleSingup() {

            axios.postData('/customer/create', this.createUserRequest[0])
                .then(response => {
                    console.log(response.data)
                    if (response.status === 200) {
                        this.createUserRequest = [
                            {
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: ''
                            }
                        ];
                        this.changeStep();

                    }
                }).catch(error => {

                    if (error.response.status === 400) {
                        this.fieldsError.email = error.response.data.email;
                        this.fieldsError.password = error.response.data.password;
                        this.fieldsError.firstName = error.response.data.firstName;
                        this.fieldsError.lastName = error.response.data.lastName;

                        if (error.response.data.error) {
                            this.fieldsError.errorMessage = error.response.data.error;
                            this.snackbar = true
                        }

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
}</style>