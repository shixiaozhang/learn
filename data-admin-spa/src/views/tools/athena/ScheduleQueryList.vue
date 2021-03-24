<template>
  <div class="filter-list-content">
    <schedule-sql-create @saved="getScheduleList" :scheduleSqlForm="scheduleSqlForm"></schedule-sql-create>

    <el-form :model="scheduleFilterForm" label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item :label="$t('athena.edit_query.schedule_name')">
            <el-input v-model="scheduleFilterForm.search_tag" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('user.name')">
            <el-input v-model="scheduleFilterForm.username" :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('athena.edit_query.enable')" prop="isEnabled">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="scheduleFilterForm.isEnabled" clearable
              style="width:100%">
              <el-option :label="$t('athena.edit_query.true')" value="true"></el-option>
              <el-option :label="$t('athena.edit_query.false')" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('athena.accounts')" prop="athenaAccount">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="scheduleFilterForm.athenaAccount"
              clearable style="width:100%">
              <el-option v-for="(item,index) in athenaAccountList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-button type="primary" @click="searchScheduleList">
          <i class="iconfont iconsearch"></i>
          {{$t('btn.search')}}
        </el-button>
      </el-row>
    </el-form>

    <list-count-tip i18="athena.edit_query.total" :counts="total">
      <b slot="action-button">
        <a href="http://dpp.metabase.patsnap.com/" target="_blank"
          :style="{color:dppPrimaryColor}">{{$t('athena.edit_query.result_view')}}</a>
      </b>
    </list-count-tip>

    <el-table class="popover-over-ellipsis-table" style="max-width:100%" v-loading="loadingSavedQuery"
      :data="scheduleQueryList">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="table-expand-row">

            <div class="info">
              <span class="label">{{$t('common.create_time')}}</span>
              <span class="value">
                <el-tooltip effect="dark" :content="common.formatExactTs(scope.row.create_ts)" placement="top-start">
                  <div>{{common.getDateDiff(scope.row.create_ts)}}</div>
                </el-tooltip>
              </span>
            </div>

            <div class="info">
              <span class="label">{{$t('common.update_time')}}</span>
              <span class="value">
                <el-tooltip effect="dark" :content="common.formatExactTs(scope.row.update_ts)" placement="top-start">
                  <div>{{common.getDateDiff(scope.row.update_ts)}}</div>
                </el-tooltip>
              </span>
            </div>

          </div>
          <div class="table-expand-row">
            <div class="info">
              <span class="label">{{$t("athena.accounts")}}</span>
              <span class="value">{{ scope.row.athena_account }}</span>
            </div>
            <div class="info">
              <span class="label">{{$t("athena.database")}}</span>
              <span class="value">{{ scope.row.database? scope.row.database:'--' }}</span>
            </div>
          </div>
          <div class="table-expand-row">
            <div class="info">
              <span class="label">CRON</span>
              <span class="value">{{ scope.row.cron }}</span>
            </div>
            <div class="info">
              <span class="label">{{$t("athena.edit_query.last")}}</span>
              <span class="value">{{common.formatExactTs(scope.row.last_execute_ts) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('athena.edit_query.schedule_name')" width="350">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="$t('athena.edit_query.click_name_view_result')"
            placement="top-start">
            <a target="_blank" class="app-primary-link" v-bind:style="{'color':dppPrimaryColor}"
              :href="`http://dpp.metabase.patsnap.com/search?q=${scope.row.name}`">
              {{scope.row.name}}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('athena.sql')">
        <template slot-scope="scope">
          <el-popover trigger="hover" class="sql-popover" @show="showSQLItem(scope.$index,scope.row.sql,false)"
            placement="top" :open-delay="500">
            <div>
              <codemirror :ref="`showCodeSQL${scope.$index}`" v-model="scope.row.sql" :options="showCodeOptions">
              </codemirror>
            </div>
            <div slot="reference">{{ scope.row.sql}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="username" :label="$t('user.name')" width="250"></el-table-column>

      <el-table-column prop="enable" :label="$t('athena.edit_query.enable')" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.enable">
            <i class="iconfont icontianjiachenggong success-icon"></i>
          </div>
          <div v-else>
            <i class="iconfont iconshibai failure-icon"></i>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="200" :label="$t('common.operate')">
        <template slot-scope="scope" v-if="userName===scope.row.username||userRole.includes('ROLE_ADMIN')">
          <el-button type="text" v-show="scope.row.enable" :loading="scope.row.refreshLoading"
            @click="refreshScheduleTask(scope.row,scope.$index)">
            {{$t('btn.refresh')}}
            <el-tooltip class="item" effect="dark" :content="$t('athena.edit_query.refresh_tip')" placement="top">
              <i class="iconfont iconinfo" :style="`color:${dppPrimaryColor}`"></i>
            </el-tooltip>
          </el-button>
          <el-button type="text" @click="showCreateScheduleSql('schedule',scope.row)">{{$t('btn.edit')}}</el-button>

          <el-popconfirm @onConfirm="deleteScheduleSql(scope.row.id)" :confirmButtonText="$t('btn.confirm')"
            :cancelButtonText="$t('btn.cancel')" :title="$t('common.delete_popconfirm')">
            <el-button slot="reference" type="text">{{$t('btn.delete')}}</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-area">
      <el-pagination @current-change="handleScheduleCurrentChange" @size-change="handleScheduleSizeChange"
        :current-page="scheduleFilterForm.current" :page-sizes="[10,20, 50, 100]" layout=" prev, pager, next, sizes"
        :total="total"></el-pagination>
    </div>

    <el-dialog :title="$t('common.tips')" :visible.sync="refreshDoneVisible" width="30%">
      <p>{{$t("athena.edit_query.refresh_success")}}</p>
      <div>
        <span>{{$t('athena.edit_query.query_id')}}</span>
        <span class="app-primary-link" v-bind:style="{'color':dppPrimaryColor}"
          @click="refreshSuccess()">{{queryId}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refreshDoneVisible = false" plain size="small">{{$t("btn.cancel")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import athenaAPI from "@/api/athena";
import ScheduleSqlCreate from "./ScheduleSqlCreate.vue";
import { mapState } from "vuex";
import sqlFormatter from "sql-formatter";
import { codemirror } from "vue-codemirror";
import ListCountTip from "@/shared/components/ListCountTip";
import constant from "@/shared/config/constant";

export default {
  components: {
    codemirror,
    ScheduleSqlCreate,
    ListCountTip,
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name,
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
      userRole: (state) => state.user.role,
    }),
  },
  data() {
    return {
      scheduleFilterForm: {
        size: 10,
        current: 1,
        username: "",
      },
      total: 0,
      scheduleQueryList: [],
      loadingSavedQuery: false,
      showCodeOptions: {
        theme: "idea",
        mode: "text/x-mariadb",
        line: true,
        readOnly: true,
      },
      scheduleSqlForm: undefined,
      refreshDoneVisible: false,
      queryId: "",
      athenaAccountList: constant.ATHENA_ACCOUNTS,
    };
  },
  mounted() {
    this.scheduleFilterForm = {
      size: 10,
      current: 1,
      isScheduled: true,
      enable: undefined,
      username: this.userName,
    };
    this.searchScheduleList();
  },
  methods: {
    handleScheduleCurrentChange(val) {
      this.scheduleFilterForm.current = val;
      this.getScheduleList();
    },
    handleScheduleSizeChange(size) {
      this.scheduleFilterForm.current = 1;
      this.scheduleFilterForm.size = size;
      this.getScheduleList();
    },
    searchScheduleList() {
      this.scheduleFilterForm.current = 1;
      this.getScheduleList();
    },
    getScheduleList() {
      this.loadingSavedQuery = true;
      athenaAPI
        .searchScheduleSql(this.scheduleFilterForm)
        .then((response) => {
          this.scheduleQueryList = response.records;
          this.scheduleQueryList.map((item) => {
            item.refreshLoading = false;
          });
          this.total = response.total;
          this.loadingSavedQuery = false;
        })
        .catch((err) => {
          this.loadingSavedQuery = false;
        });
    },
    async deleteScheduleSql(queryId) {
      const response = await athenaAPI.deleteScheduleSql(queryId);
      if (response.success) {
        this.getScheduleList();
      }
    },
    showCreateScheduleSql(type, form) {
      if (!form) {
        this.scheduleSqlForm = {
          sql: this.query.sql,
          athenaAccount: this.query.athenaAccount,
        };
      } else {
        this.scheduleSqlForm = _.cloneDeep(form);
      }
      this.scheduleSqlForm.type = type;
    },
    showSQLItem(refIndex, sqlContent, isHistoryPage) {
      const currentRef = isHistoryPage
        ? this.$refs[`showCodeSQLHistory${refIndex}`]
        : this.$refs[`showCodeSQL${refIndex}`];
      const currentCodeMirror = currentRef.codemirror;
      currentCodeMirror.setValue(sqlFormatter.format(sqlContent));
      this.$nextTick(()=>{
        currentCodeMirror.refresh();
      })
    },
    copyTableSQL(content) {
      if (!content) {
        return;
      }
      this.$copyText(content).then((e) => {
        this.$message.success(this.$t("other.copy_done"));
      });
    },
    refreshScheduleTask(row, index) {
      this.$confirm(
        this.$t("athena.edit_query.confirm_refresh_tip", { name: row.name }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        this.queryId = "";
        this.scheduleQueryList[index].refreshLoading = true;
        this.$set(this.scheduleQueryList, index, this.scheduleQueryList[index]);
        athenaAPI.refreshScheduleSql(row.id).then((response) => {
          this.scheduleQueryList[index].refreshLoading = false;
          this.$set(
            this.scheduleQueryList,
            index,
            this.scheduleQueryList[index]
          );
          if (response.success) {
            this.refreshDoneVisible = true;
            this.queryId = response.result;
          }
        });
      });
    },
    refreshSuccess() {
      this.$router.push({
        path: "/tools/athena/history",
        query: {
          query_id: this.queryId,
        },
      });
    },
  },
};
</script>