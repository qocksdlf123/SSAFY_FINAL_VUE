<template>
    <b-carousel no-animation controls indicators fade background="#204152" >
        <a :href="article.link" target="_blank" v-for="(article, index) in articles" :key="index">
            <b-carousel-slide v-b-tooltip.hover title="뉴스페이지로 이동" img-blank :img-src="article.imgSrc">
                <div style="width: 350px height: 250px"> 
                    <img v-if="article.imgSrc != '#'" class="h-100 w-100" :src="article.imgSrc">
                    <font-awesome-icon v-else :icon="['fas', 'newspaper']" size="2xl" />
                </div>
                <h3>{{article.title}}</h3>
                <p>
                {{article.description}}
                </p>
            </b-carousel-slide>
        </a>
    </b-carousel>
</template>

<script>
import {getArticle} from '@/api/news';

export default {
    name: 'NewsCarousel',
    components: {},
    data() {
        return {
            articles: [],
        };
    },
    created() {
        getArticle(
            ({data}) => {
                this.articles = data['data'];
                console.log(this.articles);
            },
            (e) => {
                console.log(e);
            }
        );
    },
    methods: {
    },
};
</script>

<style scoped>
</style>