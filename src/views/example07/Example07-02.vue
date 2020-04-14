<template>
  <div>
    <h1>Homeworks</h1>

    <ul>
      <li v-for="(h, index) in homeworks" :key="index">
        <router-link :to="`/homeworks/${h.id}`">{{ h.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { LIST_HOMEWORKS } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch(LIST_HOMEWORKS);
  },
  computed: {
    ...mapState(["homeworks"])
  }
};
</script>
