<template>
  <div class="app-list-page">

    <div class="filter-list-title">
      <el-page-header @back="goBack" :content="$t('job.detail.title')">
      </el-page-header>


       <p class="header">{{$t('job.task_name')}}：{{taskDetail.name}}
      </p>

      <el-row v-if="taskDetail.id" :gutter="20">
        <el-col :span="8">
          <div class="attr">
            <span class="attr_label">{{$t('job.detail.id')}}：</span>
            <span class="attr_value">{{taskDetail.id}}</span></div>
          <div class="attr">
            <span class="attr_label">{{$t('common.create_time')}}：</span>
            <span class="attr_value">{{common.formatExactTs(taskDetail.create_ts)}}</span></div>
          <div class="attr">
            <span class="attr_label">{{$t('common.update_time')}}：</span>
            <span class="attr_value">{{common.formatExactTs(taskDetail.update_ts)}}</span></div>
          <div class="attr">
            <span class="attr_label">{{$t('common.tag')}}：</span>
            <span class="attr_value">
              <template v-if="taskDetail.tags&&taskDetail.tags.length">
                <el-tag effect="dark" size="small" style="margin-right:5px" v-for="item in taskDetail.tags" :key="item">
                  {{ item }}
                </el-tag>
              </template>
              <span v-else>
                --
              </span>
            </span>
          </div>

        </el-col>
        <el-col :span="8">
          <div class="attr">
            <span class="attr_label">{{$t('job.task_type')}}：</span>
            <span class="attr_value">
              <el-tag effect="plain" size="small">
                {{taskDetail.dataProcessTaskType.name}}
              </el-tag>
            </span></div>
          <div class="attr">
            <span class="attr_label">{{$t('job.schdule_name')}}：</span>
            <span class="attr_value">{{taskDetail.schedule_name||'--'}}</span></div>
          <div class="attr">
            <span class="attr_label">{{ $t("common.description") }}：</span>
            <span class="attr_value">{{taskDetail.description||'--'}}</span></div>
          <div class="attr">
            <span class="attr_label"> {{ $t("common.export_path") }} ：</span>
            <span class="attr_value">
              {{taskDetail.s3_export_path}}
              <a v-if="taskDetail.s3_export_path"
                :href="`${base_api}/api/tools/downloadS3File?s3_path=${taskDetail.s3_export_path}`" target="_blank"
                class="app-primary-link">
                {{ $t("common.download_file") }}</a>
              <span v-else>
                --
              </span>
            </span>
          </div>

        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="8" class="right-info">
              <span class="attr_right_label">{{$t('common.status')}}</span>
              <br>
              <span class="attr_right_value">
                {{taskStatus[taskDetail.status]}}
              </span>
            </el-col>
            <el-col :span="8" class="right-info">
              <span class="attr_right_label">{{$t('job.detail.finish')}}</span>
              <br>
              <span class="attr_right_value"> {{taskDetail.item_success_count}}</span>
            </el-col>
            <el-col :span="7" class="right-info">
              <span class="attr_right_label">{{$t('job.detail.total')}}</span>
              <br>
              <span class="attr_right_value"> {{taskDetail.item_total_count}}</span>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-card shadow="never" class="card">

      <template slot="header">
        <span>{{$t('job.detail.step_flow')}}

          <el-tooltip :content="$t('job.detail.step_flow_tip')" placement="top">
            <i class="iconfont iconinfo"></i>
          </el-tooltip>

        </span>
      </template>

      <flow-charts :steps="taskDetail.steps"></flow-charts>

    </el-card>

    <el-card shadow="never" class="card">

      <template slot="header">
        <span>{{$t('job.detail.step_list')}}</span>
        <!-- <el-button v-if="activeStepCardTab==='table'" @click="getTaskSteps" style="float: right; padding: 3px 0"
          type="text">
          <i class="el-icon-refresh"></i> {{$t('btn.refresh')}}
        </el-button> -->
      </template>

      <el-tabs v-model="activeStepCardTab">
        <el-tab-pane :label="$t('job.detail.chart')" name="charts">
          <DetailStepsCharts :tableData="taskStepsList" :activeStepCardTab="activeStepCardTab"></DetailStepsCharts>
        </el-tab-pane>
        <el-tab-pane :label="$t('job.detail.table')" name="table">
          <TaskStepsTable :taskId="taskDetail.id" :tableData="taskStepsList" @cleanQueueDone="getTaskSteps">
          </TaskStepsTable>
        </el-tab-pane>

      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import taskAPI from "@/api/task";
import TaskStepsTable from "./components/task-detail/DetailStepsTable";
import DetailStepsCharts from "./components/task-detail/DetailStepsCharts";
import { mapState } from "vuex";
import FlowCharts from "./components/task-detail/FlowCharts";
export default {
  components: {
    TaskStepsTable,
    DetailStepsCharts,
    FlowCharts
  },
  computed: {
    ...mapState({
      primaryColor: state => state.app.dppPrimaryColor,
      taskStatus:state=>state.app.taskStatus
    })
  },
  data() {
    return {
      taskDetail: {},
      base_api: process.env.VUE_APP_BASE_URL,
      taskStepsList: [],
      activeStepCardTab: "charts",
      taskItemsStatus: "all"
    };
  },
  mounted() {
    this.taskDetail = this.$route.params.task;
    this.getTaskSteps();
  },
  methods: {
    getTaskSteps() {
      taskAPI.getStepInfos(this.taskDetail.id).then(response => {
        this.taskStepsList = response;
      });
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="scss">
.operations-btn {
  .el-button {
    font-weight: normal !important;
  }
}
</style>
<style lang="scss" scoped>
.header {
  margin-right: 12px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
}
.attr {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5715;
  padding-bottom: 8px;
  display: flex;
}
.attr_label {
  min-width: 100px;
}

.attr_value {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
  width: calc(100% - 100px);
  border-spacing: 2px;
  font-variant: tabular-nums;
  word-wrap: break-word;
  word-break: break-all;
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
}
.attr_right_label {
  @extend .attr_value;
  color: rgba(0, 0, 0, 0.45);
  font-weight: normal;
}
.attr_right_value {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  font-weight: 400;
}
.right-info {
  text-align: right;
}

.card {
  margin: 20px;
}
</style>