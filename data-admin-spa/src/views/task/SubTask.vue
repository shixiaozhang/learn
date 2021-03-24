<template>
  <div class="app-list-page">
    <TaskItems :taskId="itemTaskId" :command="command" @close="itemTaskId = undefined"></TaskItems>
    <TaskSteps :taskId="stepTaskId" :command="command" @close="stepTaskId = undefined"></TaskSteps>
    <TaskExport :taskId="exportTaskId" :command="command" @close="exportTaskId = undefined"></TaskExport>
    <TaskResend :taskForm="resendForm" @close="resendForm = undefined"></TaskResend>
    <ManualFix :context="context"></ManualFix>

    <div class="filter-list-title">
      <el-page-header @back="goBack" :content="$t('job.sub_task_list')">
      </el-page-header>
    </div>

    <div class="filter-list-content">
      <el-form :model="query" ref="filterTaskForm" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :span=" 6">
            <el-form-item :label="$t('job.task_name')" prop="name">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=" 6">
            <el-form-item :label="$t('common.status')" prop="filters_map.status">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.filters_map.status"
                style="width:100%" clearable>
                 <el-option v-for="item in Object.keys(taskStatus)" :key="item" :label="taskStatus[item]" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span=" 6">
            <el-form-item :label="$t('job.task_id')" prop="filters_map.taskId">
              <el-input v-model.number="query.filters_map.taskId" type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="margin-bottom:20px">
            <el-button type="primary" size="small" @click="searchTaskList">
              <i class="iconfont iconsearch"></i>
              {{ $t("btn.search") }}
            </el-button>
            <el-button plain size="small" @click="resetFilterForm">
              {{
              $t("btn.reset")
              }}
            </el-button>

          </el-col>
        </el-row>

      </el-form>

      <template v-if="selectTaskIds.length">
        <el-button plain @click="batchResendTasks">{{$t("job.multi_resend")}}</el-button>
        <el-button plain @click="batchAnalysisTasks">{{$t("job.multi_statistics")}}</el-button>
        <el-button plain @click="batchDeleteTasks">{{$t("job.multi_delete")}}</el-button>
      </template>

      <task-list-table @onTableSelectChange="selectChange($event)" @onSearchList="searchTaskByFilters()"
        :tableData="tableData" :getListLoading="loading">
      </task-list-table>

      <div class="pagination-area">
        <el-pagination v-if="total" @current-change="handleTaskCurrentSizeChange" @size-change="handleTaskSizeChange"
          :current-page.sync="query.current" :page-size="query.size" :page-sizes="[10, 20, 50, 100]"
          layout="total,prev, pager, next, sizes" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import taskAPI from "@/api/task";
import {
  TaskItems,
  TaskSteps,
  TaskExport,
  TaskResend,
  ManualFix
} from "./components";
import constant from "@/shared/config/constant";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapGetters, mapState } from "vuex";
import TaskBasicInfo from "./components/TaskBasicInfo.vue";
import TaskListTable from "./components/TaskListTable.vue";

export default {
  name: "Task",
  components: {
    TaskItems,
    TaskSteps,
    TaskExport,
    TaskResend,
    ManualFix,
    ListCountTip,
    TaskBasicInfo,
    TaskListTable
  },
  data() {
    return {
      openMoreFilter: false,
      selectTaskId: undefined,
      selectTaskIds: [],
      itemTaskId: undefined,
      stepTaskId: undefined,
      exportTaskId: undefined,
      command: undefined,
      query: {
        size: 10,
        current: 1,
        name: "",
        filters_map: {
          status: ""
        }
      },
      taskForm: undefined,
      resendForm: undefined,
      queryForm: undefined,
      total: 0,
      tableData: [],
      context: undefined,
      base_api: process.env.VUE_APP_BASE_URL,
      loading: false
    };
  },
  computed: {
     ...mapState({
      taskStatus:state=>state.app.taskStatus
    }),
    pickerOptions2() {
      return {
        shortcuts: [
          {
            text: this.$t("common.week"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("common.month"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("common.three_month"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      };
    }
  },
  mounted() {
    this.query.parent_id = this.$route.query.id;
    this.searchTaskByFilters();
  },
  methods: {
    handleTaskSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.searchTaskByFilters();
    },
    handleTaskCurrentSizeChange(val) {
      this.query.current = val;
      this.searchTaskByFilters();
    },
    searchTaskList() {
      this.query.current = 1;
      this.searchTaskByFilters();
    },
    searchTaskByFilters() {
      this.loading = true;
      taskAPI
        .searchTaskByFilters(this.query)
        .then(response => {
          this.loading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    selectChange(selectionIds) {
      this.selectTaskIds = selectionIds;
    },

    resetFilterForm() {
      this.$refs.filterTaskForm.resetFields();
      this.searchTaskList();
    },

    async confirmDialog(content = "") {
      try {
        return await this.$confirm(content, this.$t("common.tips"), {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        });
      } catch (error) {
        return false;
      }
    },

    async batchAnalysisTasks() {
      const content = this.$t("job.confirm_statisic", {
        counts: this.selectTaskIds.length
      });
      const confirm = await this.confirmDialog(content);
      if (confirm) {
        const response = await taskAPI.analysisTask(this.selectTaskIds);
        if (response.success) {
          this.searchTaskByFilters();
        }
      }
    },

    async batchResendTasks() {
      const content = this.$t("job.confirm_resend", {
        counts: this.selectTaskIds.length
      });
      const confirm = await this.confirmDialog(content);
      if (confirm) {
        const response = await taskAPI.resendTasks(this.selectTaskIds);
        if (response.success) {
          this.searchTaskByFilters();
        }
      }
    },

    async batchDeleteTasks() {
      const content = this.$t("job.confirm_delete", {
        counts: this.selectTaskIds.length
      });
      const confirm = await this.confirmDialog(content);
      if (confirm) {
        const response = await taskAPI.deleteTask(this.selectTaskIds);
        if (response.success) {
          this.searchTaskByFilters();
        }
      }
    },
 
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>