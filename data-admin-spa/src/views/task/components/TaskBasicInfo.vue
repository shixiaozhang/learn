<template>
  <el-popover v-if="taskInfo.id" :open-delay="300" placement="bottom" width="300" trigger="hover">
    <p class="more-info-popover-row">
      <span class="title">ID:</span>
      <span class="value">{{ taskInfo.id }}</span>
    </p>
    <p class="more-info-popover-row">
      <span class="title">{{ $t("job.schdule_name") }}:</span>
      <span class="value">{{ taskInfo.schedule_name }}</span>
    </p>
    <p class="more-info-popover-row">
      <span class="title">{{ $t("common.create_time") }}:</span>
      <span class="value">
        {{
                  common.formatExactTs(taskInfo.create_ts)
                  }}
      </span>
    </p>
    <p class="more-info-popover-row">
      <span class="title">{{ $t("common.description") }}:</span>
      <span class="value">{{ taskInfo.description }}</span>
    </p>
    <p class="more-info-popover-row">
      <span class="title">{{ $t("common.tag") }} :</span>
      <span class="value">
        <el-tag type="success" style="margin-right:5px" v-for="item in taskInfo.tags" :key="item">{{ item }}
        </el-tag>
      </span>
    </p>
    <p class="more-info-popover-row">
      <span class="title">{{ $t("common.export_path") }}:</span>
      <span class="value">
        {{ taskInfo.s3_export_path }}
        <a v-if="taskInfo.s3_export_path"
          :href="`${base_api}/api/tools/downloadS3File?s3_path=${taskInfo.s3_export_path}`" target="_blank"
          class="app-primary-link">{{ $t("common.download_file") }}</a>
      </span>
    </p>
    <el-button type="text" slot="reference" style="margin:0 10px">
      {{
                $t("btn.detail")
                }}
    </el-button>
  </el-popover>
</template>

<script>
export default {
  props: {
    taskInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  data(){
    return {
      base_api: process.env.VUE_APP_BASE_URL
    }
  },
};
</script>

<style lang="scss" scoped>
.more-info-popover-row {
  display: flex;
  .title {
    letter-spacing: 0.44px;
    font-size: 12px;
    color: #616161;
    width: 80px;
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