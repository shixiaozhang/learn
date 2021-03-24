<template>
  <div>
    <InputFiles :s3FileList="s3FileList" @confirmSave="confirmInputFileList"></InputFiles>

    <div class="navigate">
      <el-page-header @back="goBack" :content="$t('job.create_form.task_form')">
      </el-page-header>
    </div>

    <div class="app-list-page" v-if="!submitSuccess&&!taskFormPreviewVisible">
      <div class="filter-list-content">
        <el-form ref="taskForm" label-position="left" :rules="rules" :model="form" class="form-content">
          <div class="form-area">
            <div class="form-title">
              {{ $t("job.create_form.basic_info") }}
            </div>
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('job.create_form.console')" prop="is_console">
                  <el-switch v-model="form.is_console" v-bind:disabled="readonly"></el-switch>
                  <span style="margin:10px 0 0 10px;">{{
                      $t("job.create_form.console_tip")
                    }}</span>
                </el-form-item>
              </el-col>
            </el-row> -->

            <!-- task name and task type -->
            <el-row :gutter="80">
              <el-col :span="8">
                <el-form-item :label="$t('job.task_name')" prop="name">
                  <el-input v-model.trim="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('job.task_type')" prop="task_type">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.task_type" style="width:100%"
                    @change="onChangeTaskType(form.task_type)">
                    <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- service config options -->
              <el-col :span="8" v-if="form.is_console">
                <el-form-item :label="$t('job.create_form.service')">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.service_config" filterable
                    style="width:100%">
                    <el-option v-for="item in allServiceConfig" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- template options -->
              <el-col :span="8" v-else>
                <el-form-item :label="$t('job.create_form.template')" prop="template_id" v-if="!form.is_console">

                  <el-popover placement="top" trigger="hover">
                    <div>{{$t('job.create_form.template_tips')}}</div>
                    <i slot="reference" class="iconfont iconinfo"></i>
                  </el-popover>

                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.template_id"
                    @change="getTemplateDetail(form.template_id)" style="width:100%" v-bind:disabled="readonly"
                    filterable>
                    <el-option v-for="item in taskTemplates" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="80">
              <!-- commands options -->
              <el-col :span="8" v-if="form.is_console">
                <el-form-item :label="$t('job.create_form.commands')" prop="docker_cmds">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.docker_cmds" multiple
                    filterable allow-create default-first-option style="width:100%">
                    <el-option value="sh">sh</el-option>
                    <el-option value="start.sh">start.sh</el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- item type -->
              <el-col :span="8" v-else>
                <el-form-item :label="$t('job.create_form.item_type')" prop="item_separator">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.item_separator"
                    v-bind:disabled="readonly" style="width:100%">
                    <el-option label="TEXT" value="TEXT"></el-option>
                    <el-option label="JSON" value="JSON"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('common.description')">
                  <el-input v-model="form.description">
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item :label="$t('common.tag')">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="form.tags" style="width:100%;"
                    multiple filterable allow-create default-first-option></el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item prop="input_path" :label="$t('job.create_form.input_path')">
              <el-popover placement="right" width="300" trigger="hover">
                <div>{{ $t("job.create_form.input_path_tips") }}</div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>
              <el-input type="textarea" v-model="form.input_path" v-bind:disabled="readonly"></el-input>
            </el-form-item>

            <el-form-item prop="fix_items" :label="$t('job.create_form.items')">

              <el-popover placement="right" trigger="hover">
                <div>
                  {{$t('job.create_form.items_tips')}}
                </div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>

              <el-input type="textarea" v-model="form.fix_items" :disabled="readonly"></el-input>
            </el-form-item>

            <!-- <el-form-item prop="trigger" :label="$t('job.create_form.trigger_way')">

              <el-radio-group :disabled="readonly" v-model="form.trigger_way" @change="changeFormTrigger()">
                <el-radio :label="trigger.id" v-for="(trigger,index) in triggerOptions " :key="index">
                  {{$t(trigger.label)}}
                </el-radio>
              </el-radio-group>

              <el-popover style="margin-left:30px" placement="bottom" width="500" trigger="hover">
                <div style="padding-right:10px" v-html="$t('job.create_form.trigger_tips')">
                </div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>

            </el-form-item> -->
          </div>

          <div class="form-area" v-show="!form.is_console">
            <div class="form-title">
              {{ $t("job.create_form.auto_resend_title") }}
            </div>
            <el-form-item :label="$t('job.create_form.auto_resend')" prop="is_auto_resend">
              <el-switch v-model="form.is_auto_resend"></el-switch>
            </el-form-item>

            <template v-if="form.is_auto_resend">
              <el-form-item prop="auto_resend_max_times">
                <span>{{ $t("job.create_form.max_times") }}</span>
                <el-slider v-model="form.auto_resend_max_times" :step="5" :max="30" :min="5" show-stops show-input>
                </el-slider>
              </el-form-item>
              <el-form-item prop="task_retry_count">
                <span>{{ $t("job.create_form.count") }}</span>
                <el-slider v-model="form.task_retry_count" v-bind:disabled="!readonly" :step="1"
                  :max="form.auto_resend_max_times" :min="0" show-stops show-input></el-slider>
              </el-form-item>
              <el-form-item prop="time_interval">
                <span>{{ $t("job.create_form.interval") }}</span>
                <el-slider v-model="form.time_interval" :step="1" :max="24" :min="1" show-stops show-input></el-slider>
              </el-form-item>
            </template>
          </div>

          <div class="form-area" style="padding-bottom:50px" v-show="!form.is_console">

            <div class="form-title" style="border-bottom:none">
              {{ $t("job.create_form.steps") }}
            </div>


            <el-tabs v-model="activeStepModeName" @tab-click="stepModeChanged">

              <el-tab-pane :label="$t('job.create_form.step.step_by_step_edit')" name="first">
                <task-flow v-show="!form.is_console" :steps.sync="form.steps" :isTemplate="isTemplate"
                  :taskTemplates="taskTemplates" :handlerOptions="handlerOptions" :readonly="readonly"
                  :consoleTaskType="form.is_console"></task-flow>
              </el-tab-pane>

              <el-tab-pane :lazy="true" :label="$t('job.create_form.step.view_edit')" name="second">
                <step-flow-drag :handlerOptions="handlerOptions" :initalStepList="stepsCloneDeep"
                  @onStepDataDone="onStepFlowDrawDone" :taskIsTemplate="isTemplate"></step-flow-drag>
              </el-tab-pane>
            </el-tabs>

          </div>

          <div class="submit-row">

            <!-- 新增/复制 -->
            <template v-if="!readonly">
              <el-button plain v-if="ifShowPreTask()" @click="intoPreTask()">{{$t('job.create_form.pre')}}</el-button>
              <el-button type="primary" v-if="form.trigger_way!==1" @click="beforeNextTask()">
                {{$t('job.create_form.next')}}</el-button>
              <el-button type="primary" v-if="form.trigger_way===1&&triggerTaskList.length" @click="previewContent()">
                {{$t("btn.preview")}}
              </el-button>

              <el-button class="large-width-button" v-if="form.trigger_way===1&&!triggerTaskList.length" plain
                @click="goBack()">
                {{$t("btn.cancel")}}
              </el-button>

              <el-button class="large-width-button" type="primary" v-if="form.trigger_way===1&&!triggerTaskList.length"
                @click="beforeSaveTask()">
                {{$t("btn.save")}}</el-button>

            </template>

            <!-- 编辑 -->
            <template v-else>

              <el-button plain class="large-width-button" @click="goBack()">{{$t("btn.cancel")}}
              </el-button>

              <el-button class="large-width-button" type="primary" @click="beforeSaveTask()">
                {{$t("btn.save")}}</el-button>

            </template>

          </div>
        </el-form>
      </div>
    </div>

    <div v-else-if="submitSuccess" class="add-done">
      <i class="iconfont icontianjiachenggong"></i>
      <div>
        <p class="text">{{ $t("job.create_form.success_tip") }}</p>
        <p>
          <el-button @click="goBack()" size="small" class="large-width-button">{{ $t("btn.view_task_list") }}
          </el-button>
          <el-button class="large-width-button" @click="addAgain()" type="primary" size="small">{{
            $t("btn.create_another")
          }}</el-button>
        </p>
      </div>
    </div>

    <CreateTaskPreview @onPreviewSave="previewSaveAllTask()" @onDismissPreview="dismissPreview()" :taskTypes="taskTypes"
      :services="allServiceConfig" v-if="taskFormPreviewVisible&&!submitSuccess">
    </CreateTaskPreview>

  </div>
