<template>
  <div>
    <table>
      <tr>
        <th>方向</th>
        <th>操作</th>
      </tr>
      <tr v-for="(d, index) in teacherDirections" :key="index">
        <th>
          {{ d.name }}
        </th>
        <th>
          <directionbutton v-bind:direction="d" />
        </th>
        <th><button>退选</button></th>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { TEACHERDIRECTIONS } from "@/store/types.js";
import directionbutton from "./directionButton";
export default {
  components: { directionbutton },
  props: ["tid"],
  created() {
    this.$store.dispatch(TEACHERDIRECTIONS, { tid: this.tid });
  },
  computed: {
    ...mapState(["teacherDirections"])
  }
};
</script>
