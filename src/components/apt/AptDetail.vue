<template>
    <div class="row col-md-3 justify-content-center">
        <div id="roadview" style="height: 30%"></div>
        <b-card tag="article" >
            <b-card-body>
                <b-card-title>{{ aptDetail.apartmentName }}</b-card-title>
                <b-card-sub-title>{{ aptDetail.address }}</b-card-sub-title>
                <b-card-text>
                    <font-awesome-icon :icon="['fas', 'hammer']" />건축년도: {{ aptDetail.buildYear }}년<br>
                    <font-awesome-icon :icon="['fas', 'map-location-dot']"  />도로명 주소: {{ aptDetail.roadName }}<br>
                    <hr>
                    <b-card-title><font-awesome-icon :icon="['fas', 'chart-line']" />통계 정보</b-card-title>
                    <div>
                        <canvas ref="lineChart" width="200px" height="200px"/>
                    </div>
                </b-card-text>
            </b-card-body>
            <hr>
            <b-card-title>등록 매물</b-card-title>
            <b-card-body v-if="properties.length != 0" style="height: 300px; overflow: auto;" >
                
                <b-card v-for="property in properties" :key="property.no" border-variant="info">
                    <b-card-text><font-awesome-icon :icon="['fas', 'house-circle-exclamation']" />{{property.type}}</b-card-text>
                    <b-card-text><font-awesome-icon :icon="['fas', 'hand-holding-dollar']" /> 보증금: {{property.dealAmount}}(만 원)<br>월세: {{property.monthlyPay}}(만 원)</b-card-text>
                    <b-card-text><font-awesome-icon :icon="['fas', 'person-shelter']" /> {{property.area}}(m<sup>2</sup>)</b-card-text>
                    <b-card-text><font-awesome-icon :icon="['fas', 'stairs']" /> {{property.floor}}층</b-card-text>
                </b-card>
            </b-card-body>
            <p v-else>등록 매물이 없어요</p>



            <b-button href="#" variant="primary" @click="regist" v-if="userInfo[`level`] == `공인중개사`">매물 등록하기</b-button>
            <div v-if="userInfo[`level`] == `회원`">
                <b-button href="#" variant="primary" @click="registBookmark()" v-if="isAddBookmark == false">관심매물
                    추가</b-button>
                <b-button href="#" variant="primary" disabled  v-else>관심매물 등록됨</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import { registerBookmark } from "@/api/bookmark";
import { mapState,mapMutations } from 'vuex';
import { selectById, } from "@/api/bookmark";
import {selectByAptCode} from '@/api/property';
import {selectStats} from '@/api/apt';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

const aptStore = 'aptStore';

export default {
    name: 'AptDetail',
    components: {},
    data() {
        return {
            roadviewContainer: null,
            roadview: null,
            roadviewClient: null,
            position: null,

            bookmarks : [],
            isBookmark: false,

            properties: [],
            
            chart: null,
            labels: [],
            data: [],
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        };
    },
    async created() {
        await selectById(this.userInfo.id,({data})=>{
            this.bookmarks = data["data"];
        },(error)=>console.log(error))

        console.log(this.bookmarks)
        console.log(this.bookmarks)

        for (let index = 0; index < this.bookmarks; index++) {
            if (this.bookmarks[index].buildingName === this.aptDetail.apartmentName) {
                console.log(1)
                this.isBookmark = true;
                console.log("이미 북마크")
                return;
            }
        }
        this.getProperties();
    },
    mounted() {
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
            console.log(script.src);
            /* global kakao */
            script.addEventListener("load", () => {
                kakao.maps.load(this.initDetail);
            });
            document.head.appendChild(script);
        } else {
            this.initDetail();
        }

        this.getStats();
    },
    computed: {
        ...mapState(aptStore, ['aptDetail', 'isAddBookmark']),
        ...mapState("userStore", ["userInfo"]),
        ...mapMutations("aptStore",["SET_ISADDBOOKMARK"])
    },
    watch: {
        aptDetail() {
            this.setDetail();
            this.getProperties();
            this.getStats();
        },
        isBookmarkAdded() {
            return this.isAddBookmark;
        },
    },
    methods: {
        initDetail() {
            this.roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
            this.roadview = new kakao.maps.Roadview(this.roadviewContainer); //로드뷰 객체
            this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            this.setDetail();
        },
        setDetail() {
            this.position = new kakao.maps.LatLng(this.aptDetail.lat, this.aptDetail.lng);

            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            this.roadviewClient.getNearestPanoId(this.position, 200, (panoId) => {
                this.roadview.setPanoId(panoId, this.position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
        },
        regist() {
            this.$router.push({
                path: '/property/write/' + this.aptDetail.aptCode,
            });
        },
        registBookmark() {
            let bookmark = {
                userId: this.userInfo.id,
                userName: this.userInfo.name,
                aptCode: this.aptDetail.aptCode,
                buildingName: this.aptDetail.apartmentName,
                address: this.aptDetail.address,
                roadName: this.aptDetail.roadName,
                buildYear: this.aptDetail.buildYear,
                lat: this.aptDetail.lat,
                lng: this.aptDetail.lng,
                
            }
            registerBookmark(bookmark,
                ({ data }) => {
                    if (data["success"] == true)
                        alert("등록성공")
                    else
                        alert("등록실패")
                },
                (error) => console.log(error));
            this.SET_ISADDBOOKMARK(true)
        },
        // 매물 정보 받아오기
        getProperties(){
            selectByAptCode(this.aptDetail.aptCode,
                ({data}) => {
                    this.properties = data['data'];
                },
                (error) => {
                    console.log(error);
                }
            );
        },

        // 통계 정보 설정
        getStats(){
            selectStats(this.aptDetail.aptCode,
                ({data}) => {
                    this.labels = data['data'].map(row=>row.dealYear);
                    this.data = data['data'].map(row=>row.average);

                    this.createChart();
                },
                (error) => {
                    console.log(error);
                }
            );
        }, 
        createChart(){
            if(this.chart) this.chart.destroy();
            this.chart = new Chart(this.$refs.lineChart,
                {
                    type: 'line',
                    data: {
                        labels: this.labels,
                        datasets: [{
                            data: this.data,
                            label: '평균 매매가',
                            fill: false,
                        }]
                    },
                    options: this.options,
                }
            )
        }
    },
};
</script>

<style scoped></style>