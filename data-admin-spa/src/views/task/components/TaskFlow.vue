<template>
  <div style="margin-top:20px">
    <el-tabs v-model="activeStep" editable @tab-add="addAfterTab" @tab-remove="romoveTab($event)" type="card">
      <el-tab-pane v-for="(item) in tabs" :key="item.step"
        :label="$t('job.create_form.step.name')+' ' + parseInt(item.step + 1)" :name="''+item.step">
        <TaskStep :consoleTaskType="consoleTaskType" :isTemplate="isTemplate" :action.sync="item"
          :handlerOptions="handlerOptions" :contextKeys="contextKeys" :taskTemplates="taskTemplates"
          @validateFailed="onValidFailed"></TaskStep>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import taskAPI from "@/api/task";
import TaskStep from "./TaskStep";

export default {
  name: "TaskFlow",
  components: {
    TaskStep
  },
  props: {
    consoleTaskType: {
      type: Boolean
    },
    steps: {
      type: Array
    },
    taskTemplates: {
      type: Array
    },
    handlerOptions: {
      type: Array
    },
    readonly: false,
    isTemplate: {
      type: Boolean
    }
  },
  watch: {
    steps(newValue) {
      this.tabs = newValue;
    },
    tabs(newValue) {
      this.$emit("update:steps", newValue);
      if (!this.tabs[this.activeStep]) {
        this.activeStep = "0";
      }
    }
  },
  data() {
    return {
      tabs: this.steps,
      contextKeys: [],
      activeStep: "0"
    };
  },
  methods: {
    plusStep(value, add) {
      value.step += add;
      return value;
    },
    cloneStep(value) {
      // return JSON.parse(JSON.stringify(value))
      var stepId = value.step;
      return {
        step: stepId,
        is_distribute: false,
        is_allocate: false,
        handlers: [],
        service_type: "",
        item_batch: 10,
        context: [
          {
            option: "",
            value: "",
            key_type: ""
          }
        ]
      };
    },
    addBeforeTab() {
      let position = parseInt(this.activeStep);
      let before = position === 0 ? [] : this.tabs.slice(0, position);
      let center = [this.cloneStep(this.tabs[position])];
      let after = this.tabs
        .slice(position)
        .map(value => this.plusStep(value, 1));
      this.tabs = before.concat(center).concat(after);
    },
    addAfterTab() {
      let position = parseInt(this.activeStep);
      let before = this.tabs.slice(0, position + 1);
      let center = [this.plusStep(this.cloneStep(this.tabs[position]), 1)];
      let after = this.tabs
        .slice(position + 1)
        .map(value => this.plusStep(value, 1));
      this.tabs = before.concat(center).concat(after);
      this.activeStep = position + 1 + "";
    },
    romoveTab(tabName) {
      if (this.tabs.length < 2) return;
      this.$confirm(
        this.$t("job.create_form.step.delete_tip"),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      ).then(() => {
        let position = parseInt(tabName);
        if (this.steps[position]&&this.steps[position].id && this.readonly) {
          this.$message.error(this.$t("job.create_form.step.remove_error"));
          return;
        }
        let before = position === 0 ? [] : this.tabs.slice(0, position);
        let after = this.tabs
          .slice(position + 1)
          .map(value => this.plusStep(value, -1));
        this.tabs = before.concat(after);
        // this.activeStep =
        //   position > this.tabs.length - 1 ? position - 1 + "" : position + "";
      });
    },
    onValidFailed(step) {
      this.activeStep = step + "";
    },
    getContextKeys() {
      taskAPI
        .getContextKeys()
        .then(response => {
            this.contextKeys = response;
        })
    }
  },
  mounted() {
    this.getContextKeys();
  }
};
</script>
