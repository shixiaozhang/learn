<template>

  <div>

    <div class="filter-title">
      {{$t('job.create_form.step.filter_keys')}}
    </div>

    <el-row :gutter="20" v-for="(filter,index) in formContextArray" :key="index">
      <el-col :span="10">
        <el-form-item :prop="`context[${index}].option`" :label="$t('common.context')"
          :rules="[{required: true,message:$t('error.required')}]" label-width="80px">
          <el-select clearable :placeholder="$t('common.placeholder_select')" filterable v-model="filter.option"
            style="width:100%;" @change="getKeyType(index,$event)">
            <el-option v-for="item in contextKeys" :key="item.key" :label="item.key" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label-width="80px" :prop="`context[${index}].value`" :label="$t('common.value')"
          :rules="[{required: true,message:$t('error.required')}]" v-if="filter.key_type==='YEAR'">
          <el-date-picker type="year" format="yyyy" value-format="yyyy" v-model="filter.value" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="8px" :prop="`context[${index}].value`" :label="$t('common.value')"
          :rules="[{required: true,message:$t('error.required')}]" v-else-if="filter.key_type==='DATE'">
          <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" v-model="filter.value" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item :prop="`context[${index}].value`" :label="$t('common.value')"
          :rules="[{required: true,message:$t('error.required')}]" inline-message="true" v-else label-width="80px">
          <el-input v-model="filter.value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" >
        <el-button @click="removeFilter(filter,index)" type="text">
          <i class="el-icon-delete" style="color:#F5212D"></i>
        </el-button>
      </el-col>
    </el-row>

    <el-button style="margin-bottom:10px" size="small" plain @click="addFilter" icon="el-icon-plus">
      {{$t('job.create_form.step.add_context_key')}}</el-button>

  </div>

</template>
<script>
export default {
  name: "ContextKey",
  props: {
    context: {
      type: Array
    },
    contextKeys: {
      type: Array
    }
  },
  watch: {
    context(val) {
      if (val && val.length) {
        this.formContextArray = val;
      }
    }
  },

  data() {
    return {
      formContextArray: this.context
    };
  },
  methods: {
    removeFilter(item, index) {
      this.formContextArray.splice(index, 1);
    },
    addFilter() {
      this.formContextArray.push({
        option: "",
        value: ""
      });
    },
    getKeyType(index, val) {
      let filterRow = this.formContextArray[index];
      const curKey = this.contextKeys.find(item => {
        return item.key === val;
      });
      if (curKey) {
        filterRow.key_type = curKey.key_type;
        this.$set(this.formContextArray, index, filterRow);
      }
    }
  }
};
</script>