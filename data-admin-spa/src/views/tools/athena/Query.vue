<template>
  <div class="app-list-page">
    <schedule-sql-create :scheduleSqlForm="scheduleSqlForm" :autoCompleteTables="codeMirrorOptions.hintOptions.tables">
    </schedule-sql-create>

    <history-sql-dialog :openSaved="historyDialogVisible" @onInsert="onInsert($event)"
      @close="historyDialogVisible = false"></history-sql-dialog>

    <div class="query-board-content filter-list-content">
      <div style="width:100%;height:100%">
        <el-row :gutter="10" style="margin:10px;">
          <el-col :span="6" style="height:calc(100vh - 126px)">
            <left-table-list @onQuickOperation="handleCommand($event)" @onDatabaseChange="onDatabaseChange"
              @onAccountChange="onAccountChange" @onCodeMirrorOptionsHint="onCodeMirrorOptionsHint"></left-table-list>
          </el-col>

          <el-col :span="18" style="height:calc(100vh - 137px)">
            <el-card :style="{height:queryErrorMsg?`calc(50% + ${queryErrorMsgHeight}px)`:'50%'}"
              :body-style="{ height: '100%', padding: '0 15px 10px 15px' }" shadow="never">

              <el-popover placement="left" width="300" trigger="hover">
                <div>{{ $t("athena.editor_tip_title") }}</div>
                <ul class="use-tip-pop">
                  <li>
                    {{ $t("athena.editor_tip_one") }}
                    <a :style="{ color: dppPrimaryColor }" :href="athenaQueryHelp"
                      target="_blank">{{ $t("athena.editor_tip_one_link") }}</a>
                  </li>
                </ul>
                <i class="iconfont iconinfo query-info-tips" slot="reference" :style="{ color: dppPrimaryColor }"></i>
              </el-popover>

              <el-tooltip :content="$t('athena.format_icon')" placement="left">
                <i class="iconfont icongeshishua query-info-tips" style="top:50px" @click="formatSQLCode()"
                  :style="{ color: dppPrimaryColor }"></i>
              </el-tooltip>

              <el-dropdown trigger="click" @command="changeSQLEditorTheme($event)" class="query-info-tips"
                style="top:85px;">
                <el-tooltip :content="$t('athena.code_theme_icon')" placement="left">
                  <i class="iconfont icontheme" style="font-size:14px" :style="{ color: dppPrimaryColor }"></i>
                </el-tooltip>
                <el-dropdown-menu slot="dropdown" class="app-dropdown-menu">
                  <el-dropdown-item command="idea">{{
                    $t("athena.light")
                  }}</el-dropdown-item>
                  <el-dropdown-item command="panda-syntax">{{
                    $t("athena.dark")
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <div v-if="queryErrorMsg" class="tab-error-msg" id="queryErrorMsgAlert">
                <el-alert :title="queryErrorMsg" type="error" show-icon @close="cleanErrorMsg()">
                </el-alert>
              </div>

              <el-tabs class="sql-query-tabs"
                :style="{height:queryErrorMsg?`calc(100% - ${queryErrorMsgHeight}px)`:'100%'}"
                @tab-click="changeQueryTab()" v-model="editableTabsValue" editable @edit="handleTabsEdit">
                <el-tab-pane :lazy="false" :key="item.name" style="height:calc(100% - 95px)"
                  v-for="item in editableTabs" :label="item.title" :name="item.name">
                  <codemirror style="height:100%;width:calc(100% - 2px)" 
                    :ref="`editQuerySQL${item.name}`"
                    :options="codeMirrorOptions"></codemirror>

                  <div style="margin-top:8px">
                    <el-button type="primary" :disabled="item.queryLoading" size="mini" @click="searchContent(item)">
                      {{ $t("athena.run") }}</el-button>

                    <el-button plain @click="stopQueryTask(item)" v-if="item.logId && item.queryLoading" size="mini">
                      {{ $t("athena.stop_query") }}</el-button>

                    <el-checkbox v-model="item.ifAutoGetDownloadLink" :disabled="
                        query.athenaAccount==='397751057748' || item.disableDownloadUrl || handleCurrentQueryLoading()
                      " style="margin:0 10px">{{ $t("athena.auto_with_download_url") }}</el-checkbox>

                    <div style="float: right">
                      <el-button @click="historyDialogVisible = true" size="mini">
                        <i class="iconfont icontime" style="font-size:13px;margin-right:5px"></i>
                        {{ $t("athena.history_sql") }}
                      </el-button>

                      <el-button size="mini" @click="createScheduleSavedSQL('saved')">{{ $t("athena.saved_btn") }}
                      </el-button>
                      <el-button size="mini" type="primary" @click="createScheduleSavedSQL('schedule')">
                        {{ $t("athena.schedule_btn") }}</el-button>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>

            <query-result-card :style="{height:queryErrorMsg?`calc(50% - ${queryErrorMsgHeight}px)`:'50%'}"
              :queryResult="queryResult" :queryLoading="handleCurrentQueryLoading()"
              :getUrlIngAfterRunQuery="getUrlIngAfterRunQuery"></query-result-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import athenaAPI from "@/api/athena";
import ScheduleSqlCreate from "./ScheduleSqlCreate.vue";

import sqlFormatter from "sql-formatter";
import { codemirror } from "vue-codemirror";

import constant from "@/shared/config/constant";
import appConfig from "@/shared/config/app";

import { mapState } from "vuex";

import QueryResultCard from "./components/QueryResultCard.vue";
import HistorySqlDialog from "./components/HistorySqlDialog.vue";
import LeftTableList from "./components/LeftTableList.vue";
export default {
  components: {
    ScheduleSqlCreate,
    codemirror,
    QueryResultCard,
    HistorySqlDialog,
    LeftTableList,
  },
  computed: {
    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
    }),
  },
  data() {
    return {
      historyDialogVisible: false,
      getUrlIngAfterRunQuery: false,
      queryResult: {
        cols: null,
        rows: null,
        s3: "",
        url: "",
      },
      queryErrorMsg: "",
      queryErrorMsgHeight: 0,
      query: {
        sql: "",
        database: "",
        athenaAccount: "747875099153",
      },
      scheduleSqlForm: undefined,
      codeMirrorOptions: {
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: false,
        autoRefresh: true,
        mode: "text/x-mariadb",
        theme: "idea",
        hintOptions: {
          completeSingle: false,
        },
      },
      editableTabsValue: "1",
      editableTabs: [],
      tabIndex: 0,
      editorPlaceholder: constant.SQL_EDITOR_PLACEHOLDER,
      athenaQueryHelp: appConfig.ATHENA_QUERY_HELP,
    };
  },
  created() {
    //如果有缓存的SQL数组需要渲染出来在Code编辑器里
    const cacheUserQueryList = localStorage.getItem("cacheUserQueryList");
    if (cacheUserQueryList) {
      JSON.parse(cacheUserQueryList).forEach((query, index) => {
        this.addNewTab(query, index + 1 + "");
      });
    } else {
      this.addNewTab();
    }
    //刷新页面或者关闭页面会执行beforeunload保存输入的SQL
    window.addEventListener("beforeunload", this.saveUserInputSqls);
  },

  methods: {
    getActiveCodeEditor() {
      const sqlEditList = this.$refs[`editQuerySQL${this.editableTabsValue}`];
      return sqlEditList[0].codemirror;
    },
    getActiveTab() {
      const activeSQLEdit = this.editableTabs.find((item) => {
        return item.name === this.editableTabsValue;
      });
      if (activeSQLEdit) {
        return activeSQLEdit;
      } else {
        return false;
      }
    },
    cleanQueryResult(tabItem = undefined) {
      let handleTab = tabItem ? tabItem : this.getActiveTab();
      delete handleTab.cacheQueryResults;
      this.queryResult = {
        cols: null,
        rows: null,
        s3: "",
        url: "",
      };
    },
    cleanErrorMsg(tabItem = undefined) {
      let handleTab = tabItem || this.getActiveTab();
      delete handleTab.cacheErrorMsg;
      this.queryErrorMsg = "";
      this.queryErrorMsgHeight = 0;
    },
    disableDownloadCheckbox() {
      let activeTab = this.getActiveTab();
      activeTab.disableDownloadUrl = true;
    },
    onDatabaseChange(value) {
      this.query.database = value;
    },
    onAccountChange(value) {
      this.query.athenaAccount = value;
    },
    onCodeMirrorOptionsHint(value) {
      this.codeMirrorOptions.hintOptions.tables = value;
    },
    handleCommand(event) {
      const command = event.command;
      const item = event.tableInfo;
      switch (command) {
        case "getColList":
          this.addNewTab(`desc ${this.query.database}.${item.label}`);
          this.disableDownloadCheckbox();
          setTimeout(() => {
            this.searchContent();
          }, 100);
          break;
        case "previewResult":
          this.addNewTab(`select * from ${item.label} limit 10`);
          setTimeout(() => {
            this.searchContent();
          }, 100);
          break;
        case "ddl":
          this.addNewTab(`SHOW CREATE TABLE ${item.label}`);
          this.disableDownloadCheckbox();
          setTimeout(() => {
            this.searchContent();
          }, 100);
          break;
        case "drop":
          this.$confirm(`此操作将删除${item.label}, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.addNewTab(`DROP TABLE ${item.label}`);
            this.disableDownloadCheckbox();
            setTimeout(() => {
              this.searchContent();
            }, 100);
          });
          break;
        case "copyTableName":
          this.$copyText(item.label).then((e) => {
            this.$message.success(this.$t("other.copy_done"));
          });
          break;
        default:
          break;
      }
    },

    createScheduleSavedSQL(type) {
      const sqlInputArea = this.getActiveCodeEditor();
      if (
        !sqlInputArea.getValue() ||
        sqlInputArea.getValue() === this.editorPlaceholder
      ) {
        this.$message.error(this.$t("athena.sql_required"));
        return;
      }
      this.scheduleSqlForm = {
        sql: sqlInputArea.getValue(),
        athena_account: this.query.athenaAccount,
        database: this.query.database,
        type: type,
      };
    },
    formatSQLCode() {
      const sqlInputArea = this.getActiveCodeEditor();
      sqlInputArea.setValue(sqlFormatter.format(sqlInputArea.getValue()));
    },
    changeSQLEditorTheme(theme) {
      const sqlInputArea = this.getActiveCodeEditor();
      sqlInputArea.setOption("theme", theme);
    },
    handleCurrentQueryLoading() {
      const currentTab = this.getActiveTab();
      if (currentTab) {
        return currentTab.queryLoading;
      } else {
        return false;
      }
    },
    checkBeforeQuery(sqlInputArea) {
      return (
        !sqlInputArea.getValue() ||
        !this.query.athenaAccount ||
        !this.query.database ||
        sqlInputArea.getValue() === this.editorPlaceholder
      );
    },
    handleCacheErrorMessage(tab, msg) {
      if (!msg) {
        return;
      }
      tab.cacheErrorMsg = msg;
      if (tab.name === this.editableTabsValue) {
        this.queryErrorMsg = tab.cacheErrorMsg;
        this.getQueryErrorMsgRefHeight();
      }
    },
    getQueryErrorMsgRefHeight() {
      setTimeout(() => {
        const a = document.getElementById("queryErrorMsgAlert");
        this.queryErrorMsgHeight = a.clientHeight + 10;
      }, 0);
    },
    pullQueryResults(currentTab, queryLogId) {
      currentTab.logId = queryLogId;
      const intervalQueryResult = setInterval(() => {
        athenaAPI.getResultInterval(queryLogId).then((intervalResponse) => {
          if (intervalResponse.result.state !== "RUNNING") {
            clearInterval(intervalQueryResult);
            delete currentTab.intervalQueryResult;
            currentTab.logId = undefined;
            currentTab.queryLoading = false;
            if (intervalResponse.result.state === "FAILED") {
              // this.$message.error(intervalResponse.result.error);
              this.handleCacheErrorMessage(
                currentTab,
                intervalResponse.result.error
              );
            } else if (intervalResponse.result.state === "SUCCEEDED") {
              this.querySuccess(intervalResponse, currentTab);
            }
          }
        });
      }, 1000);
      currentTab.intervalQueryResult = intervalQueryResult;
    },
    searchContent(tabItem = undefined) {
      const sqlInputArea = this.getActiveCodeEditor();
      if (this.checkBeforeQuery(sqlInputArea)) {
        this.$message.error(this.$t("other.input_sql"));
        return;
      }
      const userSelectSQL= sqlInputArea.getSelection();
      //如果用户select了一段语句，则优先查这段语句
      this.query.sql = userSelectSQL ? userSelectSQL: sqlInputArea.getValue();
      let currentTab = currentTab ? currentTab : this.getActiveTab();
      this.cleanQueryResult(currentTab);
      this.cleanErrorMsg(currentTab);
      currentTab.queryLoading = true;
      athenaAPI
        .athenaQuery(this.query)
        .then((response) => {
          if (response.success) {
            //获取logId之后，轮询查询结果
            const queryLogId = response.result.logId;
            if (queryLogId) {
              this.pullQueryResults(currentTab, queryLogId);
            } else {
              //没有logId，说明是desc,ddl这些同步的语句，不需要轮询
              currentTab.queryLoading = false;
              this.querySuccess(response, currentTab);
              this.handleCacheErrorMessage(currentTab, response.msg);
            }
          } else {
            currentTab.queryLoading = false;
          }
        })
        .catch((err) => {
          currentTab.queryLoading = false;
        });
    },
    querySuccess(response, currentTab) {
      const logId = response.result.logId;
      if (response.msg) {
        this.$message.success(response.msg);
      }
      const queryResultObject = {
        cols: response.result.colModel ? response.result.colModel : [],
        s3: response.result.s3Path ? response.result.s3Path : "",
        rows: response.result.rows ? response.result.rows : [],
      };
      currentTab.cacheQueryResults = queryResultObject;
      if (currentTab.name === this.editableTabsValue) {
        this.queryResult = currentTab.cacheQueryResults;
      }
      if (logId && currentTab.ifAutoGetDownloadLink) {
        this.getDownloadLink(currentTab, logId);
      }
    },
    async getDownloadLink(currentTab, logId) {
      this.getUrlIngAfterRunQuery = true;
      try {
        const linkResponse = await athenaAPI.retryLink(logId);
        if (linkResponse.success) {
          currentTab.cacheQueryResults.url = linkResponse.result;
          if (currentTab.name === this.editableTabsValue) {
            this.queryResult = currentTab.cacheQueryResults;
          }
        }
        this.getUrlIngAfterRunQuery = false;
      } catch (error) {
        this.getUrlIngAfterRunQuery = false;
      }
    },
    stopQueryTask(tabItem) {
      let currentTab = tabItem;
      this.$confirm(
        this.$t("athena.confirm_stop_query"),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        athenaAPI.stopQuery(currentTab.logId).then((response) => {
          if (response.success) {
            //停止查询成功
            currentTab.queryLoading = false;
            currentTab.logId = undefined;
            clearInterval(currentTab.intervalQueryResult);
            delete currentTab.intervalQueryResult;
          }
        });
      });
    },
    changeQueryTab() {
      let currentEditor = this.getActiveCodeEditor();
      this.$nextTick(() => {
        currentEditor.refresh(); // 手动触发刷新Codemirror
      });
      this.changeSQLQueryResult();
    },
    //切换对应的缓存查询结果
    changeSQLQueryResult() {
      const currentTab = this.getActiveTab();
      currentTab.cacheQueryResults
        ? (this.queryResult = currentTab.cacheQueryResults)
        : this.cleanQueryResult();
      if (currentTab.cacheErrorMsg) {
        this.queryErrorMsg = currentTab.cacheErrorMsg;
        this.getQueryErrorMsgRefHeight();
      } else {
        this.cleanErrorMsg();
      }
    },

    //删除最后一个查询窗口
    removeTheLastTab() {
      const sqlInputArea = this.getActiveCodeEditor();
      sqlInputArea.setValue(this.editorPlaceholder);
      this.cleanQueryResult();
      this.cleanErrorMsg();
    },

    //计算删除窗口之后应该显示哪个窗口作为active tab
    calcTheNextActiveTab(targetName) {
      let activeName = this.editableTabsValue;
      let tabs = this.editableTabs;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
      this.editableTabsValue = activeName;
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        this.addNewTab();
        this.changeSQLQueryResult();
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        //如果删除的这个Tab还有轮询则停掉
        const currentTab = tabs.find((item) => {
          return item.name === targetName;
        });
        if (currentTab.intervalQueryResult) {
          clearInterval(currentTab.intervalQueryResult);
        }
        if (tabs.length === 1) {
          this.removeTheLastTab();
          return;
        }
        if (this.editableTabsValue === targetName) {
          this.calcTheNextActiveTab(targetName);
        }
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
        this.changeSQLQueryResult();
        let currentEditor = this.getActiveCodeEditor();
        this.$nextTick(() => {
          currentEditor.refresh(); // 手动触发刷新Codemirror
        });
      }
    },
    addNewTab(sql = "", activeIndex = "") {
      const newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: `New query ${newTabName}`,
        name: newTabName,
        ifAutoGetDownloadLink: false,
        queryLoading: false,
        editorSQLTheme: "idea",
        logId: undefined,
      });
      this.editableTabsValue = newTabName;
      this.$nextTick(() => {
        const sqlInputArea = this.$refs[
          `editQuerySQL${activeIndex ? activeIndex : this.editableTabsValue}`
        ][0].codemirror;
        // auto complete
        sqlInputArea.on("inputRead", (instance, changeObj) => {
          if (/^[a-zA-Z]/.test(changeObj.text[0])) {
            sqlInputArea.showHint();
          }
        });
        // delete placeholder
        sqlInputArea.on("focus", () => {
          if (sqlInputArea.getValue() === this.editorPlaceholder) {
            sqlInputArea.setValue("");
          }
        });
        //set default sql value
        if (sql) {
          sqlInputArea.setValue(sql);
        } else {
          sqlInputArea.setValue(this.editorPlaceholder);
        }
      });
    },

    //历史语句sql插入之后
    onInsert(sqls) {
      sqls.forEach((query, index) => {
        query = sqlFormatter.format(query);
        this.addNewTab(query, this.tabIndex + 1 + "");
      });
    },

    //退出页面之前，缓存用户输入的所有窗口对应的SQL
    saveUserInputSqls() {
      let allQuerySQL = [];
      this.editableTabs.forEach((item) => {
        //查看每个Tab是否还有轮询在查，如果有停止掉。
        if (item.intervalQueryResult) {
          clearInterval(item.intervalQueryResult);
          delete item.intervalQueryResult;
        }
        const sqlEditList = this.$refs[`editQuerySQL${item.name}`];
        const sql = sqlEditList[0].codemirror.getValue();
        if (sql && sql !== this.editorPlaceholder) {
          allQuerySQL.push(sql);
        }
      });
      if (allQuerySQL.length) {
        localStorage.setItem("cacheUserQueryList", JSON.stringify(allQuerySQL));
      } else {
        localStorage.removeItem("cacheUserQueryList");
      }
    },
  },

  //路由跳转之前会执行
  beforeDestroy() {
    this.saveUserInputSqls();
  },

  destroyed() {
    window.removeEventListener("beforeunload", this.saveUserInputSqls);
  },
};
</script>

<style lang="scss">
.CodeMirror-gutters {
  background-color: #ffffff !important;
}
.CodeMirror-hscrollbar {
  overflow-x: auto !important;
}
.sql-query-tabs {
  margin-right: 25px;
  .el-tabs__content {
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .el-tabs__item {
    font-size: 13px;
    font-weight: bold;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
}
</style>

<style lang="scss" scoped>
.app-title-desc {
  padding-bottom: 0;
  i {
    font-size: 70px;
  }
}
.custom-tab {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 0 5px 20px;
  margin-bottom: 15px !important;
}

.query-board-content {
  margin: 0 !important ;
  padding: 0 !important;
  background-color: #f6f6f6 !important;
}

.query-info-tips {
  position: absolute;
  right: 15px;
  top: 15px;
  color: #198fff;
  cursor: pointer;
  outline: none;
}

.use-tip-pop {
  padding-left: 20px;
  a {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tab-error-msg {
  margin-right: 30px;
  margin-top: 10px;
}
</style>
