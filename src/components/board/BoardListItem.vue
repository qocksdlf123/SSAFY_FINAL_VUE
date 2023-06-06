<template>
  <b-tr v-if="index >= start && index <= end">
    <b-td>{{ boardsize -index }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ path: 'view/' + board.articleNo }">{{
        board.subject
      }}</router-link>
    </b-th>
    <b-td>{{ board.userName }}</b-td>
    <b-td>{{ board.hit }}</b-td>
    <b-td>{{ board.registerTime | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
/*     articleNo: Number,
    userName: String,
    subject: String,
    hit: Number,
    registerTime: String, */
    board : Object,
    index : Number,
    boardsize : Number,
    start : Number,
    end : Number,
  
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
  },
};
</script>

<style></style>
