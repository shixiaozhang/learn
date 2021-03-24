<template>
  <el-dialog :title="$t('user.title')" :visible.sync="visible" @close="resetFields()">
    <el-form ref="form" :model="form" :rules="rules" :status-icon="true">

      <el-form-item :label="$t('user.role')" prop="role_id">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="form.role_id" style="width:100%">
          <el-option v-for="item in userRoles" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('category.title')" prop="category_id">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="form.category_id" style="width:100%">
          <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.name')" prop="username">
        <el-input v-model="form.username" placeholder="admin@patsnap.com"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.psd')" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item :label="$t('user.confirm_psd')" prop="password_confirm">
        <el-input v-model="form.password_confirm" type="password"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button size="small" plain @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button size="small" type="primary" @click="submit('form')">{{$t('btn.confirm')}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import logInAPI from "@/api/login";
export default {
  name: "userForm",
  data() {
    return {
      visible: false,
      form: {},
      rules: {
        username: [
          {
            required: true,
            type: "email",
            message: this.$t("error.required")
          },
          {
            pattern: /^[1-9a-zA-Z_]\w*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/,
            message: this.$t("error.email")
          }
        ],
        password: [{ required: true, message: this.$t("error.required") }],
        password_confirm: [
          { required: true, message: this.$t("error.required") }
        ],
        role_id: [{ required: true, message: this.$t("error.required") }],
        categoryId: [{ required: true, message: this.$t("error.required") }]
      }
    };
  },
  props: {
    userForm: {
      type: Object
    },
    userRoles: {
      type: Array
    },
    categoryOptions: {
      type: Array
    }
  },
  watch: {
    userForm(val) {
      if (!val) return;
      this.form = val;
      this.visible = true;
    }
  },
  methods: {
    resetFields(){
      this.$refs.form.resetFields();
    },
    cancel() {
      this.resetFields();
      this.visible = false;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.password !== this.form.password_confirm) {
          } else {
            logInAPI
              .createUser({
                username: this.form.username,
                password: this.form.password,
                role_id: this.form.role_id,
                category_id: this.form.category_id,
                user_id: this.form.id
              })
              .then(response => {
                if (response.success) {
                  this.cancel();
                  this.$emit("close");
                } 
              })
          }
        } 
      });
    }
  }
};
</script>
