<template>
  <el-dialog title="Manual Fix" :width="width" :visible.sync="visible" @close="hide" :close-on-click-modal="false"
    :close-on-press-escape="false" top="2vh">
    <el-row class="fix-info-row">
      <el-col :span="24">
        <el-alert :title="checkMessage" :type="checkState?'success':'error'" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <json-editor ref="fix_viewer" :json="currentSource" :options="viewer_option"
          v-bind:style="{height:height+'px'}"></json-editor>
      </el-col>
      <el-col :span="12">
        <json-editor ref="fix_editor" :json="currentFix" :onModeChange="onModeChange" :onChange="highLightDiff"
          :options="editor_option" v-bind:style="{height:height+'px'}"></json-editor>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-select :placeholder="$t('common.placeholder_select')" style="float:left" v-model="nowFixPn">
        <el-option v-for="pn in selectablePns" :key="pn" :label="pn" :value="pn">
        </el-option>
      </el-select>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="warning" @click="checkFix">校验</el-button>
      <el-button type="primary" @click="saveFix">保存</el-button>
    </div>
  </el-dialog>
</template>
<style>
.jsoneditor-red {
  background: #efa5a5c9;
}
.fix-info-row {
  margin-bottom: 10px;
}
</style>
<script>
import fixAPI from "@/api/fix";
import JsonEditor from "@/shared/components/JsonEditor";

