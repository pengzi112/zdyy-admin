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
    <el-table :data="Patientlist" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.user_name}}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{scope.row.user_sex}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.user_mobile}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="评价">
        <template slot-scope="scope">
          <el-button type="primary" @click="lookView">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.end_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="30%">
          <el-form ref="form" :model="patientDetail" label-width="100px">
            <el-form-item label="用户姓名：" prop="name">
              <span>{{ patientDetail.user_name }}</span>
            </el-form-item>
            <el-form-item label="性别：" prop="user_sex">
              <span>{{ patientDetail.user_sex}}</span>
            </el-form-item>
            <el-form-item label="手机号：" prop="user_mobile">
              <span>{{ patientDetail.user_mobile}}</span>
            </el-form-item>
            <el-form-item label="项目名称：" prop="clinic_label_name">
              <span>{{ patientDetail.clinic_label_name}}</span>
            </el-form-item>
            <el-form-item label="用户状态：" prop="status">
              <span>{{ patientDetail.status}}</span>
            </el-form-item>
            <el-form-item label="预约时间：" prop="create_time">
              <span>{{ patientDetail.create_time}}</span>
            </el-form-item>
            <el-form-item label="完成时间：" prop="end_time">
              <span>{{ patientDetail.end_time}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="editLoading" v-if="!comeConfirm" @click="handleConfirm(patientDetail.user_id)">到店确认</el-button>
              <el-button v-if="comeConfirm"  disabled>已到店确认</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getProject } from '@/api/clinic'
  import { getPatient, updateStatus } from '@/api/patient'
  export default {
    data() {
      return {
        Patientlist: [],
        listLoading: false,
        form: {
          name: '',
          label: '',
          doctor: '',
          userStatus: '',
        },
        skillList: [],
        patientDetail: {
          user_name: '',
          user_sex: '',
          user_mobile: '',
          status: '',
          clinic_label_name: '',
          create_time: '',
          end_time: ''
        },
        dialogFormVisible: false,
        editLoading: false,
        comeConfirm: false, // 是否到店确认
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
        // 获取项目
        getProject().then(response => {
          this.skillList = response;
        });
        // 获取患者列表
        getPatient().then(response => {
          let example = {user_id: '1', user_name: '王二', user_sex: '男', user_mobile: '18300030003', clinic_label_name: '拔牙', status: '未到店', create_time: '2017-12-17 8:00', end_time: '2017-12-17 16:00'};
          this.Patientlist = response.result;
          this.Patientlist.push(example);
        });
      },
      handleDetail(row) {
        if(row.status === '已到店') {
          this.comeConfirm = true;
        }
        this.patientDetail = row;
        this.dialogFormVisible = true;
      },
      handleConfirm(id) {
        updateStatus(id).then(response => {
          this.editLoading = true;
          if (response.errorCode === 200) {
            this.editLoading = false;
            this.$message({
              message: '确认成功！',
              type: 'success',
              duration: 1000,
              onClose: function() {
                this.dialogFormVisible = false;
              }
            });
          }
        })
      },
      lookView() {
         this.$message('暂无法查看');
      },
      onSearch() {

      }
    }
  }
</script>
<style scoped>
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
