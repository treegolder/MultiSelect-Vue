<template>
  <div>
    <h1>{{ myDirection.name }}方向</h1>
    <form>
      添加课程
      <br />
      课程名称
      <input type="text" v-model="name" />
      <br />
      权重
      <input type="text" v-model="weight" />
      <br />
      <button @click="submit" type="button">确认</button>
    </form>
    <br />
    <h3>可选总人数：{{ getStuCap }}</h3>
    <h3>当前可选人数：{{ getStuNum }}</h3>
    <table>
      <tr>
        <th>#</th>
        <th>课程</th>
        <th>权重</th>
        <th>操作</th>
      </tr>
      <tr v-for="(c, index) in listCourses" :key="index">
        <th>{{ index + 1 }}</th>
        <th>{{ c.name }}</th>
        <th>{{ c.weight }}</th>
        <th><button>修改</button></th>
        <th><button>删除</button></th>
      </tr>
    </table>

    <table>
      <tr>
        <th>#</th>
        <th>学号</th>
        <th>姓名</th>
        <th>操作</th>
      </tr>
      <tr v-for="(s, index) in listStudent" :key="index">
        <th>{{ index + 1 }}</th>
        <th>{{ s.user.number }}</th>
        <th>{{ s.user.name }}</th>
        <th>
          <addbutton v-bind:student="s" />
        </th>
        <th><delbutton v-bind:student="s" /></th>
      </tr>
    </table>

    <!-- <ul>
      <li v-for="(s, index) in listStudent" :key="index">
        {{ index + 1 }}
        {{ s.user.name }}
        <addbutton v-bind:student="s" />
        选中
      </li>
    </ul> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { MYDIRECTION } from "@/store/types.js";
import { COURSE } from "@/store/types.js";
import { LISTCOURSES } from "@/store/types.js";
import { LISTSTUDENT } from "@/store/types.js";
import { GETSTUCAP } from "@/store/types.js";
import { GETSTUNUM } from "@/store/types.js";
import { ADDSTUDENT } from "@/store/types.js";
import addbutton from "./AddButton";
import delbutton from "./DelButton";
export default {
  components: { addbutton, delbutton },
  props: ["did"],
  data: () => ({
    name: null,
    weight: null
  }),
  created() {
    this.$store.dispatch(MYDIRECTION, { did: this.did }),
      this.$store.dispatch(LISTCOURSES, { did: this.did });
    this.$store.dispatch(LISTSTUDENT, { did: this.did });
    this.$store.dispatch(GETSTUCAP);
    this.$store.dispatch(GETSTUNUM);
  },
  methods: {
    submit() {
      this.$store.dispatch(COURSE, {
        name: this.name,
        weight: this.weight,
        direction: { id: this.did }
      });
    }
  },
  computed: {
    ...mapState([
      "myDirection",
      "listCourses",
      "listStudent",
      "scores",
      "getStuCap",
      "getStuNum"
    ])
  }
};
</script>
