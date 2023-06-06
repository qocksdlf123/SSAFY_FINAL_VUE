<template>
    <div>
        <!-- 조건 nav start -->
	<nav class="navbar navbar-expand-lg bg-body-tertiary ms-5">
		<div class="container-fluid">
			<div class="row col-md-12 justify-content-center mb-2 ms-5">
				<div class="form-group col-md-2 ms-5">
					<select class="form-select bg-secondary text-light" v-model="sidoSelected" id="sido">
						<option value="">시도 선택</option>
                        <option v-for="(value, index) in sidoList" :key="index" :value="value.dongCode">{{value.sidoName}}</option>
					</select>
				</div>
				<div class="form-group col-md-2">
					<select class="form-select bg-secondary text-light" v-model="gugunSelected" id="gugun">
						<option value="">구군 선택</option>
                        <option v-for="(value, index) in gugunList" :key="index" :value="value.dongCode">{{value.gugunName}}</option>
					</select>
				</div>
				<div class="form-group col-md-2">
					<select class="form-select bg-secondary text-light" v-model="dongSelected" id="dong">
						<option value="">동 선택</option>
                        <option v-for="(value, index) in dongList" :key="index" :value="value.dongCode">{{value.dongName}}</option>
					</select>
				</div>
				<div class="form-group col-md-2">
					<button type="button" id="list-btn" class="btn btn-outline-primary" @click="getAptInfo">
						아파트정보</button>
				</div>
			</div>
		</div>
	</nav>
	<!-- 조건 nav end-->

	<!-- content start -->
	<div class="row" style="height: 85vh" id="content">
		<!-- 검색 결과 start -->
		<div class="row col-md-3" style="height: 100%" id="left-content">
			<!-- 검색 결과 리스트 -->
			<div class="text-center" id="list-section">
				<h4>아파트 정보</h4>
                <hr>
				<div id="list">
                    <apt-list-item v-for="(apt, index) in aptList" :key="apt.aptCode" 
                    :apt="apt" :index="index" :start="start" :end="end" @set_detail="setDetail($event), setCenter()"></apt-list-item>
                </div>
				<ul class='pagination  justify-content-center' v-if="aptList.length > 0">
                    <li class='page-item'><a href='#' @click="setPage(1)" class='page-link'>처음</a></li>
                    <li class='page-item' v-if="pageNum > 1"><a href='#' @click="leftPage()" class='page-link'>이전</a></li>
                    <li class='page-item' v-if="pageNum!=pageNumMax"><a href='#' @click="rightPage" class='page-link'>다음</a></li>
                    <li class='page-item' ><a  href='#' @click="setPage(pageNumMax)"  class='page-link'>마지막</a></li>
                </ul>
			</div>
		</div>
        
		<!-- 검색 결과 end -->
		<!-- 지도 start -->
		<div class="row" v-bind:class="[hasDetail ? 'col-md-6': 'col-md-9']" id="main-content">
            <kakao-map-vue ref="mapComp" v-bind:apt-list="aptList"></kakao-map-vue>
		</div>
        <!-- 상세 결과 start -->
        <apt-detail v-if="hasDetail" @set_detail="setDetail($event)"></apt-detail>
        <!-- 상세 결과 end -->
		<!-- 지도 end -->
	</div>
    
	<!-- content end-->
    </div>
</template>

<script>
import KakaoMapVue from '@/components/apt/KakaoMap.vue';
//import PageNaviVue from '@/components/PageNavi.vue';
import AptListItem from '@/components/apt/AptListItem.vue';
import {selectDongCode} from '@/api/dongCode';
import {selectApt} from '@/api/apt';
import AptDetail from '@/components/apt/AptDetail.vue';


export default {
    name: 'SearchPage',
    components: {KakaoMapVue, AptListItem, AptDetail},
    data() {
        return {
            sidoList: [],
            gugunList: [],
            dongList: [],
            sidoSelected: '',
            gugunSelected: '',
            dongSelected: '',
            aptList: [],
            
            listsize : null,
            pageNumMax : 0,
            pageNum : 0,
            isAddBookmark : null,
            hasDetail: false,
        };
    },
    created() {
        this.getSidoList();
    },
    watch:{
        sidoSelected(newValue){
            this.initOption("gugun");
            this.initOption("dong");
            if(newValue){
                this.getGugunList();
            }
        },
        gugunSelected(newValue){
            this.initOption("dong");
            if(newValue){
                this.getDongList();
            }
        },
    },
    computed:{
        start() {     //시작 index
            return ((this.pageNum-1) * 10);
        },
        end() {      //끝 index
            return this.pageNum===this.pageNumMax ? this.listsize-1 : ((this.pageNum) * 10)-1
        },

    },
    methods: {
        // 동 코드 설정
        initOption(selid){ // option 초기화
            if(selid == 'sido'){
                this.sidoList = [];
                this.sidoSelected = "";
            }else if(selid == 'gugun'){
                this.gugunList = [];
                this.gugunSelected = "";
            }else if(selid == 'dong'){
                this.dongList = [];
                this.dongSelected = "";
            }
        },
        getSidoList(){ // 시도 리스트 가져오기
            selectDongCode('0000000000', 
            ({data}) => {
                this.sidoList = data['data'];
            },
            (e) => console.log(e));
        },
        getGugunList(){ // 구군 리스트 가져오기
            selectDongCode(this.sidoSelected, 
            ({data}) => {
                this.gugunList = data['data'];
            },
            (e) => console.log(e));
        },
        getDongList(){ // 동 리스트 가져오기
            selectDongCode(this.gugunSelected, 
            ({data}) => {
                this.dongList = data['data'];
            },
            (e) => console.log(e));
        },
        // 동 코드 설정: END

        // 아파트 정보 생성
        getAptInfo(){
            if(!this.gugunSelected){
                alert("시도와 구군은 필수 선택입니다!");
                return;
            }

            const code = this.dongSelected ? this.dongSelected : this.gugunSelected;
            selectApt(code, 
            ({data}) => {
                if(data['data'].length == 0){
                    alert("아파트 정보가 없습니다.");
                    return;
                }
                this.aptList = data['data'];

                this.listsize = this.aptList.length;
                this.pageNumMax = parseInt(this.listsize/10) + 1;
                if(this.listsize%10 ===0) this.pageNumMax -=1; 
                this.pageNum = 1;
            },
            (e) => console.log(e));
        },
        // 아파트 정보 생성: END

        // page navigation 함수
        setPage(i) {
            this.pageNum = i;
        },
        leftPage(){
            this.pageNum -=1;
        },
        rightPage(){
            this.pageNum +=1;
        },
        // page navigation 함수: END

        // aptDetail 함수
        setDetail(flag){
            this.hasDetail = flag;
        },
        setCenter(){
            this.$refs.mapComp.moveCenter();
        }
        // aptDetail 함수: END
    },
};
</script>

<style scoped>
#list-section{
    padding: 30px;
    margin-left : 5px;
    border: 10px solid black;
    border-radius: 20px;
}
</style>