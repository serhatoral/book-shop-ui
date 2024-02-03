<template>
  <v-layout class="rounded rounded-md">

    <NavBar />

    <SideBar />

    <v-main>
      <v-container class="d-flex align-center justify-center" style="max-width: 75%;">


        <v-row>
          <v-col v-for="n in 100" :key="n" cols="3">

            <v-card width="250" height="250" hover>

              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    Test
                  </div>
                  <div class="text-h6 mb-1">
                    Headline
                  </div>
                </div>
              </v-card-item>



             
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-layout>
</template>



<script>
import { defineComponent } from 'vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue'
import api from '../api/axios'


export default defineComponent({
  name: 'HomeView',


  data() {
    return {
      
    }
  },

  created(){
   this.fetchData();
   
  },
  components: {
    NavBar,
    SideBar
  },

  methods: {
    fetchData() {
      
      api.getData('/customer/1')
        .then(response => {
          
          console.log(response.data);
          
        })
        .catch(error => {
          // Handle the error
          console.error('Error fetching data:', error);
        });
    },

    postData() {
      
      const dataToSend = { /* your data */ };
      api.postData(dataToSend)
        .then(response => {
          // Handle the response data
          console.log(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error('Error posting data:', error);
        });
    },
  },
});
</script>
