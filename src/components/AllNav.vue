<template>
    <div>
            <b-nav class="navbar navbar-expand-lg bg-light shadow ">
      <b-container class="container">
       <!--  <b-a class="navbar-brand link-primary fw-bold fs-3" href="${root }/">
          <img
            src="/assets/img/logo-mini-removebg-preview.png"
            alt="나건부자로고"
            width="200"
            height="100"
        /></b-a> -->
        <router-link to="/" class="navbar-brand link-primary fw-bold fs-3"> 
        <img
            src="@/assets/img/logo-mini-removebg-preview.png"
            alt="나건부자로고"
            width="200"
            height="100"
        /></router-link>
        <b-button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </b-button>
        <b-container class="collapse navbar-collapse" id="navbarSupportedContent">
          <b-nav class="navbar-nav me-auto mb-2 mb-lg-0 w-50">
            <b-nav-item class="nav-item">
               <router-link to="/board/list" class="nav-link text-center" aria-current="page">공지사항</router-link> 
            </b-nav-item>
          </b-nav>
          <!--로그인 전 -->
          
           <b-container class="loginNav " v-if="!isLogin">
            <b-nav class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
              <b-nav-item class="nav-item">
                <router-link to="/user/login" class="nav-link" aria-current="page">로그인</router-link> 
              </b-nav-item>
              <b-nav-item class="nav-item">
                <router-link to="/user/register" class="nav-link " aria-current="page">회원가입</router-link> 
              </b-nav-item>
            </b-nav>
          </b-container> 
          <!--로그인 후-->
           <b-container class="logoutNav" v-else>
            <b-nav class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
              <b-nav-item id="logout" class="nav-item">
               <!-- <router-link to="/user/logout" class="nav-link active" aria-current="page">로그아웃</router-link>  -->
               <a @click="logout()" class="nav-link active">로그아웃</a>
              </b-nav-item>
              <b-nav-item class="nav-item">
                <router-link to="/user/mypage" class="nav-link active" aria-current="page">마이페이지</router-link> 
              </b-nav-item>
              <b-nav-item class="nav-item" v-if="userInfo[`level`]==`회원`">
                <router-link to="/bookmark/main" class="nav-link active" aria-current="page">나의 관심매물</router-link> 
              </b-nav-item>
              <b-nav-item class="nav-item" v-if="userInfo['level']=='회원'">
                <router-link class="nav-link active" ariacurrent="page" to="/user/alarm">알림<sup v-if="hasAlarm"><font-awesome-icon :icon="['fas', 'bell']" bounce style="color: #e2dc2c;" /></sup></router-link>
              </b-nav-item>
              <b-nav-item class="nav-item" v-if="userInfo['level'] == '공인중개사'">
                <router-link to="/property/list" class="nav-link active" aria-current="page">나의 등록매물</router-link>
              </b-nav-item>
              <b-dropdown v-if="userInfo['level']=='관리자'" id="dropdown-1" text="관리자" class="m-md-2">
              <b-dropdown-item>   <router-link to="/" class="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#pollModal">투표만들기</router-link> 
              </b-dropdown-item>
              <b-dropdown-item> 
                <router-link to="/" class="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#pollModal">회원정보보기</router-link> 
              </b-dropdown-item>
              </b-dropdown>
              </b-nav>
          </b-container>  

        </b-container>
      </b-container>
    </b-nav>

    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  name: "AllNav",
  components: {},
  data() {
    return {
    };
  },
  created() {
    console.log("allnav")
  },
  methods: {
    ...mapMutations("userStore",["SET_LOGIN","SET_USERINFO"]),
    logout() {
      this.SET_USERINFO(null);
      this.SET_LOGIN(false);
      sessionStorage.removeItem("accessToken");
      this.$router.push('/').catch(()=>{});
    }
  },
  computed : {
    ...mapState("userStore",["isLogin","userInfo", "hasAlarm"]),
  },

};
</script>

<style scoped></style>