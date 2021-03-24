<template>
  <el-drawer :visible.sync="stepFlowAddVisible" :with-header="false" size="40%" @close="close()"
    :wrapper-closable="false">

    <div class="edit-step-flow-info">
      <div class="title">
        <i slot="reference" class="el-icon-close" @click="close()"></i>
      </div>

      <el-form ref="stepForm" :model="stepForm" size="small">

        <div class="filter-title">
          {{$t('job.create_form.step.step_info')}}
        </div>

        <el-row :gutter="20">
          <el-col :span="12">
            <!-- service type -->
            <el-form-item :label="$t('job.create_form.step.service_type')" prop="service_type"
              :rules="[{required: true,message: this.$t('error.required'),trigger: 'change'}]">
              <el-select filterable :placeholder="$t('common.placeholder_select')" v-model="stepForm.service_type"
                @change="changeTaskType(stepForm.service_type)" style="width:100%">
                <el-option v-for="(value, index) in serviceTypes" :key="index" :label="value" :value="value">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="12">
            <!-- step name -->
            <el-form-item :label="$t('job.create_form.step.step_name')" prop="step_name"
              :rules="[{required: true,message: this.$t('error.required'),trigger: 'blur'}]">
              <el-input v-model.trim="stepForm.step_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <!-- service config -->
            <el-form-item :label="$t('job.create_form.step.service_config')" prop="process_group"
              :rules="[{required: true,message: this.$t('error.required'),trigger: 'blur'}]">
              <el-popover placement="right" trigger="hover">
                <div>
                  {{$t('job.create_form.step.service_config_tips')}}
                </div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>

              <el-select :placeholder="$t('common.placeholder_select')" v-model="stepForm.process_group" filterable
                style="width:100%">
                <el-option v-for="item in allServiceConfig" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="12">

            <!-- deadline -->
            <el-form-item v-if="!taskIsTemplate" :label="$t('job.create_form.step.deadline')">
              <el-date-picker style="width:100%" clearable v-model="stepForm.deadline" type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <!-- timeout hour -->
            <el-form-item :label="$t('job.create_form.step.deadline_hour')">
              <el-popover placement="right" width="200" trigger="hover">
                <p>{{$t('job.create_form.step.deadline_hour_tip')}}</p>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>
              <el-input-number v-model="stepForm.timeout_hour" style="width:100%" :precision="1" :min="0" :step="0.5">
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- item batch -->
            <el-form-item :label="$t('job.create_form.step.item_batch')" prop="item_batch">
              <el-input-number style="width:100%" v-model="stepForm.item_batch" :step="1" :max="10" :min="1">
              </el-input-number>
              <!-- <el-slider  show-stops show-input></el-slider> -->
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <!-- handlers -->
            <el-form-item :label="$t('job.create_form.step.handles')" prop="handlers">
              <el-popover placement="right" trigger="hover">
                <div>
                  {{$t('job.create_form.step.handler_tips')}}
                </div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>
              <el-select :placeholder="$t('common.placeholder_select')" v-model="stepForm.handlers" filterable multiple
                collapse-tags style="width:100%;">
                <el-option v-for="item in handlerOptions" :key="item.component_name" :label="item.component_name"
                  :value="item.component_name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- distribute -->
          <el-form-item :label="$t('job.create_form.step.distribute')" prop="is_distribute">
            <el-switch v-model="stepForm.is_distribute"></el-switch>
          </el-form-item>
        </el-row>

        <!-- filter key value -->

        <StepFilterKey :context="stepForm.context" :contextKeys="contextKeys"></StepFilterKey>

      </el-form>

      <div class="footer-btns">

        <el-popconfirm 
        class="mg-btn"
        width="200" v-if="stepForm.step" placement="top" @onConfirm="deleteStep()"
          :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')" title="您确认要删除吗这个步骤吗?">
          <el-button slot="reference" plain class="large-width-button" size="small">
            {{$t('btn.delete')}}</el-button>
        </el-popconfirm>

        <el-button size="small" class="large-width-button" @click="close()" plain>{{$t('btn.cancel')}}</el-button>

        <el-button size="small" class="large-width-button" type="primary" @click="confirmEditStep()">
          {{$t('btn.confirm')}}</el-button>
      </div>

    </div>

  </el-drawer>
</template>
<script>
import commonAPI from "@/api/common";
import configAPI from "@/api/config";
import taskAPI from "@/api/task";

import StepFilterKey from "./StepFilterKey";
export default {
  components: {
    StepFilterKey,
  },
  watch: {
    stepOriginForm(val) {
      if (val) {
        if (Object.keys(val).length) {
          this.stepForm = _.cloneDeep(val);
          if (!this.stepForm.context.length) {
            this.stepForm.context = [
              {
                option: "",
                value: "",
              },
            ];
          }
          this.getServiceConfigId(this.stepForm.service_type);
        } else {
          this.stepForm = {
            item_batch: 10,
          };
          this.stepForm.context = [
            {
              option: "",
              value: "",
            },
          ];
        }
        this.stepFlowAddVisible = true;
      }
    },
  },
  props: {
    taskIsTemplate: {
      type: Boolean,
      default: false,
    },
    handlerOptions: {
      type: Array,
      default() {
        return [];
      },
    },
    stepOriginForm: {
      type: Object,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
      stepFlowAddVisible: false,
      stepForm: {},
      serviceTypes: [],
      allServiceConfig: [],
      contextKeys: [],
    };
  },
  mounted() {
    this.getServiceTypes();
    this.getContextKeys();
  },
  methods: {
    async getServiceTypes() {
      this.serviceTypes = await commonAPI.listServiceType();
    },
    changeTaskType(type) {
      this.stepForm.process_group ? (this.stepForm.process_group = "") : null;
      this.getServiceConfigId(type);
    },
    getServiceConfigId(type) {
      configAPI.listServiceConfigByType({ type: type }).then((response) => {
        this.allServiceConfig = response;
      });
    },
    async getContextKeys() {
      this.contextKeys = await taskAPI.getContextKeys();
    },
    close() {
      this.stepFlowAddVisible = false;
      this.$refs.stepForm.resetFields();
      this.$emit("close");
    },
    confirmEditStep() {
      this.$refs.stepForm.validate((valid) => {
        if (valid) {
          this.$emit("editStepDone", this.stepForm);
          this.close();
        }
      });
    },
    deleteStep() {
      this.$emit("deleteStep", this.stepForm);
      this.close();
    },
  },
};
</script>


<style lang="scss" scoped>
.title {
  font-size: 20px;
  i {
    cursor: pointer;
    float: right;
  }
}

.edit-step-flow-info {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}

.footer-btns {
  margin-top: 50px;
  float: right;
}
</style>