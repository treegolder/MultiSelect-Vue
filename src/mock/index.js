import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axios, { delayResponse: 2000 });

// 通用的，将{}占位符的字符串路径，转为正则表达式对象
// 例如，/users/{uid}; /users/{uid}/homeworks/{hid}
function path(p) {
  let reg = p.replace(/{\w+}/g, "\\w+").replace(/\//g, "\\/") + "$";
  return new RegExp(reg);
}
// ===================================

//reply的参数列表 (status, data, headers)
//status，http状态码  data是返回的json数据
mock.onGet("/users/12").reply(200, {
  user: { userId: 1, userName: "sdsdsd" }
});

// 地址，支持JS正则表达式
// 正则表达式中 \，由转义符，\/，替代
// 匹配任意字符，\w+；
// $，结束。避免匹配多个
// 等价于 /users/数字
mock.onGet(path("/users/{uid}")).reply(200, {
  user: { userId: 2, userName: "SUN" }
});
// /users/4/homeworks/21
mock.onGet(path("/users/{uid}/homeworks/{hid}")).reply(200, {
  user: { userId: 4, userName: "ZHANG" }
});

// config，axios config对象。包含请求信息
// 返回数组，[status, {data对象}, {header对象}]
mock.onPost("/login").reply(config => {
  console.log(config);
  // 此时请求的json以及转为字符串，不是json对象。因此需要转换
  let data = JSON.parse(config.data);
  console.log(data.user);

  return [
    200,
    {
      user: { userId: 333, userName: "John Smith" }
    },
    {
      Authorization: "65a1c6a5ca65c1a"
    }
  ];
});

mock.onGet(path("/homeworks")).reply(200, {
  homeworks: [
    { id: 1, name: "Java基本数据类型", deadline: "2019-04-10T09:00" },
    { id: 2, name: "Java封装", deadline: "2019-05-10T12:00" },
    { id: 3, name: "Java泛型", deadline: "2019-06-10T21:30" }
  ]
});

mock.onGet(path("/homeworks/{hid}")).reply(200, {
  homework: { id: 1, name: "Java封装", deadline: "2019-04-10T09:00" }
});
