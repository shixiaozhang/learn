<template>
  <el-dialog :title="$t('temlpate.title')" @closed="resetFormFields()" fullscreen :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :model="form">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item :label="$t('temlpate.name')" prop="name"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input  v-model.trim="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('task_type.title')" prop="task_type"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.task_type"
              @change="resetHandlers(form.task_type)" style="width:100%">
              <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('job.create_form.item_type')" prop="item_separator">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.item_separator" style="width:100%">
              <el-option label="TEXT" value="TEXT"></el-option>
              <el-option label="JSON" value="JSON"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('common.description')">
            <el-input v-model="form.description">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item :label="$t('job.create_form.auto_resend')" prop="is_auto_resend">
        <el-switch v-model="form.is_auto_resend"></el-switch>
      </el-form-item>

      <el-form-item prop="auto_resend_max_times" v-show='form.is_auto_resend'>
        <span>{{$t('job.create_form.max_times')}}</span>
        <el-slider v-model="form.auto_resend_max_times" :step="10" :max="30" :min="10" show-stops show-input>
        </el-slider>
      </el-form-item>
      <el-form-item prop="time_interval" v-show='form.is_auto_resend'>
               <span>{{$t('job.create_form.interval')}}</span>

        <el-slider v-model="form.time_interval" :step="1" :max="24" :min="1" show-stops show-input></el-slider>
      </el-form-item>
      <task-flow :steps.sync="form.steps" :handlerOptions="handlerOptions" :isTemplate="isTemplate"></task-flow>
    </el-form>
    <div slot="footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="createTemplate()">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import templateAPI from "@/api/taskTemplate";
import taskAPI from "@/api/task";
import TaskFlow from "@/views/task/components/TaskFlow";

export default {
  name: "templateForm",
  props: {
    templateForm: {
      type: Object
    },
    taskTypes: {
      type: Array
    }
  },
  components: {
    TaskFlow
  },
  watch: {
    templateForm(val) {
      if (!val) return;
      this.visible = true;
      if (JSON.stringify(val) !== "{}") {
        var temp = JSON.parse(JSON.stringify(this.reFormatForm(val.task)));
        this.form = temp;
      }
      if (!this.form.task_type) {
        this.form.task_type = this.taskTypes[0].id;
      }
      this.getHandlers(this.form.task_type);
    }
  },
  data() {
    return {
      visible: false,
      handlerOptions: [],
      isTemplate: true,
      form: {
        id: "",
        name: "",
        steps: [
          {
            step: 0,
            handlers: [],
            context: [
              {
                option: "",
                value: "",
                key_type: ""
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    hide() {
      this.visible = false;
      this.resetFormFields();
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
    createTemplate() {
      if (!this.form.auto_resend_max_times) {
        this.form.auto_resend_max_times = 10;
      }
      if (!this.form.time_interval) {
        this.form.time_interval = 1;
      }
      this.$refs.form.validate(valid => {
        valid &&
          templateAPI
            .saveTemplate({ name: this.form.name, task: this.formatForm() })
            .then(response => {
              if (response.success) {
               this.hide();
               this.$emit("close");
              }
            });
        
      });
    },
    resetHandlers(type) {
      this.form.steps.forEach(function(step) {
        step.handlers = [];
      });
      this.getHandlers(type);
    },
    getHandlers(type) {
      taskAPI
        .getHandlers({ type: type })
        .then(response => {
            this.handlerOptions = response;
        })
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.form));
       if(!newForm.is_auto_resend){
        newForm.auto_resend_max_times=null;
        newForm.time_interval=null;
      }
      newForm.steps.forEach(function(step) {
        var formatedContext = {};
        step.context.forEach(function(sub) {
          formatedContext[sub.option] = sub.value;
        });
        step.context = formatedContext;
      });
      return newForm;
    },
    reFormatForm(val) {
      var newForm = JSON.parse(JSON.stringify(val));
      var newSteps = [];
      newForm.steps.forEach(function(step) {
        var formatedContextArray = [];
        var count = 0;
        _.forEach(step.context, function(value, key) {
          var formatedContext = {};
          formatedContext["option"] = key;
          formatedContext["value"] = value;
          formatedContext["key_type"] = "TEXT";
          formatedContextArray[count] = formatedContext;
          count++;
        });
        var newStep = {
          step: step.id - 1,
          step_name: step.step_name,
          handlers: step.handlers,
          context: formatedContextArray,
          process_group: step.process_group,
          is_distribute: step.is_distribute,
          service_type: step.service_type,
          item_batch: step.item_batch
        };
        newSteps.push(newStep);
      });
      newForm.steps = newSteps;
      return newForm;
    }
  }
};
</script>
