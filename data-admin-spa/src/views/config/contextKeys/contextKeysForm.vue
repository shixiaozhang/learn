<template>
  <el-dialog top="6vh" @closed="resetFormFields()" :title="$t('context_keys.title')" :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :model="form">
      <el-form-item :label="$t('context_keys.key')" prop="key"
        :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model.trim="form.key"></el-input>
      </el-form-item>
      <el-form-item prop="key_type" :label="$t('context_keys.type')"
        :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model.trim="form.key_type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('task_type.title')" prop="task_type"
        :rules="[{ required: true, message: $t('error.required') }]">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="form.task_type" style="width:100%">
          <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('context_keys.remark')">
        <el-input type="textarea" :rows="4" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submitForm">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";

export default {
  props: {
    contextKeysForm: {
      type: Object
    },
    taskTypes: {
      type: Array
    }
  },
  watch: {
    contextKeysForm(val) {
      if (!val) return;
      this.visible = true;
      this.form = val;
    }
  },
  data() {
    return {
      form: {
        id: "",
        key: "",
        key_type: "",
        task_type: 1
      },
      visible: false
    };
  },
  methods: {
    resetForm() {
      this.form = {
        id: "",
        key: "",
        key_type: ""
      };
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          configAPI.saveContextKeys(this.form).then(response => {
            if (response.success) {
             this.hide();
             this.$emit("done");
            }
          });
        }
      });
    },
    hide() {
      this.visible = false;
      this.resetForm();
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
  }
};
</script>
