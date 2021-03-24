<template>
  <div class="content">

    <div class="login-content">

      <div class="left">

        <h4 class="title">
          {{$t('login.name')}}
        </h4>

        <p class="des" v-html="$t('login.des')">

        </p>
        <div class="line">
        </div>
      </div>

      <div class="right">
        <router-view></router-view>
      </div>

    </div>
  </div>

</template>

<script>
import store from "../../store";

export default {
  name: "login",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  min-width: 1000px;
}
.logo {
  width: 126px;
  opacity: 0.8;
  position: absolute;
  left: 46px;
  top: 27px;
}

.login-content {
  width: 1100px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: white;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  height: 600px;
  overflow: hidden;
  
  .left {
    float: left;
    width: 540px;
    height: 100%;
    text-align: center;
    position: relative;
    left: 0;
    top: 0;
    color: white;
    box-shadow: 2px 0 10px 0px rgba(0, 0, 0, 0.7);
    background: url("../../assets/images/left-bg.png")
      left top/100% 100% no-repeat;
    .title {
      color: white;
      font-size: 24px;
      font-weight: bold;
      padding-top: 100px;
      padding-bottom: 34px;
    }

    .des {
      width: 350px;
      margin: 0 auto;
      line-height: 37px;
      font-size: 16px;
    }

    .line {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: 252px;
      width: 60px;
      height: 0;
      border-top: 1px solid white;
      opacity: 0.6;
    }
  }

  .right {
    width: 540px;
    float: right;
    position: relative;
  }
}
</style>