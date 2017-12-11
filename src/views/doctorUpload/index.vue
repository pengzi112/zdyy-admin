<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职称:">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input type="textarea" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item label="擅长：">
        <el-checkbox-group v-model="form.skilled">
          <el-checkbox :label="item.id" :key="item.id" v-for="(item,index) in skillLists" name="skilled">{{item.skill}}</el-checkbox>
        </el-checkbox-group>
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
          name: '',
          sex: '',
          position: '',
          introduce: '',
          skilled: [],
        },
        skillLists: [{skill: '牙齿矫正', id: '0'}, {skill: '洗牙', id: '1'}, {skill: '拔牙', id: '2'}, {skill: '烤瓷'}, {skill: '牙齿整形', id: '3'}]
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

