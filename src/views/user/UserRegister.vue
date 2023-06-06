<template>
    <div>
		<div class="login-page">
			<h1 class="title">Welcome</h1>
			<div class="form">
				<form id="form-register" name="register-form" class="register-form">
					<input id="id" name="id" type="text" placeholder="id" v-model="id"/> 
					<input id="password" name="password" type="password" placeholder="password" v-model="password" /> 
					<input id="email" name="email" type="email" placeholder="email address" v-model="email"/> 
					<input id="name" name="name" type="text" placeholder="name" v-model="name"/> 
					<input id="addr" name="address" type="text" placeholder="주소" v-model="address"/>
					<input id="registerNumber" v-if="level==='공인중개사'" name="registerNumber" type="text" placeholder="등록번호" v-model="registerNumber"/>
					<div>
					<b-dropdown v-model="level" :text="level" >
						<b-dropdown-item @click="selectItem('유저')">유저</b-dropdown-item>
						<b-dropdown-item @click="selectItem('관리자')">관리자</b-dropdown-item>
						<b-dropdown-item @click="selectItem('공인중개사')">공인중개사</b-dropdown-item>
					</b-dropdown>
					
					</div>
					<button @click="regsist()">회원 등록</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";
import {registUser} from "@/api/user"
import { userStore } from '@/store/modules/userStore';
export default {
    name: 'UserRegister',
    components: {},
    data() {
        return {
            id : null,
            password : null,
            email : null,
            name : null,
            address : null,
			level : null,
			registerNumber : null,
        };
    },
	computed : {
		
		...mapState(userStore,["userInfo","login"]),
		userInfo()  {
			return  {
			id : this.id,
			password : this.password,
			email : this.email,
			name : this.name,
			address : this.address,
			level : this.level,
			registerNumber : this.registerNumber,
			}
		},
	},
    created() {
		this.level = "등급"
	},
    methods: {
		async regsist() {
			if(this.id === null) {
				alert("아이디는 필수 입력 사항입니다")
				return;
			}
			else if(this.password ===null) {
				alert("비밀번호는 필수 입력 사항입니다")
			return;
			}
			else if(this.email ===null) {
				alert("이메일은 필수 입력 사항입니다")
			return;
			}
			else if(this.name ===null) {
				alert("이름은 필수 입력 사항입니다")
			return;
			}
			else if(this.level ==="등급") {
				alert("등급은 필수 선택 사항입니다")
			return;
			}
			else if(this.level==="공인중개사" && this.registerNumber ===null) {
				alert("공인 중개 등록번호를 입력해주세요")
			return;
			}


			await registUser(this.userInfo , ({data}) => {
				if(data["success"]===true) alert("등록 성공!")
				else alert("등록 실패");
			},
			(error) => {
				console.log(error);
				alert("등록 실패");
			});
			// this.$router.push({name:"main"});
		},
		selectItem(level) {
			this.level = level;
		}
	},	
};
</script>

<style scoped>
@import '@/css/register.css';
</style>