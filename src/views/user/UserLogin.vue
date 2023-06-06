<template>
        <b-container>
		<b-container class="login-page">
			<h1 class="title">로그인</h1>
			<b-container class="form">
			<form id="login-form" name="login-form" class="login-form">
				<input id="id" name="id" type="text" placeholder="ID" v-model="id" /> 
				<input id="password" name="password" type="password" placeholder="password" v-model="password" />
				<b-container class="find-password-con">
					<h5 class="find-password">비밀번호 찾기</h5>
				</b-container>
				<!-- <input type="submit" class="login-btn" value="로그인"> -->
				<button class="login-btn" @click="funLogin()">로그인</button> 
				<!-- <button  onclick="/user/register" type="button">회원가입</button> -->
				<a href="/user/register">회원가입</a>
			</form>
		</b-container>
		</b-container>
	</b-container>
</template>

<script>
import {loginUser,selectUser, selectAlarm} from "@/api/user" 
 import { mapMutations} from 'vuex';

const userStore = "userStore";

export default {
    name: 'UserLogin',
    components: {},
    data() {
        return {
            id :null,
			password : null,
        };
    },
	computed : {
		userinfo() {
			return {
				id : this.id,
				password : this.password,
			};
		}
	},
    created() {},
    methods: {
		...mapMutations(userStore, ['SET_USERINFO','SET_LOGIN', 'SET_ALARM', 'SET_HASALARM']),
		funLogin() {
			loginUser(this.userinfo,
			({data}) => {
				if(data["success"]===true){
					sessionStorage.setItem("accessToken",data["userid"]);
					this.SET_LOGIN(true);
					alert("로그인 성공")
					selectUser((this.id),({data}) => {
				// console.log(data["data"]);
					// console.log(this.SET_USERINFO);
					this.SET_USERINFO(data["data"]);
					selectAlarm(this.userinfo.id,
						({data}) => {
							this.SET_ALARM(data['data']);
							if(data['data'].length > 0){
								this.SET_HASALARM(true);
							}else{
								this.SET_HASALARM(false);
							}
							console.log(data['data'])
						},
						(error) => console.log(error)
					)
				},
				(error) => console.log(error)
				);
				}else{
					alert("로그인 실패")
				}
			},
			(error) => console.log(error),
			)
			this.$router.push({name:"main"});
		},
	},
}; 
</script>

<style scoped>
.login-page {
	width: 360px;
	padding: 7% 0 0;
	margin: auto;
}

.form {
	background: #ffffff;
	max-width: 360px;
	margin: 10 auto 100px;
	padding: 45px;
	text-align: center;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0
		rgba(0, 0, 0, 0.24);
}

.form input {
	font-family: "Roboto", sans-serif;
	outline: 0;
	background: #f2f2f2;
	width: 100%;
	border: 0;
	margin: 0 0 15px;
	padding: 15px;
	box-sizing: border-box;
	font-size: 14px;
}

.form button {
	margin: 0 0 15px;
	font-family: "Roboto", sans-serif;
	text-transform: uppercase;
	outline: 0;
	background: #0d6efd;
	width: 100%;
	border: 0;
	padding: 15px;
	color: #ffffff;
	font-size: 14px;
	-webkit-transition: all 0.3 ease;
	transition: all 0.3 ease;
	cursor: pointer;
}

.form button:hover, .form button:active, .form button:focus {
	background: #0b59cc;
}

.form .message {
	margin: 15px 0 0;
	color: #b3b3b3;
	font-size: 12px;
}

.form .message a {
	color: green;
	text-decoration: none;
}

.container {
	position: relative;
	z-index: 1;
	max-width: 100%;
	margin: 0 auto;
	height: auto;
	min-height: 100%;
}

.content-user-list-ul {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.list-item {
	margin: 10px;
}

.user-info {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.find-password-con {
	margin: 0;
	display: flexbox;
	justify-content: flex-end;
	text-align: end;
}

.find-password {
	margin: 0 0 15px 0;
	color: gray;
}

.title {
	text-align: center;
	margin-top:50px;
	color: rgb(82, 82, 82);
}
</style>