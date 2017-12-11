<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="特色项目:">
        <el-input type="textarea" v-model="form.features"></el-input>
      </el-form-item>
      <el-form-item label="品牌故事:">
        <el-input type="textarea" v-model="form.story"></el-input>
      </el-form-item>
      <el-form-item label="服务理念:">
        <el-input type="textarea" v-model="form.services"></el-input>
      </el-form-item>
      <el-form-item label="照片:">
        <uploadImg :maxLength='3' class="editor-upload-btn" @successCBK="imageShow"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import uploadImg from '@/components/imgUpload/index'
  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        form: {
          features: '',
          story: '',
          services: ''
        },
      }
    },
    methods: {
      imageShow(arr) {
        console.log(arr);
      },
      imageLogo(arr) {
        console.log(arr);
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

