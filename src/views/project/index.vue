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
        <uploadImg :maxLength='1' @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import uploadImg from '@/components/imgUpload/index'
  import { getProject, projectUpload } from '@/api/clinic'
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
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

