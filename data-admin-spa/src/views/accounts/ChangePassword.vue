<template>
  <div>
    <div class="app-list-page">
      <div class="filter-list-title">{{$t('accounts.change_password.title')}}</div>

      <div class="filter-list-content">
        <div class="change-psd-form">
          <el-form
          class="login-form"
            v-if="!changeDone"
            ref="changePasswordForm"
            :model="form"
            :rules="rules"
          >
            <el-form-item :label="$t('accounts.change_password.old')" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('accounts.change_password.new')" prop="newPassword">
              <el-input v-model="form.newPassword" ref="newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('accounts.change_password.confirm')" prop="newPasswordConfirm">
              <el-input v-model="form.newPasswordConfirm" type="password"></el-input>
            </el-form-item>

            <el-form-item class="buttons">
              <el-button
                type="primary"
                :loading="submitLoading"
                @click="submit()"
              >{{$t('accounts.change_password.confirm_btn')}}</el-button>
              <el-button @click="reset()">{{$t('btn.reset')}}</el-button>
            </el-form-item>
          </el-form>
          <div v-else class="done">
            <i class="iconfont icontianjiachenggong"></i>
            <p>{{$t('accounts.change_password.done')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accountsAPI from "@/api/accounts";

export default {
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(
          new Error(this.$t("accounts.change_password.confirm_required"))
        );
      } else if (value !== this.form.newPassword) {
        callback(new Error(this.$t("accounts.change_password.same")));
      } else {
        callback();
      }
    };

    return {
      form: {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: this.$t("accounts.change_password.old_required")
          }
        ],
        newPassword: [
          {
            required: true,
            message: this.$t("accounts.change_password.new_required")
          },
          {
            min: 6,
            message: this.$t("accounts.change_password.new_min"),
            trigger: "blur"
          }
        ],
        newPasswordConfirm: [{ validator: validatePass2, trigger: "blur" }]
      },
      submitLoading: false,
      changeDone: false
    };
  },
  methods: {
    submit() {
      this.$refs["changePasswordForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          accountsAPI
            .changePassword(this.form)
            .then(response => {
              this.submitLoading = false;
              if (response.success) {
                this.changeDone = true;
              } 
            })
            .catch(error => {
              this.submitLoading = false;
            });
        }
      });
    },
    reset() {
      this.$refs["changePasswordForm"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.change-psd-form {
  width: 60vw;
  margin: auto;
  margin-top: 10vh;
  min-height: calc(100vh - 300px);
  form{
    width: 100%;
  }
  .buttons{
    margin-top: 50px;
  }
}
.done {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.iconfont {
  display: inline;
  font-size: 90px;
  color: yellowgreen;
}
</style>