<template>
    <el-dialog title="Item Records" :visible.sync="visible" append-to-body @close="hide" top="10vh">
        <el-table :data='tableData' height='500' size='mini' style='width: 100%' border :stripe='true' header-row-class-name='header-gray'>
            <el-table-column type='selection' width='55'>
            </el-table-column>
            <el-table-column prop='uris' label='uris' show-overflow-tooltip width='300'>
            </el-table-column>
            <el-table-column prop='status' label='status' width='80'>
            </el-table-column>
            <el-table-column prop='context' label='Files' width='150'>
            </el-table-column>
            <el-table-column prop='context' label='context' width='140'>
                <template slot-scope="scope">
                    <json-col :json="scope.row.context" text='show context'></json-col>
                </template>
            </el-table-column>
            <el-table-column prop='context' label='fix'>
                <template slot-scope="scope">
                    {{scope.row.fixable}}
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<style>

</style>
<script>
// import taskAPI from '@/api/task'
import JsonCol from './JsonCol'
import taskAPI from '@/api/task'

export default {
  name: 'ItemReocrds',
  components: {
    JsonCol
  },
  props: {
    itemId: {
      type: String
    },
    taskId: {
      type: String
    }
  },
  watch: {
    itemId(val) {
      if (!val || val === '') return
      this.visible = true
      this.getRecords()
    }
  },
  data() {
    return {
      tableData: [],
      visible: false
    }
  },
  methods: {
    getRecords() {
      taskAPI
        .searchRecord({ taskId: this.taskId })
        .then(response => {
            this.tableData = response;
        })
    },
    hide() {
      this.$emit('close')
    }
  }
}
</script>
