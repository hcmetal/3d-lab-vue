import Vue from "vue";
import Vuex from "vuex";
import virtualExhibition from "./modules/virtualExhibition";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    virtualExhibition,
  },
});
