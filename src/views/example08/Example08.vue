<template>
  <div>
    <studentpage v-if="isStudent" />
    <index v-if="isTeacher" />
    <login v-if="isLogin == false" />
  </div>
</template>
<script>
import { ISLOGIN } from "@/store/types.js";
import { mapState } from "vuex";
import { studentRole } from "@/router/index.js";
export default {
  components: {
    login: () => import("@/views/example08/Login.vue"),
    index: () => import("@/views/example08/Index.vue"),
    studentpage: () => import("@/views/example08/studentpage.vue")
  },
  data() {
    return {
      role: sessionStorage.getItem("role"),
      isStudent: false,
      isTeacher: false
    };
  },

  created() {
    if (this.role == "bb63e5f7e0f2ffae845c") {
      this.isStudent = true;
    }
    if (this.role == "6983f953b49c88210cb9") {
      this.isTeacher = true;
    }
  },

  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
