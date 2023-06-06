<template>
  <div class="login-page">
    <h1 class="mt-5">Profile 수정</h1>
    <div class="form">
      <form id="form-register" name="register-form" class="register-form">
        <input type="hidden" id="id" name="id" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          v-model="password"
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email address"
          v-model="email"
        />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          v-model="name"
        />
        <input
          id="addr"
          name="address"
          type="text"
          placeholder="주소"
          v-model="address"
        />
        <button @click="update()">수정하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser, selectUser } from "@/api/user";
import { mapMutations } from "vuex";
export default {
  name: "UserUpdate",
  components: {},
  data() {
    return {
      password: null,
      email: null,
      name: null,
      address: null,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    userModifyInfo() {
      return {
        id: this.userInfo.id,
        password: this.password,
        email: this.email,
        name: this.name,
        address: this.address,
      };
    },
  },
  created() {},
  methods: {
    ...mapMutations("userStore", ["SET_USERINFO"]),
    async update() {
      await updateUser(
        this.userModifyInfo,
        ({ data }) => {
          if (data["success"] === true) {
            let scid = this.userInfo.id;
            console.log(scid);
            selectUser(
              scid,
              ({ data }) => this.SET_USERINFO(data["data"]),
              (error) => console.log(error)
            ),
              alert("수정 성공!");
          } else {
            alert("수정 실패!");
          }
        },

        (error) => console.log(error)
      );
    },
  },
};
</script>

<style scoped></style>