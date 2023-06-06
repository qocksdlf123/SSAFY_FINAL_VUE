<template>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(item, index) in rank" :key="index">
            {{index + 1}}. {{item.buildingName}}
            <span><font-awesome-icon :icon="['fas', 'bookmark']" style="color: #5589e2;" />{{item.count}}</span>
        </b-list-group-item>
    </b-list-group>
    
</template>

<script>
import {selectOrderBy} from '@/api/bookmark';

export default {
    name: 'RankList',
    components: {},
    data() {
        return {
            rank: [],
        };
    },
    created() {
        selectOrderBy(
            ({data}) =>{
                this.rank = data['data'];
                console.log(this.rank);
            },
            (error) =>{
                console.log(error);
            }
        )
    },
    methods: {

    },
};
</script>

<style scoped></style>