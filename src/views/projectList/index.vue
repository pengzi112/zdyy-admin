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
    <el-table :data="projectList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="项目分类" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.clinic_label_name}} -->
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="原价" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.origin_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣价" align="center">
        <template slot-scope="scope">
          {{scope.row.discount_price}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="购买人数" align="center">
        <template slot-scope="scope">
          {{scope.row.total_user}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getProject, deleteProject } from '@/api/clinic'
  export default {
    data() {
      return {
        projectList: [],
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
        getProject().then(response => {
          this.projectList = response;
          /*if(response.errorCode === 200) {
            console.log(response);
            this.projectList = response.result;
          }*/
        })
        let projectData = {id: '1', name: '拔牙', origin_price: '500', discount_price: '300', total_user: '268'}
        this.projectList.push(projectData);
      },
      handleDel(index, row) {
        this.$confirm('确认要删除该项目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.projectDel(index, row.id);
        })
      },
      projectDel(index, id) {
        let clinicId = id.toString();
        let param = new FormData();
        param.append('clinic_label_id', clinicId);
        deleteProject(param).then(response => {
          if(response.errorCode === 200) {
            let that = this;
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000,
              onClose: function() {
                that.projectList.splice(index, 1);
              }
            });
          }
        })
      },
      handleEdit(row) {
        this.$router.push({path: 'projectList/projectDetail', query: {id: row.id}});
      },
      onSearch() {

      }
    }
  }
</script>
<style>

</style>
