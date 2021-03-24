<template>
    <div>
        <el-popover 
        ref="popover1" @show="expand" placement="right" 
        width="900" trigger="hover">
            <json-editor 
            ref="editor" :json="json" :options="jsonEditorOptions" ></json-editor>
        </el-popover>
        <el-button size="mini" v-popover:popover1 @click="showDetail">{{text}}</el-button>
    </div>
</template>
<style>

</style>
<script>
import JsonEditor from "@/shared/components/JsonEditor";

export default {
  name: 'JsonCol',
  components:{
   JsonEditor
  },
  props: {
    text: {
      type: String,
      default() {
        return 'show json'
      }
    },
    json: {
      type: Object | Array,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      jsonEditorOptions: {
        mode: 'view',
        navigationBar: false,
        language: this.$i18n.locale
      }
    }
  },
  methods: {
    expand() {
      this.$refs.editor.editor.expandAll()
    },
    showDetail() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" >
.show-json-content{
  max-height: 500px;
  overflow-y: scroll;
}
</style>
