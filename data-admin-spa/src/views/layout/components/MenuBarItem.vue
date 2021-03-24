<template>

  <div v-if="item.type===1&&item.visible" >

    <template v-if="hasNoChildMenu(item.children,item)">
      <el-menu-item 
        :style="{ 'background-color': primaryColor }"

       :index="`${basePath}/${item.route}`">
        {{$t(`menu.${item.route}`)}}
      </el-menu-item>
    </template>

    <el-submenu
     v-else :index="(item.route)" :popper-append-to-body="false" :ref="item.route">
      <template slot="title">
        {{$t(`menu.${item.route}`)}}
      </template>

      <template v-for="child in item.children">
        <menu-bar-item
        
         v-if="child.children&&child.children.length" :item="child" :is-nest="true" :key="child.route"
          :base-path="`/${item.route}`" />
        <el-menu-item
         v-else :index="`/${item.route}/${child.route}`" :key="child.route">
          {{$t(`menu.${child.route}`)}}
        </el-menu-item>
      </template>
    </el-submenu>

  </div>

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MenuBarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState({
      primaryColor: state => state.app.dppPrimaryColor
    })
  },
  methods: {
    hasNoChildMenu(children, parent) {
      if (!children) {
        return true;
      }
      const showingChildren = children.filter(item => {
        return item.visible;
      });
      if (showingChildren.length >= 1) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>