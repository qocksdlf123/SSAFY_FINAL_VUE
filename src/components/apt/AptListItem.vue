<template>
<div>
    <div v-if="index >= start && index <= end" @click="makeDetail">{{apt.apartmentName}}</div>
    <hr v-if="index >= start && index <= end">
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import {selectById} from "@/api/bookmark"
const aptStore = 'aptStore';

export default {
    name: 'AptListItem',
    components: {},
    props: {
        apt: Object,
        index: Number,
        start: Number,
        end: Number,
    },
    data() {
        return {
            bookmarks: [],
        };
    },
    computed: {
        ...mapState(aptStore, ['aptDetail','isAddBookmark']),
        ...mapState("userStore", ['userInfo'])
    },
    created() {},
    methods: {
        ...mapMutations(aptStore, ['SET_APTDETAIL','SET_ISADDBOOKMARK']),
        async makeDetail() {
            await selectById(this.userInfo.id, ({ data }) => {
                this.bookmarks = data["data"];
            },(error)=>console.log(error))
            console.log(this.apt)
            this.SET_ISADDBOOKMARK(false);
            for (let index = 0; index < this.bookmarks.length; index++) {
                if (this.bookmarks[index].buildingName == this.apt.apartmentName) {
                    this.SET_ISADDBOOKMARK(true);
                    break;
                }
            }
            console.log(this.isAddBookmark);
            this.SET_APTDETAIL(this.apt);
            this.$emit('set_detail', true);
        }
    },
};
</script>

<style scoped></style>