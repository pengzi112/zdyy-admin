<template>
  <div class="app-container">
    <!-- <el-form :inline="true" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="姓名：">
            <el-input type="input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <el-table :data="doctorList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="医生姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="所属门诊" align="center">
        <template slot-scope="scope">
          <span>{{ name }}<!-- {{scope.row.clinic}} --></span>
        </template>
      </el-table-column>
      <el-table-column label="预约数量" align="center">
        <template slot-scope="scope">
          暂无<!-- {{scope.row.Ynum}} -->
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="评价数量" align="center">
        <template slot-scope="scope">
          暂无<!-- {{scope.row.Pnum}} -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdite(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getDoctorList, deleteDoctor } from '@/api/doctor'
  export default {
    data() {
      return {
        doctorList: [],
        listLoading: true,
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
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    methods: {
      fetchData() {
        this.listLoading = false
        getDoctorList().then(response => {
          if(response.errorCode === 200) {
            this.doctorList = response.result;
          }
        })
      },
      handleDel(index, row) {
        this.$confirm('确认要删除该医生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doctorDel(index, row.doctor_id);
        })
      },
      doctorDel(index, id) {
        let doctorId = id.toString();
        let param = new FormData();
        param.append('doctor_id', doctorId);
        deleteDoctor(param).then(response => {
          if(response.errorCode === 200) {
            let that = this;
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000,
              onClose: function() {
                that.doctorList.splice(index, 1);
              }
            });
          }
        })
      },
      handleEdite(row) {
        this.$router.push({path: '/resource/doctorList/doctorDetail', query: {id: row.doctor_id}})
      }
    }
  }
</script>
<style>

</style>
