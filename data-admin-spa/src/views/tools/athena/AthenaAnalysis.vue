<template>
  <div class="charts-content">
    <el-form :model='queryForm' ref="queryFormRef" label-position="left" label-width="100px">
      <el-row :gutter="20">

        <el-col :span="7">
          <el-form-item :label='$t("user.name")'>
            <el-input v-model="queryForm.username" :clearable="true" :disabled="viewAllPeople"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item :label="$t('athena.analysis.time')">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="queryForm.day" clearable
              style="width:100%">
              <el-option v-for="(item, index) in analysisDayOptions" :label="$t(`athena.analysis.${item.text}`)"
                :value="item.value" :key="index">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item :label="$t('athena.analysis.view_all_people')">
            <el-switch v-model="viewAllPeople" @change="search()">
            </el-switch>
          </el-form-item>
        </el-col>

        <el-button type='primary' @click="search()">
          <i class="iconfont iconsearch"></i>
          {{$t('btn.search')}}
        </el-button>
      </el-row>

    </el-form>

    <app-loading :loading="getAnalysisDataLoading"></app-loading>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">{{$t('athena.analysis.counts')}}</span>
      </div>
      <div class="numbers">
        <div class="number-box">
          <span class="text">{{$t('athena.analysis.all')}}</span>
          <span class="value">{{common.formatThousandNumber(annalysisData.countTotal||0)}}</span>
        </div>
        <div class="number-box">
          <span class="text">{{$t('athena.analysis.account_first')}}</span>
          <span class="value">{{common.formatThousandNumber(annalysisData.count0066||0)}}</span>
        </div>
        <div class="number-box">
          <span class="text">{{$t('athena.analysis.account_second')}}</span>
          <span class="value">{{common.formatThousandNumber(annalysisData.count7478||0)}}</span>
        </div>
      </div>
    </el-card>

    <div v-show="!viewAllPeople">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="title">{{$t('athena.analysis.account_ring')}}</span>
            </div>
            <div id="personAccountsRing" />
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="title">{{$t('athena.analysis.person_all_ring')}}</span>
            </div>
            <div id="personTableRing" />

          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">{{$t('athena.analysis.person_table')}}</span>
      </div>
      <div id="dateCountsChart"></div>
    </el-card>

    <div v-show="viewAllPeople">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="title">{{$t('athena.analysis.all_people_counts_line')}}</span>
        </div>
        <div id="AllPeopleCountsLine"></div>
      </el-card>

      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="title">{{$t('athena.analysis.all_people_table_line')}}</span>
          <el-popover ref="allPeopleTableOptions" placement="left-start" width="300" trigger="click">

            <div style="font-size:20px">
              {{$t('athena.analysis.chart_options')}}
            </div>

            <el-row style="margin-top:20px" :gutter="20">
              <el-col :span="6">
                <p>
                  {{$t('athena.analysis.show')}}
                </p>
              </el-col>
              <el-col :span="18">
                <el-select :placeholder="$t('common.placeholder_select')" style="width:100%"
                  v-model="chartShowNumber.allPeopleTable">
                  <el-option v-for="item in chartOptions" :key="item" :label="$t('athena.analysis.pre')+item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top:10px">
              <el-col :offset="6">
                <el-button size="small" type="primary" @click="changeChartOptions('allPeopleTable')">
                  {{$t('btn.confirm')}}</el-button>
                <el-button size="small" @click="chartShowNumber.allPeopleTable=10;changeChartOptions('allPeopleTable')">
                  {{$t('btn.reset')}}</el-button>
              </el-col>
            </el-row>

            <el-button slot="reference" style="float: right; padding: 3px 0" type="text">
              {{$t('athena.analysis.options')}}
              <i class="iconfont iconguolvqi" style="font-size:14px"></i>
            </el-button>

          </el-popover>

        </div>

        <div id="AllPeopleTable"></div>
      </el-card>

    </div>

  </div>

</template>

