<template>
  <div>
    <div id="mountNode" style="width:100%;height:200px"></div>

    <TaskStepDetail @onClose="viewStepDetail=undefined" :stepInfo="viewStepDetail"></TaskStepDetail>
  </div>
</template>

<script>
import TaskStepDetail from "./TaskStepDetail";
import { mapState } from "vuex";
export default {
  components: {
    TaskStepDetail
  },
  props: {
    steps: {
      default: () => {
        return [];
      },
      type: Array
    }
  },
  computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    })
  },
  watch: {
    steps(val) {
      if (val) {
        this.renderStepFlowCharts();
      }
    }
  },
  mounted() {},

  data() {
    return {
      viewStepDetail: {}
    };
  },

  methods: {
    renderStepFlowCharts() {
      const chartData = this.getData();
      const width = document.getElementById("mountNode").scrollWidth;
      const height = document.getElementById("mountNode").scrollHeight || 400;
      const graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        animate: true,
        width: width,
        height: height,
        fitView: chartData.nodes.length >= 5 ? true : false,
        defaultNode: {
          size: [80, 40],
          type: "rect",
          style: {
            fill: "#DEE9FF",
            stroke: "#5B8FF9"
          }
        },

        defaultEdge: {
          type: "polyline",
          style: {
            endArrow: true,
            stroke: "#F6BD16"
          }
        },
        modes: {
          // default: ["drag-canvas", "drag-node"]
        }
      });

      graph.data(chartData); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图

      graph.on("node:click", e => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach(cn => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
        this.viewStepDetail = nodeItem.defaultCfg.model;
      });
    },

    getData() {
      let nodes = [];
      let edges = [];
      for (let index = 0; index < this.steps.length; index++) {
        this.steps[index].id = `rect${this.steps[index].id}`;
        const a = {
          label: this.steps[index].step_name,
          y: 100,
          x: index === 0 ? 100 : 100 + index * 200,
          ...this.steps[index]
        };
        nodes.push(a);

        if (index < this.steps.length - 1) {
          const b = {
            source: this.steps[index].id,
            target: `rect${this.steps[index + 1].id}`
          };
          edges.push(b);
        }
      }
      return {
        nodes: nodes,
        edges: edges
      };
    }
  }
};
</script>