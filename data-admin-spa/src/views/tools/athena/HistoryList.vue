<template>
  <div class="filter-list-content">

    <el-form :model='logQuery' ref="logQuery" label-position="left" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item :label="$t('athena.history.sql_id')">
            <el-input v-model="logQuery.search_tag" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item :label='$t("user.name")'>
            <el-input v-model="logQuery.username" :clearable="true"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item :label="$t('athena.accounts')" prop="athenaAccount">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="logQuery.athenaAccount" clearable
              style="width:100%">
              <el-option v-for="(item,index) in athenaAccountList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-button type='primary' @click='searchHistoryList'>
          <i class="iconfont iconsearch"></i>
          {{$t('btn.search')}}
        </el-button>
      </el-row>

    </el-form>

    <list-count-tip i18="athena.total" :counts="sqlLogTotal">
    </list-count-tip>

    <el-table class="popover-over-ellipsis-table " style="width:100%" v-loading="loadingHistory"
      :data='sqlLogTableData'>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="table-expand-row">
            <div class="info">
              <span class="label">{{$t("athena.history.id")}}</span>
              <span class="value">
                <span class="tag-github">
                  {{ scope.row.query_id }}
                </span>
              </span>
            </div>
            <div class="info">
              <span class="label">{{$t("athena.history.run_times")}}</span>
              <span class="value" v-if="scope.row.run_time">
                {{scope.row.run_time}} (s)
              </span>
            </div>
          </div>
          <div class="table-expand-row">
            <div class="info">
              <span class="label">{{$t("athena.database")}}</span>
              <span class="value">{{ scope.row.database?scope.row.database:'--' }}</span>
            </div>
            <div class="info">
              <span class="label">{{$t("athena.history.message")}}</span>
              <span class="value">{{ scope.row.message?scope.row.message:'--' }}</span>
            </div>
          </div>
          <div class="table-expand-row">
            <div class="info">

              <span class="label">{{$t("athena.history.location")}}</span>
              <span class="value">
                {{scope.row.s3_path }}
              </span>
            </div>

            <div class="info">
              <span class="label">{{$t('athena.history.info')}}</span>
              <span class="value">
                <VueJsonPretty v-if="scope.row.execute_info" :data="JSON.parse(scope.row.execute_info)"
                  :highlightMouseoverNode="true"></VueJsonPretty>
                <span v-else>--</span>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop='submit_time' :label='$t("athena.history.time")' width="200">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="common.formatExactTs(scope.row.submit_time)" placement="top">
            <div>{{common.getDateDiff(scope.row.submit_time)}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label='$t("athena.sql")'>
        <template slot-scope="scope">
          <el-popover trigger="hover" class="sql-popover" @show="showSQLItem(scope.$index,scope.row.sql)"
            placement="top" :open-delay="500">
            <div>
              <codemirror :ref="`showCodeSQLHistory${scope.$index}`" v-model="scope.row.sql" :options="showCodeOptions">
              </codemirror>
            </div>
            <div slot="reference">{{ scope.row.sql}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop='athena_account' :label='$t("athena.accounts")' width="200">
      </el-table-column>
      <el-table-column prop='username' :label='$t("user.name")' width="200">
      </el-table-column>

      <el-table-column :label='$t("common.status")' align="center" width="150">
        <template slot-scope="scope">
          <i v-if="scope.row.state === 'SUCCEEDED'" class="iconfont icontianjiachenggong success-icon"></i>
          <i v-if="scope.row.state === 'FAILED'" class="iconfont iconshibai failure-icon"></i>
          <i v-if="scope.row.state === 'RUNNING'|| !scope.row.state" class="iconfont iconyunxingzhong"
            style="color:#2F53EB"></i>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" :label="$t('common.operate')"
      >
        <template slot-scope="scope" 
        >
          <template v-if="scope.row.state==='SUCCEEDED' && scope.row.s3_path">
            <a :href="scope.row.results" target="_blank" class="app-primary-link"
              v-if="ifDownloadsAvaliable(scope.row.results)&&scope.row.athena_account!='397751057748'">
              {{$t('btn.download')}}
            </a>
            <el-button plain :loading="scope.row.retryLinkLoading" size="mini" v-else
              :disabled="scope.row.athena_account==='397751057748'"
              @click="retryGetLink(scope.row,scope.$index)">
              {{$t('athena.history.retry')}}
            </el-button>
          </template>

          <el-popconfirm v-else-if="scope.row.state === 'RUNNING' || !scope.row.state"
            @onConfirm="stopQuery(scope.row.id)" :confirmButtonText="$t('btn.confirm')"
            :cancelButtonText="$t('btn.cancel')" :title="$t('athena.confirm_stop_query')">
            <el-button slot="reference" size="mini" type="primary">{{$t('btn.stop')}}</el-button>
          </el-popconfirm>

        </template>

      </el-table-column>

    </el-table>

    <div class="pagination-area">
      <el-pagination @current-change="handleHistoryCurrentChange" @size-change="handleHistorySizeChange"
        :current-page.sync='logQuery.current' :page-sizes='[10,20, 50, 100]' layout='prev, pager, next, sizes'
        :total='sqlLogTotal'>
      </el-pagination>
    </div>

  </div>
</template>


<script>
import athenaAPI from "@/api/athena";
import sqlFormatter from "sql-formatter";
import { codemirror } from "vue-codemirror";
import { mapState, mapGetters } from "vuex";
import ListCountTip from "@/shared/components/ListCountTip";
import VueJsonPretty from "vue-json-pretty";
import constant from "@/shared/config/constant";

export default {
  components: {
    codemirror,
    ListCountTip,
    VueJsonPretty,
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name,
    }),
  },
  data() {
    return {
      loadingHistory: false,
      sqlLogTotal: 0,
      logQuery: {
        size: 10,
        current: 1,
        search_tag: "",
        username: "",
      },
      sqlLogTableData: [],
      showCodeOptions: {
        theme: "idea",
        mode: "text/x-mariadb",
        line: true,
        readOnly: true,
      },
      athenaAccountList: constant.ATHENA_ACCOUNTS,
    };
  },
  mounted() {
    this.logQuery.username = this.userName;
    if (this.$route.query.query_id) {
      this.logQuery.search_tag = this.$route.query.query_id;
    }
    this.searchHistoryList();
  },
  methods: {
    handleHistorySizeChange(size) {
      this.logQuery.current = 1;
      this.logQuery.size = size;
      this.getHistoryList();
    },
    handleHistoryCurrentChange(current) {
      this.logQuery.current = current;
      this.getHistoryList();
    },
    searchHistoryList() {
      this.logQuery.current = 1;
      this.getHistoryList();
    },
    getHistoryList() {
      this.loadingHistory = true;
      athenaAPI
        .searchSqlLog(this.logQuery)
        .then((response) => {
          this.sqlLogTableData = response.records;
          this.sqlLogTotal = response.total;
          _.map(this.sqlLogTableData, (s) => {
            s.retryLinkLoading = false;
          });
          this.loadingHistory = false;
        })
        .catch((err) => {
          this.loadingHistory = false;
        });
    },
    showSQLItem(refIndex, sqlContent) {
      const currentRef = this.$refs[`showCodeSQLHistory${refIndex}`];
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
    ifDownloadsAvaliable(results) {
      if (results && /(http|https):\/\/([\w.]+\/?)\S*/.test(results)) {
        return true;
      } else {
        return false;
      }
    },
    retryGetLink(data, index) {
      this.sqlLogTableData[index].retryLinkLoading = true;
      this.$set(this.sqlLogTableData, index, this.sqlLogTableData[index]);
      athenaAPI
        .retryLink(data.id)
        .then((response) => {
          this.sqlLogTableData[index].results = response.result;
          this.sqlLogTableData[index].retryLinkLoading = false;
          this.$set(this.sqlLogTableData, index, this.sqlLogTableData[index]);
        })
        .catch((err) => {
          this.sqlLogTableData[index].retryLinkLoading = false;
          this.$set(this.sqlLogTableData, index, this.sqlLogTableData[index]);
        });
    },
    async stopQuery(queryId) {
      const response = await athenaAPI.stopQuery(queryId);
      if (response.success) {
        this.getHistoryList();
      }
    },
  },
};
</script>