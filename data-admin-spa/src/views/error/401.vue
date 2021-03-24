<template>
  <div class="error-page">

    <div class="error-content">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg" />

      <div>
        <h1>403</h1>
        <p>
          {{$t('other.403')}}
        </p>

        <el-button type="primary"
          v-bind:style="{'background':dppPrimaryColor}"
         @click="backHome()">{{$t('other.back')}}</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
   computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    })
  },
  methods: {
    backHome() {
      this.$router.push("/");
    }
  }
};
</script>

