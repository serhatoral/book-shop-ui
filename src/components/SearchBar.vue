<template>
    <v-row class="justify-center mb-3">
        <v-card class="pa-4" flat width="50%" color="#F8F9F9 ">
            <v-toolbar dense floating>
                <v-text-field @keyup.enter="search" v-model="text" hide-details single-line></v-text-field>
                <v-btn @click="search" icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>

    </v-row>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({

    
    data() {
        return {
            text:null
        }
    },
    methods:{
        search(){
            this.$emit('searchText', this.text,0)
        }
    }
});

</script>