<script>
import athenaAPI from "@/api/athena";
import constant from "@/shared/config/constant";
import { mapState, mapGetters } from "vuex";
import AppLoading from "@/shared/components/AppLoading.vue";

export default {
  computed: {
    ...mapState({
      userName: state => state.user.name
    })
  },
  components: { AppLoading },
  data() {
    return {
      queryForm: {
        username: "",
        day: "7"
      },
      getAnalysisDataLoading: false,
      viewAllPeople: false,
      annalysisData: {},
      analysisDayOptions: constant.ATHEAN_ANALYSIS_DAY_OPTIONS,
      personCharts: {},
      chartOptions: [10, 20, 50],
      chartShowNumber: {
        allPeopleTable: 10
      },
      originAllPeopleDataSource: []
    };
  },
  mounted() {
    this.queryForm = {
      username: this.viewAllPeople ? undefined : this.userName,
      day: "7"
    };
    this.chartShowNumber = { allPeopleTable: 10 };
    this.getAnalysisData();
  },
  destroyed() {
    this.cleanCharts();
  },
  methods: {
    getAnalysisData() {
      this.getAnalysisDataLoading = true;
      athenaAPI.getAthenaAnalysisData(this.queryForm).then(
        response => {
          this.getAnalysisDataLoading = false;
          if (response.USER.length) {
            if (!this.viewAllPeople) {
              this.annalysisData = response.USER[0];
              this.setPersonCharts(response);
            } else if (this.viewAllPeople) {
              this.setAllPeopleCharts(response);
            }
          } else {
            this.$notify({
              title: this.$t("common.tips"),
              message: this.$t("athena.analysis.nodata"),
              type: "info"
            });
          }
        },
        error => {
          this.getAnalysisDataLoading = false;
        }
      );
    },
    changeChartOptions(table) {
      this.$refs.allPeopleTableOptions.doClose();
      const data = _.cloneDeep(this.originAllPeopleDataSource).TABLE.slice(
        0,
        this.chartShowNumber[table]
      );
      this.personCharts[table].destroy();
      this.initAllPeopleBarChart(
        data,
        "AllPeopleTable",
        "count",
        "table",
        "allPeopleTable",
        data.length >= 20 ? true : false
      );
    },
    setPersonCharts(source) {
      let data = source.USER[0].table;
      const dateLineData = source.DATE;
      const ringData = [
        {
          type: "0066账户",
          value: source.USER[0].count0066
        },
        {
          type: "7478账户",
          value: source.USER[0].count7478
        }
      ];
      this.initLinePlotChart(
        dateLineData,
        "dateCountsChart",
        "timeDate",
        "countTotal",
        "personDateCountsChart"
      );
      this.initPersonRing(
        ringData,
        "personAccountsRing",
        "value",
        "type",
        "personAccountChart"
      );
      this.initPersonPie(
        data,
        "personTableRing",
        "count",
        "tableName",
        "personTablePie"
      );
    },
    setAllPeopleCharts(source) {
      let stackBarData = [];
      this.annalysisData = { countTotal: 0, count0066: 0, count7478: 0 };
      source.USER.forEach((item, itemIndex) => {
        this.annalysisData.countTotal += item.countTotal;
        this.annalysisData.count0066 += item.count0066;
        this.annalysisData.count7478 += item.count7478;
        if (itemIndex >= 10) {
          return;
        }
        item.table.forEach((table, index) => {
          if (index >= 10) {
            return;
          }
          stackBarData.push({
            username: item.username,
            table: table.tableName,
            count: table.count
          });
        });
      });
      const peopleCountsData = source.USER.slice(0, 10);
      this.initLinePlotChart(
        source.DATE,
        "dateCountsChart",
        "timeDate",
        "countTotal",
        "allDateCountsCharts"
      );
      this.initAllPeopleCountsPlot(peopleCountsData);

      this.originAllPeopleDataSource = _.cloneDeep(source);
      this.initAllPeopleBarChart(
        _.cloneDeep(source).TABLE.slice(0, 10),
        "AllPeopleTable",
        "count",
        "table",
        "allPeopleTable",
        false
      );
    },

    initAllPeopleCountsPlot(data) {
      const linePlot = new G2Plot.Column(
        document.getElementById("AllPeopleCountsLine"),
        {
          forceFit: true,
          padding: "auto",
          data,
          xField: "username",
          yField: "countTotal",
          label: {
            visible: true,
            position: "middle"
          },
          yAxis: {
            label: {
              formatter: v =>
                `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
            }
          },
          meta: {
            username: {
              alias: this.$t("athena.analysis.username")
            },
            countTotal: {
              alias: this.$t("athena.analysis.counts_total")
            }
          },
          xAxis: {
            type: "cat"
          },
          responsive: true
        }
      );
      linePlot.render();
      this.personCharts.allPeopleCountsChart = linePlot;
    },

    initAllPeopleBarChart(
      data,
      idName,
      xName,
      yName,
      deleteName,
      showScrollBar
    ) {
      let options = {
        forceFit: true,
        data,
        xField: xName,
        yField: yName,
        meta: {
          count: {
            alias: this.$t("athena.analysis.counts_total")
          }
        }
      };
      if (showScrollBar) {
        options.interactions = [
          {
            type: "scrollbar",
            cfg: {
              type: "vertical"
            }
          }
        ];
      }
      const barPlot = new G2Plot.Bar(document.getElementById(idName), options);
      barPlot.render();
      this.personCharts[deleteName] = barPlot;
    },

    initLinePlotChart(data, idName, xName, yName, deleteName) {
      const linePlot = new G2Plot.Line(idName, {
        padding: "auto",
        forceFit: true,
        data,
        xField: xName,
        yField: yName,
        xAxis: {
          type: "cat"
        },
        yAxis: {
          label: {
            formatter: v =>
              `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
          }
        },
        meta: {
          countTotal: {
            alias: this.$t("athena.analysis.counts_total")
          },
          count: {
            alias: this.$t("athena.analysis.counts_total")
          }
        },
        responsive: true
      });
      linePlot.render();
      this.personCharts[deleteName] = linePlot;
    },
    initPersonRing(data, idName, angleName, colorName, deleteName) {
      const ringPlot = new G2Plot.Ring(document.getElementById(idName), {
        forceFit: true,
        radius: 0.8,
        padding: "auto",
        data,
        angleField: angleName,
        colorField: colorName,
        responsive: true
      });
      ringPlot.render();
      this.personCharts[deleteName] = ringPlot;
    },
    initPersonPie(data, idName, angleName, colorName, deleteName) {
      const piePlot = new G2Plot.Pie(document.getElementById(idName), {
        forceFit: true,
        radius: 0.8,
        data,
        angleField: angleName,
        colorField: colorName,
        label: {
          visible: true,
          type: "outer",
          offset: 20
        }
      });
      piePlot.render();
      this.personCharts[deleteName] = piePlot;
    },
    search() {
      if (this.viewAllPeople) {
        this.queryForm.username = "";
      } else if (!this.queryForm.username) {
        this.queryForm.username = this.userName;
      }
      this.cleanCharts();
      this.getAnalysisData();
      this.chartShowNumber = { allPeopleTable: 10 };
    },
    cleanCharts() {
      for (let [key, value] of Object.entries(this.personCharts)) {
        this.personCharts[key].destroy();
      }
      this.personCharts = {};
      this.annalysisData = {};
    }
  }
};
</script>


<style lang="scss" scoped>
.charts-content {
  margin: 20px;
}
.title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
}
.box-card {
  margin-bottom: 20px;
}
.numbers {
  display: flex;
  width: 100%;
  .number-box {
    flex: 0.33;
    display: block;
    text-align: center;
    .text {
      display: block;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
    .value {
      display: block;
      font-size: 24px;
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>