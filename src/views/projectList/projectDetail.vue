<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="项目分类：" prop="label_id">
        <el-radio-group v-model="form.label_id">
          <el-radio :label="item.id" :key="item.id" v-for="(item,index) in skillLists" name="label_id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目名称：" prop="clinic_label_name">
        <el-col :span="6">
          <el-input v-model="form.clinic_label_name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="原价：" prop="origin_price">
        <el-col :span="6">
          <el-input v-model.number="form.origin_price"></el-input>
        </el-col>
        <el-col :span="1">
          <span style="margin-left: 10px;">元</span>
        </el-col>
      </el-form-item>
      <el-form-item label="折扣价：" prop="discount_price">
        <el-col :span="6">
          <el-input v-model.number="form.discount_price"></el-input>
        </el-col>
        <el-col :span="1">
          <span style="margin-left: 10px;">元</span>
        </el-col>
      </el-form-item>
      <el-form-item label="项目照片：" prop="imgRule">
        <img class="uploaded_img" :src="imgList" v-show="project_upload">
        <uploadImg :maxLength='1' :isEdit="true" @successCBK="imageShow"></uploadImg>
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
  import { getProject, projectUpload, getProjectDetail } from '@/api/clinic'
  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        form: {
          label_id: '',
          clinic_label_name: '',
          origin_price: '',
          discount_price: '',
          img: {}, // 项目图片
          imgRule: [], //验证项目图片上传与否
        },
        rules: {
          clinic_label_name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          origin_price: [
            {required: true, message: '请输入项目原价'},
            { type: 'number', message: '价格必须为数字'}
          ],
          discount_price: [
            {required: true, message: '请输入项目折扣价'},
            { type: 'number', message: '价格必须为数字值'}
          ],
          label_id: [
            {type: 'number', required: true, message: '请选择项目分类', trigger: 'change' }
          ],
          imgRule: [
            {type: 'array', required: true, message: '请选择项目照', trigger: 'change'}
          ],
        },
        skillLists: [],
        clinicId: '', // 项目id
        clinic_label_id: '',
        imgList: '', // 项目照
        project_upload: true, //是否显示已上传的图片
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.clinicId = this.$route.query.label_id;
        this.clinic_label_id = this.$route.query.clinic_label_id;
        getProject().then(response => {
          this.skillLists = response;
        });
        getProjectDetail(this.clinicId).then(response => {
          if(response.errorCode === 200) {
            console.log(response);
            let labelData = response.result;
            this.form.label_id = labelData.label_id;
            this.form.clinic_label_name = labelData.clinic_label_name;
            this.form.origin_price = labelData.origin_price;
            this.form.discount_price = labelData.discount_price;
            this.form.img = labelData.img;
            this.form.imgRule.push(labelData.img);
            this.imgList = labelData.img;
          }
        });
      },
      imageShow(arr) {
        this.project_upload = false;
        this.form.imgRule.push(arr[0].file);
        this.form.img = arr[0].file;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = Object.assign({}, this.form);
            delete para['imgRule'];
            let param = new FormData();
            param.append('clinic_label_name', para.clinic_label_name);
            param.append('label_id', para.label_id);
            param.append('origin_price', para.origin_price);
            param.append('discount_price', para.discount_price);
            param.append('img', para.img);
            param.append('update', 'Y');
            param.append('clinic_label_id', this.clinic_label_id);
            projectUpload(param).then(response => {
              if (response.errorCode === 200) {
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  duration: 1000
                });
              }
            });
          }
        })
      },
      onCancel() {
        this.$router.push({path: '/resource/projectList'})
      },
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

