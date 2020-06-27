<template>
  <div><button @click="del">del</button></div>
</template>
<script>
import { DELSTUDENT } from "@/store/types.js";
export default {
  props: ["student"],
  methods: {
    del() {
      let r = confirm(`你确定del${this.student.user.name}么？`);
      this.$store.dispatch(DELSTUDENT, this.student);
      if (r) {
        alert(`${this.student.user.name}已删除`);
      }
    }
  }
};
</script>
