<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
import taskAPI from "@/api/task";
export default {
  props: {
    taskId: {
      type: Number
    },
    tableData: {
      type: Array,
      default: []
    },
    activeStepCardTab: {
      type: String,
      default: ""
    }
  },

  watch: {
    tableData(val) {
      if (val) {
        this.initCharts();
      }
    }
  },

  data() {
    return {
      columnPlot: undefined
    };
  },
  mounted() {},
  methods: {
    initCharts() {
      let data = [];
      this.tableData.forEach(item => {
        const a = [
          "success_count",
          "retry_count",
          "running_count",
          "fail_count"
        ];
        a.map(xFields => {
          data.push({
            step: item.step_name,
            type: xFields,
            value: item.stepInfo[xFields]
          });
        });
      });

      const columnPlot = new G2Plot.StackedColumn(
        document.getElementById("container"),
        {
          forceFit: true,
          title: {
            visible: true,
            text: this.$t("job.detail.step_detail_charts")
          },
          data,
          xField: "step",
          yField: "value",
          yAxis: {
            min: 0
          },
          stackField: "type",
          color: ["#31BF79", "#f27957", "#6395F9", "#1a6179"],
          label: {
            visible: true,
            position: "middle"
          }
          // connectedArea: {
          //   visible: true,
          //   triggerOn: false
          // }
        }
      );

      columnPlot.render();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>