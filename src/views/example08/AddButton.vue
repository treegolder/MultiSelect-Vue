<template>
  <div><button @click="add">add</button></div>
</template>
<script>
import { ADDSTUDENT } from "@/store/types.js";
export default {
  props: ["student"],
  methods: {
    add() {
      let r = confirm(`你确定add${this.student.user.name}么？`);
      this.$store.dispatch(ADDSTUDENT, this.student);
      if (r) {
        alert(`${this.student.user.name}已添加`);
      }
    }
  }
};
</script>
