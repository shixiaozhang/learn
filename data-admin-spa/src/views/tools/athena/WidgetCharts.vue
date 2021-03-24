<template>
  <div class="content">

    <!-- <p style="margin-bottom:20px">数据分析</p> -->

    <el-row style="width:100%" :gutter="10">

      <el-col :span="6">

        <el-card class="leftCard">

          <div slot="header">
            <span>图表配置</span>
          </div>

          <p>图表类型</p>

          <el-row>
            <el-col :span="3" v-for="(item, typeIndex) in typeList" :key="typeIndex">

              <el-tooltip class="item" effect="dark" :content="item.tooltip" placement="top-start">

                <i :class="`iconfont ${item.icon}`" style="cursor: pointer;"
                  v-bind:style="{'color':chartType===item.type?dppPrimaryColor:''}" @click="changeChartType(item)"></i>

              </el-tooltip>

            </el-col>
          </el-row>

          <p>维度</p>

          <el-checkbox-group v-model="checkXList">
            <el-checkbox :label="item.name" class="block" v-for="(item, index) in metadata.cols" :key="index"
              :value="item.name">
            </el-checkbox>
          </el-checkbox-group>

          <p>指标</p>

          <el-checkbox-group v-model="checkYList">
            <el-checkbox :label="item" class="block" v-for="(item, index) in numericalCols" :key="index" :value="item">
            </el-checkbox>
          </el-checkbox-group>

          <p>筛选</p>

          <p>颜色</p>

          <div v-for="(item, index) in colorList" :key="index" v-bind:style="{background:item}" class="color-content">
            <i class="el-icon-close delete-icon" @click="deleteColor(index)"></i>

          </div>
          <el-color-picker size="mini" v-model="chooseColor" @change="changeColor()"></el-color-picker>

          <el-divider></el-divider>

          <el-button plain size="small" @click="previewChart()">预览</el-button>
          <el-button plain size="small" @click="clearChart()">清空图表</el-button>

        </el-card>
      </el-col>
      <el-col :span="18">

        <el-card v-if="chartType==='table'">
          <div slot="header" class="clearfix">
            <span>表格</span>
          </div>

          <el-table :data="metadata.rows" border>
            <el-table-column :prop="item" v-for="(item, index) in checkXList.concat(checkYList)" :key="index"
              :label="item">
            </el-table-column>
          </el-table>
        </el-card>

        <el-card v-else>

          <div slot="header" class="clearfix">
            <span>图表</span>
          </div>

          <div id="main" style="width: 100%;"></div>

        </el-card>

      </el-col>

    </el-row>

  </div>
</template>
<script>
import { mapState } from "vuex";
import * as echarts from "echarts";
import index from "../../accounts/index.vue";
export default {
  components: { index },
  data() {
    return {
      checkXList: [],
      checkYList: [],
      colorList: [],
      chartType: "bar",
      chooseColor: "",
      chart: undefined,
      typeList: [
        {
          icon: "iconbarchart",
          type: "bar",
          tooltip: "基础柱状图",
        },
        {
          icon: "iconchart",
          type: "line",
          tooltip: "基础折线图",
        },
        {
          icon: "iconscatter",
          type: "scatter",
          tooltip: "散点图",
        },
        {
          icon: "icontiaoxingtu",
          type: "ybar",
          tooltip: "条形图",
        },
        {
          icon: "iconchart-o",
          type: "pie",
          tooltip: "饼图",
        },
        {
          icon: "iconTable",
          type: "table",
          tooltip: "表格",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
      metadata: (state) =>
        state.athena.metadata
          ? JSON.parse(state.athena.metadata)
          : state.athena.metadata,
    }),

    numericalCols() {
      let firstRow = {};
      let result = [];
      if (this.$store.state.athena.metadata) {
        let metadata = JSON.parse(this.$store.state.athena.metadata);
        console.log(metadata);
        if (!metadata.rows.length) {
          return [];
        }
        firstRow = metadata.rows[0]; //第一行有可能无数据
      }
      for (const key in firstRow) {
        if (Number(firstRow[key])) {
          result.push(key);
        }
      }
      return result;
    },
  },
  methods: {
    changeChartType(item) {
      this.chartType = item.type;
    },

    changeColor() {
      if (this.chooseColor) {
        this.colorList.push(this.chooseColor);
      }
    },

    previewChart() {
      this.clearChart();
      this.initBarOrLineChart();
    },

    deleteColor(index) {
      this.colorList.splice(index, 1);
    },

    clearChart() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
    },

    initBarOrLineChart() {
      //基础柱状图
      var myChart = echarts.init(document.getElementById("main"));

      let option = {
        tooltip: this.getChartToolTip(),
        dataset: {
          dimensions: [this.checkXList[0], ...this.checkYList],
          source: this.metadata.rows,
        },
        series: this.getChartSeries(),
      };

      if (["bar", "line", "scatter"].indexOf(this.chartType) >= 0) {
        option.xAxis = { type: "category" };
        option.yAxis = {};
      } else if (["ybar"].indexOf(this.chartType) >= 0) {
        option.yAxis = { type: "category" };
        option.xAxis = {};
      }

      myChart.setOption(option);
      this.chart = myChart;
    },

    getChartToolTip() {
      switch (this.chartType) {
        case "bar":
        case "line":
        case "scatter":
        case "ybar":
          return {
            trigger: "axis",
          };
        case "pie":
          return {
            trigger: "item",
          };
        default:
          break;
      }
    },

    getChartSeries() {
      let series = [];
      const itemStyle = (index) => {
        return {
          color: this.colorList[index] ? this.colorList[index] : "#6294F9",
        };
      };
      switch (this.chartType) {
        case "bar":
        case "line":
        case "ybar":
          this.checkYList.forEach((data, index) => {
            series.push({
              type: this.chartType==='ybar'?'bar':this.chartType,
              smooth: true,
              itemStyle: itemStyle(index),
            });
          });
          break;
        case "pie":
          this.checkYList.forEach((data) => {
            series.push({
              type: this.chartType,
              radius: "50%",
            });
          });
          break;
        case "scatter":
          this.checkYList.forEach((data, index) => {
            series.push({
              symbolSize: 20,
              type: this.chartType,
              itemStyle: itemStyle(index),
            });
          });
          break;
        default:
          break;
      }
      return series;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 10px;
}
.block {
  display: block;
  margin: 10px 0;
}
.leftCard {
  /deep/ .el-card__body {
    min-height: calc(100vh - 300px);
  }
}
#main {
  min-height: calc(100vh - 300px);
}

.color-content {
  display: inline-flex;
  position: relative;
  width: 40px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 5px;
  &:hover {
    .delete-icon {
      visibility: visible;
    }
  }

  .delete-icon {
    position: absolute;
    visibility: hidden;
    right: 2px;
    top: 1px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
  }
}
</style>