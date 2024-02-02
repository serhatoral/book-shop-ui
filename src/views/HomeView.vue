<template>

  <v-layout class="rounded rounded-md">

    <NavBar/>
    
    <SideBar/>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <h1>Homepage</h1>
    </v-main>

  </v-layout>
  
</template>

<script>
import { defineComponent } from 'vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue'



export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
    SideBar
  },
});
</script>
