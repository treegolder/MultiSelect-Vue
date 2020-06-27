<template>
  <div>
    <table>
      <tr>
        <th>教师名称</th>
      </tr>
      <tr v-for="(t, index) in teacherList" :key="index">
        <th>
          <router-link :to="`/teachers/${t.id}`">
            {{ t.user.name }}
          </router-link>
        </th>
        <th>
          <teacherbutton v-bind:teacher="t" />
        </th>
      </tr>
    </table>
  </div>
</template>
<script>
import { TEACHERLIST } from "@/store/types.js";
import { mapState } from "vuex";
import teacherbutton from "./teacherButton";
export default {
  components: { teacherbutton },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch(TEACHERLIST);
  },
  computed: {
    ...mapState(["teacherList"])
  }
};
</script>
