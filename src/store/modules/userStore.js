// import jwtDecode from "jwt-decode"
import {
    // loginUser

    // , selectUser,updateUser ,deleteUser ,registUser 
} from "@/api/user"

const userStore = {
    namespaced: true,
    state: {
        isLogin : false,
        userInfo : null,
        aceessToken : null,
        alarm: [],
        hasAlarm: false,
    },
    getters: {
        getUserInfo : (state) => {
            return state.userInfo;
        },
        getIsLogin : (state) => {
            return state.isLogin;
        },
        gettokenExist : (state) => {
            return state.tokenExist;
        },
        getAlarm: (state) => {
            return state.alarm;
        },
        getHasAlarm: (state) =>{
            return state.hasAlarm;
        }
    }, 
    mutations: {
        SET_USERINFO  : (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_LOGIN : (state , isLogin) => {
            state.isLogin = isLogin;
        },
        SET_TOKENEXIST : (state , tokenExist) => {
            state.tokenExist = tokenExist;
        },
        SET_ALARM:(state, alarm) =>{
            state.alarm = alarm;
        },
        SET_HASALARM:(state, hasAlarm) =>{
            state.hasAlarm = hasAlarm;
        }
    },
    actions: {

    },
}
export {userStore};