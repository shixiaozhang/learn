<template>
  <div class="app-list-page">

    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('fix_manual.title')}}</h4>
        <p class="description">{{$t('fix_manual.sub_title')}}</p>
        <el-button type="text" @click="fixConfirm('save')">
          <i class="iconfont iconbaocun1"></i>
          {{$t('fix_manual.save')}}</el-button>
        <el-button type="text" @click="fixConfirm('reset')">
          <i class="iconfont iconzhongzhi"></i>
          {{$t('fix_manual.reset')}}</el-button>

      </div>
      <div class="right">
        <i class="iconfont icongerengongzuotai"></i>
      </div>
    </div>

    <div class="filter-list-content">

      <el-form label-position="left" label-width="150px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('fix_manual.patent_id')">
              <el-input v-model="query.item_key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('fix_manual.type')">
              <el-select :placeholder="$t('common.placeholder_select')" style="width:100%" v-model="query.type">
                <el-option value="biblio">biblio</el-option>
                <el-option value="patent">patent</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="search()" v-loading.fullscreen.lock="fullscreenLoading">
            {{$t('fix_manual.load')}}</el-button>
        </el-row>
      </el-form>

      <el-tabs @tab-click="handleTabClick($event)">

        <el-tab-pane :label="$t('data_api.result')">

          <div class="empty-with-text-wushuju" style="min-height:calc(100vh - 430px)" v-if="!Object.keys(currentSource).length">
            <i class="iconfont iconwushuju"></i>
            <el-button plain @click="search()" v-loading.fullscreen.lock="fullscreenLoading">{{$t('fix_manual.load')}}
            </el-button>
          </div>

          <el-row v-if="Object.keys(currentSource).length" class="edit-json">
            <el-col :span="12">
              <h4>{{$t('fix_manual.source_data')}}</h4>
              <json-editor ref="fix_viewer" :json="currentSource" :options="viewer_option"></json-editor>
            </el-col>
            <el-col :span="12">
              <h4>{{$t('fix_manual.edit_data')}}</h4>
              <json-editor ref="fix_editor" :json="currentFix" :onModeChange="onModeChange" :onChange="highLightDiff"
                :options="editor_option"></json-editor>
            </el-col>
          </el-row>

          <div v-if="Object.keys(currentSource).length" class="app-fixed-btn" @click="checkFix"
            v-loading.fullscreen.lock="fullscreenLoading">
            {{$t('fix_manual.check')}}
          </div>

        </el-tab-pane>

        <el-tab-pane :label="$t('fix_manual.record')">

          <div class="search-records">
            <el-input :placeholder="$t('fix_manual.query')" @keyup.enter.native="getRecordsList"
              v-model="queryRecords.cfdNum">
              <el-button slot="append" icon="el-icon-search" @click="getRecordsList"></el-button>
            </el-input>
          </div>

          <list-count-tip i18="fix_manual.total" :counts="recordsTotal">
          </list-count-tip>

          <el-table :data="recordsList" v-loading="getListLoading">

            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="table-json-item">
                  <div>
                    <h4>{{$t('fix_manual.source_data')}}</h4>
                    <VueJsonPretty :data="scope.row.data_before" :highlightMouseoverNode="true"></VueJsonPretty>
                  </div>
                  <div>
                    <h4>{{$t('fix_manual.edit_data')}}</h4>
                    <VueJsonPretty :data="scope.row.data_after" :highlightMouseoverNode="true"></VueJsonPretty>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fix_manual.cfd')" prop="cfd_num">
            </el-table-column>
            <el-table-column :label="$t('common.update_time')">
              <template slot-scope="scope">
                {{ common.formatExactTs(scope.row.update_ts) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('fix_manual.operate_table')" prop="operating_table">
            </el-table-column>
            <el-table-column :label="$t('fix_manual.operate_type')" prop="operating_type">
              <template slot-scope="scope">
                <span class="tag-github">
                  {{scope.row.operating_type}}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('user.name')" prop="username">
            </el-table-column>
          </el-table>

          <div class="pagination-area">
            <el-pagination @current-change="handleRecordsCurrentChange" @size-change="handleRecordsSizeChange"
              :current-page.sync='queryRecords.current' :page-sizes='[10,20, 50, 100]'
              layout=' prev, pager, next, sizes' :total='recordsTotal'>
            </el-pagination>
          </div>

        </el-tab-pane>
      </el-tabs>

    </div>

    <el-dialog :close-on-click-modal="false" :title="$t('btn.confirm')" :visible.sync="fixConfirmVisible">
      <el-form :model='fixConfirmForm' ref="fixForm">
        <el-form-item :label="$t('fix_manual.cfd')" :rules="[{ required: true, message:$t('error.required') }]"
          prop="cfdNum">
          <el-input v-model="fixConfirmForm.cfdNum"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain size="small" @click="fixConfirmVisible = false;fixConfirmForm={}">{{$t('btn.cancel')}}
        </el-button>
        <el-button size="small" type="primary" @click="fixConfirmOK">{{$t('btn.confirm')}}
        </el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import toolsAPI from "@/api/tools";
import fixAPI from "@/api/fix";
import { saveAs } from "file-saver/FileSaver";
import VueJsonPretty from "vue-json-pretty";
import JsonEditor from "@/shared/components/JsonEditor";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "ManualFix",
  components: { VueJsonPretty, JsonEditor, ListCountTip },

  data() {
    return {
      getListLoading: false,
      query: {
        item_key: "",
        type: ""
      },
      json: {},
      jsonEditorOptions: {
        mode: "view",
        modes: ["text", "view"]
      },
      checkState: false,
      checkMessage: "",
      fullscreenLoading: false,
      file_name: "",
      tableData: [],
      base_api: process.env.VUE_APP_BASE_URL,
      patent: {},
      currentSource: {},
      currentFix: {},
      fixResults: {},
      highlightLock: false,

      fixConfirmVisible: false,
      fixConfirmForm: {},
      recordsList: [],
      recordsTotal: 0,
      queryRecords: {
        size: 10,
        current: 1,
        cfdNum: ""
      },
      editor_option: {
        mode: "tree",
        navigationBar: false,
        schema: {},
        templates: [
          {
            text: "classify",
            title: "Insert a classify Node",
            field: "classify",
            value: {
              code: {
                section: "null",
                clazz: "null",
                sub_class: "null",
                main_group: "null",
                sub_group: "null",
                full: "full code here"
              },
              version: "2006.01"
            }
          },
          {
            text: "person list",
            title: "Insert a person list Node",
            field: "person",
            value: [
              {
                name_id: 1,
                name: "name here",
                lang: "EN",
                address: {
                  address: "address here",
                  country: "US",
                  state: "state here",
                  city: "city here"
                }
              }
            ]
          },
          {
            text: "person",
            title: "Insert a person Node",
            field: "person",
            value: {
              name_id: 1,
              name: "name here",
              lang: "EN",
              address: {
                address: "address here",
                country: "US",
                state: "state here",
                city: "city here"
              }
            }
          },
          {
            text: "pct",
            title: "Insert a pct Node",
            field: "pct",
            value: {
              apdt: 20180101,
              apno: "PCT/US2018/045856",
              pn: "US3584521",
              pbdt: 20170131,
              etdt: 20170131,
              status: "DEL|FIX|ADD"
            }
          },
          {
            text: "priority",
            title: "Insert a priority Node",
            field: "priority",
            value: [
              {
                country: "US",
                date: 20170131,
                number: "1041500",
                status: "DEL|FIX|ADD"
              }
            ]
          },
          {
            text: "priority child",
            title: "Insert a priority child Node",
            field: "priority",
            value: {
              country: "US",
              date: 20170131,
              number: "1041500",
              status: "DEL|FIX|ADD"
            }
          },
          {
            text: "continuation",
            title: "Insert a continuation Node",
            field: "continuation",
            value: [
              {
                parent: {
                  apno: "US20190121",
                  apdt: 20190101,
                  pn: "US3875154154A1"
                },
                children: "US",
                type: "1041500",
                status: "DEL|FIX|ADD"
              }
            ]
          },
          {
            text: "continuation child",
            title: "Insert a continuation child Node",
            field: "continuation",
            value: {
              apno: "US20190121",
              apdt: 20190101,
              pn: "US3875154154A1"
            }
          },
          {
            text: "divisional",
            title: "Insert a divisional Node",
            field: "divisional",
            value: {
              parent: [
                {
                  apno: "US20190121",
                  apdt: 20190101,
                  pn: "US3875154154A1",
                  status: "DEL|FIX|ADD"
                }
              ],
              children: [
                {
                  apno: "US20190121",
                  apdt: 20190101,
                  pn: "US3875154154A1",
                  status: "DEL|FIX|ADD"
                }
              ]
            }
          },
          {
            text: "divisional child",
            title: "Insert a divisional child Node",
            field: "divisional",
            value: {
              apno: "US20190121",
              apdt: 20190101,
              pn: "US3875154154A1",
              status: "DEL|FIX|ADD"
            }
          }
        ],
        uneditableFields: [
          "patent_id",
          "kd",
          "update_ts",
          "create_ts",
          "patent_related",
          "pn_official",
          "patent_related"
        ],
        onEditable: function(node) {
          if (node.path && node.path instanceof Array) {
            var fieldFullName = node.path[0];
            if (this.uneditableFields.indexOf(fieldFullName) > -1) {
              return { field: false, value: false };
            }
          }
          return { field: true, value: true };
        }
      },
      viewer_option: {
        mode: "view",
        navigationBar: false
      },
      currentSourceDiffData: {}
    };
  },

  methods: {
    search() {
      this.loadData();
    },
    handleTabClick(tab) {
      if (tab.index === "1") {
        this.queryRecords.size = 10;
        this.queryRecords.current = 1;
        this.getRecordsList();
      }
    },
    fixConfirm(type) {
      this.fixConfirmVisible = true;
      this.fixConfirmForm = {};
      this.fixConfirmForm.type = type;
    },
    fixConfirmOK() {
      this.$refs.fixForm.validate(valid => {
        if (valid) {
          if (this.fixConfirmForm.type === "save") {
            this.saveFix();
          } else if (this.fixConfirmForm.type === "reset") {
            this.resetFix();
          }
        } else {
          return false;
        }
      });
    },
    clickTab(tab) {
      if (tab.index === "2") {
        this.queryRecords.size = 10;
        this.queryRecords.current = 1;
        this.getRecordsList();
      }
    },
    handleRecordsCurrentChange(val) {
      this.queryRecords.current = val;
      this.getRecordsList();
    },
    handleRecordsSizeChange(size) {
      this.queryRecords.current = 1;
      this.queryRecords.size = size;
      this.getRecordsList();
    },
    getRecordsList() {
      this.getListLoading = true;
      fixAPI
        .logList(this.queryRecords)
        .then(response => {
          this.getListLoading = false;
          this.recordsList = response.records;
          this.recordsTotal = response.total;
          _.map(this.recordsList, data => {
            data.data_before = JSON.parse(data.data_before);
            data.data_after = JSON.parse(data.data_after);
          });
        })
        .catch(error => {
          this.getListLoading = false;
        });
    },
    warnMsg(msg, type, duration) {
      this.$message({
        showClose: true,
        message: msg,
        type: type,
        duration: duration
      });
    },
    checkFix() {
      if (this.isEmpty(this.currentSource)) {
        this.warnMsg("load data first!", "warning", 3000);
        return;
      }
      var request = {};
      request[this.query.type] = this.$refs.fix_editor.editor.get();
      request["patent"] = this.patent;
      fixAPI
        .checkFix(JSON.stringify(request))
        .then(response => {
          this.checkState = response.valid;
          this.checkMessage = this.checkState ? "check pass" : response.msg;
          this.warnMsg(
            this.checkMessage,
            this.checkState ? "success" : "error",
            this.checkState ? 2000 : 0
          );
        })
        .catch(err => {
          console.error(err);
        });
    },
    resetFix() {
      if (this.isEmpty(this.currentSource)) {
        this.warnMsg("load data first!", "warning", 3000);
        return;
      }
      this.fullscreenLoading = true;
      var that = this;
      this.query.cfdNum = this.fixConfirmForm.cfdNum;
      fixAPI
        .resetFixData(this.query)
        .then(response => {
          this.fixConfirmVisible = false;
          this.fullscreenLoading = false;
          if (response.success) {
            this.patent = JSON.parse(response.patent);
            this.currentSource = JSON.parse(response.source);
            this.currentFix = response.update
              ? JSON.parse(response.update)
              : JSON.parse(response.source);
            setTimeout(that.highLightDiff, 2000);
          }
        })
        .catch(err => {
          this.fixConfirmVisible = false;
          this.fullscreenLoading = false;
          this.warnMsg(err, "warning", 3000);
        });
    },
    saveFix() {
      if (this.isEmpty(this.currentSource)) {
        this.warnMsg("load data first!", "warning", 3000);
        return;
      }
      if (!this.checkState) {
        this.warnMsg("You should pass check first!", "warning", 3000);
        return;
      }
      var fixFields = this.getDiff();
      if (this.isEmpty(fixFields)) {
        this.warnMsg("no changes found!", "warning", 3000);
        return;
      }
      fixFields["patent_id"] = this.currentSource["patent_id"];
      var request = {};
      request[this.query.type] = fixFields;
      if (this.patent) {
        request["patent"] = this.patent;
      }
      request.cfdNum = this.fixConfirmForm.cfdNum;
      request.originalBiblio = this.currentSourceDiffData;
      fixAPI
        .saveFixData(request)
        .then(response => {
          this.fixConfirmVisible = false;
          if (response.success) {
            this.warnMsg("save success!", "success", 3000);
          }
        })
        .catch(err => {
          this.fixConfirmVisible = false;
        });
    },
    loadData() {
      this.fullscreenLoading = true;
      fixAPI
        .loadFixData(this.query)
        .then(response => {
          this.fullscreenLoading = false;
          if (response.success) {
            this.patent = JSON.parse(response.patent);
            this.currentSource = JSON.parse(response.source);
            this.currentFix = response.update
              ? JSON.parse(response.update)
              : JSON.parse(response.source);
            setTimeout(this.highLightDiff, 2000);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false;
        });
    },
    getFileName(path) {
      var array = path.split("/");
      this.file_name = array[array.length - 1];
    },
    onModeChange: function(editor, newMode, oldMode) {
      if (newMode === "tree") {
        // editor.expandAll();
      }
    },
    highLightDiff(fixContent) {
      let newFix = fixContent || this.$refs.fix_editor.editor.get();

      this.checkState = false;
      if (this.highlightLock) {
        return;
      }
      this.highlightLock = true;
      var that = this;
      setTimeout(() => {
        console.info(that.$refs.fix_editor.$el);
        var rowDoms = that.$refs.fix_editor.$el.querySelectorAll(
          ".jsoneditor>.jsoneditor-outer>.jsoneditor-tree>.jsoneditor-tree-inner>table.jsoneditor-tree>tbody>tr"
        );
        var parentFields = [];
        rowDoms.forEach(dom => {
          var valuesDom = dom.querySelector(".jsoneditor-values");
          if (!valuesDom) return;
          var marginLeft = valuesDom.style.marginLeft;
          var level = 0;
          if (marginLeft) level = marginLeft.split("px")[0] / 24;
          if (level === 0) return;
          var fieldDom = dom.querySelector(".jsoneditor-field");
          if (!fieldDom) {
            parentFields[level - 1] = dom.querySelector(
              ".jsoneditor-readonly"
            ).innerText;
          } else {
            parentFields[level - 1] = fieldDom.innerText;
          }
          if (!dom.classList.contains("jsoneditor-expandable")) {
            if (!fieldDom) {
              return;
            }
            parentFields[level - 1] = fieldDom.innerText;
            var editorValue = newFix;
            var compareValue = that.currentSource;
            for (var i = 0; i < level; i++) {
              editorValue = editorValue[parentFields[i]];
              compareValue = compareValue[parentFields[i]];
              if (editorValue === undefined || compareValue === undefined) {
                dom.classList.add("jsoneditor-red");
                return;
              }
            }
            if (JSON.stringify(editorValue) !== JSON.stringify(compareValue)) {
              dom.classList.add("jsoneditor-red");
            } else {
              dom.classList.remove("jsoneditor-red");
            }
          }
        });
        this.highlightLock = false;
      }, 1000);
    },
    getDiff() {
      this.currentSourceDiffData = {};
      var fixJson = this.$refs.fix_editor.editor.get();
      for (var key in fixJson) {
        if (!this.currentSource[key]) {
          delete fixJson[key];
          continue;
        }
        if (this.isEqual(fixJson[key], this.currentSource[key])) {
          delete fixJson[key];
        }
      }
      _.mapKeys(fixJson, (value, key) => {
        this.currentSourceDiffData[key] = this.currentSource[key];
      });
      this.currentSourceDiffData.patent_id = this.currentSource["patent_id"];
      return fixJson;
    },
    isEmpty(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    },
    isEqual(obj1, obj2) {
      var o1 = typeof obj1 === "object";
      var o2 = typeof obj2 === "object";
      if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2;
      }

      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
      }

      for (var attr in obj1) {
        if (!this.isEqual(obj1[attr], obj2[attr])) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style>
.jsoneditor-red {
  background: #efa5a5c9;
}
</style>
<style lang="scss" scoped>
.edit-json {
  h4 {
    margin: 0;
    padding: 10px;
    font-size: 14px;
    color: #606266;
  }
}
.table-json-item {
  display: flex;
  div {
    flex: 0.5;
  }
}
.search-records {
  width: 40vw;
  margin: 0 auto;
  margin-bottom: 16px;
}
</style>
