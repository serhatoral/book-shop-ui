<template>
  <div>
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination v-model="page" class="my-4" :length="totalPageNumber" active-color="blue"></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({

  props: ['totalPageNumber'],
  data() {
    return {
      page: 1,
    }
  },
  watch: {
    page(){
      this.bookListPage = this.page-1
      this.$emit('changePage', this.bookListPage)
    }
  }
});
</script>