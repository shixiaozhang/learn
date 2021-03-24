<template>
  <div>
    <h1>
      {{$t('accounts.forget_password.title')}}
    </h1>

    <el-form class="login-form" ref="usernameForm" :rules="rules" :model="usernameForm">

      <el-form-item style="margin:0 60px 30px" prop="username">

        <el-input v-model="usernameForm.username" :placeholder="$t('accounts.forget_password.name')">

          <el-button @click="sendCode()" slot="append" :disabled="!usernameForm.username||timeIntervalText<120">
            {{timeIntervalText<120 ? $t('accounts.forget_password.resend',{time:timeIntervalText}):$t('accounts.forget_password.get_code')}}
          </el-button>

        </el-input>

      </el-form-item>

      <el-form-item style="margin:0 60px 30px" prop="verifyCode">
        <el-input v-model="usernameForm.verifyCode" :placeholder="$t('accounts.forget_password.code')"></el-input>
      </el-form-item>

      <el-form-item style="margin:0 60px 30px" prop="newPassword">
        <el-input v-model="usernameForm.newPassword" :placeholder="$t('accounts.change_password.new')"></el-input>
      </el-form-item>

      <el-form-item style="margin:0 60px 30px" prop="newPasswordConfirm">
        <el-input v-model="usernameForm.newPasswordConfirm" :placeholder="$t('accounts.change_password.confirm')">
        </el-input>
      </el-form-item>

      <el-form-item style="margin:0 60px">
        <el-button style="width:100%;color:white;height:50px"
         v-bind:style="{'background':dppPrimaryColor}"
         @click="submit()">{{$t('accounts.forget_password.confirm')}}</el-button>
      </el-form-item>


      <div class="forget_link" @click="backToLogin()">
        <i class="el-icon-arrow-left"></i>
        {{$t('accounts.forget_password.back')}}
        </div>

    </el-form>



  </div>
</template>

<script>
import accountsAPI from "@/api/accounts";
import{mapState} from "vuex";

export default {
   computed:{
     ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor,
    }),
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(
          new Error(this.$t("accounts.change_password.confirm_required"))
        );
      } else if (value !== this.usernameForm.newPassword) {
        callback(new Error(this.$t("accounts.change_password.same")));
      } else {
        callback();
      }
    };
    return {
      usernameForm: {},
      rules: {
        username: [{ required: true, message: this.$t("accounts.forget_password.name") }],
        verifyCode: [
          {
            required: true,
            message: this.$t("accounts.forget_password.code_required")
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
      intervalLockSendSMS: null,
      timeIntervalText: 120
    };
  },
  methods: {
    setLockSendSMSTimer() {
      this.intervalLockSendSMS = setInterval(() => {
        this.timeIntervalText--;
        if (this.timeIntervalText === 0) {
          clearInterval(this.intervalLockSendSMS);
          this.timeIntervalText = 120;
        }
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.intervalLockSendSMS);
      });
    },
    sendCode() {
      accountsAPI
        .sendForgetPsdCode({
          username: this.usernameForm.username
        })
        .then(response => {
          if (response.success) {
            this.$message.success(
              this.$t("accounts.forget_password.send_code_done")
            );
            this.setLockSendSMSTimer();
          } 
        })
    },
    submit() {
      this.$refs["usernameForm"].validate(valid => {
        if (valid) {
          accountsAPI
            .resetPassword(this.usernameForm)
            .then(response => {
              if (response.success) {
                this.$message.success(
                  this.$t("accounts.forget_password.reset_done")
                );
                this.$router.push("/auth/login");
              } 
            })
        }
      });
    },
    backToLogin(){
      this.$router.push('/auth/login')
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 80px 0 30px 60px;
  color: #161c2d;
  font-size: 36px;
  font-weight: 600;
}

.forget_link {
  float: right;
  font-size: 14px;
  cursor: pointer;
  color: #9b9ea0;
  margin:20px 60px 0;
}
</style>