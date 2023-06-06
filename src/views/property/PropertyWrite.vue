<template>
     <div class="row justify-content-center ">
        <div class="col-lg-8 col-md-10 col-sm-12 mt-5">
            <h2 class="my-3 py-3 shadow-sm bg-light text-center mt-5">
                매물 작성
            </h2>
        </div>
        <div class="col-lg-8 col-md-10 col-sm-12">
            <b-form @submit="submit" @reset="reset" v-if="show" id="form-register">
                <b-form-group id='input-group-1' label="거래 분류" label-for="input-type" class="form-label">
                    <b-form-select id="input-type" v-model="type" :options="options" required></b-form-select>
                </b-form-group>
                <b-form-group id='input-group-2' label="보증금(만 원)" label-for="input-deal-amount" class="form-label">
                    <b-form-input id="input-deal-amount" v-model="dealAmount" required></b-form-input>
                </b-form-group>
                <b-form-group v-if="type == '월세'" id='input-group-3' label="월세(만 원)" label-for="input-monthly-pay" class="form-label">
                    <b-form-input id="input-monthly-pay" v-model="monthlyPay" required></b-form-input >
                </b-form-group>
                <b-form-group id='input-group-4' label="전용면적" label-for="input-area" class="form-label">
                    <b-form-input id="input-area" v-model="area" required></b-form-input>
                </b-form-group>
                <b-form-group id='input-group-5' label="층 수" label-for="input-floor" class="form-label">
                    <b-form-input id="input-floor" v-model="floor" required></b-form-input>
                </b-form-group>
                <b-form-group id='input-group-6' label="상세 설명" label-for="input-detail" class="form-label">
                    <b-form-textarea id="input-detail" v-model="detail" placeholder="매물에 대한 상세 설명을 적어주세요(200자 이내)" :state="detail.length <= 200" rows='3'></b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary" id="btn-register">매물 등록</b-button>
                <b-button type="reset" variant="danger" id="btn btn-outline-danger mb-3">초기화</b-button>
            </b-form>
        </div>
    </div> 

</template>

<script>
import {mapState} from "vuex";
import {registProperty} from '@/api/property';

export default {
    name: 'PropertyWrite',
    components: {},
    data() {
        return {    
            show: true,
            type: null,
            dealAmount: null,
            monthlyPay: null,
            area: null,
            floor: null,
            detail: '',
            options: [
                {value: '매매', text: '매매'},
                {value: '전세', text: '전세'},
                {value: '월세', text: '월세'},
            ]
        };
    },
    created() {
    },
    computed : {
		...mapState("userStore",["userInfo"]),
	},
    methods: {
        submit(event) {
            event.preventDefault()
            console.log(this.$route.params.aptCode);
            console.log(this.userInfo.id);
            registProperty({
                type: this.type,
                dealAmount: this.dealAmount,
                monthlyPay: this.monthlyPay,
                area: this.area,
                floor: this.floor,
                detail: this.detail,
                aptCode: this.$route.params.aptCode,
                userId: this.userInfo.id
            }, ({data}) => {
                if(data['success'] === true){
                    alert("매물이 등록되었습니다");
                    this.$router.push({name: 'propertyList'});
                }else{
                    alert("매물 등록 실패");
                }
            },
            (error) => {
                console.log(error);
            });
        },
        reset(event) {
            event.preventDefault()
            // Reset our form values
            this.type = null,
            this.dealAmount = null,
            this.monthlyPay = null,
            this.monthlyPay = null,
            this.area = null,
            this.floor = null,
            this.detail = '',
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
        },
    },
};
</script>

<style scoped>
body {
    background-color: #f0f5fa;
    font-family: 'Noto Sans KR', sans-serif;
}

#form-register {
    max-width: 500px;
    margin: 0 auto;
    padding: 2em;
    border: 1px solid #b0c4de;
    border-radius: 15px;
    background-color: #ffffff;
}

.form-label {
    font-size: 0.9em;
    color: #3b5998;
    font-weight: bold;
}

.form-control {
    border: 1px solid #b0c4de;
    border-radius: 5px;
}

#btn-register {
    color: #ffffff;
    background-color: #3b5998;
    border-color: #3b5998;
    transition: all 0.5s ease;
}

#btn-register:hover {
    background-color: #1e2e48;
    border-color: #1e2e48;
}

.btn-outline-danger {
    color: #3b5998;
    border-color: #3b5998;
    transition: all 0.5s ease;
}

.btn-outline-danger:hover {
    color: #ffffff;
    background-color: #3b5998;
    border-color: #3b5998;
}
.my-3.py-3.shadow-sm.text-center.mt-5 {
    border: 1px solid #b0c4de;
    border-radius: 15px;
    background-color: #f0f5fa;
    color: #3b5998;
}
</style>