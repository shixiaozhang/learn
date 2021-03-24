<template>
  <div>

    <div class="filter-title ">
      {{$t('job.create_form.step.step_info')}}
    </div>

    <el-row :gutter="80">
      <el-col :span="8">
        <el-form-item :label="$t('job.create_form.step.service_type')" :prop="'steps.'+step.step+'.service_type'"
          :rules="[{required: !consoleTaskType,message:$t('error.required')}]">
          <el-select :placeholder="$t('common.placeholder_select')" v-model="step.service_type"
            @change="changeTaskType(step.service_type)" style="width:100%">
            <el-option v-for="(value, index) in serviceTypes" :key="index" :label="value" :value="value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('job.create_form.step.step_name')" :prop="'steps.'+step.step+'.step_name'"
          :rules="[{required: !consoleTaskType,message:$t('error.required')}]">
          <el-input v-model.trim="step.step_name"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('job.create_form.step.service_config')" :prop="'steps.'+step.step+'.process_group'"
          :rules="[{required: !consoleTaskType,message:$t('error.required')}]">

          <el-popover placement="top" trigger="hover">
            <div>
              {{$t('job.create_form.step.service_config_tips')}}
            </div>
            <i slot="reference" class="iconfont iconinfo"></i>
          </el-popover>

          <el-select :placeholder="$t('common.placeholder_select')" v-model="step.process_group" filterable
            style="width:100%">
            <el-option v-for="item in allServiceConfig" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="80">
      <el-col :span="8" v-show="!isTemplate">
        <el-form-item :label="$t('job.create_form.step.deadline')">
          <el-date-picker style="width:100%" v-model="step.deadline" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="8" v-show="isTemplate">

        <el-form-item :label="$t('job.create_form.step.deadline_hour')">

          <el-popover placement="top-start" width="300" trigger="hover">
            <p>{{$t('job.create_form.step.deadline_hour_tip')}}</p>
            <i slot="reference" class="iconfont iconinfo"></i>
          </el-popover>

          <el-input-number v-model="step.timeout_hour" style="width:100%" :precision="1" :min="0" :step="0.5">
          </el-input-number>

        </el-form-item>
      </el-col>

      <el-col :span="8">

        <el-form-item :label="$t('job.create_form.step.item_batch')" prop="item_batch">
          <el-input-number style="width:100%" v-model="step.item_batch" :step="1" :max="10" :min="1"></el-input-number>
        </el-form-item>

      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('job.create_form.step.distribute')" style="margin-top:40px">
          <el-switch v-model="step.is_distribute"></el-switch>
        </el-form-item>
      </el-col>

    </el-row>

    <!-- handler -->
    <el-form-item :label="$t('job.create_form.step.handles')" :prop="'steps.'+step.step+'.handlers'">
      <el-popover placement="right" trigger="hover">
        <div>
          {{$t('job.create_form.step.handler_tips')}}
        </div>
        <i slot="reference" class="iconfont iconinfo"></i>
      </el-popover>
      <el-select :placeholder="$t('common.placeholder_select')" v-model="step.handlers" filterable multiple
        style="width:100%;">
        <el-option v-for="item in handlerOptions" :key="item.component_name" :label="item.component_name"
          :value="item.component_name">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="New Cluster" label-width="70px" v-if="step.service_type === 'EMR'">
      <el-switch v-model="step.is_allocate"></el-switch>
    </el-form-item>

    <div class="filter-title" style="margin-bottom:30px">
      {{$t('job.create_form.step.filter_keys')}}
    </div>
    <ContextKey v-for="(filter, index) in step.context" :parentPropName="'steps.'+ step.step + '.context.' + index"
      :filter="filter" :filters="step.context" :key="filter.key" :contextKeys="contextKeys" :index="index"
      :consoleTaskType="consoleTaskType"></ContextKey>
    <el-row>
      <el-form-item>
        <el-button size="small" plain @click="addFilter" icon="el-icon-plus">
          {{$t('job.create_form.step.add_context_key')}}</el-button>
      </el-form-item>
    </el-row>
  </div>
</template>
<style>
</style>
<script>
import ContextKey from "./ContextKey";
import configAPI from "@/api/config";
import commonAPI from "@/api/common";

export default {
  name: "TaskStep",
  components: {
    ContextKey
  },
  props: {
    consoleTaskType: {
      type: Boolean
    },
    isTemplate: {
      type: Boolean
    },
    handlerOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    action: {
      type: Object
    },
    contextKeys: {
      type: Array
    }
  },
  watch: {
    action(newValue) {
      this.step = newValue;
    },
    step(newValue) {
      this.$emit("update:action", newValue);
      //从可视化编辑模式过来，可能会改变配置，所以需要重新获取服务
      if (this.step.service_type) {
        this.getServiceConfigId(this.step.service_type);
      }
    }
  },
  data() {
    let validator = (rule, value, callback) => {
      if (value.length === 0 && !this.consoleTaskType) {
        callback(new Error(this.$t("error.required")));
        this.$emit("validateFailed", rule.field.split(/\./)[1]);
      } else {
        callback();
      }
    };
    return {
      rules: [{ type: "array", validator: validator, trigger: "blur" }],
      step: this.action,
      is_distribute: false,
      is_allocate: false,
      context: [
        {
          option: "",
          value: "",
          key_type: ""
        }
      ],
      allServiceConfig: [],
      serviceTypes: []
    };
  },
  mounted() {
    this.getServiceTypes();
  },
  methods: {
    addFilter() {
      this.step.context.push({
        value: "",
        option: ""
      });
    },
    changeTaskType(type) {
      if (this.step.process_group) {
        this.step.process_group = "";
      }
      this.getServiceConfigId(type);
    },
    getServiceConfigId(type) {
      configAPI.listServiceConfigByType({ type: type }).then(response => {
        this.allServiceConfig = response;
      });
    },
    getServiceTypes() {
      commonAPI.listServiceType().then(response => {
        this.serviceTypes = response;
      });
    }
  }
};
</script>
