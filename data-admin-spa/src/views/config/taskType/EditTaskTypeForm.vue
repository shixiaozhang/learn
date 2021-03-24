<template>
  <el-dialog :title="$t('task_type.title')" @closed="resetFormFields()" :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :model="form">
      <el-form-item :label="$t('task_type.name')" prop="name"
        :rules="[{ required: true,message: $t('error.required')}]">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>

      <el-form-item :label="$t('task_type.is_mq')" prop="is_mq"
        :rules="[{ required: true,message: $t('error.required')}]">
        <el-radio v-model="form.is_mq" :label="true">
          {{$t('common.yes')}}
        </el-radio>
        <el-radio v-model="form.is_mq" :label="false">
          {{$t('common.no')}}
        </el-radio>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submitForm()">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import commonAPI from "@/api/common";

export default {
  props: {
    taskTypeForm: {
      type: Object,
    },
  },
  watch: {
    taskTypeForm(val) {
      if (!val) return;
      this.visible = true;
      this.form = _.isEmpty(val) ? {} : val;
    },
  },
  data() {
    return {
      visible: false,
      form: {},
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const response = await commonAPI.addTaskType(this.form);
          if (response.success) {
            this.hide();
            this.$emit("done");
          }
        }
      });
    },
    hide() {
      this.visible = false;
      this.$refs.form.resetFields();
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
