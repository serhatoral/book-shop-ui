<template>
  <v-layout class="rounded rounded-md">

    <NavBar />
    <SideBar />
    <v-main style="margin-top: 3%;">

      <SearchBar @searchText="getBooksTitleContaining"/>
      <CardList v-if="bookList" :data="bookList" />
      <CustomPagination v-if="bookList" :total-page-number="bookList.totalPages" @changePage="getBooks" />
    </v-main>

  </v-layout>
</template>



<script>
import { defineComponent } from 'vue';

import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue'
import CardList from '@/components/CardList.vue';
import axios from '../api/axios';
import CustomPagination from '@/components/CustomPagination.vue';
import SearchBar from '@/components/SearchBar.vue'


export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
    SideBar,
    CardList,
    CustomPagination,
    SearchBar
  },

  data() {
    return {
      user: {},
      bookListPage: 0,
      bookListTotalPages: null,
      bookList: null,
    }

  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getBooks(this.bookListPage);

  },
  methods: {

    getBooks(page) {
      axios.getData(`book/get-with-page?page=${page}`)
        .then(response => {
          this.bookList = response.data
          this.bookListTotalPages = this.bookList.totalPages
        })
    },

    getBooksTitleContaining(searchText,page){
      axios.getData(`book/get-by-title-containing?title=${searchText}&page=${page}`)
        .then(response => {
          this.bookList = response.data
          this.bookListTotalPages = this.bookList.totalPages
        })
    }
  },
});
</script>
