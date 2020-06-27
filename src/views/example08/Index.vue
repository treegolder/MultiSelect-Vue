<template>
  <div>
    <h1>登录后系统首页</h1>
    <p>
      基于sessionstorage中数据判断用户登陆状态，登录后加载此组件。
      <br />
      <router-link to="/example08/welcome">添加方向</router-link>
    </p>
    <p v-if="teacher">
      {{ teacher.user.name }}
    </p>
    <br />
    <form>
      <input type="file" @change="readFile" />
      <br />
      <button @click="submit" type="button">从Excel导入学生</button>
      <br />
      <button @click="addSC">添加学生选课记录</button>
    </form>
    <br />
    <h3>设定人数上限:{{ stuCap }}</h3>
    <form>
      <input type="text" v-model="stuCap" />
      <button @click="setStuCap" type="button">确定</button>
    </form>
    <!-- <form>
      <table>
        <tr>
          <td>#</td>
          <td>学号</td>
          <td>姓名</td>
          <td>密码</td>
        </tr>
        <tr v-for="(s, index) in students" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ s.number }}</td>
          <td>{{ s.name }}</td>
          <td>{{ s.password }}</td>
        </tr>
      </table>
    </form> -->
  </div>
</template>
<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { readSCFile } from "@/util/ExcelUtils.js";
import { mapState } from "vuex";
import { TEACHER } from "@/store/types.js";
import { USERLIST } from "@/store/types.js";
import { SCLIST } from "@/store/types.js";
import { STUCAP } from "@/store/types.js";
import axios from "vuex";
export default {
  data: () => ({
    students: null,
    scs: null,
    stuCap: null
  }),
  methods: {
    readFile(event) {
      let file = event.target.files[0];
      readStudentFile(file).then(data => {
        this.students = data;
      });
      readSCFile(file).then(data => {
        this.scs = data;
      });
    },
    submit() {
      this.$store.dispatch(USERLIST, this.students);
    },
    addSC() {
      this.$store.dispatch(SCLIST, this.scs);
    },
    setStuCap() {
      this.$store.dispatch(STUCAP, {
        stuCap: this.stuCap
      });
    }
  },
  created() {
    this.$store.dispatch("backendindex");
    if (sessionStorage.getItem("role") != "6983f953b49c88210cb9") {
      //window.location.reload();
    } else {
      this.$router.push("/example08/studentpage");
    }
  },
  computed: {
    ...mapState(["teacher"])
  }
};
</script>
