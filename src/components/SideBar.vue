<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item :prepend-avatar=avatar :title=username :subtitle=email></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in sideBarFields" :key=index :prepend-icon=item.icon :title=item.title 
        :value=item.value @click="selectedTab = item.value"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script>

import { defineComponent } from 'vue';

export default defineComponent({

  data() {
    return {
      username: 'User',
      email: 'user@xxxxx.com',
      avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
      selectedTab: "myLikedBooks",
      sideBarFields: [
        {
          icon: "mdi-heart",
          title: "My Liked Books",
          value: "myLikedBooks"
        },
        {
          icon: "mdi-account-multiple",
          title: "Shared with me",
          value: "shared"
        },
        {
          icon: "mdi-star",
          title: "Starred",
          value: "starred"
        },

      ]

    }
  },
  created() {
    if (localStorage.getItem('token')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.username = user.firstName + ' ' + user.lastName;
      this.email = user.email
    }
  },

  watch: {
    selectedTab() {
      this.getLikedBooks();
    }
  },

  methods: {
    
  }
});

</script>