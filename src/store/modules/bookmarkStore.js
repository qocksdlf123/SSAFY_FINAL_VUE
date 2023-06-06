const bookmarkStore = {
  namespaced: true,
  state: {
    bookmarks: [],
  },
  getters: {
    getBookmarks: (state) => {
      return state.bookmarks;
    },
  },
  mutations: {
    SET_BOOKMARKS: (state, bookmarks) => {
      state.bookmarks = bookmarks;
    },
  },
  actions: {},
};
export { bookmarkStore };
