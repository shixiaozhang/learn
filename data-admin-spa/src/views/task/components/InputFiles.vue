<template>
  <el-dialog title="Input Files" :visible.sync="visible" :modal="false" width="48%" top="10vh">
    <el-main>
      <span style="color: #E6A23C; font-weight: bold; font-size: large">The input path you have key in is a directory,
        please confirm file list is that you want to input.</span>
      <el-table height="700px" :stripe='true' :data='s3FileList'>
        <el-table-column label="Path">
          <template slot-scope="scope">
            <p>{{scope.row}}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="saveTask">Confirm</el-button>
    </el-footer>
  </el-dialog>
</template>

<script>
export default {
  name: "InputFiles",
  props: {
    s3FileList: {
      type: Array
    }
  },
  watch: {
    s3FileList(val) {
      if (!val) return;
      this.visible = true;
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    saveTask() {
      this.$emit("confirmSave");
      this.visible = false;
    }
  },
  mounted() {}
};
</script>
