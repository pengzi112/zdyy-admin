<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" value="1"></el-radio>
          <el-radio label="女" value="0"></el-radio>
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
        <uploadImg :maxLength='1' ref="doctorHead" class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
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
            {required: true, message: '请选择性别', trigger: 'change' }
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
        skillLists: []
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        getProject().then(response => {
          this.skillLists = response;
        });
      },
      imageShow(arr) {
        this.form.doctor_headRule.push(arr[0].file);
        this.form.doctor_head = arr[0].file;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = Object.assign({}, this.form);
            delete para['doctor_headRule'];
            console.log(para);
            let paraFormData = new FormData();
            paraFormData.append('name', para.name);
            paraFormData.append('sex', para.sex);
            paraFormData.append('title', para.title);
            paraFormData.append('describe', para.describe);
            paraFormData.append('doctor_head', para.doctor_head);
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
      onCancel(formName) {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        });
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

