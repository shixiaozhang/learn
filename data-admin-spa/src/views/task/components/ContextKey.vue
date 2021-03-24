<template>
  <el-row :gutter="60">
    <el-col :span="8">
      <el-form-item :prop="parentPropName + '.option'" :label="$t('common.context')"
        :rules="[{required: !consoleTaskType,message:$t('error.required')}]" 
        label-width="80px">
        <el-select
         clearable :placeholder="$t('common.placeholder_select')" 
          filterable
          v-model="filter.option" style="width:100%;" @change="getKeyType">
          <el-option v-for="item in contextKeys" :key="item.key" :label="item.key" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label-width="80px" :prop="parentPropName +'.value'" :label="$t('common.value')"
        :rules="[{required: !consoleTaskType,message:$t('error.required')}]" v-if="filter.key_type==='YEAR'">
        <el-date-picker type="year" format="yyyy" value-format="yyyy" v-model="filter.value" style="width:100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="80px" :prop="parentPropName +'.value'" :label="$t('common.value')"
        :rules="[{required: !consoleTaskType,message:$t('error.required')}]" v-else-if="filter.key_type==='DATE'">
        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" v-model="filter.value" style="width:100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item :prop="parentPropName +'.value'" :label="$t('common.value')"
        :rules="[{required: !consoleTaskType,message:$t('error.required')}]" inline-message="true" v-else
        label-width="80px">
        <el-input v-model="filter.value"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="2">
      <el-button @click.prevent="removeFilter(filter)" type="text">
        <i class="el-icon-delete" style="color:#F5212D"></i>
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "ContextKey",
  props: {
    consoleTaskType: {
      type: Boolean
    },
    contextKeys: {
      type: Array
    },
    index: {
      type: Number
    },
    filter: {
      type: Object
    },
    filters: {
      type: Array
    },
    parentPropName: {
      type: String
    }
  },
  methods: {
    removeFilter(item) {
      var index = this.filters.indexOf(item);
      if (index !== -1) {
        this.filters.splice(index, 1);
      }
    },
    getKeyType(val) {
      for (var j = 0, len = this.contextKeys.length; j < len; j++) {
        if (this.contextKeys[j].key === val) {
          this.filter.key_type = this.contextKeys[j].key_type;
        }
      }
    }
  }
};
</script>
