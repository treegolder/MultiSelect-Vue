import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";

Vue.use(Vuex);

const myState = {
  user: {
    name: "BO",
    address: "956"
  },
  homeworks: [],
  homework: {}
};

const myMutations = {
  [types.UPDATE_USER](state, data) {
    state.user = data;
  },
  [types.LIST_HOMEWORKS](state, data) {
    state.homeworks = data;
  },
  [types.GET_HOMEWORK](state, data) {
    state.homework = data;
  }
};

const myActions = {
  [types.UPDATE_USER]({ commit }, data) {
    setTimeout(() => {
      commit(types.UPDATEUSER, data);
    }, 2000);
  },

  async [types.LIST_HOMEWORKS]({ commit }, data) {
    let resp = await axios.get("homeworks");
    commit(types.LIST_HOMEWORKS, resp.data.homeworks);
  },

  // async [types.GET_HOMEWORK]({ commit }, data) {
  //   let resp = await axios.get(`homeworks/${data.hid}`);
  //   commit(types.GET_HOMEWORK, resp.data.homework);
  // }
  async [types.GET_HOMEWORK]({ commit }, data) {
    let resp = await axios.get(`homeworks/${data.hid}`);
    return Promise.resolve(resp.data.homework);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});
