<template>
    <ul class='pagination  justify-content-center'>
        <li class='page-item'><a href='#' @click="setPage(1)" class='page-link'>처음</a></li>
        <li class='page-item' v-if="pageNum!=1"><a href='#' @click="leftPage()" class='page-link'>이전</a></li>
        <li class='%s' v-for="i in pageNumMax" :key="i" >
        <a href='#' @click="setPage(i)" class='page-link'>{{i}}</a>
        </li> 
        <li class='page-item' v-if="pageNum!=pageNumMax"><a href='#' @click="rightPage" class='page-link'>다음</a></li>
        <li class='page-item' ><a  href='#' @click="setPage(pageNumMax)"  class='page-link'>마지막</a></li>
    </ul>
</template>

<script>
export default {
    name: 'PageNavi',
    components: {},
    props:{
        parentSize:{
            type: Number,
        }
    },
    data() {
        return {
            boardsize : null,
            pageNumMax : null,
            pageNum : null,
        };
    },
    watch:{
        parentSize(newValue){
            this.boardsize = newValue;
            this.pageNumMax = parseInt(this.boardsize / 10) + 1;
            if(this.boardsize % 10 === 0) this.pageNumMax -= 1;
            this.pageNum = 1;
        }   
    },
    computed:{
        start() {     //시작 index
            return ((this.pageNum-1) * 10);
        },
        end() {      //끝 index
            return this.pageNum===this.pageNumMax ? this.boardsize-1 : ((this.pageNum) * 10)-1
        },

    },
    created() {},
    methods: {
        setPage(i) {
            this.pageNum = i;
            // console.log(this.start,this.end)
        },
        leftPage(){
            this.pageNum -=1;
        },
        rightPage(){
            this.pageNum +=1;
        },
    },
};
</script>

<style scoped></style>