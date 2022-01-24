
const groupList = {
  url: "/group/list",
  type: "get",
  response: () => {
    let groups = []
    for (let i = 0; i < 10; i++) {
      let newgroupObject = {
        groupId: 1000 + i,
        groupname: "group" + i
      };
      groups.push(newgroupObject)
    }
    return {
      code: 20000,
      data: groups
    }
  }
}

module.exports = [
  groupList,
]
