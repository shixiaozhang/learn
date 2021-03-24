<template>
  <div class="list-count-tips" :style="{'border-left': `5px solid ${dppPrimaryColor}`}">
    <el-tag>
      <b v-html="$t(i18, { counts: common.formatThousandNumber(counts),link:link })"></b>
      <slot name="action-button"></slot>
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    })
  },
  props: {
    i18: {
      type: String,
      default: ""
    },
    counts: {
      type: Number,
      default: "--"
    },
    link: {
      type: String,
      default: ""
    }
  }
};
</script>

