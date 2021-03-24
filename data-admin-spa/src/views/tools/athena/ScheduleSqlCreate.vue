<template>
  <el-dialog :visible.sync="visible" width="60%"
    :title="form.type==='saved'?$t('athena.saved_title'):$t('athena.schedule_title')" @close="hide">
    <el-form ref="scheduleSqlForm" :model="form" :rules="rules" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('athena.accounts')">
            <el-input disabled v-model="form.athena_account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('athena.database')" prop="sql">
            <el-select :loading="getDatabaseLoading" :disabled="!form.id" :placeholder="$t('common.placeholder_select')"
              style="width:100%" filterable v-model="form.database">
              <el-option v-for="item in databaseList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="form.type==='saved'?$t('athena.edit_query.saved_name'):$t('athena.edit_query.schedule_name')"
            prop="name">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="form.type==='schedule'">
          <el-form-item :label="$t('athena.edit_query.enable')" prop="enable">
            <el-switch v-model="form.enable"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="form.type==='schedule'">
        <el-col>
          <el-form-item :label="'Cron'" prop="cron">
            <cron-input size="md" @change="change" v-model="form.cron" @reset="reset" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <div class="block" v-if="form.type==='schedule'">
        <span class="demonstration">
          {{$t('athena.edit_query.period')}}
          <el-tooltip class="item" effect="dark" :content="$t('athena.edit_query.period_tip')" placement="top">
            <i class="iconfont iconinfo"></i>
          </el-tooltip>
        </span>
        <el-slider v-model="form.period" :step="1" :max="31" :min="0" show-input class="slider"></el-slider>
      </div> -->

      <el-form-item :label="$t('athena.sql')" prop="sql" class="schedule-code-editor" label-position="top">
        <div style="margin-bottom:30px;">
          <codemirror ref="scheduleCodeEditor" v-model="form.sql" :options="cmOptions" class="code-edit"></codemirror>
        </div>
      </el-form-item>

      <div style="font-size:12px;margin-left:100px;" v-if="form.type==='schedule'">

        <i class="iconfont icontime" style="font-size:12px;"></i>
        {{$t('common.cron_parse')}}：
        <div style="border:1px solid #DCDFE6;padding:0 10px;margin-top:10px">
          <p v-for="(item,index) in execTime" :key="index">
            {{common.formatExactTs(item)}}
          </p>
        </div>
      </div>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="hide" plain size="small">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="saveScheduleSql" size="small">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import athenaAPI from "@/api/athena";
import commonAPI from "@/api/common";

import { codemirror } from "vue-codemirror";
import sqlFormatter from "sql-formatter";
import CronInput from "vue-cron-generator/src/components/cron-input";
import { DEFAULT_CRON_EXPRESSION } from "vue-cron-generator/src/constant/filed";

export default {
  name: "scheduleSqlCreate",
  props: {
    scheduleSqlForm: {
      type: Object,
    },
    autoCompleteTables: {
      type: Object,
    },
  },
  components: {
    codemirror,
    CronInput,
  },

  watch: {
    scheduleSqlForm(val) {
      if (!val) {
        return;
      }
      this.visible = true;

      this.form = _.cloneDeep(val);
      if (this.form.type === "saved") {
        this.form.enable = false;
        this.form.scheduled = false;
      } else {
        this.form.scheduled = true;
      }
      this.form.cron ? null : (this.form.cron = DEFAULT_CRON_EXPRESSION);
      this.getDataBaseOptions();
      this.cmOptions.hintOptions.tables = this.autoCompleteTables;

      //sql show auto complete
      this.$nextTick(() => {
        let editor = this.$refs.scheduleCodeEditor.codemirror;
        editor.setValue(sqlFormatter.format(this.form.sql));
        // auto complete
        editor.on("inputRead", (instance, changeObj) => {
          if (/^[a-zA-Z]/.test(changeObj.text[0])) {
            editor.showHint();
          }
        });
      });
    },
  },
  data() {
    return {
      form: {},
      visible: false,
      execTime: [],
      rules: {
        name: [
          {
            required: true,
            message: this.$t("error.required"),
          },
          {
            pattern: "[A-Za-z0-9_]+",
            message: this.$t("athena.edit_query.name_error"),
          },
        ],
        sql: [
          {
            required: true,
            message: this.$t("error.required"),
          },
        ],
        cron: [
          {
            required: true,
            message: this.$t("error.required"),
          },
        ],
      },
      cmOptions: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: false,
        mode: "text/x-mariadb",
        theme: "idea",
        hintOptions: {
          completeSingle: false,
        },
      },
      databaseList: [],
      getDatabaseLoading: false,
    };
  },
  methods: {
    hide() {
      this.visible = false;
      this.$refs.scheduleSqlForm.resetFields();
    },
    saveScheduleSql() {
      this.$refs.scheduleSqlForm.validate((valid) => {
        if (valid) {
          delete this.form.type;
          athenaAPI.createAthenaScheduleSql(this.form).then((response) => {
            if (response.success) {
              this.hide();
              this.$emit("saved");
            }
          });
        }
      });
    },
    async getCronDate(cron) {
      let responseCron = await commonAPI.getCronParse(cron);
      this.execTime = responseCron;
    },
    getDataBaseOptions() {
      this.getDatabaseLoading = true;
      athenaAPI
        .getDatabases({
          athenaAccount: this.form.athena_account,
        })
        .then((response) => {
          this.getDatabaseLoading = false;
          this.databaseList = response;
        });
    },
    reset(cron) {
      this.form.cron = DEFAULT_CRON_EXPRESSION;
    },
    change(cron) {
      this.form.cron = cron;
      this.getCronDate(cron);
    },
  },
};
</script>
<style lang="scss">
.schedule-code-editor {
  margin-bottom: 0;
  .el-form-item__content {
    line-height: 20px;
  }
}

.cron-row {
  max-width: 650px;
}
</style>
<style lang="scss" scoped>
.block {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .slider {
    flex: 1;
    margin-left: 20px;
  }
}

.code-edit {
  height: 200px;
}
</style>