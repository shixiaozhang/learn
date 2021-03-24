<template>
  <div>

    <div class="detail-drawer-card">

      <el-card class="task-card" shadow="never" v-for="(task,index) in triggerTaskList" :key="index">

        <!-- basic info -->
        <div class="title title_line">{{$t('job.create_form.basic_info')}}</div>
        <div class="table-expand-row">
          <div class="info">
            <span class="label">{{$t("job.task_name")}}</span>
            <span class="value">
              {{ task.name }}
            </span>
          </div>
          <div class="info">
            <span class="label">{{$t("job.task_type")}}</span>
            <span class="value">
              <el-tag effect="plain" size="mini">
                {{transSelectName(task.task_type,taskTypes,'name')}}
              </el-tag>
            </span>
          </div>

          <div class="info">
            <span class="label">{{$t("job.create_form.template")}}</span>
            <span class="value ">
              {{task.template_name}}
            </span>
          </div>

        </div>

        <div class="table-expand-row">

          <div class="info">
            <span class="label">{{$t("job.create_form.item_type")}}</span>
            <span class="value">
              {{ task.item_separator }}
            </span>
          </div>
          <div class="info">
            <span class="label">{{$t("common.description")}}</span>
            <span class="value">
              {{ task.description }}
            </span>
          </div>
          <div class="info">
            <span class="label">{{$t("common.tag")}}</span>
            <span class="value">
              <span class="tag-github" style="margin-right:5px" v-for="item in task.tags" :key="item">{{ item }}
              </span>
            </span>
          </div>
        </div>

        <div class="table-expand-row">
          <div class="info">
            <span class="label">{{$t("job.create_form.input_path")}}</span>
            <span class="value">
              {{ task.input_path }}
            </span>
          </div>
          <div class="info">
            <span class="label">{{$t("job.create_form.items")}}</span>
            <span class="value">
              {{task.fix_items}}
            </span>
          </div>
          <div class="info">
            <span class="label">
              {{$t('job.create_form.trigger_way')}}
            </span>
            <span class="value">
              <el-tag effect="dark" size="mini">
                {{ $t(transSelectName(task.trigger_way,triggers,'label')) }}
              </el-tag>
            </span>
          </div>

        </div>

        <!-- auto resend info -->
        <div class="title title_line">{{ $t("job.create_form.auto_resend_title") }}</div>

        <div class="table-expand-row">
          <div class="info">
            <span class="label">{{$t('job.create_form.auto_resend')}}</span>
            <span class="value">
              {{ task.is_auto_resend ? $t('common.yes') : $t('common.no') }}
            </span>
          </div>
        </div>

        <div class="table-expand-row" v-if="task.is_auto_resend">
          <div class="info">
            <span class="label">{{$t('job.create_form.max_times')}}</span>
            <span class="value">
              {{ task.auto_resend_max_times}}
            </span>
          </div>

          <div class="info">
            <span class="label">{{$t('job.create_form.count')}}</span>
            <span class="value">
              {{ task.task_retry_count }}
            </span>
          </div>

          <div class="info">
            <span class="label">{{$t('job.create_form.interval')}}</span>
            <span class="value">
              {{ task.time_interval }}
            </span>
          </div>
        </div>

        <!-- step info -->
        <div class="title step-title">
          {{$t('job.create_form.steps')}}
        </div>
        <el-collapse :value="getActiveStepCards(task.steps)">
          <el-collapse-item v-for="(step,index) in task.steps" :key="index" :title="step.step_name"
            :name="step.step_name">

            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('job.create_form.step.service_type')}}</span>
                <span class="value">
                  <el-tag effect="plain" size="small">{{ step.service_type }}</el-tag>
                </span>
              </div>

              <div class="info">
                <span class="label">{{$t('job.create_form.step.service_config')}}</span>
                <span class="value">
                  {{transSelectName(step.process_group,services,'name')}}
                </span>
              </div>

              <div class="info">
                <span class="label">{{$t('job.create_form.step.deadline')}}</span>
                <span class="value">
                  {{ step.deadline }}
                </span>
              </div>

            </div>

            <div class="table-expand-row">

              <div class="info">
                <span class="label">{{$t('job.create_form.step.handles')}}</span>
                <span class="value">
                  <span class="tag-github-gray" v-for="(handlerId, index) in step.handlers" :key="index">
                    <!-- {{transSelectName(handlerId,handlers,'name')}} -->
                    {{handlerId}}
                  </span>

                </span>
              </div>

              <div class="info">
                <span class="label">{{$t('job.create_form.step.distribute')}}</span>
                <span class="value">
                  {{ step.is_distribute?$t('common.yes'):$t('common.no') }}
                </span>
              </div>

              <div class="info">
                <span class="label">{{$t('job.create_form.step.item_batch')}}</span>
                <span class="value">
                  {{ step.item_batch }}
                </span>
              </div>

            </div>

            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('job.create_form.step.filter_fileds')}}</span>
                <span class="value">

                  <table class="sample-data-table">
                    <tr v-for="(item, index) in step.context" :key="index">
                      <th>{{item.option}}</th>
                      <td>{{item.value}}</td>
                    </tr>
                  </table>

                </span>
              </div>
            </div>

          </el-collapse-item>

        </el-collapse>

      </el-card>

      <div style="text-align:center">
        <el-button plain @click="backForm()">{{$t('job.create_form.continue_edit')}}</el-button>
        <el-button plain @click="cancel()">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="save()">{{$t('btn.save')}}</el-button>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import constant from "@/shared/config/constant";

export default {
  computed: {
    ...mapState({
      triggerTaskList: state => state.task.triggerTaskList
    })
  },

  props: {
    taskTypes: {
      type: Array,
      default: []
    },
    services: {
      type: Array,
      default: () => {
        return [];
      }
    },
    handlers: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  data() {
    return {
      triggers: constant.TASK_TRIGGERS
    };
  },
  methods: {
    backForm() {
      this.$emit("onDismissPreview");
    },
    cancel() {
      this.$confirm(
        this.$t("job.create_form.preview_cancel_tip"),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {});
    },
    save() {
      this.$emit("onPreviewSave");
    },
    transSelectName(id, array, resultAttrName) {
      if (!array) {
        return;
      }
      const type = array.find(data => {
        return data.id === id;
      });
      if (type) {
        return type[resultAttrName];
      }
    },
    getActiveStepCards(steps) {
      return _.map(steps, "step_name");
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-drawer-card {
  padding: 20px;
  width: 80%;
  margin: auto;
  background: #f4f5f9;
  .task-card {
    margin-bottom: 20px;
  }
}

.title {
  color: #49aaee;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
}

.title_line {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}
.step-title {
  margin-top: 10px;
}

.table-expand-row {
  .info {
    width: 33%;
    font-size: 12px;
    padding-bottom: 0;
    margin-right: 20px;
  }
  .label {
    color: #616161;
    font-weight: bold;
  }

  .value {
    color: #061632;
    font-size: 12px;
  }
}
.tag-github-gray {
  margin-bottom: 10px;
  margin-right: 10px;
}
.sample-data-table {
  width: 100%;
  border-collapse: collapse;
  &,
  th,
  td {
    border: 1px solid #b3bac5;
    text-align: center;
    font-size: 12px;
    color: #061632;
    padding: 3px 20px;
    min-width: 60px;
  }

  td {
    word-wrap: break-word;
    word-break: break-all;
  }

  th {
    background: #e9e9e9;
    border-color: #b3bac5;
  }
}
</style>