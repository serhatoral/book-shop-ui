<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <LoginForm @changeStep="updateStep" />
                        </v-window-item>
                        <v-window-item :value="2">
                            <SignUpForm @changeStep="updateStep" />
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
    

<script>
import { defineComponent } from 'vue';
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue';
export default defineComponent({

    components: {
        LoginForm,
        SignUpForm
    },

    data() {
        return {
            step: 1
        }
    },
    methods: {
        updateStep(newStep) {
            this.step = newStep;
        }
    }
});


</script>