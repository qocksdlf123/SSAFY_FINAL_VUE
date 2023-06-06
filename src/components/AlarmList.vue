<template>
    <div class="d-flex justify-content-center">
        <b-card header="알림" class="col-md-5 center-block" >
            <b-list-group-item v-for="(item, index) in alarm" :key="index">{{item.buildingName}} - 신규 매물: {{item.count}}건</b-list-group-item>
            <p v-if="alarm.length == 0">알림이 없습니다.</p>
        </b-card>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';

export default {
    name: 'AlarmList',
    components: {},
    data() {
        return {
        };
    },
    created() {
        this.SET_HASALARM(false);
        console.log(this.alarm);
    },
    mounted() {
    },
    methods: {
        ...mapMutations("userStore",["SET_HASALARM"]),
    },
    computed: {
        ...mapState('userStore', ['alarm', 'hasAlarm'])
    }
};
</script>

<style scoped></style>