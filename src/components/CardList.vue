<template>
    <div v-if="data">
        <v-container class="d-flex align-center justify-center" style="max-width: 75%;">
            <v-row v-if="data.numberOfElements > 0">
                <v-col v-for="n in data.numberOfElements" :key="n" cols="3">
                    <v-card :color="randomColor()" width="250" height="250" hover class="rounded-shaped">
                        <v-card-item>
                            {{ data.content[n - 1].publicationDate.substring(0, 10) }}

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

export default defineComponent({

    props: ['data'],
    data() {
        return {
            length: 0,
            colors: [
                '#92D4F0', '#749DD3', '#FECB98', '#FFDB99', '#FFEEAD', 
                '#C3B998', '#6594AB', '#95BC8C', '#D1D599', '#C4AA93',
                '#9F7986','#F1EDEE', '#DCD2D3', '#EAE4D2', '#C6D5D8', 
                '#E8DCD5','#50b8e7', '#84cdee', '#b9e2f5', '#dcf0fa',
                 '#475c6c', '#8a8583', '#eed7a1', '#f7efd2', '#cd8b62'
            ]
        }
    },
    methods: {
        randomColor() {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        },
    },

});

</script>