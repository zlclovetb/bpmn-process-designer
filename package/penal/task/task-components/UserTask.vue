<template>
  <div style="margin-top: 16px">
    <el-form-item label="处理用户">
      <el-select v-model="userTaskForm.assignee" clearable @change="updateElementTask('assignee')">
        <el-option v-for="(user,i) in userData" :key="'ass-' + i" :label="`${user.username}`" :value="`${user.userId}`" />
      </el-select>
    </el-form-item>
    <el-form-item label="候选用户">
      <el-select v-model="userTaskForm.candidateUsers" multiple collapse-tags @change="updateElementTask('candidateUsers')">
        <el-option v-for="(user,i) in userData" :key="'ass-' + i" :label="`${user.username}`" :value="`${user.userId}`" />
      </el-select>
    </el-form-item>
    <el-form-item label="候选分组">
      <el-select v-model="userTaskForm.candidateGroups" multiple collapse-tags @change="updateElementTask('candidateGroups')">
        <el-option v-for="(group,i) in groupData" :key="'ass-' + i" :label="`${group.username}`" :value="`${group.groupId}`" />
      </el-select>
    </el-form-item>
    <el-form-item label="到期时间">
      <!--      <el-input v-model="userTaskForm.dueDate" clearable @change="updateElementTask('dueDate')" />-->
      <el-date-picker v-model="userTaskForm.dueDate" clearable @change="updateElementTask('dueDate')" />
    </el-form-item>
    <!--    <el-form-item label="跟踪时间">
      <el-input v-model="userTaskForm.followUpDate" clearable @change="updateElementTask('followUpDate')" />
    </el-form-item>-->
    <el-form-item label="优先级">
      <el-input-number v-model="userTaskForm.priority" clearable @change="updateElementTask('priority')" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "UserTask",
  props: {
    id: String,
    type: String
  },
  data() {
    return {
      defaultTaskForm: {
        assignee: "",
        candidateUsers: [],
        candidateGroups: [],
        dueDate: "",
        followUpDate: "",
        priority: ""
      },
      userTaskForm: {},
      userData: [],
      groupData: []
    };
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.bpmnElement = window.bpmnInstances.bpmnElement;
        this.$nextTick(() => this.resetTaskForm());
      }
    }
  },
  mounted(){
    this.getUserList();
    this.getGroupList();
  },
  methods: {
    resetTaskForm() {
      for (let key in this.defaultTaskForm) {
        let value;
        if (key === "candidateUsers" || key === "candidateGroups") {
          value = this.bpmnElement?.businessObject[key] ? this.bpmnElement.businessObject[key].split(",") : [];
        } else {
          value = this.bpmnElement?.businessObject[key] || this.defaultTaskForm[key];
        }
        this.$set(this.userTaskForm, key, value);
      }
    },
    updateElementTask(key) {
      const taskAttr = Object.create(null);
      if (key === "candidateUsers" || key === "candidateGroups") {
        taskAttr[key] = this.userTaskForm[key] && this.userTaskForm[key].length ? this.userTaskForm[key].join() : null;
      } else {
        taskAttr[key] = this.userTaskForm[key] || null;
      }
      window.bpmnInstances.modeling.updateProperties(this.bpmnElement, taskAttr);
    },
    getUserList() {
      this.$axios.get('/user/list')
      .then(e => {
        let data = e.data
        if (data.data && Array.isArray(data.data)) {
          this.userData = data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getGroupList() {
      this.$axios.get('/group/list')
      .then(e => {
        let data = e.data
        if (data.data && Array.isArray(data.data)) {
          this.groupData = data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeDestroy() {
    this.bpmnElement = null;
  }
};
</script>
