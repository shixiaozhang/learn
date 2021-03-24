<template>
  <el-dialog :title="$t('service_config.task_list')" :visible.sync="visible" @close="hide" width="80%" >

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('service_config.running')" name="running">
        <config-task-table :loading="getListLoading" :table-data="tableData" @stop-task="stopServiceConfig($event)"
          :active-tab-name="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('service_config.stopped')" name="stopped">
        <config-task-table :loading="getListLoading" :table-data="tableData" :active-tab-name="activeName" />
      </el-tab-pane>
    </el-tabs>

    <div class="pagination-area">
      <el-pagination @current-change="handleTaskCurrentChange" @size-change="handleTaskSizeChange"
        :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]'
        :layout="activeName==='stopped'?'sizes':'total,prev, pager, next,  sizes'" :total='total'>
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";
import ConfigTaskTable from "./ConfigTaskTable";
export default {
  name: "ConfigTasks",
  props: {
    configId: {
      type: Number
    }
  },
  components: {
    ConfigTaskTable
  },
  watch: {
    configId(val) {
      if (!val || val === "") return;
      this.visible = true;
      this.activeName = "running";
      this.query.configId = this.configId;
      this.handleClick({ name: this.activeName });
    }
  },
  data() {
    return {
      tableData: [],
      query: {
        current: 1,
        size: 10,
        configId: ""
      },
      total: 0,
      visible: false,
      activeName: "running",
      getListLoading: false
    };
  },
  methods: {
    hide() {
      this.$emit("close");
    },
    handleTaskCurrentChange(val) {
      this.query.current = val;
      if (this.activeName === "running") {
        this.getRunningTasks();
      } else {
        this.getStopedTasks();
      }
    },
    handleTaskSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      if (this.activeName === "running") {
        this.getRunningTasks();
      } else {
        this.getStopedTasks();
      }
    },
    handleClick(tab) {
      this.tableData = [];
      this.query.current = 1;
      switch (tab.name) {
        case "running":
          this.getRunningTasks();
          break;
        case "stopped":
          this.getStopedTasks();
          break;
        default:
          break;
      }
    },
    getRunningTasks() {
      this.getListLoading = true;
      configAPI
        .getEcsRunningTasks(this.query)
        .then(response => {
            this.getListLoading = false;
            this.tableData = response.records;
            this.total = response.total;
        })
         .catch(err => {
          this.getListLoading = false;
        });
    },
    getStopedTasks() {
      this.getListLoading = true;
      configAPI
        .getEcsStoppedTask(this.query)
        .then(response => {
            this.getListLoading = false;
            this.tableData = response.records;
            this.total = response.total;
        })
        .catch(err => {
          this.getListLoading = false;
        });
    },

    stopServiceConfig(row) {
      configAPI
        .stopServiceConfigByTaskId(row.ecs_task_id)
        .then(response => {
          if (response.success) {
            this.handleClick({ name: this.activeName });
          } 
        })
    }
  }
};
</script>
