import Mock from "mockjs";

let user = [
  {
    id: 1,
    name: "悟空",
    gender: "1",
    email: "123@wk.com",
    age: 999,
    createDate: "2001-02-03 01:02:03"
  },
  {
    id: 2,
    name: "八戒",
    gender: "0",
    email: "456@bj.com",
    age: 500,
    createDate: "2004-05-06 04:05:06"
  },
  {
    id: 3,
    name: "悟净",
    gender: "2",
    email: "789@wj.com",
    age: 100,
    createDate: "2007-08-09 07:08:09"
  }
];

//@param condition 过滤条件
//@param data 需要过滤的数据
function filter(condition, data) {
  return data.filter(item => {
    return Object.keys(condition).every(key => {
      return String(item[key])
        .toLowerCase()
        .includes(
          String(condition[key])
            .trim()
            .toLowerCase()
        );
    });
  });
}

//获取当前时间并格式化
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + h + seperator2 + minute
    + seperator2 + second;
  return currentdate;
}

// 条件搜索
Mock.mock("/find", "post", function(options) {
  let data = JSON.parse(options.body).params;

  if (Object.keys(data).length !== 0) {
    return filter(data, user);
  }

  return user;
});

// 删除
Mock.mock("/delete", "post", function(options) {
  let id = parseInt(JSON.parse(options.body).params.id);

  let index;
  for (let i in user) {
    if (user[i].id === id) {
      index = i;
      break;
    }
  }
  user.splice(index, 1);

  return user;
});

//保存或更新
Mock.mock("/saveOrUpdate", "post", function(options) {
  let data = JSON.parse(options.body);

  if (data["id"] === "") {
    data["id"] = user.length + 1;
    data["createDate"] = getNowFormatDate();
    user.push(data);
  } else {
    let index;
    for (let i in user) {
      if (user[i].id === data.id) {
        //在数组arr里找到这个id
        index = i;
        break;
      }
    }

    user.splice(index, 1, data);
  }

  return user;
});

export default Mock;
