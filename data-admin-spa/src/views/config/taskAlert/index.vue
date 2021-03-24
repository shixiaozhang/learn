<template>
  <div class="app-list-page">

    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('task_alert.title')}}</h4>
        <p class="description">
          {{$t('task_alert.sub_title')}}
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconbaojing"></i>
      </div>
    </div>

    <div class="filter-list-content">

      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item :label="$t('task_alert.id')">
              <el-input v-model="query.alertId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('job.task_name')">
              <el-input v-model="query.taskName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('job.own')" prop="isOwnTaskAlert">
              <el-switch style="width:100%" v-model="query.isOwnTaskAlert" @change="getTaskAlertList()">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchTaskAlertListList">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="loading">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('task_alert.id')}}</span>
                <span class="value">{{ scope.row.alertId }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('common.create_time')}}</span>
                <span class="value">
                  {{ common.formatExactTs(scope.row.create_ts) }}
                </span>
              </div>
            </div>
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('task_alert.content')}}</span>
                <span class="value">{{ scope.row.content }}</span>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column prop="username" :label="$t('user.name')"></el-table-column>
        <el-table-column prop="taskName" :label="$t('job.task_name')"></el-table-column>

        <el-table-column :label='$t("common.status")' width="200" align="center">
          <template slot-scope="scope">
            <el-tag effect="dark" size="small" v-if="scope.row.status === 0">
              CLOSED
            </el-tag>
            <el-tag effect="dark" size="small" v-else-if="scope.row.status === 1">
              OPEN
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop='update_ts' :label='$t("common.update_time")' width="200" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="top" :content="common.formatExactTs(scope.row.update_ts)">
                <div>{{common.getDateDiff(scope.row.update_ts)}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label='$t("common.operate")' width="100">
          <template slot-scope="scope">
            <el-button type="text" @click.native="closeAlert(scope.row)">{{$t('btn.stop')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleTaskAlertListCurrentChange" @size-change="handleTaskAlertListSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import taskAlertAPI from "@/api/taskAlert";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "taskAlertPage",
  data() {
    return {
      tableData: [],
      query: {
        size: 10,
        current: 1,
        alertId: "",
        taskName: "",
        isOwnTaskAlert: true
      },
      total: 0,
      loading: false
    };
  },
  components: {
    ListCountTip
  },
  methods: {
    handleTaskAlertListCurrentChange(val) {
      this.query.current = val;
      this.getTaskAlertList();
    },
    handleTaskAlertListSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getTaskAlertList();
    },
    searchTaskAlertListList() {
      this.query.current = 1;
      this.getTaskAlertList();
    },
    getTaskAlertList() {
      this.loading = true;
      taskAlertAPI
        .searchTaskAlertPage(this.query)
        .then(response => {
          this.loading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    closeAlert(row) {
      this.$confirm(
        this.$t("task_alert.stop", { name: row.alertId }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      ).then(() => {
        taskAlertAPI.closeTaskAlert(row).then(response => {
          if (response.success) {
            this.getTaskAlertList();
          }
        });
      });
    }
  },
  mounted() {
    this.getTaskAlertList();
  }
};
</script>
