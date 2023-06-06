<template>
<!--   <b-tr >
    <b-td>{{ comment.userId }}</b-td>
    <b-td>{{ comment.registerTime | dateFormat }}</b-td>
    <b-td>{{ comment.content }}</b-td>
    
      
  </b-tr> -->
<div class="comment-list">
  <div class="comment">
    <p class="comment-content">{{ comment.userId }}</p>
    <p class="comment-content" v-if="!isModify">{{ comment.content }}</p>
    <span class="comment-registertime">{{ comment.registerTime | dateFormat }}</span>
   <!--  <button class="btn btn-info" v-if="userInfo.id === comment.userId" >수정</button> -->
    <button class="btn " v-if="userInfo.id === comment.userId" @click="del(comment.commentNo)">삭제</button>
  </div>
</div>

</template>

<script>
import moment from "moment";
import {deleteComment} from "@/api/comment"
import {mapState} from "vuex"
export default {
  name: "CommentListItem",
  data() {
    return {
        content : null,
        isModify : false,
    }
  },
  props: {

    comment : Object,
  
  },
  computed : {
    ...mapState("userStore",["userInfo"])
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
  },
  methods : {
    async del(id) {
        await deleteComment(id);
        this.$router.go();
        // this.$router.push({path : "/board/view/" + this.comment.articleNo })
    }
  }
};
</script>

<style>
 .comment-list {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #007bff;
  background-color : white !important;
}

.comment {
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #007bff;
  color : white !important;
}

.comment-content {
  color: #007bff;
}

.comment-userid, .comment-registertime {
  font-size: 0.8rem;
  color: #666;
}

.btn-info {
  background-color: #007bff;
  border: none;
}

.btn {
  color: #3b5998;
  border: none;
} 

</style>
