<template>
  <div>
    <div class="row justify-content-center mt-4 ">
      <div class="col-lg-8 col-md-10 col-sm-12 ">
<!--         <h2 class="my-3 py-3 shadow-sm bg-light text-center mt-5">
          <mark class="sky">글목록</mark>
        </h2> -->
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <!-- <button type="button" id="btn-mv-register"
					class="btn btn-outline-primary btn-sm">글쓰기</button> -->
            <router-link
              to="/board/write"
              class="btn btn-outline-primary btn-sm"
              >글쓰기</router-link
            >
          </div>
          <div class="col-md-7 offset-3">
            <form class="d-flex" id="form-search" action="">
              <input type="hidden" name="pgno" value="1" />
              <select
                name="key"
                id="key"
                class="form-select form-select-sm ms-5 me-1 w-50"
                aria-label="검색조건"
                v-model="selectedOption"
              >
                <option selected value="검색조건">검색조건</option>
                <option value="subject">제목</option>
                <option value="id">작성자</option>
              </select>
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  name="word"
                  id="word"
                  class="form-control"
                  placeholder="검색어..."
                  v-model="keyword"
                />
                <button id="btn-search" class="btn btn-dark" type="button" @click="searchBy()">
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>

                            <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">글 목록</h6>
                        </div>
                        
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr class="bg-body-tertiary">
                                            <th class="text-primary"> 글번호</th>
                                            <th class="text-primary">제목</th>
                                            <th class="text-primary">작성자</th>
                                            <th class="text-primary">조회수</th>
                                            <th class="text-primary">작성일</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th class="text-primary">글번호</th>
                                            <th class="text-primary">제목</th>
                                            <th class="text-primary">작성자</th>
                                            <th class="text-primary">조회수</th>
                                            <th class="text-primary">작성일</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>

            <board-list-item-2 v-for="(board , index) in boards"
              :key="board.articleno"
              :board="board"
              :index="index"
              :boardsize="boardsize"
              :start="start"
              :end="end"></board-list-item-2>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
      </div>
      <!-- <div class="row">${navigation.navigator}</div> -->
    </div>
  
  <!-- <form id="form-param" method="get" action="">
	<input type="hidden" name="pgno" id="pgno" value="${pgno}"> <input
		type="hidden" name="key" value="${key}"> <input type="hidden"
		name="word" value="${word}">
</form> -->
  <!-- <form id="form-no-param" method="get" action="${root}/article/view">
	<input type="hidden" name="pgno" value="${pgno}"> 
        <input type="hidden" name="key" value="${key}"> 
        <input type="hidden" name="word" value="${word}"> 
        <input type="hidden" id="articleno" name="articleno" value="">
    </form> -->

        <ul class='pagination  justify-content-center'>
          <li class='page-item'><a href='#' @click="setPage(1)" class='page-link'>처음</a></li>
          <li class='page-item' v-if="pageNum!=1"><a href='#' @click="leftPage()" class='page-link'>이전</a></li>
           <li class='%s' v-for="i in pageNumMax" :key="i" >
            <a href='#' @click="setPage(i)" class='page-link'>{{i}}</a>
            </li> 
            <li class='page-item' v-if="pageNum!=pageNumMax"><a href='#' @click="rightPage" class='page-link'>다음</a></li>
            <li class='page-item' ><a  href='#' @click="setPage(pageNumMax)"  class='page-link'>마지막</a></li>
          </ul>
          </div>
</template>

<script>
import { searchBoard,selectBySubject,selectById } from "@/api/board";
import BoardListItem2 from '@/components/board/BoardListItem2.vue';
export default {
  name: "BoardList",
  components: {  BoardListItem2 },
  data() {
    return {
      boards: [],
      selectedBoards : [],
      selectedOption : null,
      keyword : null,
      boardsize : null,
      pageNumMax : null,
      pageNum : null,
    };
  },
  async created() {
    await searchBoard(
      ({ data }) => {
        this.boards = data["data"];
        // console.log(JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      },
    );
    this.boardsize = this.boards.length;
     this.pageNumMax = parseInt(this.boardsize/10) + 1;
    if(this.boardsize%10 ===0) this.pageNumMax -=1; 
    this.pageNum = 1;
    // console.log(this.pageNumMax)
    this.selectedOption = "검색조건";
  },
  computed : {
    start() {     //시작 index
      return ((this.pageNum-1) * 10);
    },
    end() {      //끝 index
      return this.pageNum===this.pageNumMax ? this.boardsize-1 : ((this.pageNum) * 10)-1
    },
  },
   methods: {
    async searchBy() {
      if(this.selectedOption==="subject"){
      await selectBySubject(this.keyword,
      ({data})=> {
        this.boards= data["data"];
      },
      (error)=> console.log(error));
    }else if(this.selectedOption==="id"){
      await selectById(this.keyword,
      ({data})=> {
        this.boards= data["data"];
      },
      (error)=> console.log(error));
    }else{
      alert("검색 조건을 설정하세요");
    }
    this.boardsize = this.boards.length
    this.pageNumMax = parseInt(this.boardsize/10) + 1;
    },
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

<style scoped src="@/css/sb-admin-2.min.css">
.th{
  color:blue
}
</style>