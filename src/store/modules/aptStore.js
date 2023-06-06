const aptStore = {
  namespaced: true,
  state: {
    aptDetail: null,
    isAddBookmark: null,
  },
  getters: {
    getAptDetail: (state) => {
      return state.aptDetail;
    },
    getIsAddBookmark: (state) => {
      return state.isAddBookmark;
    },
  },
  mutations: {
    SET_APTDETAIL: (state, aptDetail) => {
      state.aptDetail = aptDetail;
    },
    SET_ISADDBOOKMARK: (state, isAddBookmark) => {
      state.isAddBookmark = isAddBookmark;
    },
  },
  actions: {},
};
export { aptStore };
