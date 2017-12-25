<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
      <el-form-item label="品牌介绍:" prop="text">
        <div style="min-width: 560px;">
          <tinymce :height='200' v-model="ruleForm.text"></tinymce>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { brandUpload } from '@/api/clinic'
  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        ruleForm: {
          text: ''
        },
      }
    },
    methods: {
      onSubmit() {
        let param = new FormData();
        param.append('content', this.ruleForm.text);
        brandUpload(param).then(response => {
          if (response.errorCode === 200) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              duration: 1000
            });
          }
        });
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

