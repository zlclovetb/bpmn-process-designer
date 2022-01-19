
const userList = {
  url: "/user/list",
  type: "get",
  response: () => {
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
      code: 20000,
      data: users
    }
  }
}

module.exports = [
  userList,
]
