<template>
<!--    <div class="row justify-content-center ">
    <div class="col-lg-8 col-md-10 col-sm-12 ">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center mt-5">
        <mark class="sky">글보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="text-secondary px-5">
          {{ boardInfo.subject }}
        </h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="fw-bold">{{ boardInfo.userId }}</span> <br />
              <span class="text-secondary fw-light">
                {{ boardInfo.registerTime }} 조회 : {{ boardInfo.hit }}
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 :</div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{ boardInfo.content }}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <router-link
            to="/board/list"
            id="btn-list"
            class="btn btn-outline-primary mb-3"
            >글목록
          </router-link>

          <router-link
            :to="{ path: '/board/modify/' + articleNo }"
            id="btn-mv-modify"
            class="btn btn-outline-success mb-3 ms-1"
            >글수정
          </router-link>

          <button
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
            @click="deleteBoard()"
          >
            글삭제
          </button>


          <input type="hidden" id="npgno" name="pgno" value="${pgno}" />
          <input type="hidden" id="nkey" name="key" value="${key}" />
          <input type="hidden" id="nword" name="word" value="${word}" />
        </div>
        </div>

        <div class="container">
  <div class="card mt-3">
    <div class="card-body">
        <comment-list-item v-for="comment in comments" :key="comment.commentNo" :comment="comment"></comment-list-item>
    </div>
    </div>
    </div>
    </div>
 -->



  <div class="justify-center">
     <div class="main-content">
      <h6 class="custom-heading">
            글보기
        </h6>
        <div class="custom-row">
            <h2 class="custom-h2">
                {{ boardInfo.subject }}
            </h2>
        </div>
        <hr>
        <div class="custom-row  ">
<!--             <div class="main-col ">
                <div class="clear justify-end "> -->
                    <img
                        class="avatar"
                        src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                    />
                        <div class="bold ms-auto text-start">{{ boardInfo.userId }}</div> 
                        <div class="light-text text-end">
                            {{ boardInfo.registerTime }}<br /> 
                            조회 : {{ boardInfo.hit }}
                        </div>
<!--                 </div>
            </div> -->
            <div class=" text-end">댓글 : {{comments.length}}개</div>
            <div class="divider "></div>
            <div class="light-text">{{ boardInfo.content }}</div>
            <div class="divider"></div>
            <div class="justify-end">
                <router-link
                    to="/board/list"
                    id="btn-list"
                    class="btn btn-outline-primary mb-3 ms-1"
                    
                >글목록</router-link>

                <router-link
                    :to="{ path: '/board/modify/' + articleNo }"
                    id="btn-mv-modify"
                    class="btn btn-outline-success mb-3 ms-1"
                >글수정</router-link>

                <button
                    type="button"
                    id="btn-delete"
                    class="btn btn-outline-danger mb-3 ms-1"
                    @click="deleteBoard()"
                >
                    글삭제
                </button>
            </div>

  <div class="container">
  <div class="card  mt-3">
    <div class="card-body">
      <comment-list-item v-for="comment in comments" :key="comment.commentNo" :comment="comment"></comment-list-item>
      <form>
        <div class="form-group">
          <label for="commentInput" class="text-white">댓글</label>
          <textarea class="form-control" id="commentInput" rows="3" v-model="content"></textarea>
        </div>
        <button @click="commentWrite()" class="btn btn-light">댓글 작성</button>
      </form>
    </div>
  </div>
</div>

      </div>
    </div>
</div> 
</template>

<script>
import { selectBoard, deleteBoard } from "@/api/board";
import { registerComment, selectByBoard } from "@/api/comment";
import { mapState } from "vuex";
import CommentListItem from "@/components/comment/CommentListItem.vue";
export default {
  name: "BoardView",
  components: {
     CommentListItem 
     },
  data() {
    return {
      articleNo: null,
      boardInfo: {},
      comments: [],
      content: null,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  async created() {
    this.articleNo = this.$route.params.articleNo;
    await selectBoard(
      this.articleNo,
      ({ data }) => (this.boardInfo = data["data"]),
      (error) => console.log(error)
    );

    await selectByBoard(
      this.articleNo,
      ({ data }) => {
        this.comments = data["data"];
      },
      (error) => console.log(error)
    );
    console.log(this.comments);
    // console.log(this.boardInfo);
  },
  methods: {
    deleteBoard() {
      if (confirm("게시글을 삭제하시겠습니까?")) {
        deleteBoard(
          this.articleNo,
          ({ data }) => {
            if (data["success"] === true) {
              alert("삭제되었습니다.");
              this.$router.push({ name: "list" });
            } else {
              alert("삭제 실패");
            }
          },
          (error) => console.log(error)
        );
      }
    },
    async commentWrite() {
      let comment = {
        articleNo: this.articleNo,
        userId: this.userInfo.id,
        userName: this.userInfo.name,
        content: this.content,
      };
      await registerComment(comment);
    },
  },
};
</script>

<style scoped>
body {
    background-color: #f0f5fa;
    font-family: 'Noto Sans KR', sans-serif;
}
.justify-center {
    /* display: flex; */
    justify-content: center;
}

.main-content {
    max-width: 500px;
    margin: 0 auto;
    padding: 2em;
    border: 1px solid #b0c4de;
    border-radius: 15px;
    background-color: #ffffff;
}

.custom-heading {
    font-size: 0.9em;
    color: #3b5998;
    font-weight: bold;
    text-align: center;
    padding: 1em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.highlight {
    background-color: #88bef5;
}

.custom-h2 {
    color: #606060;
    padding: 0.5em;
}

.avatar {
    float: left;
    padding: 0.5em;
    background-color: #f8f9fa;
}

.bold {
    font-weight: bold;
}

.light-text {
    color: #606060;
    font-weight: lighter;
}

.main-col {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
}

.side-col {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}

.text-end {
    text-align: end;
}

.divider {
    margin: 1.5em 0;
    border-bottom: 1px solid #e9ecef;
}

.justify-end {
    display: flex;
    justify-content: flex-end;
}

/* .btn-outline-primary,
.btn-outline-success,
.btn-outline-danger {
    color: #3b5998;
    border-color: #3b5998;
    transition: all 0.5s ease;
    margin-bottom: 1em;
}

.btn-outline-primary:hover,
.btn-outline-success:hover,
.btn-outline-danger:hover {
    color: #ffffff;
    background-color: #3b5998;
    border-color: #3b5998;
} */

.container {
    padding: 2em;
}

.card {
    margin-top: 1em;
    background-color: #3b5998;
}

.card-body {
    padding: 1em;
}

.form-group {
    margin-bottom: 1em;
}

.text-white {
    color: #ffffff;
}

/* .btn-light {
    color: #000000;
    background-color: #f8f9fa;
} */
</style>