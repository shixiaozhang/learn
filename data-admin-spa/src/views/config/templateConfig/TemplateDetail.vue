<template>
    <el-dialog :title="$t('temlpate.detail')" :visible.sync="visible" @close="hide" top="2vh" >
        <json-editor ref="showDetail" :json="json" :options="jsonEditorOptions" 
         style="height:600px"
        ></json-editor>
    </el-dialog>
</template>

<script>
import taskAPI from '@/api/task'
import JsonEditor from "@/shared/components/JsonEditor";

export default {
  props: {
    taskId: {
      type: Number
    }
  },
  components:{
    JsonEditor
  },
  watch: {
    taskId(val) {
      if (!val || val === '') return
      this.visible = true
      this.getDetail()
    }
  },
  data() {
    return {
      json: {},
      tableData: [],
      jsonEditorOptions: {
        mode: 'view',
       navigationBar: false
      },
      visible: false
    }
  },
  methods: {
    getDetail() {
      taskAPI
        .queryTaskDetail({ taskId: this.taskId })
        .then(response => {
            this.json = response;
        })
    },
    hide() {
      this.$emit('close')
    }
  }
}
</script>
