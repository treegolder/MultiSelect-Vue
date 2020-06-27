import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { author } from "@/util/Const";
import { updateRoutes } from "@/router/index";
Vue.use(Vuex);

const myState = {
  user: {
    number: null,
    password: null
  },
  isLogin: false,
  teacher: null,
  teacherList: null,
  direction: null,
  listDirections: null,
  myDirection: null,
  course: null,
  listCourses: null,
  userList: [],
  SCList: [],
  listStudent: null,
  scores: null,
  stuCap: null,
  getStuCap: null,
  getStuNum: null,
  addStudent: null,
  delStudent: null,
  teacherDirections: null,
  selectDirection: null,
  addTeacher: null
};

const myMutations = {
  [types.USER](state, data) {
    state.user = data;
  },
  [types.ISLOGIN](state, data) {
    state.isLogin = data;
  },
  [types.TEACHERDIRECTIONS](state, data) {
    state.teacherDirections = data;
  },
  [types.SELECTDIRECTION](state, data) {
    state.selectDirection = data;
  },
  [types.ADDTEACHER](state, data) {
    state.addTeacher = data;
  },
  teacher(state, data) {
    state.teacher = data;
  },
  direction(state, data) {
    state.direction = data;
  },
  listDirections(state, data) {
    state.listDirections = data;
  },
  [types.MYDIRECTION](state, data) {
    state.myDirection = data;
  },
  [types.COURSE](state, data) {
    state.COURSE = data;
  },
  [types.LISTCOURSES](state, data) {
    state.listCourses = data;
  },
  [types.USERLIST](state, data) {
    state.userList = data;
  },
  [types.SCLIST](state, data) {
    state.SCList = data;
  },
  [types.TEACHERLIST](state, data) {
    state.teacherList = data;
  },
  [types.LISTSTUDENT](state, data) {
    state.listStudent = data;
  },
  [types.SCORES](state, data) {
    state.scores = data;
  },
  [types.STUCAP](state, data) {
    state.stuCap = data;
  },
  [types.GETSTUCAP](state, data) {
    state.getStuCap = data;
  },
  [types.GETSTUNUM](state, data) {
    state.getStuNum = data;
  },
  [types.ADDSTUDENT](state, data) {
    state.addStudent = data;
  },
  [types.DELSTUDENT](state, data) {
    state.delStudent = data;
  }
};
const myAction = {
  async [types.ISLOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    let auth = resp.headers[author];
    // console.log(auth);
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      updateRoutes();
      commit(types.ISLOGIN, true);
    }
  },
  async backendindex({ commit }, data) {
    let resp = await axios.get("teacher/index");
    commit("teacher", resp.data.teacher);
  },
  async addDirection({ commit }, data) {
    let resp = await axios.post("teacher/adddirection", data);
    commit("direction", resp.data.direction);
  },
  async [types.ADDTEACHER]({ commit }, data) {
    let resp = await axios.post("student/addTeacher", data);
    commit("teacher", resp.data.teacher);
  },
  async listDirections({ commit }, data) {
    let resp = await axios.get("teacher/listdirections");
    commit("listDirections", resp.data.listDirections);
  },
  async [types.MYDIRECTION]({ commit }, data) {
    let resp = await axios.get(`teacher/directions/${data.did}`);
    commit(types.MYDIRECTION, resp.data.direction);
  },
  async [types.TEACHERDIRECTIONS]({ commit }, data) {
    let resp = await axios.get(`student/teachers/${data.tid}/directions`);
    commit(types.TEACHERDIRECTIONS, resp.data.teacherDirections);
  },
  async [types.COURSE]({ commit }, data) {
    let resp = await axios.post("teacher/addcourse", data);
    commit(types.COURSE, resp.data.course);
  },
  async [types.LISTCOURSES]({ commit }, data) {
    let resp = await axios.get(`teacher/directions/${data.did}/listcourses`);
    commit(types.LISTCOURSES, resp.data.listCourses);
  },
  async [types.USERLIST]({ commit }, data) {
    let resp = await axios.post("teacher/importUser", data);
    commit(types.USERLIST, resp.data.userList);
  },
  async [types.SCLIST]({ commit }, data) {
    let resp = await axios.post("teacher/importSC", data);
    commit(types.SCLIST, resp.data.SCList);
  },
  async [types.TEACHERLIST]({ commit }, data) {
    let resp = await axios.get("student/listTeacher", data);
    commit(types.TEACHERLIST, resp.data.teacherList);
  },
  async [types.LISTSTUDENT]({ commit }, data) {
    let resp = await axios.get(`teacher/directions/${data.did}/liststudents`);
    commit(types.LISTSTUDENT, resp.data.students);
    commit(types.SCORES, resp.data.scores);
  },
  async [types.STUCAP]({ commit }, data) {
    let resp = await axios.post("teacher/setstucap", data);
    commit(types.STUCAP, resp.data.stuCap);
  },
  async [types.GETSTUCAP]({ commit }, data) {
    let resp = await axios.get("/teacher/getstucap");
    commit(types.GETSTUCAP, resp.data.stuCap);
  },
  async [types.GETSTUNUM]({ commit }, data) {
    let resp = await axios.get("/teacher/getstunum");
    commit(types.GETSTUNUM, resp.data.stuNum);
  },
  async [types.ADDSTUDENT]({ commit }, data) {
    let resp = await axios.post("teacher/addstudent", data);
    commit(types.ADDSTUDENT, resp.data.student);
  },
  async [types.SELECTDIRECTION]({ commit }, data) {
    let resp = await axios.post("student/addDirection", data);
    commit(types.SELECTDIRECTION, resp.data.direction);
  },
  async [types.DELSTUDENT]({ commit }, data) {
    let resp = await axios.post("teacher/delStudent", data);
    commit(types.DELSTUDENT, resp.data.student);
  }
};
export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myAction,
  modules: {}
});

// --------------------------
// 执行时判断，刷新时检测；也可以添加长度等更严格判断
if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
}
