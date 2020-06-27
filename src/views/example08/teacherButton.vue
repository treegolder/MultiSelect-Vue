<template>
  <div><button @click="select">选中</button></div>
</template>
<script>
import { ADDTEACHER } from "@/store/types.js";
export default {
  props: ["teacher"],
  methods: {
    select() {
      let r = confirm(`你确定选择${this.teacher.user.name}老师么？`);
      this.$store.dispatch(ADDTEACHER, this.teacher);
      if (r) {
        alert(`${this.teacher.user.name}老师已选中`);
      }
    }
  }
};
</script>
