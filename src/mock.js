const Mock = require('mockjs');
Mock.mock('/api/user/list', 'get', ()=> {
  let users = []
  for (let i = 0; i < 10; i++) {
    let newUserObject = {
      userId: 1000 + i,
      username: "User" + i,
      password:  "password",
      mobile: "18666666666"
    };
    users.push(newUserObject)
  }
  return {
    data: users
  }
})
