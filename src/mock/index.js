import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axios);

// 通用的，将{}占位符的字符串路径，转为正则表达式对象
// 例如，/users/{uid}; /users/{uid}/homeworks/{hid}
function path(p) {
  let reg = p.replace(/{\w+}/g, "(\\w+)").replace(/\//g, "\\/") + "$";
  return new RegExp(reg);
}
// ===================================

//reply的参数列表 (status, data, headers)
//status，http状态码  data是返回的json数据
mock.onGet("users/12").reply(200, {
  user: { userId: 1, userName: "sdsdsd" }
});

// 地址，支持JS正则表达式
// 正则表达式中 \，由转义符，\/，替代
// 匹配任意字符，\w+；
// $，结束。避免匹配多个
// 等价于 /users/数字
mock.onGet(path("users/{uid}")).reply(200, {
  user: { userId: 2, userName: "SUN" }
});
// /users/4/homeworks/21
mock.onGet(path("users/{uid}/homeworks/{hid}")).reply(200, {
  user: { userId: 4, userName: "ZHANG" }
});

// config，axios config对象。包含请求信息
// 返回数组，[status, {data对象}, {header对象}]
mock.onPost("login").reply(c => {
  // 此时请求的json已经转为字符串，不是json对象。因此需要转换回
  let data = c.data;
  let user = JSON.parse(data);
  let result = [401, { message: "用户名密码错误" }];
  if (user.number == "1001" && user.password == "123456") {
    result = [
      200,
      {
        role: "6983f953b49c88210cb9"
      },
      {
        Authorization: "65a1c6a5ca65c1a65a1c6a5ca65c1a65a1c6a5ca65c1a"
      }
    ];
  }
  return result;
});

mock.onGet(path("homeworks")).reply(c => {
  return [
    200,
    {
      homeworks: homeworks
    }
  ];
});

mock.onGet(path("homeworks/{hid}")).reply(c => {
  let reg = /homeworks\/(\d+)/;
  let hid = c.url.match(reg)[1];
  return [200, { homework: homeworks.find(h => h.id == hid) }];
});

// 模拟加密的token被篡改
mock.onGet("index").reply(c => {
  let result = [403, { message: "无权限" }];
  let auth = c.headers["Authorization"];
  if (auth == "65a1c6a5ca65c1a65a1c6a5ca65c1a65a1c6a5ca65c1a") {
    result = [
      200,
      {
        name: "BO"
      }
    ];
  }
  return result;
});

// ----------------------
const homeworks = [
  { id: 1, name: "Java基本数据类型", deadline: "2019-04-10T09:00" },
  { id: 2, name: "Java封装", deadline: "2019-05-10T12:00" },
  { id: 3, name: "Java泛型", deadline: "2019-06-10T21:30" }
];
