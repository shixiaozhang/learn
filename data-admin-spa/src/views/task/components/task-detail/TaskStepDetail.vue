<template>
  <el-drawer :before-close="handleClose" :with-header="false" :visible.sync="showDrawer" direction="rtl">
    <div class="step-content">
      <p class="name-title">
        <i class="iconfont iconmingcheng"></i>
        {{stepDetail.step_name}}</p>

      <p class="detail-row">
        <span class="label">{{$t('common.create_time')}}</span>
        <span class="value">
          {{common.formatExactTs(stepDetail.create_ts)}}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.service_type')}}</span>
        <span class="value">
          {{stepDetail.service_type}}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.service_config')}}</span>
        <span class="value">
          {{stepDetail.process_group}}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.deadline')}}</span>
        <span class="value">
          {{stepDetail.deadline||'--'}}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.handles')}}</span>
        <span class="value">
          <span v-if="stepDetail.handlers&&stepDetail.handlers.length">
            <span class="tag-github-gray" v-for="(handlerId, index) in stepDetail.handlers" :key="index">
              {{handlerId}}
            </span>
          </span>
          <span v-else>
            --
          </span>

        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.distribute')}}</span>
        <span class="value">
          {{ stepDetail.is_distribute?$t('common.yes'):$t('common.no') }}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.item_batch')}}</span>
        <span class="value">
          {{stepDetail.item_batch}}
        </span>
      </p>

      <p class="detail-row">
        <span class="label">{{$t('job.create_form.step.filter_fileds')}}</span>
        <span class="value">
          <el-table border stripe size="mini" :data="stepDetail.context">
            <el-table-column prop="key" label="Key"></el-table-column>
            <el-table-column prop="value" label="Value"></el-table-column>
          </el-table>

        </span>
      </p>

    </div>
  </el-drawer>
</template>

<script>
import configAPI from "@/api/config";

export default {
  props: {
    stepInfo: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  watch: {
    stepInfo(val) {
      if (val && val.id) {
        this.showDrawer = true;
        this.stepDetail = _.cloneDeep(val);
        let keys = Object.keys(this.stepDetail.context);
        let context = [];
        keys.forEach(element => {
          context.push({
            key: element,
            value: this.stepDetail.context[element]
          });
        });
        this.stepDetail.context = context;
        this.getServices();
      }
    }
  },
  data() {
    return {
      showDrawer: false,
      stepDetail: {},
      allServiceConfig: []
    };
  },
  methods: {
    handleClose() {
      this.showDrawer = false;
      this.$emit("onClose");
    },
    getServices() {
      configAPI.getAllServiceConfig().then(response => {
        this.allServiceConfig = response;
        const type = this.allServiceConfig.find(data => {
          return data.id === this.stepDetail.process_group;
        });
        this.stepDetail.process_group = type.name;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.step-content {
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
}
.name-title {
  font-weight: bold;
  font-size: 20px;
  i {
    font-size: 20px;
  }
}
.detail-row {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  .label {
    letter-spacing: 0.44px;
    font-size: 12px;
    color: #616161;
    width: 150px;
    margin-right: 20px;
    padding-top: 1px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .value {
    flex: 1;
    letter-spacing: 0.25px;
    font-size: 14px;
    color: #061632;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>