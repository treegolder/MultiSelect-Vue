<template>
  <div>
    <h1>Vue示例</h1>
    <ul>
      <li><router-link to="/example08">login</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
ul {
  margin-top: 20px;
  margin-left: 30px;
}
ul ul {
  margin-top: 00px;
}
ul > li {
  margin-left: 10px;
}
</style>
