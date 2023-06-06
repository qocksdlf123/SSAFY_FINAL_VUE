import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {userStore} from "@/store/modules/userStore"
import { aptStore } from '@/store/modules/aptStore';
import { bookmarkStore } from '@/store/modules/bookmarkStore';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    aptStore,
    bookmarkStore
  },
  plugins : [
    createPersistedState({
      storage : sessionStorage,
    }),
  ],
});
