import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/user/UserLogin';
import UserMypage from '@/views/user/UserMypage';
import UserRegister from '@/views/user/UserRegister';
import UserUpdate from '@/views/user/UserUpdate';
import UserOrigianl from '@/views/user/UserOriginal';
import BoardList from '@/views/board/BoardList';
import BoardModify from '@/views/board/BoardModify';
import BoardView from '@/views/board/BoardView';
import BoardWrite from '@/views/board/BoardWrite';
import MainPage from '@/views/MainPage';
import BoardOriginal from '@/views/board/BoardOriginal';
import SearchPage from '@/views/SearchPage';
import PropertyOriginal from '@/views/property/PropertyOriginal';
import PropertyWrite from '@/views/property/PropertyWrite';
import PropertyList from '@/views/property/PropertyList';
import bookmarkOriginal from '@/views/bookmark/bookmarkOriginal'
import bookmarkMain from '@/views/bookmark/bookmarkMain'
import AlarmList from '@/components/AlarmList';
import store from "@/store";
import {tokenCheck} from "@/api/user"
Vue.use(VueRouter);


const interceptorUntilUser = async(to,from,next) => {
  const userInfo =store.state.userStore.userInfo;
  console.log(userInfo)
  let errorFrag = false;
  // let token = sessionStorage.getItem("accessToken");
  // let decodeToken = jwtDecode(token);
  await tokenCheck(({data})=> {
    if(!data["success"]){
      alert("다시 로그인 해주세요")
      router.push({name:"login"});
      return
    }
  },(error)=>(
    console.log(error),
    alert("다시 로그인 해주세요"),
    sessionStorage.removeItem("accessToken"),
    router.push({name:"login"}),
    errorFrag=true
    )
  );

  if(userInfo==null && errorFrag==false){
    alert("로그인이 필요한 페이지입니다");
    await router.push({name:"login"});
    return;
  }else{
    next();
  }
};
/* async getUserInfo({ commit, dispatch }, token) {
  let decodeToken = jwtDecode(token);
  // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
  await findById(
    decodeToken.userid,
    ({ data }) => {
      if (data.message === "success") {
        commit("SET_USER_INFO", data.userInfo);
        // console.log("3. getUserInfo data >> ", data);
      } else {
        console.log("유저 정보 없음!!!!");
      }
    },
    async (error) => {
      console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
      commit("SET_IS_VALID_TOKEN", false);
      await dispatch("tokenRegeneration");
    }
  );
}, */


/* const interceptorUntilBroker = async(to,from,next) => {
  const userInfo = store.getters["userStore/userInfo"];
  // let token = sessionStorage.getItem("accessToken");
  if(userInfo==null || userInfo.level=="유저"){
    alert("접근할 수 없는 페이지입니다");
    await router.push({name:"login"});
  }else{
    next();
  }
};

const interceptorUntilManager = async(to,from,next) => {
  const userInfo = store.getters["userStore/userInfo"];
  // let token = sessionStorage.getItem("accessToken");
  if(userInfo.level!="관리자"){
    alert("관리자만 접근할 수 있는 페이지입니다");
    await router.push({name:"login"});
  }else{
    next();
  }
}; */
const routes = [
  {
    path: '/',
    name: 'main',
    component : MainPage,
  },
  {
    path : '/user',
    name : 'user',
    component : UserOrigianl,
    children : [
      {
        path : "login",
        name : "login",
        component : UserLogin,
      },
      {
        path : "mypage",
        name : "mypage",
        beforeEnter: interceptorUntilUser,
        component : UserMypage,     
        // component: () => import(/* webpackChunkName: "user" */ "@/views/user/UserMypage"),
      },
      {
        path : "register",
        name : "register",
        component : UserRegister,
      },

      {
        path : "update",
        name : "update",
        component : UserUpdate,     
      },

      {
        path: "alarm",
        name: "alarm",
        component: AlarmList,
      }
    ]
  },
  {
    path : '/board',
    name : 'board',
    component : BoardOriginal,
    children : [
      {
        path : "list",
        name : "list",
        component : BoardList,
      },
      {
        path : "modify/:articleNo",
        name : "modify",
        beforeEnter: interceptorUntilUser,
        component : BoardModify,
      },
      {
        path : "view/:articleNo",
        name : "view",
        beforeEnter: interceptorUntilUser,
        component : BoardView,
      },

      {
        path : "write",
        name : "write",
        beforeEnter: interceptorUntilUser,
        component : BoardWrite,
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    beforeEnter: interceptorUntilUser,
    component: SearchPage,
  },
  {
    path: '/property',
    name: 'property',
    component: PropertyOriginal,
    children: [
      {
        path: 'write/:aptCode',
        name: 'propertyWrite',
        component: PropertyWrite,
      },
      {
        path: 'list',
        name: 'propertyList',
        component: PropertyList,
      }
    ]
  },
  {
    path: '/bookmark',
    name: 'bookmark',
    component: bookmarkOriginal,
    children: [
      {
        path: 'main',
        name: 'bookmarkMain',
        component: bookmarkMain,
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
