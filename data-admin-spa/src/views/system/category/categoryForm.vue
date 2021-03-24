<template>
  <el-dialog :title="$t('category.title')" @close="resetFields()"
    :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :model="form">
      <el-form-item :label="$t('category.name')" prop="name" :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button plain @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submitForm()">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import commonAPI from "@/api/common";

export default {
  props: {
    categoryForm: {
      type: Object
    }
  },
  watch: {
    categoryForm(val) {
      if (!val) return;
      this.visible = true;
      this.form = _.cloneDeep(val);
    }
  },
  data() {
    return {
      visible: false,
      form: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        valid &&
          commonAPI.addCategory(this.form).then(response => {
            if (response.success) {
              this.cancel();
              this.$emit("done");
            } 
          });
      });
    },
   resetFields(){
      this.$refs.form.resetFields();
    },
    cancel() {
      this.visible = false;
      this.resetFields();
    }
  }
};
</script>
