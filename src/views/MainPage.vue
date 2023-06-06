<template>
	<b-container fluid>
		<header class="py-1" style="height: 300px">
			<router-link to="/search">
				<static-map></static-map>
			</router-link>
		</header>
<!-- Section-->
		<section class="pb-1">
			<div class="container px-4 px-lg-5 mt-5">
				<div class="row">
					<div class="col-md-6">
						<h2><font-awesome-icon :icon="['fas', 'eye']" /> 제일 관심많은 아파트</h2>
						<rank-list></rank-list>
					</div>
					<div class="col-md-6">
						<h2><font-awesome-icon :icon="['fas', 'newspaper']" /> 부동산 뉴스</h2>
						<news-carousel></news-carousel>
					</div>
				</div>
			</div>
		</section>
		<!-- Footer-->
		<footer class="py-5 bg-dark">
			<div class="container">
			<p class="m-0 text-center text-white">
				Copyright &copy; Your Website 2023
			</p>
			</div>
</footer>
	</b-container>
</template>

<script>
import NewsCarousel from '@/components/news/NewsCarousel.vue';
import StaticMap from '@/components/StaticMap.vue';
import RankList from '@/components/RankList.vue';


export default {
    name: 'MainPage',
    components: {NewsCarousel, StaticMap, RankList},
    data() {
        return {
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
.debug{
    border: 1px solid black;
}
</style>