export default {
  props: {
    context: {
      type: String | Object,
    },
  },
  components: {
    JsonEditor,
  },
  watch: {
    context(newContext) {
      if (newContext) {
        this.sourceId = this.context["FIX_SOURCE"];
        this.visible = true;
        this.init();
      } else {
        this.hide();
      }
    },
    nowFixPn(nowPn) {
      this.changePn(nowPn);
    },
  },
  data() {
    return {
      width: "70%",
      height: window.innerHeight - 270 > 500 ? window.innerHeight - 270 : 500,
      sourceId: undefined,
      type: "patent",
      visible: false,
      checkState: false,
      checkMessage: "",
      sources: {},
      selectablePns: [],
      nowFixPn: undefined,
      currentSource: {},
      currentFix: {},
      pnCheckPass: {},
      fixResults: {},
      highlightLock: false,
      editor_option: {
        mode: "tree",
        modes: ["tree", "code"],
        navigationBar: false,
        name: "FixablePatent",
        schema: {},
        templates: [
          {
            text: "title",
            title: "Insert a title Node",
            field: "title",
            value: {
              title: "title content here",
              lang: "EN",
              update_ts: new Date().getTime(),
            },
          },
          {
            text: "claim",
            title: "Insert a claim Node",
            field: "claim",
            value: {
              claim: "claim content here",
              lang: "EN",
              update_ts: new Date().getTime(),
            },
          },
          {
            text: "description",
            title: "Insert a description Node",
            field: "description",
            value: {
              description: "description content here",
              lang: "EN",
              update_ts: new Date().getTime(),
            },
          },
          {
            text: "abstract",
            title: "Insert a abstract Node",
            field: "abst",
            value: {
              abst: "abstract content here",
              lang: "EN",
              update_ts: new Date().getTime(),
            },
          },
          {
            text: "classification",
            title: "Insert a classification Node",
            field: "classification",
            value: {
              code: {
                section: "null",
                clazz: "null",
                sub_class: "null",
                main_group: "null",
                sub_group: "null",
                full: "full code here",
              },
              version: "2006.01",
            },
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
                city: "city here",
              },
            },
          },
          {
            text: "priority",
            title: "Insert a priority Node",
            field: "priority",
            value: {
              country: "US",
              date: 20170131,
              number: "1041500",
            },
          },
        ],
        editableFields: [
          "patent-apno",
          "patent-patent_type",
          "biblio-pn_official",
          "biblio-apno_official",
          "biblio-apdt",
          "biblio-pbdt",
          "biblio-exdt",
          "biblio-ipcr-*-code-full",
          "biblio-ipcr-*-version",
          "biblio-inventor-*-",
          "biblio-inventor-*-name",
          "biblio-inventor-*-code",
          "biblio-inventor-*-lang",
          "biblio-inventor-*-name_id",
          "biblio-inventor-*-address-address",
          "biblio-inventor-*-address-country",
          "biblio-inventor-*-address-postcode",
          "biblio-inventor-*-address-city",
          "biblio-assignee-*-",
          "biblio-assignee-*-name",
          "biblio-assignee-*-code",
          "biblio-assignee-*-lang",
          "biblio-assignee-*-name_id",
          "biblio-assignee-*-address-address",
          "biblio-assignee-*-address-country",
          "biblio-assignee-*-address-postcode",
          "biblio-assignee-*-address-city",
          "biblio-applicant-*-",
          "biblio-applicant-*-name",
          "biblio-applicant-*-code",
          "biblio-applicant-*-lang",
          "biblio-applicant-*-name_id",
          "biblio-applicant-*-address-address",
          "biblio-applicant-*-address-country",
          "biblio-applicant-*-address-postcode",
          "biblio-applicant-*-address-city",
          "biblio-pct-pn",
          "biblio-pct-apno",
          "biblio-pct-pbdt",
          "biblio-pct-apdt",
          "biblio-patent_agency-*-",
          "biblio-patent_agency-*-name",
          "biblio-patent_agency-*-code",
          "biblio-patent_agency-*-lang",
          "biblio-patent_agency-*-name_id",
          "biblio-patent_agency-*-address-address",
          "biblio-patent_agency-*-address-country",
          "biblio-patent_agency-*-address-postcode",
          "biblio-patent_agency-*-address-city",
          "biblio-priority-*-country",
          "biblio-priority-*-date",
          "biblio-priority-*-number",
          "titles-*-lang",
          "titles-*-title",
          "absts-*-lang",
          "absts-*-abst",
          "descs-*-lang",
          "descs-*-description",
          "clms-*-lang",
          "clms-*-claim",
        ],
        uneditableFields: [
          "patent-pn",
          "biblio-kd",
          "patent-patent_type",
          "patent-country",
        ],
        onEditable: function (node) {
          if (node.path && node.path instanceof Array) {
            var fieldFullName = node.path.join("-").replace(/-\d+-?/g, "-*-");
            if (this.uneditableFields.includes(fieldFullName)) {
              return { field: false, value: false };
            }
          }
          return { field: false, value: true };
        },
      },
      viewer_option: {
        mode: "view",
        navigationBar: false,
        name: "OriginalPatent",
      },
    };
  },
  methods: {
    hide() {
      this.visible = false;
      this.$emit("close");
    },
    init() {
      var that = this;
      fixAPI
        .loadSource({ type: this.type, sourceId: this.sourceId })
        .then((response) => {
          const data = response;
          if (!data.success) {
            return;
          }
          var sources = data["sources"];
          if (!sources) {
            return;
          }
          that.selectablePns = [];
          sources.forEach((source) => {
            source = JSON.parse(source);
            var pn = source["patent"]["pn"];
            that.fixResults[pn] = data[pn];
            that.sources[pn] = source;
            if (!sources[that.nowFixPn]) {
              that.nowFixPn = pn;
            }
            that.selectablePns.push(pn);
          });
        });
    },
    changePn(pn) {
      this.currentSource = this.sources[pn];
      this.currentFix = this.mergeFix(pn);
      setTimeout(this.expandAll, 10);
      setTimeout(this.checkFix, 10);
      setTimeout(this.highLightDiff, 10);
    },
    mergeFix(pn) {
      if (!this.fixResults[pn]) {
        return this.sources[pn];
      }
      var fixResult = this.fixResults[pn];
      var source = JSON.parse(JSON.stringify(this.sources[pn]));
      for (const key in fixResult) {
        source[key] = fixResult[key];
      }
      return source;
    },
    expandAll() {
      this.$refs.fix_viewer.editor.expandAll();
      this.$refs.fix_editor.editor.expandAll();
    },
    onModeChange: function (editor, newMode, oldMode) {
      if (newMode === "tree") {
        editor.expandAll();
      }
    },
    highLightDiff(newFix) {
      newFix = newFix || this.$refs.fix_editor.editor.get();
      this.pnCheckPass[this.nowFixPn] = false;
      if (this.highlightLock) {
        return;
      }
      this.highlightLock = true;
      var that = this;
      setTimeout(() => {
        console.info(that.$refs.fix_editor.$el);
        var rowDoms = that.$refs.fix_editor.$el.querySelectorAll(
          ".jsoneditor>.jsoneditor-outer>.jsoneditor-tree>table.jsoneditor-tree>tbody>tr"
        );
        var parentFields = [];
        rowDoms.forEach((dom) => {
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
    checkFix() {
      var fixJson = this.$refs.fix_editor.editor.get();
      fixAPI.checkFix(fixJson).then((response) => {
        this.checkState = response.valid;
        this.pnCheckPass[this.nowFixPn] = this.checkState;
        this.checkMessage = this.checkState ? "check pass" : response.msg;
      });
    },
    getDiff() {
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
      return fixJson;
    },
    warnMsg(msg) {
      this.$notify({
        title: this.$t("common.tips"),
        message: msg,
        type: "warning",
      });
    },
    saveFix() {
      if (!this.pnCheckPass[this.nowFixPn]) {
        this.warnMsg("The check hasn't passed yet.");
        this.checkFix();
        return;
      }
      for (var pn in this.pnCheckPass) {
        if (!this.pnCheckPass[pn]) {
          this.nowFixPn = pn;
          this.warnMsg("The check hasn't passed yet.");
          return;
        }
      }
      var fixFields = this.getDiff();
      fixFields["saveId"] = this.nowFixPn;
      fixAPI.saveFix(fixFields).then((response) => {
        if (response.success) {
          this.hide();
        }
      });
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
    },
  },
};
</script>