<template>
    <div v-if="data">
        <v-container class="d-flex align-center justify-center" style="max-width: 75%;">
            <v-row>
                <v-col v-for="n in data.size" :key="n" cols="3">
                    <v-card width="250" height="250" hover>
                        <v-card-item>
                            <div>
                                <div class="text-overline mb-1">
                                    {{ data.content[n - 1].title }}
                                </div>
                                <div class="text-h6 mb-1">
                                    <!--  Headline -->
                                </div>
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
            length: 0
        }
    },
});

</script>