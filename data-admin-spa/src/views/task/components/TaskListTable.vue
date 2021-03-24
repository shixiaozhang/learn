<template>
  <div>
    <TaskItems :taskId="itemTaskId" :command="command" @close="itemTaskId = undefined"></TaskItems>
    <TaskSteps :taskId="stepTaskId" :command="command" @close="stepTaskId = undefined"></TaskSteps>
    <TaskExport :taskId="exportTaskId" :command="command" @close="exportTaskId = undefined"></TaskExport>
    <TaskResend :taskForm="resendForm" @done="searchTaskByFilters" @close="resendForm = undefined"></TaskResend>
    <ManualFix :context="context"></ManualFix>

    <list-count-tip style="margin-top:16px" i18="common.multi_choosen_table" :counts="selectTaskIds.length"
      v-if="selectTaskIds.length">
      <b slot="action-button" class="clean-btn" :style="{ color: dppPrimaryColor }"
        @click="clearAllSectionItems()">{{ $t("btn.clean") }}</b>
    </list-count-tip>

    <el-table default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :class="{'no-choosen-table':!selectTaskIds.length}" row-key="id" ref="taskTable" @selection-change="selectChange"
      :data="tableData" v-loading="getListLoading">
      <el-table-column type="selection" fixed="left" width="55px"></el-table-column>

      <el-table-column :label="$t('job.task_name')" :width="currentScreenSize==='large'?'550px':'300px'"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">

          <i class="iconfont icontime" v-if="scope.row.schedule_name"
            style="margin-right:2px;font-size:13px;vertical-align: top;"></i>

          <el-popover trigger="hover" placement="top" width="400" style="display:inline-block"
            :content="scope.row.exception" v-if="scope.row.exception">
            <div slot="reference">
              <i class="iconfont iconinfo"></i>
            </div>
          </el-popover>
          {{ scope.row.name}}

        </template>
      </el-table-column>

      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span style="font-weight:bold">{{ scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="dataProcessTaskType.name" :label="$t('job.task_type')">
        <template slot-scope="scope">
          <el-dropdown @visible-change="selectDropDown(scope.row.id)" @command="showTaskDetail">
            <span class="el-dropdown-link">
              <span style="font-size:12px">
                {{
                  scope.row.dataProcessTaskType.name
                  }}
              </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width:200px" class="app-dropdown-menu">
              <el-dropdown-item command="all">
                {{
                  $t("job.all_items")
                  }}
              </el-dropdown-item>
              <el-dropdown-item command="success">
                {{
                  $t("job.success")
                  }}
              </el-dropdown-item>
              <el-dropdown-item command="failed">
                {{
                  $t("job.unsucessful")
                  }}
              </el-dropdown-item>

              <el-dropdown-item command="retry">
                {{$t("job.retry")}}
              </el-dropdown-item>

              <el-dropdown-item command="steps">
                {{
                  $t("job.steps")
                  }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('common.status')">
        <template slot-scope="scope">
          <el-tag effect="plain" size="small" :type="switchTaskStatusColor(taskStatus[scope.row.status])">
            {{ taskStatus?taskStatus[scope.row.status]:'--'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="item_total_count" :label="$t('job.done_all')">
        <template slot-scope="scope">
          <div>
            {{ scope.row.item_success_count }}/{{
              scope.row.item_total_count
              }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="update_ts" :label="$t('common.update_time')" width="150px">
        <template slot-scope="scope">
          <el-tooltip placement="top" :content="common.formatExactTs(scope.row.update_ts)">
            <div>{{ common.getDateDiff(scope.row.update_ts) }}</div>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.operate')" align="center" width="200px">
        <template slot-scope="scope">

          <el-button type="text" class="mg-btn" v-show="scope.row.childrenCount&&scope.row.childrenCount>5"
            @click="toSubTaskPage(scope.row)">
            {{$t('job.sub_task')}}
            ({{scope.row.childrenCount}})
          </el-button>

          <el-button type="text" class="mg-btn" @click="toTaskDetail(scope.row)">
            {{$t("btn.detail")}}
          </el-button>

          <el-popconfirm v-if="scope.row.status === 4" :confirmButtonText="$t('btn.confirm')"
            @onConfirm="prepareTask(scope.row.id)" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.confirm_change_task_status',{status:'Prepare'})">
            <el-button slot="reference" class="mg-btn" type="text">Prepare</el-button>
          </el-popconfirm>

          <el-popconfirm @onConfirm="rePrepareTask(scope.row.id)" v-if="scope.row.status === 5"
            :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.confirm_change_task_status',{status:'Reprepare'})">
            <el-button slot="reference" class="mg-btn" type="text">Reprepare</el-button>
          </el-popconfirm>

          <el-popconfirm v-if="scope.row.status === 6" @onConfirm="startTask(scope.row.id)"
            :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.confirm_change_task_status',{status:'Start'})">
            <el-button slot="reference" class="mg-btn" type="text">Start</el-button>
          </el-popconfirm>

          <el-popconfirm @onConfirm="keepStartTask(scope.row.id)" v-if="scope.row.status === 7"
            :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.confirm_change_task_status',{status:'Keep Start'})">
            <el-button slot="reference" class="mg-btn" type="text">Keep Start</el-button>
          </el-popconfirm>

          <el-dropdown>
            <el-button type="text">
              {{ $t("btn.operations") }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="app-dropdown-menu">
              <el-dropdown-item @click.native="analysisTask([scope.row.id])"
                v-if="[2, 3, -1].indexOf(scope.row.status) >= 0">
                <i class="iconfont iconshuju"></i>
                {{ $t("btn.statistics") }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="goToTaskFormPage(scope.row, 'copy')">
                <i class="iconfont iconfuzhi"></i>
                {{ $t("btn.copy") }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="goToTaskFormPage(scope.row, 'edit')">
                <i class="iconfont iconbianji"></i>
                {{ $t("btn.edit") }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="resendOneTask(scope.row)"
                v-if="[2, 3, -1].indexOf(scope.row.status) >= 0">
                <i class="iconfont iconzhongfa" style="font-size:13px;margin-right:10px"></i>
                {{  $t("btn.resend") }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="exportTaskId=scope.row.id" command="export">
                <i class="iconfont iconexport" style="margin-right:6px"></i>
                {{  $t("job.export")}}
              </el-dropdown-item>

              <el-dropdown-item v-if="scope.row.status===991" @click.native="recoveryTask(scope.row.name,scope.row.id)">
                <i class="iconfont iconhuanyuan" style="margin-right:7px"></i>
                {{$t('btn.recovery')}}
              </el-dropdown-item>

              <el-dropdown-item v-else @click.native="backUpTask(scope.row.name,scope.row.id)">
                <i class="iconfont iconguidang" style="margin-right:7px"></i>
                {{$t('btn.archived')}}
              </el-dropdown-item>

              <el-dropdown-item @click.native="deleteTask([scope.row.id])">
                <i class="iconfont iconshanchu" style="margin-right:9px"></i>
                {{ $t("btn.delete") }}
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import taskAPI from "@/api/task";
import {
  TaskItems,
  TaskSteps,
  TaskExport,
  TaskResend,
  ManualFix,
} from "./index.js";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapGetters, mapState } from "vuex";
import TaskBasicInfo from "./TaskBasicInfo.vue";
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
  },
  computed: {
    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
      taskStatus: (state) => state.app.taskStatus,
    }),
  },
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    getListLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectTaskId: undefined,
      selectTaskIds: [],
      itemTaskId: undefined,
      stepTaskId: undefined,
      exportTaskId: undefined,
      command: undefined,

      taskForm: undefined,
      resendForm: undefined,
      queryForm: undefined,
      total: 0,
      contextKeys: [],
      context: undefined,
      base_api: process.env.VUE_APP_BASE_URL,
      currentScreenSize: "",
    };
  },
  mounted() {
    this.getContextKeys();
    const width = document.body.clientWidth;
    if (width >= 1450) {
      this.currentScreenSize = "large";
    }
  },
  methods: {
    getContextKeys() {
      taskAPI.getContextKeys().then((response) => {
        this.contextKeys = response;
      });
    },
    switchTaskStatusColor(status) {
      switch (status) {
        case "RUNNING":
          return "";
          break;
        case "DONE":
          return "success";
          break;
        case "FAILED":
          return "danger";
          break;
        default:
          return "info";
          break;
      }
    },
    clearAllSectionItems() {
      this.$refs.taskTable.clearSelection();
    },
    goToTaskFormPage(row, type) {
      let cloneForm = {};
      if (row) {
        cloneForm = JSON.parse(
          JSON.stringify(row, (k, v) => {
            if (k !== "children") return v;
          })
        );
      }
      if (type === "copy") {
        delete cloneForm.id;
      }
      this.$router.push({
        name: "create-task",
        params: {
          taskForm: cloneForm,
          contextKeys: this.contextKeys,
        },
      });
    },
    selectDropDown(taskId) {
      this.selectTaskId = taskId;
    },
    showTaskDetail(command) {
      if (command === "export") {
        this.exportTaskId = this.selectTaskId;
      } else if (command === "steps") {
        this.stepTaskId = this.selectTaskId;
      } else {
        this.itemTaskId = this.selectTaskId;
        this.command = command;
      }
    },
    showCreateTask(form) {
      if (!form) {
        this.taskForm = {};
      } else {
        this.taskForm = form;
      }
    },
    selectChange(selections) {
      const idList = _.map(selections, "id");
      this.selectTaskIds = idList;
      this.$emit("onTableSelectChange", idList);
    },

    searchTaskByFilters() {
      this.$emit("onSearchList");
    },

    updateTask(row) {
      let cloneForm = JSON.parse(
        JSON.stringify(row, (k, v) => {
          if (k !== "children") return v;
        })
      );
      this.showCreateTask(cloneForm);
    },
    copyTask(row) {
      let cloneForm = JSON.parse(
        JSON.stringify(row, (k, v) => {
          if (k !== "children") return v;
        })
      );
      delete cloneForm.id;
      this.showCreateTask(cloneForm);
    },
    analysisTask(taskIds) {
      this.$confirm(
        this.$t("job.confirm_statisic", { counts: taskIds.length }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        taskAPI.analysisTask(taskIds).then((response) => {
          if (response.success) {
            this.searchTaskByFilters();
          }
        });
      });
    },
    resendOneTask(row) {
      let cloneForm = JSON.parse(
        JSON.stringify(row, (k, v) => {
          if (k !== "children") return v;
        })
      );
      this.resendForm = cloneForm;
    },
    deleteTask(taskIds) {
      this.$confirm(
        this.$t("job.confirm_delete", { counts: taskIds.length }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        taskAPI.deleteTask(taskIds).then((response) => {
          if (response.success) {
            this.searchTaskByFilters();
          }
        });
      });
    },

    changeStatusDone(response) {
      if (response.success) {
        this.searchTaskByFilters();
      }
    },
    async prepareTask(taskId) {
      const response = await taskAPI.prepareTask(taskId);
      this.changeStatusDone(response);
    },

    async rePrepareTask(taskId) {
      const response = await taskAPI.reprepareTask(taskId);
      this.changeStatusDone(response);
    },

    async startTask(taskId) {
      const response = await taskAPI.startTask(taskId);
      this.changeStatusDone(response);
    },
    async keepStartTask(taskId) {
      const response = await taskAPI.keepStartTask(taskId);
      this.changeStatusDone(response);
    },

    async backUpTask(taskName, taskId) {
      const confirm = await this.$helpers.confirmMessage(
        this.$t("job.confirm_backup", { name: taskName })
      );
      if (confirm) {
        const response = await taskAPI.backupTask(taskId);
        this.changeStatusDone(response);
      }
    },

    async recoveryTask(taskName, taskId) {
      const confirm = await this.$helpers.confirmMessage(
        this.$t("job.confirm_recovery", { name: taskName })
      );
      if (confirm) {
        const response = await taskAPI.recoveryTask(taskId);
        this.changeStatusDone(response);
      }
    },

    toSubTaskPage(parentTaskInfo) {
      this.$router.push({
        path: "/job/sub-task",
        query: {
          id: parentTaskInfo.id,
          parent_task_name: parentTaskInfo.name,
        },
      });
    },

    toTaskDetail(parentTaskInfo) {
      this.$router.push({
        name: "/job/detail",
        params: {
          task: parentTaskInfo,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.no-choosen-table {
  margin-top: 20px;
  border-top: 1px solid #ebeef5;
}
.clean-btn {
  margin-left: 20px;
  cursor: pointer;
}
</style>