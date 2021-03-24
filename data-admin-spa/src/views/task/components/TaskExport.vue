<template>
  <div>
    <el-dialog :title="$t('job.task_export.title')" :visible.sync="visible" @close="hide" :close-on-click-modal="false">
      <el-form :model='query' :rules="rules" ref="queryForm" label-position="left" label-width="140px">
        <el-form-item :label="$t('common.status')" prop="status">
          <el-select :placeholder="$t('common.placeholder_select')" v-model="query.status">
            <el-option v-for="(item, index) in statusList" :key="index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <div style="display:flex">

          <el-form-item :label="$t('job.task_records.inprocess_step')">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="query.expr">
              <el-option label="=" value="eq"></el-option>
              <el-option label=">" value="gt"></el-option>
              <el-option label=">=" value="gte"></el-option>
              <el-option label="<" value="lt"></el-option>
              <el-option label="<=" value="lte"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="value" class="select-step" label-width="0">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="query.value" prop="value" clearable
              style="margin-left:50px;">
              <el-option v-for="item in totalStep" :key="item.seq_number" :label="item.step_name"
                :value="item.seq_number">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item class="form-item-check">
          <el-checkbox style="margin-right:20px;" :indeterminate="isIndeterminate" v-model="checkAll"
            @change="handleCheckAllChange">ALL
          </el-checkbox>
          <el-checkbox-group v-model="checkedOptions" @change="handleCheckedChange">
            <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :label="$t('job.task_export.fields')">
          <el-input :placeholder="$t('job.task_export.split')" style="width:100%" type="textarea" :rows="5"
            v-model="query.otherFields">
          </el-input>
        </el-form-item>

      </el-form>
      <span slot="footer">
        <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="submitExport()">{{$t('btn.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import taskAPI from "@/api/task";
import constant from "@/shared/config/constant";

export default {
  name: "TaskExport",
  props: {
    command: {
      type: String
    },
    taskId: {
      type: Number
    }
  },
  watch: {
    taskId(val) {
      if (!val || val === "") return;
      this.visible = true;
      this.getStepSize();
    }
  },
  data() {
    return {
      query: {
        status: "ALL",
        expr: ">=",
        value: "",
        otherFields: ""
      },
      totalStep: [],
      checkAll: false,
      checkedOptions: [],
      options: ["INPUT_VALUE", "LIST_PNS", "MESSAGE"],
      isIndeterminate: false,
      visible: false,
      rules: {
        value: [
          { required: true, message: "Please select Step", trigger: "change" }
        ]
      },
      statusList: constant.JOB_ITEM_STATUS
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedOptions = val ? this.options : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
      console.log(this.checkedOptions);
    },
    reset() {
      this.query.status = "ALL";
      this.query.expr = ">=";
      this.totalStep = [];
      this.checkedOptions = [];
      this.isIndeterminate = false;
      this.checkAll = false;
    },
    hide() {
      this.reset();
      this.$emit("close");
      this.visible = false;
    },
    getStepSize() {
      taskAPI.getTotalStep({ taskId: this.taskId }).then(response => {
        this.totalStep = response;
      });
    },
    submitExport() {
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          taskAPI
            .submitExport(
              {
                taskId: this.taskId,
                status: this.query.status,
                expr: this.query.expr,
                value: this.query.value,
                otherFields: this.query.otherFields
              },
              {
                checkedOptions: this.checkedOptions
              }
            )
            .then(response => {
              if (response.success) {
                this.hide();
              }
            });
        }
      });
    }
  },
  mounted() {
    this.reset();
    this.getStepSize();
  }
};
</script>
<style lang="scss">
.form-item-check {
  .el-form-item__content {
    display: flex;
  }
}

.select-step {
  .el-form-item__error {
    margin-left: 50px;
  }
}
</style>

