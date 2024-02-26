<template>
  <v-layout class="rounded rounded-md">

    <NavBar title="Profile" />
    <SideBar />
    <v-main style="margin-top: 3%;">
      <v-container class=" align-center justify-center" style="max-width: 80%; min-height: 900px;">

        <DataTable v-show="true" :data="likedBooks" :headers="likedBooksTableHeaders" />
      </v-container>


    </v-main>

  </v-layout>
</template>



<script>
import { defineComponent } from 'vue';

import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue'
import DataTable from '@/components/DataTable.vue';
import axios from '../api/axios';

export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
    SideBar,
    DataTable
  },

  data() {
    return {
      isLogin: localStorage.getItem('token') ? true : false,
      likedBooks: [],
      likedBooksTableHeaders:[
        {title: "Title", key:'title'},
        {title: "Isbn-13", value:'isbn-13'},
        {title: "Number of Pages", key:'numberOfPages'},
        {title: "Publication Date", key:'publicationDate'},
        {title: "Author", key:'author[0].authorName'},
        {title: "Publisher", key:'publisher.publisherName'}

      ]
    }

  },
  created() {
    
    if (this.isLogin) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.userId = user.id;

      this.getLikedBooks();
      
    }
    
  },
  methods: {
    getLikedBooks() {
      axios.getDataWithToken('like/customer-books?customerId=' + this.userId)
        .then(response => {

          this.likedBooks = response.data.likedBooks
          
          console.log(this.likedBooks)

        }).catch(error => {
          if (error.response.data.error === 'Jwt is Expired')
            this.isLogin = false
          localStorage.clear();

          console.log(error.response.data.error)
        })
    },

  },
});
</script>