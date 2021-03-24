<template>
  <el-dialog  :title="$t('autoscaling.title')" :visible.sync="visible" :close-on-click-modal="false">
    <el-form style="padding:0 20px ">

      <el-form-item>
        {{$t('autoscaling.max')}}
        <el-slider v-model="config.max_size" :min="1" :max="200"  show-input></el-slider>

      </el-form-item>
      <el-form-item>
        {{$t('autoscaling.min')}}

        <el-slider v-model="config.min_size" :min="0" :max="10" show-input></el-slider>
      </el-form-item>

      <el-form-item>
        {{$t('autoscaling.require')}}

        <el-slider v-model="config.desire_size" :min="1" :max="200"  show-input></el-slider>

      </el-form-item>
      <el-form-item>
        {{$t('autoscaling.queue')}}
        <el-slider v-model="config.task_queue_num" :min="0" :max="2000"  show-input></el-slider>
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
    autoScalingForm: {
      type: Object
    }
  },
  watch: {
    autoScalingForm(val) {
      if (!val) return;
      this.visible = true;
      this.config = val;
    }
  },
  data() {
    return {
      config: {
        id: "",
        max_size: 1,
        min_size: 1,
        desire_size: 1,
        task_queue_num: 1
      },
      visible: false
    };
  },
  methods: {
    resetForm() {
      this.config = {
        id: "",
        max_size: 1,
        min_size: 1,
        desire_size: 1,
        task_queue_num: 1
      };
    },
    submitForm() {
      configAPI.saveAutoScalingConfig(this.config).then(response => {
        if(response.success){
          this.hide();
          this.$emit("done");
        }
      });
    },
    hide() {
      this.visible = false;
      this.resetForm();
    }
  }
};
</script>
