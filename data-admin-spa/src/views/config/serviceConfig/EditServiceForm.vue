<template>
  <el-dialog v-loading="getServiceTypeLoading" width="80%" top="5vh" :title="$t('service_config.title')"
    :visible.sync="visible" :close-on-click-modal="false">
    <el-form ref="form" :model="form" label-width="130px" :rules="serviceFormRules">
      <!-- launch type -->
      <el-row>
        <el-form-item :label="$t('service_config.launch_type')" prop="lanch_type">
          <el-radio-group v-if="ecs_types.length" @change="changeTypeOptions()" v-model="form.lanch_type"
            style="width:100%">
            <el-radio v-for="(item,index) in ecs_types" :key="index" :label="item">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <!-- name and queue_name -->
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="form.lanch_type!=='K8S'" :label="$t('service_config.name')" prop="name">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>

          <el-form-item v-if="form.lanch_type==='K8S'" prop="name">
            <template slot="label">
              {{$t('service_config.name')}}

              <el-popover v-if="k8sLastServiceNameInfo&&k8sLastServiceNameInfo.id" placement="top" width="200"
                trigger="hover">
                <div class="service-name-warnings">
                  <span>{{$t('service_config.create_form.image_is_not_latest')}}</span>
                  <el-button type="text" @click="useTheLastServiceName()">
                    {{$t('service_config.create_form.change_to_latest_image')}}</el-button>
                </div>
                <i slot="reference" class="iconfont iconinfo"></i>
              </el-popover>
            </template>
            <el-select filterable v-model="form.name" style="width:100%" value-key="id"
              @change="changeK8SServiceName($event)">
              <el-option v-for="item in k8sServiceNameList" :key="item.id" :label="`${item.name} (${item.version}) `"
                :value="item"></el-option>
            </el-select>

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('service_config.queue_name')" prop="queue_name">
            <el-input v-model.trim="form.queue_name"
              :placeholder="form.lanch_type==='K8S'&&!form.queue_name?'set from Apollo key DPP_SERVICE_QUEUE':''"
              :disabled="queueNameDisabled()">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- docker url(only k8s and depends on name object) -->
      <el-row v-if="form.lanch_type==='K8S'&&form.name&&form.name.id">
        <el-col :span="12">
          <el-form-item class="docker-form-item" :label="$t('service_config.create_form.docker_url')">
            <span>{{form.docker_url}}</span>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="k8sEnvs&&Object.keys(k8sEnvs).length">
          <el-form-item label="Envs:">
            <VueJsonPretty class="service-env" :data="k8sEnvs" :highlightMouseoverNode="true"></VueJsonPretty>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- task define and cluster(only ec2/fargate) -->
      <el-row v-if="form.lanch_type!=='K8S'&&!(form.lanch_type==='EC2'&&form.is_machine)">
        <el-col :span="12">
          <el-form-item prop="service_task_define" :label="$t('service_config.create_form.task_define')">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.service_task_define"
              @change="getTaskDefineInfo(form.service_task_define)" filterable allow-create style="width:100%">
              <el-option v-for="item in taskDefineList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="service_cluster" :label="$t('service_config.create_form.cluster')">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.service_cluster" filterable
              allow-create style="width:100%">
              <el-option v-for="item in serviceClusterList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- mq type -->
      <el-row>

        <el-col :span="12">
          <el-form-item prop="mq_type" :label="$t('service_config.create_form.mq_type')">
            <el-radio-group v-model="form.mq_type">
              <el-radio :label="mqType.id" v-for="(mqType,index) of mqTypeList" :key="index">{{mqType.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('common.tag')" prop="tags">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.tags" style="width:100%;" multiple
              filterable allow-create>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <!-- commands -->
      <el-row v-if="!(form.lanch_type==='EC2'&&form.is_machine)">
        <el-col>
          <el-form-item :label="$t('service_config.create_form.commands')" prop="docker_cmds">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.docker_cmds" style="width:100%;"
              multiple filterable allow-create default-first-option>
              <el-option value="sh">sh</el-option>
              <el-option value="start.sh">start.sh</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- avaliable task counts (only ec2 and not machine)-->
      <el-row v-if="form.lanch_type==='EC2'&&!form.is_machine">
        <el-form-item :label="$t('service_config.create_form.avaliable_task_counts')">
          <span class="avaliable-task-counts">{{avaliableTaskCounts}}</span>
          <el-button type="text" class="query-count-btn" :loading="getAvaliableTaskCountsLoading"
            @click="getApproximateCount">
            {{$t('btn.search')}}</el-button>
        </el-form-item>
      </el-row>

      <!-- task profile (only fargate) -->
      <el-row v-if="form.lanch_type ==='FARGATE'">
        <el-form-item prop="vpc_subnet">
          <template slot="label">
            {{$t('service_config.create_form.vpc')}}
            <el-popover v-if="form.vpc_subnet" :title="$t('common.description')" placement="left" trigger="hover"
              :open-delay="300" @show="describeSubnet(form.vpc_subnet)">
              <div v-loading="profileDescLoading">
                <VueJsonPretty :data="subnetDescription" :highlightMouseoverNode="true"></VueJsonPretty>
              </div>
              <i slot="reference" class="iconfont iconinfo"></i>
            </el-popover>
          </template>
          <el-select :placeholder="$t('common.placeholder_select')" v-model="form.vpc_subnet" style="width:100%">
            <el-option v-for="item in taskProfileList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <!-- enable and autoscaling enable -->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('service_config.enable')" prop="enable">
            <el-switch v-model="form.enable"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="200" :label="$t('service_config.create_form.auto_scaling_anable')"
            prop="is_auto_scaling">
            <el-switch v-model="form.is_auto_scaling" @change="changeIfAutoScaling"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- auto scaling config-->
      <el-row>
        <el-form-item ref="autoScalingConfigId" v-if="form.is_auto_scaling"
          :label="$t('service_config.create_form.auto_config_id')" prop="auto_scaling_config_id">
          <el-select :placeholder="$t('common.placeholder_select')" v-model="form.auto_scaling_config_id"
            style="width:100%">
            <el-option v-for="item in allAutoScalingConfig" :key="item.value"
              :label="'max: ' + item.max_size + ', min: ' + item.min_size + ', desired: ' + item.desire_size + ', size: ' + item.task_queue_num"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="desire_task_size" :label="$t('service_config.create_form.desire_size')" v-else>
          <el-input-number v-model="form.desire_task_size" :min="0" :max="100" size="small" style="width:100%">
          </el-input-number>
        </el-form-item>
      </el-row>

      <!-- choose if machine when ec2 type-->
      <el-form-item v-if="form.lanch_type==='EC2'" :label="$t('service_config.create_form.is_machine')"
        prop="is_machine">
        <el-switch v-model="form.is_machine" @change="changeIfMachine">
        </el-switch>
      </el-form-item>

      <el-form-item label="AutoScalingGroup" v-if="form.lanch_type==='EC2'&&form.is_machine">
        <el-select v-model="form.ec2_auto_scaling_groupName" style="width:100%">
          <el-option v-for="item in awsAutoScalingList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

        
      </el-form-item>

     <div style="margin-bottom:20px">
        <small>
        <i class="iconfont iconinfo" style="margin-left:50px ;margin-right:10px;
        font-size:12px"></i>
        {{$t('service_config.create_form.machine_tips')}}
      </small>
     </div>

      <!-- cpu_cores and  memory_mb(disabled of fargate and ec2's machine) -->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('service_config.create_form.cpu')" prop="cpu_cores">
            <el-slider style="margin-left:20px" v-model="form.cpu_cores" :step="256"
              :max="form.lanch_type === 'FARGATE'?Infinity:2048" :min="256"
              :disabled="form.lanch_type === 'FARGATE'||(form.lanch_type==='EC2'&&form.is_machine)" show-input>
            </el-slider>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('service_config.create_form.memory')" prop="memory_mb">
            <el-slider style="margin-left:20px" v-model="form.memory_mb" :step="512"
              :max="form.lanch_type === 'FARGATE'?Infinity:4096" :min="512"
              :disabled="form.lanch_type === 'FARGATE'||(form.lanch_type==='EC2'&&form.is_machine)" show-input>
            </el-slider>
          </el-form-item>
        </el-col>
      </el-row>

      <small>
        <i class="iconfont iconinfo" style="margin-left:50px ;margin-right:10px;
        font-size:12px"></i>
        {{$t('service_config.create_form.tips')}}
      </small>
    </el-form>

    <span slot="footer">
      <el-button plain @click="hide()" size="small">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submitForm()" size="small">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";
import VueJsonPretty from "vue-json-pretty";
import constant from "@/shared/config/constant";

export default {
  components: {
    VueJsonPretty,
  },
  props: {
    serviceForm: {
      type: Object,
    },
  },
  watch: {
    serviceForm(val) {
      if (!val) return;
      this.visible = true;
      this.form = _.isEmpty(val)
        ? (this.form = {
            id: "",
            name: "",
            queue_name: "",
            lanch_type: "",
            vpc_subnet: "",
            service_task_define: "",
            service_cluster: "",
            is_auto_scaling: true,
            mq_type: 1,
            enable: true,
            auto_scaling_config_id: "",
            docker_cmds: [],
            cpu_cores: 256,
            memory_mb: 512,
            is_machine: false,
          })
        : val;
      if (this.form.service_task_define) {
        this.getTaskDefineInfo(this.form.service_task_define);
      }
      this.getECSTypeList();
      this.getAutoScalingId();
      this.getServiceK8sNameItem(""); //init k8s name options
      if (this.form.is_machine) {
        this.getAWSAutoScalingList();
      }
      this.$refs.form.clearValidate();
    },
  },
  data() {
    let validateTaskName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("error.required")));
      } else {
        if (this.form.lanch_type === "K8S") {
          let realName = "";
          _.isObject(this.form.name)
            ? (realName = this.form.name.name)
            : (realName = this.form.name);
          const existServiceName = this.k8sServiceNameList.filter((item) => {
            return item.name === realName;
          });
          if (existServiceName.length) {
            callback();
          } else {
            callback(new Error("此服务名称在选项中不存在"));
          }
        } else {
          callback();
        }
      }
    };

    return {
      visible: false,
      form: {
        id: "",
        name: "",
        queue_name: "",
        lanch_type: "",
        vpc_subnet: "",
        service_task_define: "",
        service_cluster: "",
        is_auto_scaling: true,
        enable: true,
        auto_scaling_config_id: "",
        desire_task_size: "",
        docker_cmds: [],
        cpu_cores: 256,
        memory_mb: 512,
        is_machine: false,
      },
      allAutoScalingConfig: [],
      ecs_types: [],
      taskProfileList: [],
      serviceClusterList: [],
      taskDefineList: [],
      profileDescLoading: false,
      subnetDescription: {},
      avaliableTaskCounts: "N/A",
      getAvaliableTaskCountsLoading: false,
      k8sServiceNameList: [],
      k8sLastServiceNameInfo: {},
      mqTypeList: constant.SERVICE_MQ_TYPE,
      k8sEnvs: undefined,
      getServiceTypeLoading: false,
      awsAutoScalingList: [],
      serviceFormRules: {
        lanch_type: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        name: [{ validator: validateTaskName, trigger: "change" }],
        queue_name: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "blur",
          },
        ],
        service_task_define: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        mq_type: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        service_cluster: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        auto_scaling_config_id: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //get cpu_cores and memory_mb
    getTaskDefineInfo(task) {
      if (this.form.lanch_type !== "FARGATE") {
        return;
      }
      configAPI.searchTaskDefineInfo({ task: task }).then((response) => {
        this.form.cpu_cores = response.taskCpu;
        this.form.memory_mb = response.taskMemory;
      });
    },

    queueNameDisabled() {
      return (
        this.form.lanch_type === "K8S" &&
        this.form.queue_name !== "" &&
        this.form.queue_name === this.form.name.queue_name
      );
    },

    getApproximateCount() {
      if (
        this.form.service_cluster &&
        this.form.cpu_cores &&
        this.form.memory_mb
      ) {
        this.getAvaliableTaskCountsLoading = true;
        let response = {
          data: 0,
        };
        configAPI
          .getApproximateCount({
            cluster: this.form.service_cluster,
            cpu: this.form.cpu_cores,
            memory: this.form.memory_mb,
          })
          .then((response) => {
            this.getAvaliableTaskCountsLoading = false;
            if (response || response === 0) {
              this.avaliableTaskCounts = response;
            } else {
              this.avaliableTaskCounts = "N/A";
            }
          })
          .catch((error) => {
            this.avaliableTaskCounts = "N/A";
            this.getAvaliableTaskCountsLoading = false;
          });
      } else {
        this.$message.warning(
          this.$t("service_config.create_form.avaliable_task_counts_tips")
        );
      }
    },

    // get vpc-subnet/profiles list
    describeSubnet(subnet) {
      this.subnetDescription = {};
      this.profileDescLoading = true;
      configAPI.describeSubnet({ subnet: subnet }).then((response) => {
        this.profileDescLoading = false;
        this.subnetDescription = response;
      });
    },

    // get EcsType/Launch Type list
    getTaskProfileList(launchType) {
      configAPI.getTaskProfileList(launchType).then((response) => {
        this.taskProfileList = response;
      });
    },

    //get EcsType/Launch Type list
    getECSTypeList() {
      this.getServiceTypeLoading = true;
      configAPI.getECSTypeList().then((response) => {
        this.getServiceTypeLoading = false;
        this.ecs_types = response;
        if (!this.form.lanch_type) {
          this.$set(this.form, "lanch_type", this.ecs_types[0]);
        }
        this.changeTypeOptions();
      });
    },

    //get task define/chart name list
    getTaskDefine(launchType) {
      configAPI.searchTaskDefine(launchType).then((response) => {
        this.taskDefineList = response;
      });
    },

    //get cluster/namesapce list
    getServiceCluster(launchType) {
      configAPI.searchServiceCluster(launchType).then((response) => {
        this.serviceClusterList = response;
      });
    },

    //get Config Id list
    getAutoScalingId() {
      configAPI.listAllAutoScalingConfig().then((response) => {
        this.allAutoScalingConfig = response;
      });
    },

    //get Service Name Options when launch type is K8S
    getServiceK8sNameItem(name, docker_url = "") {
      configAPI
        .getServiceK8sNameItem({ name: name, dockerUrl: docker_url })
        .then((response) => {
          if (response.result && response.result.length) {
            if (docker_url) {
              //判断重名的name是哪一个
              const k8s = response.result[0];
              this.form.name = response.result[0];
              if (k8s.queue_name) {
                this.form.queue_name = k8s.queue_name;
              }
              this.k8sEnvs = k8s.envs;
              this.changeK8SServiceName(this.form.name);
            } else {
              this.k8sServiceNameList = response.result;
            }
          }
        });
    },

    //when ec2 and is machine mode, get awsAutoScaling list
    async getAWSAutoScalingList() {
      let res = await configAPI.listAwsAutoScaling({
        launch_type: "EC2",
      });
      this.awsAutoScalingList = res;
    },

    translateK8SServiceName() {
      if (_.isObject(this.form.name)) {
        const realName = this.form.name.name;
        this.form.name = realName;
      }
    },

    changeTypeOptions() {
      if (["EC2", "FARGATE"].indexOf(this.form.lanch_type) >= 0) {
        this.getServiceCluster(this.form.lanch_type);
        this.getTaskDefine(this.form.lanch_type);
        if (this.form.lanch_type === "FARGATE") {
          this.getTaskProfileList(this.form.lanch_type);
        }
      }
      this.$refs.form.clearValidate();
      this.translateK8SServiceName();
      if (this.form.lanch_type === "K8S" && this.form.name) {
        this.$refs.form.validateField("name");
        this.getServiceK8sNameItem(this.form.name, this.form.docker_url);
      }
    },

    changeIfMachine(event) {
      if (event && !this.awsAutoScalingList.length) {
        this.getAWSAutoScalingList();
      }
    },

    async changeK8SServiceName(nameModel) {
      this.k8sLastServiceNameInfo = {};
      this.form.docker_url = `${nameModel.imageUrl}:${nameModel.version}`;
      if (nameModel.queue_name) {
        this.form.queue_name = nameModel.queue_name;
      }
      this.k8sEnvs = nameModel.envs;
      //检查是不是最新的镜像
      const nameModelQuery = {
        name: nameModel.name,
        dockerUrl: `${nameModel.imageUrl}:${nameModel.version}`,
      };
      const responseLast = await configAPI.checkServiceIsLast(nameModelQuery);
      if (responseLast.result) {
        this.k8sLastServiceNameInfo = responseLast.result;
      }
    },
    changeIfAutoScaling(event) {
      if (!event) {
        this.$refs.autoScalingConfigId.clearValidate();
      }
    },
    useTheLastServiceName() {
      this.form.name = this.k8sLastServiceNameInfo;
      this.changeK8SServiceName(this.form.name);
    },

    submitForm() {
      console.log(this.form);
      debugger;
      if (!this.form.is_auto_scaling) {
        this.form.auto_scaling_config_id = "";
      } else {
        this.form.desire_task_size = "";
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.translateK8SServiceName();
          configAPI.saveServiceConfig(this.form).then((response) => {
            if (response.success) {
              this.hide();
              this.$emit("done");
              if (!this.form.id) return;
              this.$confirm(
                this.$t("service_config.stop_service_tip"),
                this.$t("common.tips"),
                {
                  confirmButtonText: this.$t("btn.confirm"),
                  cancelButtonText: this.$t("btn.cancel"),
                  type: "warning",
                }
              )
                .then(() => {
                  configAPI.stopServiceConfig(this.form.id).then((response) => {
                    if (response.success) {
                      this.$emit("done");
                    }
                  });
                })
                .catch(() => {});
            }
          });
        }
      });
    },
    hide() {
      this.visible = false;
      this.$refs.form.clearValidate();
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style lang="scss">
.service-env {
  .vjs-tree {
    font-size: 12px;
    line-height: normal;
  }
}

.docker-form-item {
  .el-form-item__content {
    line-height: 20px;
    font-size: 13px;
    margin-top: 10px;
  }
}
</style>
<style lang="scss" scoped>
.avaliable-task-counts {
  font-size: 20px;
  font-weight: bolder;
  margin-right: 10px;
}

.service-name-warnings {
  word-spacing: 0;
  padding: 10px 0;
}

.query-count-btn {
  padding: 10px 20px;
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>