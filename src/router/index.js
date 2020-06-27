import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    props: true,
    path: "/example08",
    component: () => import("@/views/example08/Example08.vue")
  },
  {
    props: true,
    path: "/directions/:did",
    component: () => import("@/views/example08/direction.vue")
  },
  {
    props: true,
    path: "/teachers/:tid",
    component: () => import("@/views/example08/teacherinfo.vue")
  }
];
const router = new VueRouter({
  routes
});

export default router;
// 以上为没有角色要求的默认路由
// --------------------------
// 后期追加的路由配置
let adminRoutes = [
  {
    props: true,
    path: "/example08/welcome",
    component: () => import("@/views/example08/Welcome.vue")
  },
  {
    props: true,
    path: "/example08/index",
    component: () => import("@/views/example08/Index.vue")
  }
];
let studentRoutes = [
  {
    props: true,
    path: "/example08/studentpage",
    component: () => import("@/views/example08/studentpage.vue")
  }
];
// 必须与后端提前约定。按角色，动态加载路由信息
// 使其他角色即使知道路由路径，也无法加载对应的组件
const teacherRole = "6983f953b49c88210cb9";
export const studentRole = "bb63e5f7e0f2ffae845c";

// 暴露该方法。登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case teacherRole:
      router.addRoutes(adminRoutes);

      router.push("/example08/index");
      break;
    case studentRole:
      // student的路由
      router.addRoutes(studentRoutes);
      router.push("/example08/studentpage");
      break;
  }
}
// 再此文件模块加载时，也执行。用户登陆后刷新页面时，按sessionstorage中数据初始化
// 没有找到sessionstorage的监听事件
updateRoutes();
