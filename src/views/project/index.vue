<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目分类:">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="拔牙" name="type"></el-checkbox>
          <el-checkbox label="正畸" name="type"></el-checkbox>
          <el-checkbox label="牙齿美白" name="type"></el-checkbox>
          <el-checkbox label="补牙" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="原价:">
        <el-input v-model="form.beforePrice"></el-input>
      </el-form-item>
      <el-form-item label="折扣价:">
        <el-input v-model="form.afterPrice"></el-input>
      </el-form-item>
      <el-form-item label="项目照片:">
        <uploadImg :maxLength='6' @successCBK="imageShow"></uploadImg>
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
          beforePrice: '',
          afterPrice: '',
          type: [],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      imageShow(arr) {
          console.log(arr);
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

