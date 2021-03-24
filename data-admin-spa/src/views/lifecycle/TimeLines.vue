<template>
  <div class="app-list-page">

    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('lifecycle.title')}}</h4>
        <p class="description">
          {{$t('lifecycle.sub_title')}}
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconRectangleCopy"></i>
      </div>
    </div>

    <div class="filter-list-content lifecycle-content">

      <div class="search-content">
        <el-input :placeholder="$t('lifecycle.search_placeholder')" @keyup.enter.native="search" class="search-input"
          v-model="queryKeywords">
          <template slot="append">
            <el-button class="search-btn" :style="{background:dppPrimaryColor}" type="primary" @click="search">
              <i class="iconfont iconsearch" style="margin-right:10px"></i>

              {{$t('btn.search')}}</el-button>
          </template>
        </el-input>
      </div>

      <div v-loading="getStepsListLoading">

        <div class="block" v-if="finalSplitArray.length>0">
          <h1>{{$t('lifecycle.title')}}</h1>
          <template>
            <el-carousel ref="lifeCarousel" class="step" trigger="click" height="168px" indicator-position="none"
              :autoplay="false" :loop="false" arrow="never">

              <div class="change-btn left" @click="pre">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="change-btn right" @click="next">
                <i class="el-icon-arrow-right"></i>
              </div>
              <el-carousel-item v-for="(steps,index) in finalSplitArray" :key="index">
                <div class="single-page">
                  <div class="line"></div>
                  <ul>
                    <li v-for="(item, index) in steps" :key="index" v-bind:class="{'odd':index%2 !==0}">
                      <div class="dot"></div>
                      <div class="tm">
                        <div class="tooltip-arrow"></div>
                        <span>Time:&nbsp;&nbsp;{{common.formatExactTs(item.childs[0].ts)}}</span>
                      </div>
                      <div class="text">
                        <div class="tooltip top">
                          <div class="tooltip-inner">
                            <div class="info">
                              <span>
                                {{item.childs[0].service}}
                                &nbsp;&nbsp;
                                <el-popover placement="bottom" width="600" trigger="click">
                                  <div class="example-basic" style="max-height:500px;overflow-y:auto">
                                    <div class="example-title">
                                      Detail Steps
                                    </div>
                                    <div>
                                      <ul class="timeline">
                                        <li class="timeline-item" v-for="(item, index) in item.childs" :key="index">
                                          <div class="timeline-info">
                                            <span>{{common.formatExactTs(item.ts)}}</span>
                                          </div>
                                          <div class="timeline-marker"></div>
                                          <div class="timeline-content">
                                            <!-- <h3 class="timeline-title">{{item.service}}</h3> -->
                                            <p>{{item.info}}</p>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <em slot="reference">View Detail</em>
                                </el-popover>
                                <!-- @click="viewDetail(item.childs)" -->
                              </span></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-carousel-item>

            </el-carousel>

            <a class="view-all" @click="viewAllLogs">View all logs &gt;</a>

          </template>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import taskAPI from "@/api/task";
import { mapState } from "vuex";

