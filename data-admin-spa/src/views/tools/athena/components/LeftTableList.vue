<template>
  <el-card :body-style="{height:'100%'}" style="height:100%" shadow="never">
    <el-form label-width="90px" label-position="left" size="small" class="choose-accounts-database-form">
      <el-form-item :label="$t('athena.accounts')" prop="athenaAccount" style="margin-bottom:10px">
        <el-select :placeholder="$t('common.placeholder_select')" style="width:100%" v-model="query.athenaAccount"
          @change="getDatabases(query.athenaAccount)">
          <el-option v-for="(item,index) in athenaAccountList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('athena.database')" style="margin-bottom:10px">
        <el-select :placeholder="$t('common.placeholder_select')" style="width:100%" :loading="loadingDatabase"
          @change="getTables(query.database)" filterable v-model="query.database">
          <el-option v-for="item in cacheDatabaseList[query.athenaAccount]" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('athena.tables') +' (' + table_list.length + ')'">
        <el-input style="width:100%;margin:0 0 0 0" size="small" @input="changeTableList()" v-model="filterTableList"
          :placeholder="$t('athena.filter')">
          <el-tooltip :content="`刷新 ${query.database} 的表`" placement="top" slot="append">
            <el-button @click="getTablesList(query.database)">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
          </el-tooltip>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="table-name-list" :element-loading-text="$t('common.loading_text')"
      element-loading-spinner="el-icon-loading" v-loading="tableListLoading">
      <div v-for="(item,index) in table_list" :key="index">
        <div class="table-name-item">
          <span class="table-name-value" :title="item.label">
            <i @click="showTableChildrenColums(item.label)"
              :class="item.showChildren?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
            {{item.label}}
          </span>
          <el-dropdown style="margin-left:auto" placement="bottom" @command="handleCommand($event,item)">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="app-dropdown-menu" style="width:200px">
              <el-dropdown-item icon="el-icon-menu" command="getColList">{{$t('athena.view_colums')}}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-view" command="previewResult">{{$t('athena.preview')}}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-notebook-1" command="ddl">{{$t('athena.ddl')}}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" command="drop">{{$t('athena.drop')}}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-document-copy" command="copyTableName">{{$t('athena.copy_table_name')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div v-if="item.showChildren" class="table-cloums-content" v-loading="item.getTableColumnsLoading"
          :element-loading-text="$t('athena.get_params')" element-loading-spinner="el-icon-loading">
          <div class="table-name-item" style="padding:8px 0" v-for="(item, childrenIndex) in item.children"
            :key="childrenIndex">
            <span class="table-name-value table-name-children" :title="item">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import athenaAPI from "@/api/athena";
import constant from "@/shared/config/constant";

export default {
  data() {
    return {
      table_list: [],
      databases: [],
      sqlLogTableData: [],
      query: {
        database: "",
        athenaAccount: "747875099153",
      },
      table: "",
      tableListLoading: false,
      loadingDatabase: false,
      filterTableList: "",
      originTableList: [],
      cacheDatabaseList: {},
      athenaAccountList: constant.ATHENA_ACCOUNTS,
    };
  },
  created() {
    this.getDatabases(this.query.athenaAccount);
  },
  methods: {
    emitAccountChange(account) {
      this.$emit("onAccountChange", account);
    },
    emitDatabaseChange(database) {
      this.$emit("onDatabaseChange", database);
    },
    getTables(database) {
      if (database) {
        localStorage.setItem("currentDatabase", database);
      }
      this.emitDatabaseChange(database);
      this.getTablesList(database);
    },
    getTablesList(database) {
      this.tableListLoading = true;
      this.originTableList = [];
      this.table_list = [];
      athenaAPI
        .getTables({
          database: database,
          athenaAccount: this.query.athenaAccount,
        })
        .then((response) => {
          response.forEach((item) => {
            this.originTableList.push({
              showChildren: false,
              children: [],
              label: item,
              getTableColumnsLoading: false,
            });
          });
          this.table_list = _.cloneDeep(this.originTableList);
          // init codemirror hint words array
          let objectHint = {};
          this.table_list.forEach((item) => {
            objectHint[item.label] = [];
          });
          this.cacheDatabaseList[this.query.athenaAccount].forEach((item) => {
            objectHint[item] =
              item === this.query.database
                ? this.table_list.map((x) => {
                    return x.label;
                  })
                : [];
          });
          //update codemirror table list hint after table list updated
          this.$emit("onCodeMirrorOptionsHint", objectHint);
          this.tableListLoading = false;
        })
        .catch((err) => {
          this.tableListLoading = false;
        });
    },
    getDatabases(athenaAccount) {
      this.emitAccountChange(athenaAccount);
      if (this.cacheDatabaseList[athenaAccount]) {
        this.query.database = this.cacheDatabaseList[athenaAccount][0];
        this.getTables(this.query.database);
        return;
      }
      this.loadingDatabase = true;
      athenaAPI
        .getDatabases({
          athenaAccount: athenaAccount,
        })
        .then((response) => {
          this.cacheDatabaseList[athenaAccount] = response;
          const currentDatabase = localStorage.getItem("currentDatabase");
          if (currentDatabase) {
            this.query.database = currentDatabase;
          } else {
            this.query.database = response[0];
          }
          this.getTables(this.query.database);
          this.loadingDatabase = false;
        })
        .catch((err) => {
          this.loadingDatabase = false;
        });
    },
    changeTableList() {
      const originData = _.cloneDeep(this.originTableList);
      this.table_list = originData.filter((t) => {
        return t.label.includes(this.filterTableList);
      });
    },
    showTableChildrenColums(name) {
      let activeTable = _.find(this.table_list, (table) => {
        return table.label === name;
      });
      if (activeTable.children.length) {
        activeTable.showChildren = !activeTable.showChildren;
      } else {
        activeTable.showChildren = !activeTable.showChildren;
        activeTable.getTableColumnsLoading = true;
        athenaAPI
          .athenaQuery({
            athenaAccount: this.query.athenaAccount,
            database: this.query.database,
            sql: `desc ${this.query.database} . ${name}`,
          })
          .then((response) => {
            activeTable.getTableColumnsLoading = false;
            response.result.rows.forEach((data) => {
              let columnName = data.col_name.split(" ");
              columnName = columnName.filter((column) => {
                return column;
              });
              activeTable.children.push(
                `${columnName[0]} (${_.trim(columnName[1])})`
              );
            });
          })
          .catch((error) => {
            activeTable.getTableColumnsLoading = false;
          });
      }
    },
    handleCommand(command, item) {
      this.$emit("onQuickOperation", {
        command: command,
        tableInfo: item,
      });
    },
  },
};
</script>

<style lang="scss">
.choose-accounts-database-form {
  .el-form-item__label {
    font-size: 12px;
    font-weight: bold;
    color: #303133;
  }
}
</style>

<style lang="scss" scoped>
.table-title {
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0 5px 0;
  color: #303133;
}
.table-name-list {
  height: calc(100% - 170px);
  overflow-y: auto;
  .table-cloums-content {
    min-height: 50px;
  }
  .table-name-item {
    display: flex;
    padding: 10px 10px 10px 0;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      background-color: #f5f5f5;
    }
    .table-name-value {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table-name-children {
      color: rgba(0, 0, 0, 0.65);
      padding-left: 20px;
      letter-spacing: 0.6px;
    }
  }
}
</style>