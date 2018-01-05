<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职称：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item label="擅长：" prop="label">
        <el-checkbox-group v-model="form.label">
          <el-checkbox :label="item.id" :key="item.id" v-for="(item,index) in skillLists" name="label">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="头像：" prop="doctor_headRule">
        <img class="uploaded_img" :src="headList" v-show="doctor_head_upload">
        <uploadImg :maxLength='1' :isEdit="true" ref="doctorHead" class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
  import { getDoctor } from '@/api/doctor'
  import { getProject, doctorUpload } from '@/api/clinic'
  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        form: {
          name: '',
          sex: '',
          title: '',
          describe: '',
          doctor_head: {},
          label: [],
          doctor_headRule: [], // 验证头像是否上传 
        },
        rules: {
          name: [
            {required: true, message: '请输入医生姓名', trigger: 'blur'},
          ],
          sex: [
            {type: 'number', required: true, message: '请选择性别', trigger: 'change' }
          ],
          title: [
            {required: true, message: '请输入医生职称', trigger: 'blur'},
          ],
          describe: [
            {required: true, message: '请输入医生简介', trigger: 'blur'},
          ],
          label: [
            {type: 'array', required: true, message: '请选择医生擅长项目', trigger: 'change'},
          ],
          doctor_headRule: [
            {type: 'array', required: true, message: '请选择医生头像', trigger: 'change'}
          ],
        },
        skillLists: [],
        headList: '', // 头像
        doctorId: '', // 医生id
        doctor_head_upload: true, // 已上传的头像是否显示
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.doctorId = this.$route.query.id;
        getProject().then(response => {
          this.skillLists = response;
        });
        // 获取医生详情
        getDoctor(this.doctorId).then(response => {
          console.log(response);
          let data = response.result;
          this.form.name = data[0].name;
          this.form.sex = data[0].sex;
          this.form.title = data[0].title;
          this.form.describe = data[0].describe;
          let funArr = data[0].fun_arr;
          for (var i = 0; i < funArr.length; i++) {
            let currentFun = Number(funArr[i].fun_id);
            this.form.label.push(currentFun);
          }
          this.form.doctor_headRule.push(data[0].doctor_head);
          this.headList = data[0].doctor_head;
        });
      },
      imageShow(arr) {
        this.doctor_head_upload = false;
        this.form.doctor_headRule.push(arr[0].file);
        this.form.doctor_head = arr[0].file;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = Object.assign({}, this.form);
            delete para['doctor_headRule'];
            // console.log(para);
            let paraFormData = new FormData();
            paraFormData.append('name', para.name);
            paraFormData.append('sex', para.sex);
            paraFormData.append('title', para.title);
            paraFormData.append('describe', para.describe);
            paraFormData.append('doctor_head', para.doctor_head);
            paraFormData.append('update', 'Y');
            paraFormData.append('doctor_id', this.doctorId);
            for (var i = 0; i < para.label.length; i++) {
              paraFormData.append('label[]', para.label[i]);
            }
            doctorUpload(paraFormData).then(response => {
              if (response.errorCode === 200) {
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  duration: 1000
                });
              }
            })
          }
        })
      },
      onCancel() {
        this.$router.push({path: '/resource/doctorList'})
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .uploaded_img{
    display: block;
    width: 146px;
    height: 146px;
    margin-right: 10px;
    float: left;
    cursor: pointer;
    border: 0;
    border-radius: 6px;
  }
</style>

