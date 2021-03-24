<template>
  <el-dialog :title="$t('user.migrate')" :visible.sync="visible"  :fullscreen="true" @close="resetFields()">
    <el-form ref="form" :model="form" style="width:100%">
      <el-form-item :label="$t('user.migrate_to')" :rules="[{ required: true, message: $t('error.required') }]"
        prop="targetUser">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="form.targetUser" filterable style="width:100%">
          <el-option v-for="(item,index) in userOptions" :key="index" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-transfer :titles="[$t('user.source_task'), $t('user.target_task')]" v-model="value" :props="{
      key: 'value',
      label: 'desc'
    }" :button-texts="[$t('user.resume_task'), $t('user.migrate')]" style="width:100%" :data="sourceData">
      </el-transfer>

    </el-form>
    <div slot="footer">
      <el-button plain @click="cancel">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submit">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import loginAPI from "@/api/login";
export default {
  name: "userDeleteForm",
  props: {
    userMigrateForm: {
      type: Object
    }
  },
  watch: {
    userMigrateForm(val) {
      if (!val) return;
      this.userId = val.id;
      this.getTasks();
      this.getUsers();
      this.visible = true;
    }
  },
  data() {
    return {
      visible: false,
      userId: {},
      form: {},
      userOptions: [],
      taskList: [],
      sourceData: [],
      value: []
    };
  },
  mounted() {},
  methods: {
    resetFields(){
      this.$refs.form.resetFields();
    },
    cancel() {
      this.resetFields();
      this.visible = false;
      this.sourceData = [];
      this.value = [];
    },
    getUsers() {
      loginAPI.listAllUser().then(response => {
        this.userOptions = response;
      });
    },
    getTasks() {
      loginAPI.getUserTaskList(this.userId).then(response => {
        this.taskList = response;
        this.taskList.forEach(data => {
          this.sourceData.push({
            value: data.task_id,
            desc: data.taskName
          });
        });
      });
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          loginAPI
            .migrateTask(this.userId, this.form.targetUser, this.value)
            .then(response => {
              if (response.success) {
                this.cancel();
                this.$emit("close");
              } 
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-transfer-panel{
  width:40%;
}
</style>