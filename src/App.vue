<template>
  <div id="app">
    <!-- <sidebar id="sidebar" /> -->
    <example08 id="example08" />
    <router-view id="router" :key="$route.path" />
  </div>
</template>
<script>
// import sidebar from "@/views/Sidebar";
import example08 from "@/views/example08/Example08";
export default {
  components: {
    example08
    // sidebar
  }
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
