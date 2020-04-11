<template>
  <div id="app">
    <sidebar id="sidebar" />
    <router-view id="router" :key="$route.path" />
  </div>
</template>

<script>
import sidebar from "@/views/Sidebar";
export default {
  components: { sidebar }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  margin-top: 10px;
  display: flex;
}
#sidebar {
  width: 300px;
  border: 1px solid red;
}
#router {
  border: 1px solid red;
  flex: 1;
}
</style>
