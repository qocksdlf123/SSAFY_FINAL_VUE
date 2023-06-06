<template>
    <div class="col mb-5">
              <div class="card h-100">
                <!-- Product image-->
                <img
                  class="card-img-top"
                  src="@/assets/img/aptImage1.jpg"
                  alt="..."
                />
                <!-- Product details-->
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">{{bookmark.buildingName}}</h5>
                    <h6>주소 : {{bookmark.address}}</h6>                    
                    <h6>건축년도 : {{bookmark.buildYear}}</h6>
                  </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <button class="btn btn-outline-dark mt-auto" @click="deleteItem()">삭제</button>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>
import { deleteBookmark} from "@/api/bookmark";
export default {
    name: 'bookmarkListItem',
    components: {},
    data() {
        return {
        };
    },
    created() {},
    methods: {
        async deleteItem() {
            await deleteBookmark(this.bookmark.bookmarkNo);
            this.$emit("update");
        }
    },
    props: {
        bookmark : Object,
    }
};
</script>

<style scoped></style>