</template>

<script>
import configAPI from "@/api/config";
import taskAPI from "@/api/task";
import templateAPI from "@/api/taskTemplate";
import TaskFlow from "./components/TaskFlow";
import InputFiles from "./components/InputFiles";
import { mapState } from "vuex";
import CreateTaskPreview from "./components/CreateTaskPreview";
import constant from "@/shared/config/constant";
import StepFlowDrag from "./components/step-flow/StepFlowDrag";
/**
 * 模版和步骤里的处理函数（handler）是跟着任务类型联动，步骤里面的服务是跟着服务类型联动
 */

export default {
  components: {
    TaskFlow,
    InputFiles,
    CreateTaskPreview,
    StepFlowDrag
  },
  computed: {
    ...mapState({
      triggerTaskList: state => state.task.triggerTaskList
    })
  },
  data() {
    var validateFixItemsLength = (rule, value, callback) => {
      if (value && value.split(/\n/).length > 1000) {
        callback(new Error("长度最多1000条"));
      } else {
        callback();
      }
    };

    var validateTriggerNameDiff = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("error.required")));
      } else {
        if (this.triggerTaskList.length) {
          const nameArray = this.triggerTaskList.filter(item => {
            return item.name === value;
          });
          if (nameArray.length >= 2) {
            callback(new Error("此任务名称已存在"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };

    return {
      taskFormPreviewVisible: false,
      triggerOptions: constant.TASK_TRIGGERS,
      cacheChangedTaskList: [], //缓存Trigger Task数组，当用户切换到不触发，弹窗取消之后，恢复到之前用户勾选的触发方式
      taskForm: {},
      taskTypes: [],
      contextKeys: [],
      isTemplate: false,
      allServiceConfig: [],
      consoleTaskType: false,
      defaultConfigType: undefined,
      configType: undefined,
      form: {},
      s3FileList: [],
      readonly: false,
      isAutoResend: false,
      time_interval: undefined,
      auto_resend_max_times: undefined,
      is_auto_resend: false,
      handlerOptions: [],
      taskTemplates: [],
      submitSuccess: false,
      activeStepModeName: "first",
      stepsCloneDeep: [],
      rules: {
        name: [
          {
            validator: validateTriggerNameDiff,
            trigger: "blur"
          }
        ],
        task_type: [
          {
            required: true,
            message: this.$t("error.required")
          }
        ],
        life_time: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "blur"
          }
        ],
        country: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "blur"
          }
        ],
        start_date: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "blur"
          }
        ],
        fix_items: [{ validator: validateFixItemsLength, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getServiceConfigOptions();
    this.getTaskTypes();
    this.contextKeys = this.$route.params.contextKeys;
    this.taskForm = this.$route.params.taskForm;
    this.initTaskForm(this.taskForm);
    if (this.form.task_type) {
      this.getHandlersOptions(this.form.task_type);
    }
  },
  methods: {
    getTaskTypes() {
      taskAPI.getTaskTypes().then(response => {
        this.taskTypes = response;
      });
    },
    getServiceConfigOptions() {
      configAPI.getAllServiceConfig().then(response => {
        this.allServiceConfig = response;
      });
    },
    getContextKeyType(key) {
      for (var i = 0; i < this.contextKeys.length; i++) {
        if (this.contextKeys[i].key === key) {
          return this.contextKeys[i].key_type;
        }
      }
    },
    getHandlersOptions(type) {
      if (!type) {
        return;
      }
      taskAPI.getHandlers({ type: type }).then(response => {
        this.handlerOptions = response;
      });
    },
    getTemplateIds(type) {
      if (!type) {
        return;
      }
      templateAPI.listAllTemplates({ task_type: type }).then(response => {
        this.taskTemplates = response;
      });
    },
    onChangeTaskType(type) {
      this.form.steps.forEach(step => {
        step.handlers = [];
      });
      this.form.template_id = "";
      this.getHandlersOptions(type);
      this.getTemplateIds(type);
    },
    initTaskForm(val) {
      if (!val) {
        return;
      }
      this.reset();
      if (!_.isEmpty(val)) {
        this.form = _.cloneDeep(this.reFormatForm(val));
      }
      if (this.form.is_console) {
        this.consoleTaskType = true;
      }
      if (!this.form.docker_cmds) {
        this.form.docker_cmds = [];
      }
      this.form.id ? (this.readonly = true) : (this.readonly = false);
      this.form.steps.forEach(s => {
        if (s.deadline) {
          s.deadline = s.deadline.replace("T", " ");
        }
      });
    },
    reset() {
      this.form = {
        item_separator: "TEXT",
        name: "",
        trigger_way: 1,
        steps: [
          {
            step: 0,
            handlers: [],
            is_distribute: false,
            is_allocate: false,
            service_type: "",
            item_batch: 10,
            context: [
              {
                option: "",
                value: "",
                key_type: ""
              }
            ]
          }
        ]
      };
      this.configType = undefined;
      this.readonly = false;
      this.consoleTaskType = false;
    },

    onStepFlowDrawDone(list) {
      this.form.steps = _.cloneDeep(list);
      //可视化编辑切换回来之后， step字段重新根据步骤的数组顺序排列，因为可能在可视化那边存在删除操作
      this.form.steps.map((item, index) => {
        item.step = index;
        return item;
      });
    },

    stepModeChanged(event) {
      if (event.name === "second") {
        this.stepsCloneDeep = _.cloneDeep(this.form.steps);
      }
    },
    changeFormTrigger() {
      if (!this.triggerTaskList.length) {
        return;
      }
      const taskIndex = this.triggerTaskList.findIndex(item => {
        return item.name === this.form.name;
      });

      //如果要关闭Trigger而且triggerTaskList只有一个Task
      if (
        this.form.trigger_way === 1 &&
        this.triggerTaskList.length === 1 &&
        taskIndex === 0
      ) {
        this.$store.dispatch("task/setTriggerTaskList", []);
      }
      //如果要关闭Trigger而且Task不是最后一个的话
      if (
        this.form.trigger_way === 1 &&
        taskIndex >= 0 &&
        taskIndex !== this.triggerTaskList.length - 1
      ) {
        this.$confirm(
          this.$t("job.create_form.change_to_not_trigger"),
          this.$t("common.tips"),
          {
            confirmButtonText: this.$t("btn.confirm"),
            cancelButtonText: this.$t("btn.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            const a = _.cloneDeep(this.triggerTaskList);
            a.splice(taskIndex + 1, a.length - 1 - taskIndex);
            this.$store.dispatch(
              "task/setTriggerTaskList",
              a.length > 1 ? a : []
            );
          })
          .catch(() => {
            this.form.trigger_way = _.cloneDeep(
              this.cacheChangedTaskList[taskIndex].trigger_way
            );
          });
      }
    },

    // 进入下一个Trigger任务之前，可能是新建的任务/任意的任务
    beforeNextTask() {
      this.$refs.taskForm.validate(valid => {
        if (valid) {
          if (!this.form.steps || this.form.steps.length <= 0) {
            this.$message.warning("请至少添加一个步骤");
            return;
          }
          const index = _.findIndex(this.triggerTaskList, item => {
            return item.currentOrder === this.form.currentOrder;
          });
          if (index >= 0) {
            //说明不是新的Task,进一步判断是不是最后一个
            if (index === this.triggerTaskList.length - 1) {
              // 是最后一个
              this.reset();
              this.cacheChangedTaskList = _.cloneDeep(this.triggerTaskList);
            } else {
              // 不是最后一个
              this.form = this.triggerTaskList[index + 1];
              this.cacheChangedTaskList = _.cloneDeep(this.triggerTaskList);
            }
          } else {
            //说明是新的
            if (this.form.input_path && this.form.input_path.endsWith("/")) {
              taskAPI
                .getFileListByDirectory(this.form.input_path)
                .then(response => {
                  this.s3FileList = response;
                });
            } else {
              this.saveTaskToTriggerList();
              this.reset();
            }
          }
          window.scrollTo(0, 0);
        }
      });
    },
    saveTaskToTriggerList() {
      this.triggerTaskList.length
        ? (this.form.currentOrder = this.triggerTaskList.length)
        : (this.form.currentOrder = 0);
      const a = [...this.triggerTaskList, ...[this.form]];
      this.$store.dispatch("task/setTriggerTaskList", _.cloneDeep(a));
      this.cacheChangedTaskList = _.cloneDeep(this.triggerTaskList);
    },
    ifShowPreTask() {
      if (!this.triggerTaskList.length) return false;
      const index = _.findIndex(this.triggerTaskList, item => {
        return item.currentOrder === this.form.currentOrder;
      });
      return index !== 0;
    },
    intoPreTask() {
      const index = _.findIndex(this.triggerTaskList, item => {
        return item.currentOrder === this.form.currentOrder;
      });
      if (index > 0) {
        //当前任务不是新的
        this.$refs.taskForm.validate(valid => {
          if (valid) {
            if (!this.form.steps || this.form.steps.length <= 0) {
              this.$message.warning("请至少添加一个步骤");
              return;
            }
            this.form = this.triggerTaskList[index - 1];
            this.cacheChangedTaskList = _.cloneDeep(this.triggerTaskList);
            window.scrollTo(0, 0);
          }
        });
      } else {
        //当前任务是新的
        this.$confirm(
          this.$t("job.create_form.before_pre_task"),
          this.$t("common.tips"),
          {
            confirmButtonText: this.$t("btn.confirm"),
            cancelButtonText: this.$t("job.create_form.not_save"),
            type: "warning"
          }
        )
          .then(() => {
            this.$refs.taskForm.validate(valid => {
              if (valid) {
                if (!this.form.steps || this.form.steps.length <= 0) {
                  this.$message.warning("请至少添加一个步骤");
                  return;
                }
                this.saveTaskToTriggerList();
                this.form = this.triggerTaskList[
                  this.triggerTaskList.length - 2
                ];
                window.scrollTo(0, 0);
              }
            });
          })
          .catch(() => {
            this.form = this.triggerTaskList[this.triggerTaskList.length - 1];
            window.scrollTo(0, 0);
          });
      }
    },

    //保存非Trigger任务之前验证表单
    beforeSaveTask() {
      this.$refs.taskForm.validate(valid => {
        if (valid) {
          if (!this.form.steps || this.form.steps.length <= 0) {
            this.$message.warning("请至少添加一个步骤");
            return;
          }
          if (this.form.input_path && this.form.input_path.endsWith("/")) {
            taskAPI
              .getFileListByDirectory(this.form.input_path)
              .then(response => {
                this.s3FileList = response;
              });
          } else {
            this.saveSingleNormalTask();
          }
        }
      });
    },

    confirmInputFileList() {
      this.form.input_path = "";
      this.s3FileList.forEach(f => {
        this.form.input_path += f + ";";
      });
      this.form.input_path = this.form.input_path.substr(
        0,
        this.form.input_path.length - 1
      );
      if (this.form.trigger_way === 1 && !this.triggerTaskList.length) {
        //老的方式
        this.saveSingleNormalTask();
      } else if (this.form.trigger_way === 1 && this.triggerTaskList.length) {
        //下一步肯定是预览
        this.saveTaskToTriggerList();
        this.taskFormPreviewVisible = true;
        window.scrollTo(0, 0);
      } else if (this.form.trigger_way !== 1) {
        //下一步是新添加任务
        this.saveTaskToTriggerList();
        this.reset();
      }
    },
    saveSingleNormalTask() {
      taskAPI
        .saveTaskNew(this.formatFormBeforeSubmit(this.form))
        .then(response => {
          if (response.success) {
            this.submitSuccess = true;
          }
        });
    },
    formatFormBeforeSubmit(form) {
      let newForm = _.cloneDeep(form);
      if (!newForm.is_auto_resend) {
        newForm.auto_resend_max_times = null;
        newForm.task_retry_count = null;
        newForm.time_interval = null;
      } else {
        this.form.auto_resend_max_times = this.form.auto_resend_max_times || 5;
        this.form.time_interval = this.form.time_interval || 1;
      }
      newForm.steps.forEach(function(step) {
        var formatedContext = {};
        if (step.deadline) {
          step.deadline = step.deadline.replace(" ", "T");
        }
        step.timeout_hour = undefined;
        step.context.forEach(function(sub) {
          formatedContext[sub.option] = sub.value;
        });
        step.context = formatedContext;
      });
      delete newForm.currentOrder; //Trigger 模式下任务数组的ID
      delete newForm.template_name; //为了预览时显示模版名称
      return {
        task: newForm,
        prepare: true,
        start: true
      };
    },
    reFormatForm(val) {
      var newForm = _.cloneDeep(val);
      var newSteps = [];
      newForm.steps.forEach(step => {
        var formatedContextArray = [];
        var count = 0;
        for (var key in step.context) {
          var formatedContext = {};
          formatedContext["option"] = key;
          formatedContext["value"] = step.context[key];
          var type = this.getContextKeyType(key);
          formatedContext["key_type"] = type;
          formatedContextArray[count] = formatedContext;
          count++;
        }
        var newStep = {
          id: step.id,
          seq_number: step.seq_number,
          step: step.seq_number - 1,
          step_name: step.step_name,
          handlers: step.handlers,
          context: formatedContextArray,
          process_group: step.process_group,
          is_distribute: step.is_distribute,
          service_type: step.service_type,
          item_batch: step.item_batch,
          is_allocate: step.is_allocate,
          deadline: step.deadline
        };
        newSteps.push(newStep);
      });
      newForm.steps = newSteps;
      newForm.trigger_way = newForm.trigger_way || 1;
      return newForm;
    },
    getTemplateDetail(id) {
      let a = _.find(this.taskTemplates, data => {
        return data.id === id;
      });
      templateAPI
        .getTemplateDetailById({ taskTemplateId: id })
        .then(response => {
          this.form = _.cloneDeep(this.reFormatForm(response.task));
          this.form.template_id = id;
          this.form.template_name = a.name; //为了预览里面的Template Name,不传templates数组过去是因为有可能去预览之后又回来修改了任务类型，导致template数组改变。
          delete this.form.id;
        });
    },

    previewContent() {
      this.$refs.taskForm.validate(valid => {
        if (valid) {
          if (!this.form.steps || this.form.steps.length <= 0) {
            this.$message.warning("请至少添加一个步骤");
            return;
          }
          const index = _.findIndex(this.triggerTaskList, item => {
            return item.currentOrder === this.form.currentOrder;
          });
          //最后一个Task如果是新的，还需要推进去triggerTaskList,如果不是新的，直接展示预览
          if (index >= 0) {
            this.taskFormPreviewVisible = true;
            window.scrollTo(0, 0);
          } else if (
            this.form.input_path &&
            this.form.input_path.endsWith("/")
          ) {
            taskAPI
              .getFileListByDirectory(this.form.input_path)
              .then(response => {
                this.s3FileList = response;
              });
          } else {
            this.saveTaskToTriggerList();
            this.taskFormPreviewVisible = true;
            window.scrollTo(0, 0);
          }
        }
      });
    },

    dismissPreview() {
      this.taskFormPreviewVisible = false;
      this.form = this.triggerTaskList[this.triggerTaskList.length - 1];
      window.scrollTo(0, 0);
    },
    previewSaveAllTask() {
      //直接向后端存数据
      let params = [];
      params = this.triggerTaskList.map(data => {
        return this.formatFormBeforeSubmit(data);
      });
      taskAPI.saveTriggerTasks(params).then(response => {
        if (response.success) {
          this.submitSuccess = true;
        }
      });
    },
    addAgain() {
      this.$store.dispatch("task/setTriggerTaskList", []);
      this.cacheChangedTaskList = [];
      this.reset();
      this.submitSuccess = false;
    },
    goBack() {
      this.reset();
      this.$router.go(-1);
    }
  },
  destroyed() {
    this.$store.dispatch("task/setTriggerTaskList", []);
  }
};
</script>

<style lang="scss" scoped>
.filter-list-content {
  background-color: #f4f5f9;
  padding-bottom: 150px !important;
}

.form-content {
  width: 70vw;
  margin: auto;
}
.form-area {
  background: #ffffff;
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
  .form-title {
    border-bottom: 1px solid #e8e8e8;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    padding: 16px 0;
  }
}

.submit-row {
  margin-top: 30px;
  text-align: center;
}
</style>