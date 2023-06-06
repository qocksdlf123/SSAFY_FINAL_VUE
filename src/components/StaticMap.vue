<template>
    <div id='staticMap' style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
    name: 'StaticMap',
    components: {},
    data() {
        return {
            map: null,
            lat: 37.5012767241426,
            lng: 127.039600248343,
            myMarker: null,
        };
    },
    watch:{
        lat(){
            this.initMap();
        }
    },
    created() {
        this.getLatLng();
    },
    mounted() {
        if(!window.kakao || !window.kakao.maps){
			const script = document.createElement("script");
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
			/* global kakao */
			script.addEventListener("load", () => {
				kakao.maps.load(this.initMap);
			});
			document.head.appendChild(script);
		}else{
			this.initMap();
		}
    },
    methods: {
        initMap(){
            const mapContainer = document.getElementById("staticMap");
            this.getLatLng();
            this.myMarker = {
                position: new kakao.maps.LatLng(this.lat, this.lng),
                text: '당신의 현재 위치를 클릭해서 매물을 찾아보세요!!',
            }
            const mapOption = {
                // 지도의 중심좌표
				center: new kakao.maps.LatLng(this.lat, this.lng),
				// 지도의 확대 레벨
				level: 3,
                marker: this.myMarker,
			};
            this.map = new kakao.maps.StaticMap(mapContainer, mapOption);
        },
        getLatLng(){
            navigator.geolocation.getCurrentPosition((position) => {
            // The user's position is available in the position object.
            // For example, you can get the latitude and longitude like this:
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        });
        }
    },
};
</script>

<style scoped></style>