export default {
  data() {
    return {
      queryKeywords: "",
      resultList: [],
      finalSplitArray: [],
      getStepsListLoading: false,
      currentContent: []
    };
  },
  computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    })
  },
  mounted() {
    if (this.$route.params.name) {
      this.queryKeywords = this.$route.params.name;
      this.search();
    }
  },
  methods: {
    async search() {
      // this.queryKeywords = "TW201731961A";
      if (!this.queryKeywords) {
        return;
      }
      this.getStepsListLoading = true;
      const result = await taskAPI.getLifeCycle(this.queryKeywords);
      this.getStepsListLoading = false;
      this.resultList = result;
      let splitArray = [];
      this.finalSplitArray = [];
      for (let index = 0; index < this.resultList.length; index++) {
        if (index !== this.resultList.length - 1) {
          if (
            this.resultList[index].service !==
            this.resultList[index + 1].service
          ) {
            this.resultList[index].split = true;
            splitArray.push(index);
          } else {
            this.resultList[index].split = false;
          }
        } else {
          this.resultList[index].split = true;
          splitArray.push(index);
        }
      }
      const originCopy = _.cloneDeep(this.resultList);
      _.map(splitArray, (o, index) => {
        if (index === 0) {
          this.finalSplitArray.push({
            childs: _.slice(originCopy, 0, o + 1)
          });
        } else if (index === splitArray.length - 1) {
          this.finalSplitArray.push({
            childs: _.slice(
              originCopy,
              splitArray[index - 1] + 1,
              originCopy.length
            )
          });
        } else {
          this.finalSplitArray.push({
            childs: _.slice(originCopy, splitArray[index - 1] + 1, o + 1)
          });
        }
      });
      this.finalSplitArray = _.chunk(this.finalSplitArray, 4);
    },
    viewDetail(value) {
      this.currentContent = value;
    },
    viewAllLogs() {
      this.$router.push({
        name: "/life-cycle/logs",
        params: {
          list: this.resultList,
          name: this.queryKeywords
        }
      });
    },
    next() {
      if (
        this.$refs.lifeCarousel.activeIndex ===
        this.finalSplitArray.length - 1
      ) {
        return;
      }
      this.$refs.lifeCarousel.next();
    },
    pre() {
      if (this.$refs.lifeCarousel.activeIndex === 0) {
        return;
      }
      this.$refs.lifeCarousel.prev();
    }
  }
};
</script>
<style lang="scss">
.step {
  .el-carousel__arrow {
    font-size: 25px;
    height: 48px;
    width: 48px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
  }
  .el-carousel__arrow--left {
    background-color: #484b4d !important;
    left: 0;
  }
  .el-carousel__arrow--right {
    background-color: #484b4d !important;
    right: 0;
  }
}
</style>
<style lang="scss" scoped>
.lifecycle-content {
  height: calc(100vh - 53px - 151px - 80px) !important;
}
.search-content {
  width: 900px;
  margin: auto;
  margin-top: 20px;
  .search-btn {
    font-size: 16px;
    width: 140px;
    height: 48px;
    color: #ffffff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.block {
  height: 100%;
  background: #31363a;
  padding: 50px 0 40px;
  text-align: center;
  h1 {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
    line-height: 36px;
    text-align: center;
    padding-bottom: 30px;
  }

  .view-all {
    display: inline-block;
    z-index: 110;
    font-size: 14px;
    color: #ff6a00;
    margin-top: 40px;
    text-align: center;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.step {
  width: 90%;
  margin: auto;
}
.single-page {
  .line {
    position: relative;
    top: 85px;
    height: 2px;
    background-color: hsla(0, 0%, 100%, 0.4);
  }
  ul {
    list-style: none;
    margin: 0;
  }

  li {
    display: inline-block;
    width: 24%;
    height: 168px;
    position: relative;
    cursor: pointer;
    .dot {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -5px;
      margin-top: -5px;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
    .tm {
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #fff;
      line-height: 30px;
      height: auto;
      font-weight: 400;
      outline: none;
      .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        top: -8px;
        left: 50%;
        margin-left: -8px;
        border-bottom-color: hsla(0, 0%, 100%, 0.2);
        border-width: 0 8px 8px;
      }
      span {
        display: inline-block;
        line-height: 16px;
        height: 32px;
        padding: 8px 12px;
        background: hsla(0, 0%, 100%, 0.2);
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
      }
    }
    .text {
      position: absolute;
      left: 0;
      bottom: 100px;
      z-index: 50;
      width: 100%;
      text-align: center;
      .tooltip {
        position: relative;
        display: inline-block;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
      }
      .tooltip-inner {
        color: #fff;
        text-align: center;
      }
      .info {
        position: relative;
        display: block;
        text-decoration: none;
        color: #fff;
        outline: none;
        cursor: pointer;
        em {
          color: #ff6a00;
        }
      }
    }
    &:hover {
      .tm {
        span {
          background: #ff6a00;
        }
        .tooltip-arrow {
          border-bottom-color: #ff791a;
          border-top-color: #ff791a;
        }
      }
      .text {
        em {
          text-decoration: underline;
        }
      }
    }
  }

  .odd {
    .tm {
      bottom: inherit;
      top: 30px;
      .tooltip-arrow {
        bottom: inherit;
        top: 32px;
        bottom: 0;
        border-top-color: transparent;
        border-width: 8px 8px 0;
        border-top-color: hsla(0, 0%, 100%, 0.2);
      }
    }

    .text {
      top: 100px;
    }
  }
}
.change-btn {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  transition: 0.3s;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  background-color: #484b4d !important;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  .arrow {
    font-size: 35px;
  }
}
.left {
  left: 0;
}
.right {
  right: 0;
}

$primary-color: #ff6b6b;
// $primary-color:#3E921E;
.example-title {
  text-align: center;
  border-bottom: 1px solid #e4eaec;
  font-size: 16px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

/*==================================
    TIMELINE
==================================*/

/*-- GENERAL STYLES
    ------------------------------*/
.timeline {
  line-height: 1.4em;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: inherit;
  }
}

/*----- TIMELINE ITEM -----*/

.timeline-item {
  padding-left: 40px;
  position: relative;
  &:last-child {
    padding-bottom: 0;
  }
}

/*----- TIMELINE INFO -----*/

.timeline-info {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  white-space: nowrap;
}
/*----- TIMELINE MARKER -----*/

.timeline-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15px;
  &:before {
    background: $primary-color;
    border: 3px solid transparent;
    border-radius: 100%;
    content: "";
    display: block;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 15px;
    transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  }
  &:after {
    content: "";
    width: 3px;
    background: #ccd5db;
    display: block;
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 6px;
  }
  .timeline-item:last-child &:after {
    content: none;
  }
}
.timeline-item:not(.period):hover .timeline-marker:before {
  background: transparent;
  border: 3px solid $primary-color;
}

/*----- TIMELINE CONTENT -----*/

.timeline-content {
  padding-bottom: 20px;
  p:last-child {
    margin-bottom: 0;
  }
}
</style>