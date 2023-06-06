<template>
  <div class="row justify-content-center ">
    <div class="col-lg-8 col-md-10 col-sm-12 ">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center mt-5">
        <h4>글 수정</h4>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <form id="form-modify">
        <input type="hidden" name="pgno" value="${pgno}" />
        <input type="hidden" name="key" value="${key}" />
        <input type="hidden" name="word" value="${word}" />
        <input type="hidden" name="articleNo" value="${board.articleNo}" />
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            name="subject"
            v-model="subject"
          />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <textarea
            class="form-control"
            id="content"
            name="content"
            rows="7"
            v-model="content"
          ></textarea>
        </div>
        <div class="col-auto text-center">
          <button
            type="button"
            id="btn-modify"
            class="btn btn-outline-primary mb-3"
            @click="updata()"
          >
            글수정
          </button>
          <router-link to="/board/list" class="btn btn-outline-danger mb-3"
            >목록</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { selectBoard, updateBoard } from "@/api/board";
export default {
  name: "BoardModify",
  components: {},
  data() {
    return {
      articleNo: null,
      subject: null,
      content: null,
    };
  },
  async created() {
    this.articleNo = this.$route.params.articleNo;
    await selectBoard(
      this.articleNo,
      ({ data }) => (
        (this.subject = data["data"].subject),
        (this.content = data["data"].content)
      ),
      (error) => console.log(error)
    );
  },
  methods: {
    updata() {
      updateBoard(
        {
          articleNo: this.articleNo,
          subject: this.subject,
          content: this.content,
        },
        ({ data }) => {
          if (data["success"] === true) {
            alert("수정 성공");
            this.$router.push({ name: "list" });
          } else alert("수정 실패");
        },
        (error) => console.log(error)
      );
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

#btn-modify {
    color: #ffffff;
    background-color: #3b5998;
    border-color: #3b5998;
    transition: all 0.5s ease;
}

#btn-modify:hover {
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