<template>
  <div>
    <form ref="form">
      <br />
      <input type="text" v-model="number" />
      <br />
      <input type="password" v-model="password" />
      <br />
      <button type="button" @click="submit">login</button>
    </form>
    <!-- {{ number }} -->
  </div>
</template>
<script>
import { ISLOGIN } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  data: () => ({
    number: null,
    password: null
  }),
  methods: {
    submit() {
      this.$store.dispatch(ISLOGIN, {
        number: this.number,
        password: this.password
      });
      this.$refs.form.reset();
    }
  }
};
</script>
