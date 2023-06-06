<template>
    <div>
        <div class="login-page">
			<h1 class="">마이페이지</h1>

			<div class="form">
				<img src="@/assets/img/bg-showcase-2.jpg" />
				<b-container class="profile-update">
					<ul class="list-group list-group-flush">
						<li class="list-group-item">아이디 : {{userInfo.id}}</li>
						<li class="list-group-item">비밀번호 : {{userInfo.password}}</li>
						<li class="list-group-item">이름: {{userInfo.name}}</li>
						<li class="list-group-item">회원분류: {{userInfo.level}}</li>
						<li class="list-group-item">이메일: {{userInfo.email}}</li>
						<li class="list-group-item">주소: {{userInfo.address}}</li>
					</ul>
				</b-container>
			</div>
			<b-container class="position-sticky">
				<router-link class="btn btn-primary" to="/user/update">수정하기</router-link>
				<button class="btn btn-primary " @click="deleteprofile(userInfo.id)">삭제하기</button>
			</b-container>
		</div>
		
    </div>
</template>

<script>
import {deleteUser} from "@/api/user.js"
import {mapState} from "vuex";
export default {
    name: 'UserMypage',
    components: {},
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {
		deleteprofile(id) {
			if(confirm("정말 삭제하시겠습니까?")){
				deleteUser(id,
				alert("삭제 되었습니다"),
				(error) => console.log(error),
				)
			}
		}
	},
	computed : {
		...mapState("userStore",["userInfo"]),
	},
};
</script>

<style scoped>
/* @import '@/css/mypage.css';  */
.login-page {
width: 360px;
padding: 30px 0 0;
}

.form {
position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 10px auto 40px; 
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form > img {
  width: 100%;
}

.form-item {
  display: block;
}

.form-item > h3 {
  display: inline;
}

.form-item > p {
  display: inline;
}

.profile-update {
  display: flex;
  justify-content: flex-end;
}

.profile-update > button {
  margin-left: 5px;
}

.list-group{
	width: 500px;
}

.button-con{
	margin-top:5px
}

</style>