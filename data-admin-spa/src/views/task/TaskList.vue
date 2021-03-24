<template>
  <div class="app-list-page">

    <div class="filter-list-title">
      {{ $t("job.title") }}
    </div>

    <div class="filter-list-content">
      <el-form :model="query" ref="filterTaskForm" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="openMoreFilter ? 8 : 6">
            <el-form-item :label="$t('job.task_name')" prop="name">
              <el-input v-model="query.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="openMoreFilter ? 8 : 6">
            <el-form-item :label="$t('job.task_type')" prop="task_type">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.task_type" style="width:100%"
                clearable>
                <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="openMoreFilter ? 8 : 6">
            <el-form-item :label="$t('job.own')" prop="is_own_task">
              <el-switch style="width:100%" v-model="query.is_own_task" @change="searchTaskList()"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="!openMoreFilter" style="margin-bottom:20px">
            <el-button type="primary" @click="searchTaskList">
              <i class="iconfont iconsearch"></i>
              {{ $t("btn.search") }}
            </el-button>
            <el-button plain @click="resetFilterForm">
              {{
              $t("btn.reset")
              }}
            </el-button>
            <el-button type="text" @click="openMoreFilter = !openMoreFilter">
              {{ openMoreFilter ? $t("common.collapse") : $t("common.open") }}
              <i v-bind:class="{
                  'el-icon-arrow-up': openMoreFilter,
                  'el-icon-arrow-down': !openMoreFilter,
                }"></i>
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="openMoreFilter">
          <el-col :span="8">
            <el-form-item :label="$t('common.tag')" prop="search_tags">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.search_tags" style="width:100%;"
                multiple clearable filterable allow-create default-first-option></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('common.status')" prop="filters_map.status">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.filters_map.status"
                style="width:100%" clearable>
                <el-option v-for="item in Object.keys(taskStatus)" :key="item" :label="taskStatus[item]" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('job.task_id')" prop="filters_map.taskId">
              <el-input clearable v-model.number="query.filters_map.taskId" type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('job.time_range')" prop="filters_map.time">
              <el-date-picker clearable v-model="query.filters_map.time" type="datetimerange"
                :picker-options="pickerOptions2" :start-placeholder="$t('common.start_time')"
                :end-placeholder="$t('common.stop_time')" align="right" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="margin-left:100px">
            <el-button type="primary" @click="searchTaskList">
              <i class="iconfont iconsearch"></i>
              {{ $t("btn.search") }}
            </el-button>
            <el-button plain @click="resetFilterForm">
              {{
              $t("btn.reset")
              }}
            </el-button>
            <el-button type="text" @click="openMoreFilter = !openMoreFilter">
              {{ openMoreFilter ? $t("common.collapse") : $t("common.open") }}
              <i v-bind:class="{
                  'el-icon-arrow-up': openMoreFilter,
                  'el-icon-arrow-down': !openMoreFilter,
                }"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="primary" @click="goToTaskFormPage(null, 'add')" icon="el-icon-plus">{{ $t("btn.new") }}
      </el-button>
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

import constant from "@/shared/config/constant";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapGetters, mapState } from "vuex";
import TaskBasicInfo from "./components/TaskBasicInfo.vue";
import TaskListTable from "./components/TaskListTable.vue";
export default {
  name: "Task",
  components: {
    ListCountTip,
    TaskBasicInfo,
    TaskListTable,
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
        task_type: "",
        name: "",
        is_own_task: true,
        search_tags: [],
        filters_map: {
          status: "",
          time: "",
          taskId: "",
        },
      },
      taskForm: undefined,
      resendForm: undefined,
      queryForm: undefined,
      total: 0,
      tableData: [],
      contextKeys: [],
      context: undefined,
      taskTypes: [],
      loading: false,
    };
  },
  computed: {
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
            },
          },
          {
            text: this.$t("common.month"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("common.three_month"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      };
    },
    ...mapState({
      taskSearchName: (state) => state.app.taskSearchName,
      taskStatus: (state) => state.app.taskStatus,
    }),
  },
  watch: {
    taskSearchName: {
      handler(val) {
        if (val) {
          this.query.name = val;
          this.searchTaskByFilters();
        }
      },
      immediate:true
    },
  },
  mounted() {
    if (sessionStorage.getItem("searchContent")) {
      this.query = JSON.parse(sessionStorage.getItem("searchContent"));
    }
    this.searchTaskByFilters();
    this.getContextKeys();
    this.getTaskTypes();
    this.getStatusList();
  },
  methods: {
    async getStatusList() {
      let response = await taskAPI.getTaskStatusList();
      this.$store.dispatch("app/setTaskStatus", response);
    },
    goToTaskFormPage(row, type) {
      let cloneForm = {};
      this.$router.push({
        name: "create-task",
        params: {
          taskForm: cloneForm,
          contextKeys: this.contextKeys,
        },
      });
    },
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
      sessionStorage.setItem("searchContent", JSON.stringify(this.query));
      if (!this.query.filters_map.taskId) {
        delete this.query.filters_map.taskId;
      }
      this.loading = true;
      taskAPI
        .searchTaskByFilters(this.query)
        .then((response) => {
          this.loading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    selectChange(selectionIds) {
      this.selectTaskIds = selectionIds;
    },

    resetFilterForm() {
      // this.$refs.filterTaskForm.resetFields();
      (this.query = {
        size: 10,
        current: 1,
        task_type: "",
        name: "",
        is_own_task: true,
        search_tags: [],
        filters_map: {
          status: "",
          time: "",
          taskId: "",
        },
      }),
        sessionStorage.setItem("searchContent", JSON.stringify(this.query));
      if (this.taskSearchName) {
        this.$store.dispatch("app/setTaskSearchName", this.query.name);
      }
      this.searchTaskList();
    },

    async confirmDialog(content = "") {
      try {
        return await this.$confirm(content, this.$t("common.tips"), {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        });
      } catch (error) {
        return false;
      }
    },

    async batchAnalysisTasks() {
      const content = this.$t("job.confirm_statisic", {
        counts: this.selectTaskIds.length,
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
        counts: this.selectTaskIds.length,
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
        counts: this.selectTaskIds.length,
      });
      const confirm = await this.confirmDialog(content);
      if (confirm) {
        const response = await taskAPI.deleteTask(this.selectTaskIds);
        if (response.success) {
          this.searchTaskByFilters();
        }
      }
    },

    getContextKeys() {
      taskAPI.getContextKeys().then((response) => {
        this.contextKeys = response;
      });
    },
    getTaskTypes() {
      taskAPI.getTaskTypes().then((response) => {
        this.taskTypes = response;
      });
    },
  },
};
</script>