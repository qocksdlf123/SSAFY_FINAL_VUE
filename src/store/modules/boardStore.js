/* // import jwtDecode from "jwt-decode"
import {searchBoard, selectBoard,updateBoard, deleteBoard,registerBoard  } from "@/api/board"

const userStore = {
    state: {
        login : false,
        user : null,
    },
    getters: {
        getUser : function(state) {
            return state.user;
        },
        getLogin : function(state) {
            return state.login;
        }
    },
    mutations: {
        SET_USER  : (state, user) => {
            state.login = true;
            state.user = user;
        }
    },
    actions: {
        async login({commit},user) {
            await loginUser(
                user,
                ({data}) => {
                    if(data ==1 ){
                        console.log("로그인 성공")
                    }else{
                        console.log("로그인 실패")
                    }
                },
                (error) => {
                    console.log(error);
                }
                );
        }
    },
} */