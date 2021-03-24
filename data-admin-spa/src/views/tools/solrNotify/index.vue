<template>
  <el-container>
    <el-main>
      <el-form :inline="true">
        <el-row>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <el-col :lg="4" :xs="15">
            <el-upload :action="uploadUrl" v-loading="loading" :before-upload="beforeUpload" :multiple="false"
              :limit="1" :show-file-list="true">
              <el-button type="primary">{{$t('btn.upload')}}</el-button>
            </el-upload>
          </el-col>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <el-button type="primary" @click="reset()">{{$t('btn.reset')}}</el-button>
        </el-row>
        <el-row>
          <div>&nbsp;</div>
          <el-col v-if="uploaded" lebel="">{{path}}</el-col>
          <div>&nbsp;</div>
        </el-row>
        <el-row>
          <el-col :lg="2" :xs="12">
            <el-form-item>
              <el-button type="primary" v-if="uploaded" @click="solrNotify()">Submit</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>
<style>
</style>
<script>
import toolsAPI from "@/api/tools";

export default {
  name: "solrNotify",
  data() {
    return {
      loading: false,
      uploaded: false,
      path: ""
    };
  },
  methods: {
    beforeUpload(rawFile) {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", rawFile, rawFile.name);
      toolsAPI.uploadFile(formData).then(response => {
        if (response.success) {
          this.path = response.result;
          this.uploaded = true;
        } 
        this.loading = false;
      });
    },
    reset() {
      this.loading = false;
      this.uploaded = false;
      this.path = "";
    },
    solrNotify() {
      toolsAPI.notify(this.path).then(response => {
        if (response.success) {
          this.uploaded = false;
        } 
        this.loading = false;
      });
    }
  },
  computed: {
    uploadUrl: ()=> {
      return `${process.env.VUE_APP_BASE_URL}/api/solr/upload` ;
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
