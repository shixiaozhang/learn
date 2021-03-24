<template>
  <div>
    <!-- <div class="navigate"> -->
      <!-- <el-button @click="back" plain size="mini" class="back-btn">
        <i class="el-icon-back"></i>
        Back </el-button> -->

      <!-- <span class="patent">
        <span>Patent ID:</span>
        {{$route.params.name}}</span> -->
    <!-- </div> -->

    <div class="page">
      <ul class="timeline">
        <li class="timeline-item" v-for="(item, index) in list" :key="index">
          <div class="timeline-info">
            <span>{{common.formatExactTs(item.ts)}}</span>
          </div>
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="timeline-title">{{item.service}}</h3>
            <p>{{item.info}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.list = this.$route.params.list;
  },
  methods: {
    back() {
      this.$router.push("/life-cycle");
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
.navigate {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #dde2ee;
  background: #fff;
  background-color: #fff;
  display: flex;
  align-items: center;
  .patent {
    margin-left: auto;
    padding-right: 100px;
    span {
      color: #576493;
      font-weight: 400;
    }
    color: #2a396d;
    font-weight: bold;
  }
}
$primary-color: #ff6b6b;
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
  // padding-top: 60px;
  // padding: 60px;
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
  padding-bottom: 50px;
  p {
    width: 80%;
    color: #a3aac3;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
</style>