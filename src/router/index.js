import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/example01",
    component: () => import("@/views/example01/Example01.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
