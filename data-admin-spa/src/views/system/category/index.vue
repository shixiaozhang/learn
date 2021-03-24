<template>
  <div class="app-list-page">
    <categoryForm :categoryForm="categoryForm" @done="getCategoryList"></categoryForm>

    <div class="filter-list-title">
      {{$t('category.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('category.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchCategory()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showCategoryForm()">
            {{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData'>
        <el-table-column prop="name" :label="$t('category.name')"></el-table-column>
        <el-table-column :label='$t("common.operate")' width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" icon="el-icon-document" size="small" :title="$t('tips.copy')"
              @click="copyCategory(scope.row)"></el-button> -->
            <el-button type="text" @click="updateCategory(scope.row)">
              {{$t('btn.edit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleCategoryCurrentChange" @size-change="handleCategorySizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import commonAPI from "@/api/common";
import categoryForm from "./categoryForm";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "category",
  components: {
    categoryForm,
    ListCountTip
  },
  data() {
    return {
      tableData: [],
      query: {
        size: 20,
        current: 1,
        name: ""
      },
      total: 0,
      disabled: false,
      categoryForm: undefined
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    showCategoryForm(form) {
      if (!form) {
        this.categoryForm = {};
      } else {
        this.categoryForm = form;
      }
    },
    handleCategoryCurrentChange(val) {
      this.query.current = val;
      this.getCategoryList();
    },
    handleCategorySizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getCategoryList();
    },
    searchCategory() {
      this.query.current = 1;
      this.getCategoryList();
    },

    getCategoryList() {
      commonAPI
        .listCategory(this.query)
        .then(response => {
            this.tableData = response.records;
            this.total = response.total;
        })
    },
    copyCategory(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.id;
      this.showCategoryForm(cloneForm);
    },
    updateCategory(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showCategoryForm(cloneForm);
    }
  }
};
</script>
