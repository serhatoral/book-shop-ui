<template>
    <v-layout class="rounded rounded-md">
  
      <NavBar title="Profile"/>
      <SideBar />
      <v-main style="margin-top: 3%; background-color:#F8F9F9;">
        <div style="height: 1000px;">

        </div>

        
      </v-main>
  
    </v-layout>
  </template>



<script>
import { defineComponent } from 'vue';

import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue'



export default defineComponent({
    name: 'HomeView',
  
    components: {
      NavBar,
      SideBar
    },
  
    data() {
      return {
        
      }
  
    },
    created() {
    },
    methods: {
  
      
    },
  });
  </script>