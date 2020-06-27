<template>
  <div><button @click="select">选中</button></div>
</template>
<script>
import { SELECTDIRECTION } from "@/store/types.js";
export default {
  props: ["direction"],
  methods: {
    select() {
      let r = confirm(`你确定选中${this.direction.name}方向么？`);
      this.$store.dispatch(SELECTDIRECTION, this.direction);
      if (r) {
        alert(`${this.direction.name}已添加`);
      }
    }
  }
};
</script>
