<template>
    <div id="map"></div>
</template>

<script>
import {mapState} from 'vuex';

const aptStore = 'aptStore';

export default {
    name: 'KakaoMap',
    components: {},
	props: {
		aptList:{
			type: Array,
		},	
	},
    data() {
        return {
            map: null,
			// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
			bounds: null,
			// kakao map 마커 객체를 담을 배열
			markers: [],
			// kakao map 위치 객체를 담을 배열
			points: [],
        };
    },
	computed:{
        ...mapState(aptStore, ['aptDetail']),
    },
	watch:{
		aptList(){
			this.viewMap();
		},
	},
    created() {},
	mounted() {
		if(!window.kakao || !window.kakao.maps){
			const script = document.createElement("script");
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;
			console.log(script.src);
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
		// kakao map 및 bound 객체 불러오기
		initMap(){
			// 지도를 표시할 div
			const mapContainer = document.getElementById("map");
			const mapOption = {
				// 지도의 중심좌표
				center: new kakao.maps.LatLng(37.5012767241426, 127.039600248343),
				// 지도의 확대 레벨
				level: 3,
			};
			this.map = new kakao.maps.Map(mapContainer, mapOption);
		},
		// 아파트 리스트를 받고 지도에 마커로 표시하기
		viewMap(){
			if(this.aptList.length < 1) return;
			// 마커 초기화
			this.deleteMarkers();

			// 새로운 마커 만들기
			this.makeMarkers();

			// 지도 범위 재설정하기
			this.setBounds();
		},
		deleteMarkers(){
			this.markers.forEach((marker) => {
				marker.setMap(null);
			});
			this.markers = [];
			this.points = [];
		},
		makeMarkers(){
			// 좌표 객체 생성
			this.aptList.forEach((apt) => {
				this.points.push(new kakao.maps.LatLng(apt.lat, apt.lng));
			});

			// 마커 객체 생성
			this.points.forEach((point) => {
				this.markers.push(new kakao.maps.Marker({
					position: point,
				}));
			});

			// 마커 지도 위에 올리기
			this.markers.forEach((marker) => {
				marker.setMap(this.map);
			});
		},
		setBounds(){
			this.bounds = new kakao.maps.LatLngBounds();
			this.points.forEach((point) => {
				this.bounds.extend(point);
			});
			this.map.setBounds(this.bounds);
		},
		// 아파트 리스트를 받고 지도에 마커로 표시하기: END
		moveCenter(){
			this.map.relayout();
			this.map.setCenter(new kakao.maps.LatLng(this.aptDetail.lat, this.aptDetail.lng));
			this.map.setLevel(2);
		}
	},
};
</script>

<style scoped>
#map {
	width: 100%;
	height: 100%;
}
/* kakao map overlay css */
.wrap {
	position: absolute;
	left: 0;
	bottom: 40px;
	width: 288px;
	height: 132px;
	margin-left: -144px;
	text-align: left;
	overflow: hidden;
	font-size: 12px;
	font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
	line-height: 1.5;
}

.wrap * {
	padding: 0;
	margin: 0;
}

.wrap .info {
	width: 286px;
	height: 120px;
	border-radius: 5px;
	border-bottom: 2px solid #ccc;
	border-right: 1px solid #ccc;
	overflow: hidden;
	background: #fff;
}

.wrap .info:nth-child(1) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}

.info .title {
	padding: 5px 0 0 10px;
	height: 30px;
	background: #eee;
	border-bottom: 1px solid #ddd;
	font-size: 18px;
	font-weight: bold;
}

.info .close {
	position: absolute;
	top: 10px;
	right: 10px;
	color: #888;
	width: 17px;
	height: 17px;
	background:
		url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}

.info .close:hover {
	cursor: pointer;
}

.info .body {
	position: relative;
	overflow: hidden;
}

.info .desc {
	position: relative;
	margin: 13px 0 0 90px;
	height: 75px;
}

.desc .ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.desc .jibun {
	font-size: 11px;
	color: #888;
	margin-top: -2px;
}

.info .img {
	position: absolute;
	top: 6px;
	left: 5px;
	width: 73px;
	height: 71px;
	border: 1px solid #ddd;
	color: #888;
	overflow: hidden;
}

.info:after {
	content: "";
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: 0;
	width: 22px;
	height: 12px;
	background:
		url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.info .link {
	color: #5085bb;
}
/* kakao map overlay css: END */
</style>