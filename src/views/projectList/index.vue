<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目搜索:">
            <el-input type="input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="项目分类" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="原价" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Yprice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣价" align="center">
        <template slot-scope="scope">
          {{scope.row.Dprice}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="购买人数" align="center">
        <template slot-scope="scope">
          {{scope.row.Bnum}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{name: '拔牙', Yprice: '999', Dprice: '299', Bnum: '20'}],
        listLoading: true,
        form: {
          name: ''
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = false
      },
      onSearch() {

      }
    }
  }
</script>
<style>

</style>
