<template>
    <div v-if="data">
        <v-container class="d-flex align-center justify-center" style="max-width: 75%;">
            <v-row v-if="data.numberOfElements > 0">
                <v-col v-for="n in data.numberOfElements" :key="n" cols="3">
                    <v-card :color="randomColor()" width="250" height="250" hover class="rounded-shaped">
                        <v-card-item>
                            <v-row justify="space-between" style="margin-top: 2px; margin-right:1px;">
                                <p class="mt-3 ml-3">{{ data.content[n - 1].publicationDate.substring(0, 10) }}</p>
                                <v-btn v-if="isLiked(data.content[n - 1].id)" @click="removeLike(data.content[n - 1].id)" class="mr-1" variant="text" color="red"
                                    icon="mdi-heart"></v-btn>
                                <v-btn v-else-if="isLogin" @click="like(data.content[n - 1].id)" class="mr-1" variant="text"
                                    icon="mdi-heart"></v-btn>

                            </v-row>
                            <div class="font-weight-bold mb-1 mt-5 mb-5">
                                {{ data.content[n - 1].title }}
                            </div>

                            <div v-for="a in data.content[n - 1].author.length" :key="a.id" class="font-weight-light">
                                {{ data.content[n - 1].author[a - 1].authorName }}
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
import { defineComponent } from 'vue';
import axios from '../api/axios';
export default defineComponent({

    props: ['data'],
    data() {
        return {
            isLogin: localStorage.getItem('token') ? true : false,
            userId: null,
            likedBooks: [],
            test: true,
            length: 0,
            colors: [
                '#92D4F0', '#749DD3', '#FECB98', '#FFDB99', '#FFEEAD',
                '#C3B998', '#6594AB', '#95BC8C', '#D1D599', '#C4AA93',
                '#9F7986', '#F1EDEE', '#DCD2D3', '#EAE4D2', '#C6D5D8',
                '#E8DCD5', '#50b8e7', '#84cdee', '#b9e2f5', '#dcf0fa',
                '#475c6c', '#8a8583', '#eed7a1', '#f7efd2', '#cd8b62'
            ]
        }
    },
    created() {
        if (this.isLogin) {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user)
            this.userId = user.id;

            this.getLikedBook();
        }
    },
    methods: {
        randomColor() {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        },
        getLikedBook() {
            axios.getDataWithToken('like/customer-books?customerId=' + this.userId)
                .then(response => {

                    console.log(response.data.likedBooks)
                    response.data.likedBooks.forEach(element => {
                        this.likedBooks.push(element.id)
                    });

                }).catch(error => {
                    if (error.response.data.error === 'Jwt is Expired')
                        this.isLogin = false
                    localStorage.clear();

                    console.log(error.response.data.error)
                })
        },

        like(bookId) {
            if (this.isLogin) {
                axios.getDataWithToken(`like/book?customerId=${this.userId}&bookId=${bookId}`)
                    .then(response => {
                        console.log(response.data)
                        this.likedBooks.push(bookId)
                    })
            }
        },

        removeLike(bookId){
            if (this.isLogin) {
                axios.getDataWithToken(`like/remove/book?customerId=${this.userId}&bookId=${bookId}`)
                    .then(response => {
                        console.log(response.data)
                        this.likedBooks.pop(bookId)
                    })
            }
        },
        isLiked(bookId) {
            return this.likedBooks.includes(bookId)
        }

    },
});

</script>