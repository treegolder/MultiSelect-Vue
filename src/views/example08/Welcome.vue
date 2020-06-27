<template>
  <div>
    <form>
      <input type="text" v-model="name" />
      方向
      <button type="button" @click="submit">提交</button>
    </form>
    <p v-if="listDirections">
      方向
      <ul>
        <li v-for="(d,index) in listDirections" :key="index">
          <router-link :to="`/directions/${d.id}`">
          {{d.name}}
          </router-link>
        </li>
      </ul>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("listDirections");
  },
  data() {
    return {
      name: null
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("addDirection", {
        name: this.name
      });
    }
  },
  computed: {
    ...mapState(["listDirections"])
  }
};
</script>
