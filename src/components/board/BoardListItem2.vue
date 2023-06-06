<template>
  <tr v-if="index >= start && index <= end">
    <th >{{ boardsize -index }}</th>
    <th class="text-left" >
      <router-link class="btn" :to="{ path: 'view/' + board.articleNo }">{{
        board.subject
      }}</router-link>
    </th>
    <th>{{ board.userName }}</th>
    <th>{{ board.hit }}</th>
    <th>{{ board.registerTime | dateFormat }}</th>
  </tr>
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
