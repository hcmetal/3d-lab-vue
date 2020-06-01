const state = {
  webGLSupport: null,
};

const getters = {
  webGLSupport: (state) => state.webGLSupport,
};

const actions = {
  checkWebGLSupport({ commit }) {
    console.log("Checking Browser WebGL Support...");

    commit("setWebGLSupport", true);
  },
};

const mutations = {
  setWebGLSupport: (state, webGLSupport) => (state.webGLSupport = webGLSupport),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
