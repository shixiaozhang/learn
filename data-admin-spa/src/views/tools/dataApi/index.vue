<template>
  <div class="app-list-page">
    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('data_api.title')}}</h4>
        <p class="description">
          {{$t('data_api.sub_title')}}
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconjsonfile"></i>
      </div>
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px" :model="query" ref="filterForm">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :rules=" { validator: validateItemkeys, trigger: 'blur' }" class="itemkey-form-item"
              :label="$t('data_api.key')" prop="itemKeys">
              <span class="key-label" v-for="(item, index) in query.itemKeys" :key="index">
                {{item}}
                <i class="el-icon-close" @click="removeItemkeys(item,index)"></i>
              </span>

              <el-input class="item-key-input"
                v-bind:style="{width:query.itemKeys.length?'30%':'100%'}"
                :placeholder="query.itemKeys.length?'':$t('data_api.key_placeholder')"
                @keyup.enter.native="inputPushItemKeys()" 
                @keyup.delete.native="removeLastItemkeys()"
                v-model="userInputKey">

              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('data_api.table')" :rules="[{ required: true, message: $t('error.required') }]"
              prop="type">
              <el-select :placeholder="$t('common.placeholder_select')" style="width:100%" v-model="query.type">
                <el-option value="original">original</el-option>
                <el-option value="patent">patent</el-option>
                <el-option value="docdb">docdb</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="search()" v-loading.fullscreen.lock="fullscreenLoading">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}
          </el-button>
        </el-row>
      </el-form>

      <el-tabs :closable="true" @tab-remove="handleTabsRemove" v-model="activeTabName"
        v-if="dataApiResults.length">
        <el-tab-pane :label="item.pn" :name="item.pn" v-for="(item) in dataApiResults" :key="item.pn">
          <div class="card-area">
            <div>
              <p class="label">{{$t('data_api.patent')}}</p>
              <p class="value">
                {{item.jsonResults.patent?common.formatTs(item.jsonResults.patent.update_ts):$t('data_api.none')}}
              </p>
            </div>
            <div>
              <p class="label">{{$t('data_api.biblio')}}</p>
              <p class="value">
                {{item.jsonResults.biblio?common.formatTs(item.jsonResults.biblio.update_ts):$t('data_api.none')}}
              </p>
            </div>
            <div>
              <p class="label">{{$t('data_api.legal')}}</p>
              <p class="value">
                {{item.jsonResults.patent?common.formatTs(item.jsonResults.patent.legal_ts):$t('data_api.none')}}
              </p>
            </div>
            <div>
              <p class="label">{{$t('data_api.family')}}</p>
              <p class="value">
                {{item.jsonResults.patent?common.formatTs(item.jsonResults.patent.family_ts):$t('data_api.none')}}
              </p>
            </div>
          </div>

        
          <el-tabs>
            <el-tab-pane :label="$t('data_api.result')">
              <json-editor @onInitEditor="initEditor($event)" v-show="Object.keys(item.jsonResults).length"
                :json="item.jsonResults" :options="{  mode:'view',navigationBar: false}">
              </json-editor>
              <div class="empty-with-text" style="min-height:calc(100vh - 540px)"
                v-if="!Object.keys(item.jsonResults).length">
                <i class="iconfont iconwushuju"></i>
                <p class="tip">{{$t('data_api.no_search')}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('data_api.source')">

              <list-count-tip i18="common.table_total" :counts="item.listFiles.length">
              </list-count-tip>

              <el-table :data='item.listFiles'>
                <el-table-column prop="type" :label="$t('data_api.type')" width="150"></el-table-column>
                <el-table-column prop="parser" :label="$t('data_api.parser')" width="250"></el-table-column>
                <el-table-column prop="source" :label="$t('data_api.source')"></el-table-column>
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <a class="app-primary-link" target="_blank"
                      :href="base_api + '/api/tools/downloadS3File?s3_path='+ scope.row.source">
                      {{$t('btn.download')}}</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>
      </el-tabs>

      <div class="empty-with-text-wushuju" v-else style="min-height:calc(100vh - 320px)">
        <i class="iconfont iconwushuju"></i>
        <p class="tip">{{$t('data_api.no_search')}}</p>
      </div>

      <el-backtop target=".app-list-page">
      </el-backtop>

    </div>
  </div>
</template>

<script>
import toolsAPI from "@/api/tools";
import { saveAs } from "file-saver/FileSaver";
import JsonEditor from "@/shared/components/JsonEditor";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "DataApi",
  components: { JsonEditor, ListCountTip },

  data() {
    return {
      query: {
        itemKeys: [],
        type: "original"
      },
      validateItemkeys: (rule, value, callback) => {
        if (!this.query.itemKeys.length) {
          callback(new Error(this.$t("data_api.key_required")));
        } else if (this.query.itemKeys.length > 10) {
          callback(new Error(this.$t("data_api.key_max_length")));
        } else {
          callback();
        }
      },
      userInputKey: "",
      options: [],
      dataApiResults: [],
      json: {},
      fullscreenLoading: false,
      file_name: "",
      tableData: [],
      base_api: process.env.VUE_APP_BASE_URL,
      timeCardData: {},
      edit: undefined,
      activeTabName: ""
    };
  },
  methods: {
    initEditor(val) {
      this.edit = val;
    },
    search() {
      if (!this.query.itemKeys.length && this.userInputKey) {
        this.query.itemKeys.push(this.userInputKey);
        this.userInputKey = "";
      }
      this.$refs.filterForm.validate(valid => {
        if (valid) {
          this.searchContent();
        }
      });
    },
    async searchContent() {
      this.dataApiResults = [];
      this.fullscreenLoading = true;
      try {
        const response = await toolsAPI.dataApiSearch(this.query);
          if (response.Error) {
            this.$message.error(response.Error);
            return;
          }
        const listFilesResponse = await toolsAPI.listS3Files(this.query);
        if (listFilesResponse) {
          for (let [key, value] of Object.entries(response)) {
            this.dataApiResults.push({
              pn: key,
              jsonResults: value,
              listFiles: listFilesResponse[key]
            });
          }
          this.activeTabName = this.dataApiResults[0].pn;
        }
        this.fullscreenLoading = false;
        setTimeout(() => {
          this.edit.expandAll();
        }, 0);
      } catch (error) {
        this.fullscreenLoading = false;
      }
    },
    removeLastItemkeys(){
      this.query.itemKeys.splice(this.query.itemKeys.length-1, 1);
    },
    getFileName(path) {
      var array = path.split("/");
      this.file_name = array[array.length - 1];
    },
    handleTabsRemove(targetName) {
      let tabs = this.dataApiResults;
      let activeName = this.activeTabName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.pn === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.pn;
            }
          }
        });
      }
      this.activeTabName = activeName;
      this.dataApiResults = tabs.filter(tab => tab.pn !== targetName);
    },
    inputPushItemKeys() {
      this.query.itemKeys.push(this.userInputKey);
      this.userInputKey = "";
    },
    removeItemkeys(item, index) {
      if (index >= 0) {
        this.query.itemKeys.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="scss">
.item-key-input {
  .el-input__inner {
    border: none;
  }
}

.itemkey-form-item {
  .el-form-item__content {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    min-height: 40px;
    padding: 0 5px;
  }
  i {
    color: #a3aac4;
    font-size: 10px;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      color: #516fea;
    }
  }
}
</style>
<style lang="scss" scoped>
.app-list-page {
  height: calc(100vh - 54px) !important;
  overflow-y: auto;
}
.app-title-desc {
  padding-bottom: 0;
  padding-top: 10px;
  .description {
    margin-top: 30px;
  }
}

.key-label {
  height: 26px;
  width: fit-content;
  padding: 2px 5px;
  background: rgba(249, 251, 253, 1);
  border-radius: 41px;
  border: 1px solid rgba(221, 226, 239, 1);
  margin-right: 5px;
  color: rgba(86, 99, 149, 1);
  font-size: 12px;
}
.card-area {
  display: flex;
  div {
    flex: 0.25;
    padding: 10px;
    background: #ffffff;
    text-align: center;
    .label {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
    .value {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
