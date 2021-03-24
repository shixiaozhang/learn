<template>
  <el-dialog :title="$t('btn.resend')" :visible.sync="visible" >
    <el-form :model="form">
      <el-form-item :label="$t('job.task_id')">
        <el-input v-model="task.taskId" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('job.create_form.step.step_name')">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="task.step_id" style="width:100%">
          <el-option v-for="item in form.steps" :key="item.step" :label="item.step_name" :value="''+item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="task.status" style="width:100%">
          <el-option label="Retry" value="0"></el-option>
          <el-option label="Failed" value="-1"></el-option>
          <el-option label="Running" value="-2"></el-option>
          <el-option label="ALL" value=""></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button plain @click="hide">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="resend()">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<style>
</style>
<script>
import taskAPI from "@/api/task";
export default {
  name: "TaskResend",
  props: {
    taskForm: {
      type: Object
    }
  },
  watch: {
    taskForm(val) {
      if (!val) return;
      this.visible = true;
      this.reset();
      this.form = val;
      this.task.taskId = val.id;
    }
  },
  data() {
    return {
      form: {},
      visible: false,
      task: {
        taskId: "",
        step_id: "",
        status: "0"
      }
    };
  },
  methods: {
    reset() {
      this.task.taskId = undefined;
      this.form = {};
      this.task.step_id = "";
      this.task.status = "0";
    },
    hide() {
      this.visible = false;
      this.reset();
      this.$emit("close");
    },
    resend() {
      taskAPI.resendTask(this.task).then(response => {
        if (response.success) {
          this.hide();
          this.$emit("done");
        }
      });
    }
  }
};
</script>
