<template>
  <div class="row justify-content-center ">
    <div class="col-lg-8 col-md-10 col-sm-12 ">
      <h2 class="my-3 py-3 shadow-sm  text-center mt-5">
        글쓰기
      </h2>
      
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <form id="form-register" enctype="multipart/form-data">
        <input type="hidden" name="pgno" value="1" />
        <input type="hidden" name="key" value="" />
        <input type="hidden" name="word" value="" />
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            name="subject"
            placeholder="제목..."
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
        <div class="mb-3">
          <label for="upfile" class="form-label">파일:</label>
          <input
            type="file"
            class="form-control border"
            id="upfile"
            name="upfile"
            multiple="multiple"
          />
        </div>
        <div class="col-auto text-center">
          <button
            type="button"
            id="btn-register"
            class="btn btn-outline-primary mb-3"
            @click="register()"
          >
            글작성
          </button>
          <router-link to="list" class="btn btn-outline-danger mb-3"
            >글목록</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { registerBoard } from "@/api/board";
export default {
  name: "BoardWrite",
  components: {},
  computed: {
    ...mapState("userStore", ["userInfo"]),
    boardInfo() {
      return {
        userId: this.userInfo.id,
        userName: this.userInfo.name,
        subject: this.subject,
        content: this.content,
      };
    },
  },
  data() {
    return {
      subject: null,
      content: null,
    };
  },
  created() {},
  methods: {
    async register() {
      if (this.subject === null) {
        alert("제목을 입력하세요.");
        return;
      } else if (this.content === null) {
        alert("내용을 입력하세요.");
        return;
      }
      await registerBoard(this.boardInfo, (error) => console.log(error));
      this.$router.push({ name: "list" });
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