<template>
  <el-dialog top="6vh" @closed="resetFormFields()" :title="$t('detect.title')" :visible.sync="visible"
    :close-on-click-modal="false">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('detect.name')" prop="name"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input v-bind:disabled="readonly" v-model="form.name" style="width:95%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="is_console">
            <template slot="label">
              {{$t('detect.console')}}
              <el-popover placement="right" width="200" trigger="hover">
                <p>{{$t('detect.console_tip')}}</p>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>
            </template>

            <el-switch v-model="form.is_console" v-bind:disabled="readonly" @change="openConsole(form.is_console)">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-show="form.is_console">
          <el-form-item :label="$t('service_config.title')" :required="form.is_console">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.service_config" filterable
              style="width:95%">
              <el-option v-for="item in allServiceConfig" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('task_type.title')" prop="task_type"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.task_type" clearable
              @change="resetOptions(form.task_type)" style="width:95%">
              <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="!form.is_console">
          <el-form-item :label="$t('detect.template')" prop="template_id" :required="!form.is_console">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.template_id" style="width:95%"
              filterable>
              <el-option v-for="item in taskTemplates" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('detect.type')" prop="config_type"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.config_type" style="width:95%">
              <el-option v-for="item in configTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('detect.email')" prop="email"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input v-model.trim="form.email" style="width:95%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('detect.cron')" prop="time"
            :rules="[{ required: true, message: $t('error.required') }]">

            <el-input v-model="form.time" style="width:95%" @change="getTimeFromBackend()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="!form.is_console">
          <el-form-item :label="$t('detect.interval')" prop="schedule_interval">

            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.schedule_interval"
              @change="getTimeFromBackend()" style="width:95%">
              <el-option v-for="item in interval_types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('detect.comment')">
            <el-input type="textarea" :rows="5" v-model="form.comment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <h4 style="margin-left:40px;margin-top:0">
        {{$t('detect.runtime')}}
        <el-popover width="400" trigger="hover" placement="right">
          <div v-html="$t('detect.runtime_tip')"></div>
          <i slot="reference" class="iconfont iconinfo"></i>
        </el-popover>
      </h4>

      <el-row>
        <el-col :span="12 " v-show="form.schedule_interval !='Daily' && !form.is_console">
          <el-form-item :label="$t('detect.date_value')" prop="date_value">
            <el-input-number v-model="form.date_value" @change="getTimeFromBackend()" :min="0" :max="form.max" :step="1"
              size="small" style="width:100%">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="!form.is_console">
          <el-form-item :label="$t('detect.time_forward')" prop="time_forward">
            <el-input-number v-model="form.time_forward" :min="0" @change="getTimeFromBackend()" :max="20" :step="1"
              size="small" style="width:100%">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-show="!form.is_console">
        <h4 style="margin-left:40px;margin-top:0">{{$t('detect.next_context')}}:</h4>
        <el-row style="margin-left:40px;">
          <el-col :span="6" v-for="date in Object.keys(specifyDate)" :key="date">
            {{`${date} : ${specifyDate[date]}`}}
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="createDetectConfig('form')">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";
import templateAPI from "@/api/taskTemplate";
import taskAPI from "@/api/task";

export default {
  name: "detectForm",
  props: {
    readonly: false,
    detectForm: {
      type: Object,
    },
  },
  watch: {
    detectForm(val) {
      if (!val) {
        return;
      }
      this.visible = true;
      if (JSON.stringify(val) !== "{}") {
        this.form = _.cloneDeep(val);
      } else {
        this.reset();
      }
      if (!this.form.task_type) {
        this.form.task_type = this.taskTypes[0].id;
      }
      if (this.form.is_console) {
        this.openConsole(true);
      }
      if (this.form.schedule_interval === "") {
        this.form.schedule_interval = this.interval_types[0].value;
      }
      if (this.form.config_type === "") {
        this.form.config_type = this.configTypes[0].value;
      }
      if (this.form.schedule_interval === "Weekly") {
        this.form.max = 7;
      } else {
        this.form.max = 28;
      }
      this.getTemplateIds(this.form.task_type);
    },
  },
  data() {
    return {
      specifyDate: {},
      allServiceConfig: [],
      visible: false,
      formLabelWidth: "150px",
      form: {
        id: "",
        name: "",
        task_type: "",
        config_type: "",
        email: "",
        schedule_interval: "",
        weekly: "",
        time_forward: 1,
        date_value: 1,
        time: "",
        template_id: "",
        max: 7,
      },
      taskTemplates: [],
      taskTypes: [],
      interval_types: [
        {
          value: "Weekly",
          label: "Weekly",
        },
        {
          value: "Monthly",
          label: "Monthly",
        },
        {
          value: "Daily",
          label: "Daily",
        },
      ],
      configTypes: [
        // {
        //   value: 'DETECT',
        //   label: 'DETECT'
        // },
        {
          value: "TIMING",
          label: "TIMING",
        },
        // {
        //   value: 'ROLLBACK',
        //   label: 'ROLLBACK'
        // }
      ],
    };
  },
  methods: {
    openConsole(console) {
      if (console) {
        this.form.schedule_interval = "";
        this.form.data_value = undefined;
        this.form.time_forward = undefined;
        configAPI.listServiceConfigByType({ type: "ECS" }).then((response) => {
          this.allServiceConfig = response;
        });
      }
    },
    createDetectConfig(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          configAPI.saveDetectConfig(this.form).then((response) => {
            if (response.success) {
              this.$emit("save");
              this.hide();
            }
          });
        }
      });
    },
    hide() {
      this.visible = false;
      this.resetFormFields();
    },
    resetOptions(type) {
      this.form.template_id = "";
      this.getTemplateIds(type);
    },
    getTemplateIds(type) {
      if (type === undefined) {
        return;
      }
      templateAPI.listAllTemplates({ task_type: type }).then((response) => {
        this.taskTemplates = response;
      });
    },
    reset() {
      this.readonly = false;
      this.form = {
        id: "",
        name: "",
        task_type: "",
        config_type: "",
        email: "",
        schedule_interval: "",
        time: "",
        template_id: "",
      };
    },
    getTaskTypes() {
      taskAPI.getTaskTypes().then((response) => {
        this.taskTypes = response;
      });
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
    async getTimeFromBackend() {
      let res = await configAPI.getDetectTimeFotmat({
        time: this.form.time,
        schedule_interval: this.form.schedule_interval,
        time_forward: this.form.time_forward,
        date_value: this.form.date_value,
      });
      if (res.success) {
        this.specifyDate = res.result ? res.result : {};
      }
    },
  },
  mounted() {
    this.getTaskTypes();
  },
};
</script>
