<template>

  <div>
    <h1>
      {{$t('login.title')}}
    </h1>
    <p class="text-muted">
      {{$t('login.sub_title')}}
    </p>

    <div v-loading="loading">

      <el-form ref="loginForm" class="login-form" :hide-required-asterisk="true" :model="loginForm">
        <el-form-item :label="$t('login.email_label')" style="margin:0 60px 20px" prop="username"
          :rules="[{ required: true, message: $t('error.required') },
          {pattern:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,message:'请输入正确的邮箱格式',trigger:'blur'}
          ]">
          <el-input :placeholder="$t('login.email')" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.psd_label')" style="margin:0 60px 30px" prop="password"
          :rules="[{ required: true, message:  $t('error.required')}]">
          <el-input :placeholder="$t('login.psd')" type="password" @keyup.enter.native="login"
            v-model="loginForm.password">
          </el-input>
        </el-form-item>

      </el-form>

      <div class="login-btn" v-bind:style="{'background':dppPrimaryColor}" @click="login">
        <span class="text">
          {{$t('login.title')}}
        </span>
        <i class="el-icon-right"></i>
      </div>

      <div class="forget_tip">
        {{$t('login.forget_tip')}}
        <a href="#/auth/forget-password" v-bind:style="{'color':dppPrimaryColor}">
          {{$t('accounts.forget_password.title')}}.
        </a>
      </div>

    </div>
  </div>

</template>

<script>
import store from "../../store";
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      },
      loading: false
    };
  },
  computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    })
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(result => {
        if (result) {
          this.loading = true;
          store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push("/dashboard");
            })
            .catch(err => {
              this.loading = false;
            });
        }
      });
    },
    forgetPassword() {
      this.$router.push("/auth/forget-password");
    }
  }
};
</script>

<style lang="scss">
.login-form {
  .el-input__inner {
    height: 50px;
    line-height: 50px;
  }
}
</style>

<style lang="scss" scoped>
h1 {
  margin: 90px 0 0 60px;
  color: #161c2d;
  font-size: 36px;
  font-weight: 600;
}

.text-muted {
  margin-left: 60px;
  color: #c0c4cc !important;
  margin-bottom: 30px;
}

.login-btn {
  height: 50px;
  margin: 0 60px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    transition: padding-right 218ms ease;
  }
  i {
    display: none;
    font-size: 22px;
  }
  &:hover {
    .text {
      padding-right: 10px;
    }
    i {
      display: inherit;
    }
  }
  &:focus {
    outline: none;
  }
}

.forget_tip {
  font-size: 14px;
  color: #9b9ea0;
  margin-top: 40px;
  margin-left: 60px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>