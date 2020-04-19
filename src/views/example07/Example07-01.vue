<template>
  <div>
    <h1>axios基本请求</h1>
    <p>
      基本get请求测试
      <br />
      <button @click="getUser">getUser</button>
      <br />
      匹配表达式测试
    </p>
    <button @click="getHomework">getHomework</button>
    <p>{{ user.userId }} / {{ user.userName }}</p>
    <hr />
    <p>
      post请求测试
      <br />
      <button @click="login">login</button>
    </p>
  </div>
</template>
<script>
import axios from "@/axios/MyAxios.js";
export default {
  data: () => ({
    user: {
      userName: null,
      userId: null
    }
  }),
  methods: {
    // getUser() {
    //   axios.get("users/14").then(resp => {
    //     console.log(resp);
    //     this.user = resp.data.user;
    //   });
    // },

    async getUser() {
      let resp = await axios.get("users/122323");
      this.user = resp.data.user;
    },

    getHomework() {
      axios.get("users/12/homeworks/232").then(resp => {
        this.user = resp.data.user;
      });
    },
    login() {
      axios
        .post("login", {
          number: 1001,
          password: "aaaaaa"
        })
        .then(resp => {
          console.log(resp.headers["Authorization"]);
          this.user = resp.data.user;
        });
    }
  }
};
</script>
