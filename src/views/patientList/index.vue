<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="姓名:">
            <el-input type="input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="时间搜索:">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="预约项目：" prop="label">
            <el-select v-model="form.label" placeholder="请选择项目">
              <el-option :label="item.name" :value="item.id" :key="item.id" v-for="(item, index) in skillList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预约医生：" prop="doctor">
            <el-select v-model="form.doctor" placeholder="请选择医生">
              <el-option label="王医生" value="0" :key="0"></el-option>
              <el-option label="李医生" value="1" :key="1"></el-option>
              <el-option label="蔡医生" value="2" :key="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态：" prop="userStatus" label-width="100px">
            <el-select v-model="form.userStatus" placeholder="请选择状态">
              <el-option label="已到店" value="0" :key="0"></el-option>
              <el-option label="未到店" value="1" :key="1"></el-option>
              <el-option label="已预约" value="2" :key="2"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-col :span="24" style="text-align:center;">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="评价">
        <template slot-scope="scope">
          <el-button type="primary">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Ytime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.Wtime}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getProject } from '@/api/clinic'
  export default {
    data() {
      return {
        list: [{name: '王二', sex: '男', phone: '18300030003', status: '已到店', Ytime: '2017-12-17 8:00', Wtime: '2017-12-17 16:00'}],
        listLoading: false,
        form: {
          name: '',
          label: '',
          doctor: '',
          userStatus: '',
        },
        skillList: [],
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
        getProject().then(response => {
          this.skillList = response;
        });
      },
      onSearch() {

      }
    }
  }
</script>
<style>
.line{
  text-align: center;
}
.el-input{
  width: 180px;
}
.el-select{
  width: 180px;
}
.el-input__inner{
  width: 180px;
}
</style>
