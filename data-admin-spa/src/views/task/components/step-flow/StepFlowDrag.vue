<template>
  <div>

    <div class="form-title" style="border-bottom:none">
      <el-button icon="el-icon-plus" @click="addNewStep()" style=" padding: 3px 0" type="text">
        {{$t('job.create_form.step.add_step')}}
      </el-button>
    </div>

    <div v-if="originFlowData.nodes.length">
      <!-- <v-g-editor ref="flowChart" class="step-div">
        <flow :data="data" />
      </v-g-editor> -->

      <div class="step-div" id="mountNode" style="width:100%;height:400px"></div>

    </div>

    <div v-else class="empty-with-text">
      <i class="iconfont iconempty"></i>
      <p class="tip">您还没有添加任何步骤</p>
    </div>

    <step-flow-add :handlerOptions="handlerOptions" @editStepDone="editStepDone($event)"
      @close="stepOriginForm=undefined" @deleteStep="deleteStep($event)" :taskIsTemplate="taskIsTemplate"
      :stepOriginForm="stepOriginForm">
    </step-flow-add>
  </div>
</template>

<script>
import StepFlowAdd from "./StepFlowAdd";
import { mapState } from "vuex";
import utils from "@/utils/function";
export default {
  components: {
    StepFlowAdd,
  },
  computed: {
    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
    }),
  },
  props: {
    handlerOptions: {
      type: Array,
    },
    taskIsTemplate: {
      type: Boolean,
      default: false,
    },
    initalStepList: {
      type: Array,
      default() {
        return undefined;
      },
    },
  },

  watch: {
    initalStepList(val) {
      //从Tab编辑模式切换到可视化编辑模式
      this.originFlowData = {
        nodes: [],
        edges: [],
      };
      if (val && val.length) {
        this.initalStepList.forEach((stepInfo) => {
          const newNode = this.shapeStepToNode(stepInfo);
          this.originFlowData.nodes.push(newNode);
        });
        this.$nextTick(() => {
          if (this.originFlowData.nodes.length > 1) {
            this.drawEdges();
          }
          this.graph.changeData(this.originFlowData);
        });
      }
    },
  },

  mounted() {
    //非Trigger任务，编辑/复制进入，初始化步骤流程图
    this.$nextTick(() => {
      if (this.initalStepList && this.initalStepList.length) {
        this.initalStepList.forEach((stepInfo) => {
          const newNode = this.shapeStepToNode(stepInfo);
          this.originFlowData.nodes.push(newNode);
        });
        setTimeout(() => {
          if (!this.graph) {
            this.renderStepFlowCharts();
          }
          if (this.originFlowData.nodes.length > 1) {
            this.drawEdges();
          }
          this.graph.changeData(this.originFlowData);
        }, 0);
      }
    });
  },

  data() {
    return {
      stepOriginForm: undefined,
      graph: undefined,
      originFlowData: {
        nodes: [],
        edges: [],
      },
      lockDraw: false,
    };
  },
  methods: {
    addNewStep(stepInfo) {
      this.stepOriginForm = {};
    },

    shapeStepToNode(stepInfo) {
      let nodesOrigin = this.originFlowData.nodes;
      let xPosition =
        nodesOrigin.length === 0
          ? 100
          : nodesOrigin[nodesOrigin.length - 1].x + 100;
      let yPosition =
        nodesOrigin.length === 0 ? 100 : nodesOrigin[nodesOrigin.length - 1].y;

      return {
        id: `rect${nodesOrigin.length + 1}`,
        type: "circle",
        size: 70,
        style: {
          fill: utils.hexToRGBA(this.dppPrimaryColor, 0.2),
          stroke: this.dppPrimaryColor,
        },
        label: stepInfo.step_name ? stepInfo.step_name : "",
        y: yPosition,
        x: xPosition,
        metadata: stepInfo,
      };
    },

    emitStepData() {
      this.$emit(
        "onStepDataDone",
        _.cloneDeep(this.originFlowData.nodes.map((item) => item.metadata))
      );
    },

    editStepDone(stepFormData) {
      let stepInfo = _.cloneDeep(stepFormData);
      if (stepInfo.step || stepInfo.step === 0) {
        //已经存在的，编辑回来
        let step = this.originFlowData.nodes.find((data) => {
          return data.metadata.step === stepInfo.step;
        });
        step.metadata = stepInfo;
        step.label = stepInfo.step_name;
        if (this.originFlowData.nodes.length > 1) {
          this.drawEdges();
        }
        this.graph.changeData(this.originFlowData);
        this.emitStepData();
      } else {
        //新增回来
        stepInfo.step = this.originFlowData.nodes.length;
        const newNode = this.shapeStepToNode(stepInfo);
        this.originFlowData.nodes.push(newNode);
        if (this.originFlowData.nodes.length === 1) {
          //第一次新增回来先渲染画板
          this.$nextTick(() => {
            this.renderStepFlowCharts();
            this.graph.changeData(this.originFlowData);
            this.emitStepData();
          });
        } else {
          this.drawEdges();
          this.graph.changeData(this.originFlowData);
          this.emitStepData();
        }
      }
    },

    deleteStep(stepInfo) {
      let index = this.originFlowData.nodes.findIndex((data) => {
        return data.metadata.step === stepInfo.step;
      });
      if (index >= 0) {
        this.originFlowData.nodes.splice(index, 1);
        this.drawEdges();
        this.graph.changeData(this.originFlowData);
        this.emitStepData();
      }
    },

    renderStepFlowCharts() {
      const width = document.getElementById("mountNode").scrollWidth;
      const height = document.getElementById("mountNode").scrollHeight || 500;
      const graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        animate: true,
        width: width,
        height: height,
        fitView: false,
        defaultEdge: {
          type: "line",
          style: {
            endArrow: true,
            stroke: this.dppPrimaryColor,
          },
        },
        modes: {
          default: ["drag-node", "drag-canvas"],
        },
      });

      graph.render(); // 渲染图

      graph.on("node:click", (e) => {
        const nodeItem = e.item;
        this.stepOriginForm = _.cloneDeep(nodeItem.defaultCfg.model.metadata);
      });

      //用户改变顺序之后箭头要改变
      graph.on("node:dragend", (e) => {
        if (this.originFlowData.nodes.length <= 1) {
          return;
        }
        const nodeItem = e.item.defaultCfg.model; // 获取被点击的节点元素对象
        const xValue = nodeItem.x;
        let stepIndex = nodeItem.metadata.step;
        this.originFlowData.nodes.forEach((data) => {
          if (data.metadata.step === stepIndex) {
            data.x = xValue;
          }
        });
        // 排序，先根据X排序，然后如果X相同，根据Y排序
        this.originFlowData.nodes.sort((a, b) => {
          if (a.x === b.x) {
            return a.y - b.y;
          } else {
            return a.x - b.x;
          }
        });
        //重新设置每个步骤metadata的step顺序
        this.originFlowData.nodes.map((data, index) => {
          data.metadata.step = index;
          return data;
        });
        //根据已经好的这些节点来绘制边并且渲染
        this.drawEdges();
        this.graph.changeData(this.originFlowData);
        this.emitStepData();
      });
      this.graph = graph;
    },

    drawEdges() {
      this.originFlowData.edges = [];
      let sortedNodes = this.originFlowData.nodes;
      sortedNodes.forEach((element, index) => {
        if (index < sortedNodes.length - 1) {
          const b = {
            source: sortedNodes[index].id,
            target: sortedNodes[index + 1].id,
          };
          this.originFlowData.edges.push(b);
        }
      });
    },

    clearDraw() {
      this.originFlowData = {
        nodes: [],
        edges: [],
      };
      this.lockDraw = false;
      this.graph.destroy();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-title {
  border-bottom: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  padding: 16px 0;
}
.step-div {
  border: 1px solid #ebeef5;
  height: 300px;
  width: 100%;
}
.empty-with-text {
  border: 1px solid #ebeef5;
  min-height: 300px;
}

.operation-div {
  // display: flex;
  float: right;
  margin-top: 10px;
  i {
    font-size: 30px;
    cursor: pointer;
    margin-left: 5px;
  }

  .check {
    color: #33a852;
  }
}
</style>