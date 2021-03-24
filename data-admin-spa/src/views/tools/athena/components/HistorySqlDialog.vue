<template>
  <el-dialog :before-close="handleClose" :title="$t('athena.history_sql')" :visible.sync="historyDialogVisible"
    width="600px" custom-class="history-sqls-dialog">
    <el-tabs v-model="activeName" @tab-click="searchHistoryList">
      <el-tab-pane :label="$t('athena.search_records')" name="history">
        <el-table size="small" class="popover-over-ellipsis-table" style="max-width:100%" v-loading="loadingSavedQuery"
          :data="scheduleQueryList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column :label="$t('athena.sql')">
            <template slot-scope="scope">
              <el-popover trigger="hover" @show="showSQLItem(scope.$index,scope.row.sql,'history')" placement="top"
                :open-delay="500" class="sql-popover">
                <div>
                  <codemirror :ref="`showHistoryInsertCodeSQL${scope.$index}`" v-model="scope.row.sql"
                    :options="showCodeOptions"></codemirror>
                </div>
                <div slot="reference">{{ scope.row.sql}}</div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column width="200" :label="$t('common.create_time')">
            <template slot-scope="scope">{{common.formatExactTs(scope.row.create_ts)}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('athena.saved_list')" name="saved">
        <el-table size="small" class="popover-over-ellipsis-table" style="max-width:100%" v-loading="loadingSavedQuery"
          :data="scheduleQueryList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column :label="$t('athena.sql')">
            <template slot-scope="scope">
              <el-popover trigger="hover" @show="showSQLItem(scope.$index,scope.row.sql,'saved')" placement="top"
                :open-delay="500" class="sql-popover">
                <div>
                  <codemirror :ref="`showSavedInsertCodeSQL${scope.$index}`" v-model="scope.row.sql"
                    :options="showCodeOptions"></codemirror>
                </div>
                <div slot="reference">{{ scope.row.sql}}</div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column width="200" :label="$t('common.create_time')">
            <template slot-scope="scope">{{common.formatExactTs(scope.row.create_ts)}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div style="margin-top:20px">
      <el-pagination @current-change="handleScheduleCurrentChange" @size-change="handleScheduleSizeChange"
        :current-page="scheduleFilterForm.current" layout=" prev, pager, next" :total="total"></el-pagination>
    </div>

    <span slot="footer">
      <el-button plain size="small" @click="handleClose">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" size="small" @click="insertSqls" :disabled="!multiSelectItems.length">
        {{$t('athena.insert')}}
        <span v-if="multiSelectItems.length">{{`${multiSelectItems.length} ${$t('athena.items')}`}}</span>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import athenaAPI from "@/api/athena";
import { codemirror } from "vue-codemirror";
import { mapState, mapGetters } from "vuex";
import sqlFormatter from "sql-formatter";

export default {
  props: {
    openSaved: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    openSaved(val) {
      if (val) {
        this.historyDialogVisible = val;
        this.scheduleFilterForm = {
          size: 5,
          current: 1,
          username: this.userName
        };
        this.searchHistoryList();
      }
    }
  },
  computed: {
    ...mapState({
      userName: state => state.user.name
    })
  },
  components: {
    codemirror
  },
  data() {
    return {
      scheduleFilterForm: {},
      loadingSavedQuery: false,
      scheduleQueryList: [],
      total: 0,
      multiSelectItems: [],
      historyDialogVisible: false,
      activeName: "history",
      showCodeOptions: {
        theme: "idea",
        mode: "text/x-mariadb",
        line: true,
        readOnly: true
      }
    };
  },
  methods: {
    handleScheduleCurrentChange(val) {
      this.scheduleFilterForm.current = val;
      this.getHistoryList();
    },
    handleScheduleSizeChange(size) {
      this.scheduleFilterForm.current = 1;
      this.scheduleFilterForm.size = size;
      this.getHistoryList();
    },
    searchHistoryList() {
      this.scheduleFilterForm.current = 1;
      this.getHistoryList();
    },

    async getHistoryList() {
      this.loadingSavedQuery = true;
      let response = undefined;
      if (this.activeName === "history") {
        response = await athenaAPI.searchSqlLog(this.scheduleFilterForm);
      } else {
        response = await athenaAPI.searchScheduleSql(
          Object.assign(this.scheduleFilterForm, {
            isScheduled: false,
            enable: undefined
          })
        );
      }
      this.scheduleQueryList = response.records;
      this.total = response.total;
      this.loadingSavedQuery = false;
    },
    handleClose() {
      this.historyDialogVisible = false;
      this.$emit("close");
    },
    showSQLItem(refIndex, sqlContent, type) {
      const currentRef =
        type === "history"
          ? this.$refs[`showHistoryInsertCodeSQL${refIndex}`]
          : this.$refs[`showSavedInsertCodeSQL${refIndex}`];
      const currentCodeMirror = currentRef.codemirror;
      currentCodeMirror.setValue(sqlFormatter.format(sqlContent));
      this.$nextTick(()=>{
        currentCodeMirror.refresh();
      })
    },
    handleSelectionChange(val) {
      this.multiSelectItems = val;
    },
    insertSqls() {
      const sqls = _.map(this.multiSelectItems, "sql");
      this.$emit("onInsert", sqls);
      this.handleClose();
    }
  }
};
</script>

<style lang="scss">
.history-sqls-dialog {
  .el-dialog__body {
    padding-top: 5px;
    padding-bottom: 10px;
  }
}
</style>