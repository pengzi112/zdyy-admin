<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目分类：" prop="label">
        <el-radio-group v-model="form.label">
          <el-radio :label="item.id" :key="item.id" v-for="(item,index) in skillLists" name="label">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="原价：">
        <el-input v-model="form.beforePrice"></el-input>
      </el-form-item>
      <el-form-item label="折扣价：">
        <el-input v-model="form.afterPrice"></el-input>
      </el-form-item>
      <el-form-item label="项目照片：">
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
  import { getProject } from '@/api/clinic'
  export default {
    components: {
      uploadImg
    },
    data() {
      return {
        form: {
          label: '',
          beforePrice: '',
          afterPrice: '',
          type: [],
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

